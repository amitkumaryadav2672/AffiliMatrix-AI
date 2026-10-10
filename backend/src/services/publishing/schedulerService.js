import { executePlatformPublish } from '../../integrations/index.js';
import { dbStore } from '../../data/store.js';

export class SchedulerService {
  constructor() {
    this.failureCounters = {};
    this.timer = null;
    this.startLoop();
  }

  startLoop() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => this.processQueuedJobs(), 15000);
  }

  async processQueuedJobs() {
    if (dbStore.settings.emergencyKillSwitch) return;

    const now = new Date();
    const readyJobs = dbStore.publishJobs.filter(
      job => job.status === 'queued' && new Date(job.scheduledAt) <= now
    );

    for (const job of readyJobs) {
      await this.executeJob(job.id);
    }
  }

  async executeJob(jobId) {
    if (dbStore.settings.emergencyKillSwitch) {
      throw new Error('EMERGENCY KILL SWITCH ENGAGED: Outbound publishing is suspended.');
    }

    const job = dbStore.publishJobs.find(j => j.id === jobId);
    if (!job) throw new Error(`Publish job '${jobId}' not found.`);

    const content = dbStore.contentItems.find(c => c.id === job.contentId);
    if (!content) throw new Error(`Content for job '${jobId}' not found.`);

    // Human-in-the-loop review enforcement
    if (content.approvalStatus !== 'approved' && content.approvalStatus !== 'APPROVED') {
      dbStore.addAuditLog(
        'Scheduler Safety Gate',
        'PUBLISH_BLOCKED',
        `Job ${job.id} on ${job.platform} blocked because content lacks human supervisor approval.`,
        'BLOCKED'
      );
      throw new Error(`Cannot publish unapproved content. Approval status is '${content.approvalStatus}'.`);
    }

    const account = dbStore.socialAccounts.find(a => a.platform === job.platform);
    if (!account) {
      job.status = 'failed';
      job.error = `No connected account found for platform: ${job.platform}`;
      return { success: false, error: job.error };
    }

    const failureKey = `${job.platform}:${account.id}`;
    if (this.failureCounters[failureKey] >= 3) {
      job.status = 'paused';
      job.error = 'Circuit breaker tripped: Account paused due to repeated API errors.';
      account.status = 'paused';
      dbStore.addAuditLog(
        'Circuit Breaker',
        'ACCOUNT_PAUSED',
        `Automated pause activated on ${account.handle} (${job.platform}) after consecutive failures.`,
        'WARNING'
      );
      return { success: false, error: job.error };
    }

    try {
      job.attempts = (job.attempts || 0) + 1;
      const result = await executePlatformPublish(
        job.platform,
        content,
        account,
        dbStore.settings.simulationMode
      );

      job.status = 'published';
      job.publishedAt = new Date().toISOString();
      job.postId = result.postId;
      job.postUrl = result.postUrl;
      job.error = null;

      this.failureCounters[failureKey] = 0;
      account.postsToday = (account.postsToday || 0) + 1;

      dbStore.addAuditLog(
        `${job.platform.toUpperCase()} Publishing Adapter`,
        'POST_PUBLISHED',
        `Successfully published job #${job.id} to ${account.handle}. URL: ${result.postUrl}`,
        'SUCCESS'
      );

      return { success: true, result };
    } catch (err) {
      job.status = 'failed';
      job.error = err.message;
      this.failureCounters[failureKey] = (this.failureCounters[failureKey] || 0) + 1;

      dbStore.addAuditLog(
        `${job.platform.toUpperCase()} Publishing Adapter`,
        'POST_FAILED',
        `Failed to publish job #${job.id}. Error: ${err.message}`,
        'ERROR'
      );

      throw err;
    }
  }

  toggleKillSwitch(enable) {
    dbStore.settings.emergencyKillSwitch = enable;
    dbStore.addAuditLog(
      'Admin (Supervisor)',
      enable ? 'EMERGENCY_KILL_SWITCH_ENGAGED' : 'EMERGENCY_KILL_SWITCH_DISENGAGED',
      enable ? 'Global pause engaged: All queues halted.' : 'Global pause released: Normal queues resumed.',
      enable ? 'WARNING' : 'SUCCESS'
    );
    return { emergencyKillSwitch: enable };
  }
}

export const schedulerService = new SchedulerService();
