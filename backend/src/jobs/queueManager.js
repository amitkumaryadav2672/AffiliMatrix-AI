/**
 * Queue Manager (BullMQ & Background Workers Bridge)
 * Coordinates job queues across Content, Video, and Publishing workers.
 */

import { processContentJob } from './content.worker.js';
import { processVideoJob } from './video.worker.js';
import { processPublishJob } from './publishing.worker.js';

export class QueueManager {
  static workers = {
    content: { name: 'AI Content Worker', status: 'idle', activeJobs: 0 },
    video: { name: 'Video Rendering Worker', status: 'idle', activeJobs: 0 },
    publishing: { name: 'Social Publishing Worker', status: 'active', activeJobs: 0 }
  };

  /**
   * Enqueue and process an AI content generation job
   */
  static async enqueueContentJob(jobData) {
    this.workers.content.status = 'processing';
    this.workers.content.activeJobs += 1;
    console.log(`[QueueManager] Delegating job #${jobData.id} to Content Worker`);

    try {
      const result = await processContentJob(jobData);
      return result;
    } finally {
      this.workers.content.activeJobs = Math.max(0, this.workers.content.activeJobs - 1);
      this.workers.content.status = this.workers.content.activeJobs > 0 ? 'processing' : 'idle';
    }
  }

  /**
   * Enqueue and process a vertical video template rendering job
   */
  static async enqueueVideoRenderJob(contentData) {
    this.workers.video.status = 'rendering';
    this.workers.video.activeJobs += 1;
    console.log(`[QueueManager] Delegating render for content #${contentData.contentId} to Video Worker`);

    try {
      const result = await processVideoJob(contentData);
      return result;
    } finally {
      this.workers.video.activeJobs = Math.max(0, this.workers.video.activeJobs - 1);
      this.workers.video.status = this.workers.video.activeJobs > 0 ? 'rendering' : 'idle';
    }
  }

  /**
   * Enqueue and process a scheduled publishing job
   */
  static async enqueuePublishJob(jobData) {
    this.workers.publishing.status = 'dispatching';
    this.workers.publishing.activeJobs += 1;
    console.log(`[QueueManager] Delegating publish for #${jobData.id} (${jobData.platform}) to Publishing Worker`);

    try {
      const result = await processPublishJob(jobData);
      return result;
    } finally {
      this.workers.publishing.activeJobs = Math.max(0, this.workers.publishing.activeJobs - 1);
      this.workers.publishing.status = 'active';
    }
  }

  /**
   * Get real-time health and throughput of all background workers
   */
  static getWorkerStatus() {
    return [
      {
        id: 'worker_content',
        name: 'AI Content Studio Worker',
        file: 'backend/src/jobs/content.worker.js',
        status: this.workers.content.status,
        activeJobs: this.workers.content.activeJobs,
        type: 'LLM & Compliance Audit'
      },
      {
        id: 'worker_video',
        name: 'Video Production Worker',
        file: 'backend/src/jobs/video.worker.js',
        status: this.workers.video.status,
        activeJobs: this.workers.video.activeJobs,
        type: '9:16 FFmpeg Template Engine'
      },
      {
        id: 'worker_publishing',
        name: 'Social Publishing Worker',
        file: 'backend/src/jobs/publishing.worker.js',
        status: this.workers.publishing.status,
        activeJobs: this.workers.publishing.activeJobs,
        type: 'Multi-Platform API Dispatcher'
      }
    ];
  }
}
