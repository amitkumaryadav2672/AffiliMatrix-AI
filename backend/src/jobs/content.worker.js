/**
 * Content Generation Worker
 * Handles background AI script synthesis, hook generation, and FTC compliance auditing.
 */

import { AiContentService } from '../services/ai/aiContentService.js';
import { ComplianceService } from '../services/content/complianceService.js';
import { dbStore } from '../data/store.js';

export async function processContentJob(job) {
  console.log(`🤖 [Content Worker] Processing AI generation for product: ${job.product?.name || job.productId}`);

  const product = job.product || dbStore.products.find(p => p.id === job.productId) || dbStore.products[0];
  const generatedPackage = await AiContentService.generatePackage({
    product,
    angle: job.angle || 'problem-solution',
    tone: job.tone || 'authentic-creator'
  });

  const compliance = ComplianceService.verify(generatedPackage, product);

  dbStore.addAuditLog(
    'Background Content Worker',
    'AI_JOB_COMPLETED',
    `Worker generated content package for "${product.name}" with score ${compliance.score}/100`
  );

  return {
    success: true,
    jobId: job.id,
    data: {
      ...generatedPackage,
      complianceScore: compliance.score,
      complianceNotes: compliance.issues.join(' | ') || 'Passed FTC verification'
    },
    processedAt: new Date().toISOString()
  };
}
