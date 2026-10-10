/**
 * Social Publishing Worker
 * Background queue processor for scheduled posts, rate limit delays, and error reconciliation.
 */

import { schedulerService } from '../services/publishing/schedulerService.js';
import { dbStore } from '../data/store.js';

export async function processPublishJob(job) {
  console.log(`📡 [Publishing Worker] Processing social publish job #${job.id} for platform: ${job.platform}`);

  const result = await schedulerService.executeJob(job.id);

  dbStore.addAuditLog(
    'Background Publishing Worker',
    'JOB_PROCESSED',
    `Worker dispatched post #${job.id} to ${job.platform}`
  );

  return {
    success: true,
    jobId: job.id,
    platform: job.platform,
    result,
    processedAt: new Date().toISOString()
  };
}
