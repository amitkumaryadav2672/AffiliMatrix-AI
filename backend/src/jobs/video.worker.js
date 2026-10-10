/**
 * Video Production Worker
 * Renders template-based 9:16 vertical video assets with subtitles and FTC disclaimers.
 */

import { VideoService } from '../services/video/videoService.js';
import { dbStore } from '../data/store.js';

export async function processVideoJob(job) {
  console.log(`🎬 [Video Worker] Rendering vertical video template for content #${job.contentId || 'temp'}`);

  const rendered = await VideoService.renderVideoTemplate({
    script: job.script || {
      hook: "Stop doing this manually.",
      body: "Here is how to automate your entire workflow in 10 minutes.",
      cta: "Check the link in bio for the exclusive discount."
    },
    product: job.product,
    template: job.template || 'high-energy-split'
  });

  dbStore.addAuditLog(
    'Background Video Worker',
    'VIDEO_RENDERED',
    `Worker rendered 9:16 video template "${rendered.template}" with automated subtitles`
  );

  return {
    success: true,
    jobId: job.id,
    videoAsset: rendered,
    processedAt: new Date().toISOString()
  };
}
