import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dbStore } from '../data/store.js';
import { AiContentService } from '../services/ai/aiContentService.js';
import { ComplianceService } from '../services/content/complianceService.js';
import { VideoService } from '../services/video/videoService.js';
import { schedulerService } from '../services/publishing/schedulerService.js';
import { emailService } from '../services/email/emailService.js';
import { listAvailablePlatforms, validateForPlatform } from '../integrations/index.js';
import { QueueManager } from '../jobs/queueManager.js';

const router = express.Router();

// ==========================================
// 1. PRODUCTS & OFFERS
// ==========================================
router.get('/products', (req, res) => {
  res.json({ success: true, count: dbStore.products.length, data: dbStore.products });
});

router.post('/products', (req, res) => {
  const { name, network, affiliateUrl, commissionRate, price, category, targetAudience, approvedClaims, forbiddenClaims } = req.body;
  if (!name || !affiliateUrl) {
    return res.status(400).json({ success: false, message: 'Name and Affiliate URL are required.' });
  }

  const newProduct = {
    id: `prod_${uuidv4().slice(0, 8)}`,
    name,
    network: network || 'Custom Affiliate',
    affiliateUrl,
    commissionRate: commissionRate || '25% Recurring',
    price: price || '$29',
    epc: '$1.75',
    category: category || 'Productivity & AI',
    rating: 4.8,
    targetAudience: targetAudience || 'Digital professionals & content creators',
    approvedClaims: approvedClaims || [name + ' streamlines repetitive digital workflows.'],
    forbiddenClaims: forbiddenClaims || ['Guaranteed overnight fortune'],
    status: 'active'
  };

  dbStore.products.unshift(newProduct);
  dbStore.addAuditLog('Admin (Supervisor)', 'PRODUCT_ADDED', `Added affiliate product: ${name}`);
  res.status(201).json({ success: true, data: newProduct });
});

// ==========================================
// 2. CAMPAIGNS
// ==========================================
router.get('/campaigns', (req, res) => {
  res.json({ success: true, count: dbStore.campaigns.length, data: dbStore.campaigns });
});

router.post('/campaigns', (req, res) => {
  const { name, objective, productIds, targetAudience, platforms } = req.body;
  const newCampaign = {
    id: `camp_${uuidv4().slice(0, 8)}`,
    name: name || 'New Campaign',
    objective: objective || 'Drive affiliate conversions',
    productIds: productIds || [dbStore.products[0]?.id],
    targetAudience: targetAudience || 'Social media target audience',
    platforms: platforms || ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest'],
    status: 'Active',
    totalPosts: 0,
    totalClicks: 0,
    conversions: 0,
    revenue: 0.00
  };

  dbStore.campaigns.unshift(newCampaign);
  dbStore.addAuditLog('Admin (Supervisor)', 'CAMPAIGN_CREATED', `Created campaign: ${name}`);
  res.status(201).json({ success: true, data: newCampaign });
});

// ==========================================
// 3. AI CONTENT STUDIO & VIDEO PRODUCTION
// ==========================================
router.get('/content', (req, res) => {
  const { status } = req.query;
  let items = dbStore.contentItems;
  if (status) items = items.filter(i => i.approvalStatus === status);
  res.json({ success: true, count: items.length, data: items });
});

router.post('/content/generate', async (req, res) => {
  try {
    const { productId, campaignId, angle, tone } = req.body;
    const product = dbStore.products.find(p => p.id === productId) || dbStore.products[0];

    const generated = await AiContentService.generatePackage({ product, angle, tone });
    const contentItem = {
      id: `content_${uuidv4().slice(0, 8)}`,
      campaignId: campaignId || dbStore.campaigns[0]?.id || 'camp_01',
      productId: product.id,
      ...generated,
      createdAt: new Date().toISOString()
    };

    dbStore.contentItems.unshift(contentItem);
    dbStore.addAuditLog(
      'AI Content Studio',
      'CONTENT_GENERATED',
      `Synthesized multi-platform package for "${product.name}" with FTC score ${contentItem.complianceScore}/100.`
    );

    res.status(201).json({ success: true, data: contentItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/video/render', async (req, res) => {
  try {
    const { script, product, template, contentId } = req.body;
    const result = await QueueManager.enqueueVideoRenderJob({ script, product, template, contentId });
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Workers Health & Status
router.get('/workers', (req, res) => {
  res.json({ success: true, data: QueueManager.getWorkerStatus() });
});

router.put('/content/:id/status', (req, res) => {
  const { status, feedback } = req.body;
  const content = dbStore.contentItems.find(c => c.id === req.params.id);
  if (!content) return res.status(404).json({ success: false, message: 'Content not found' });

  content.approvalStatus = status;
  if (status === 'approved') {
    content.approvedBy = 'Admin (Human Supervisor)';
    content.approvedAt = new Date().toISOString();
    dbStore.addAuditLog('Admin (Supervisor)', 'CONTENT_APPROVED', `Supervisor approved "${content.title}" for publishing`);
  } else if (status === 'rejected') {
    content.rejectionReason = feedback || 'Revisions requested by human supervisor';
    dbStore.addAuditLog('Admin (Supervisor)', 'CONTENT_REJECTED', `Supervisor rejected "${content.title}"`);
  }

  res.json({ success: true, data: content });
});

// ==========================================
// 4. PUBLISHING & SCHEDULER QUEUE
// ==========================================
router.get('/publish/jobs', (req, res) => {
  res.json({ success: true, count: dbStore.publishJobs.length, data: dbStore.publishJobs });
});

router.post('/content/:id/schedule', (req, res) => {
  const content = dbStore.contentItems.find(c => c.id === req.params.id);
  if (!content) return res.status(404).json({ success: false, message: 'Content not found' });

  if (content.approvalStatus !== 'approved') {
    return res.status(400).json({ 
      success: false, 
      message: 'Human review required: Only approved content can be scheduled for publication.' 
    });
  }

  const { platforms } = req.body;
  const targetPlatforms = platforms || ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest'];
  const createdJobs = [];
  const baseTime = Date.now();

  targetPlatforms.forEach((platform, index) => {
    const job = {
      id: `job_${uuidv4().slice(0, 8)}`,
      contentId: content.id,
      platform,
      scheduledAt: new Date(baseTime + (index * 30 * 60000)).toISOString(),
      publishedAt: null,
      status: 'queued',
      attempts: 0,
      postId: null,
      postUrl: null,
      metrics: { impressions: 0, clicks: 0, conversions: 0 }
    };

    dbStore.publishJobs.unshift(job);
    createdJobs.push(job);
  });

  dbStore.addAuditLog(
    'Admin (Supervisor)',
    'JOBS_SCHEDULED',
    `Queued publishing for content #${content.id} across ${targetPlatforms.length} platforms.`
  );

  res.status(201).json({ success: true, count: createdJobs.length, data: createdJobs });
});

router.post('/publish/jobs/:id/run', async (req, res) => {
  try {
    const result = await schedulerService.executeJob(req.params.id);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/publish/kill-switch', (req, res) => {
  const { enable } = req.body;
  const status = schedulerService.toggleKillSwitch(Boolean(enable));
  res.json({ success: true, data: status });
});

// ==========================================
// 5. SOCIAL ACCOUNTS & ADAPTERS
// ==========================================
router.get('/social-accounts', (req, res) => {
  res.json({ success: true, data: dbStore.socialAccounts });
});

router.get('/adapters', (req, res) => {
  res.json({ success: true, data: listAvailablePlatforms() });
});

router.post('/adapters/:platform/validate', async (req, res) => {
  const account = dbStore.socialAccounts.find(a => a.platform === req.params.platform);
  const result = await validateForPlatform(req.params.platform, req.body, account || {});
  res.json({ success: true, data: result });
});

// ==========================================
// 6. EMAIL MARKETING (MODULE 7)
// ==========================================
router.get('/email/subscribers', (req, res) => {
  res.json({ success: true, data: emailService.getSubscribers() });
});

router.post('/email/subscribers', (req, res) => {
  const sub = emailService.addSubscriber(req.body);
  res.status(201).json({ success: true, data: sub });
});

router.get('/email/sequences', (req, res) => {
  res.json({ success: true, data: emailService.getSequences() });
});

// ==========================================
// 7. COMPLIANCE & SAFETY AUDIT
// ==========================================
router.post('/compliance/scan', (req, res) => {
  const { content, productId } = req.body;
  const product = productId ? dbStore.products.find(p => p.id === productId) : null;
  const result = ComplianceService.verify(content, product);
  res.json({ success: true, data: result });
});

// ==========================================
// 8. ANALYTICS & AUDIT LOGS
// ==========================================
router.get('/analytics', (req, res) => {
  const totalPosts = dbStore.publishJobs.filter(j => j.status === 'published').length;
  const queuedPosts = dbStore.publishJobs.filter(j => j.status === 'queued').length;
  const pendingApprovals = dbStore.contentItems.filter(c => c.approvalStatus === 'awaiting_approval' || c.approvalStatus === 'pending_approval').length;

  const totalClicks = 4910;
  const totalConversions = 260;
  const totalRevenue = 5610.50;
  const epc = (totalRevenue / totalClicks).toFixed(2);
  const convRate = ((totalConversions / totalClicks) * 100).toFixed(1) + '%';

  res.json({
    success: true,
    data: {
      overview: {
        totalRevenue: `$${totalRevenue.toLocaleString()}`,
        totalClicks,
        totalConversions,
        epc: `$${epc}`,
        conversionRate: convRate,
        publishedCount: totalPosts,
        queuedCount: queuedPosts,
        pendingApprovals,
        emergencyKillSwitch: dbStore.settings.emergencyKillSwitch,
        simulationMode: dbStore.settings.simulationMode
      },
      platformPerformance: [
        { platform: 'YouTube Shorts', clicks: 1820, conv: 104, rev: 2280, color: '#ef4444' },
        { platform: 'TikTok', clicks: 1450, conv: 78, rev: 1650, color: '#00f2fe' },
        { platform: 'X (Twitter)', clicks: 840, conv: 42, rev: 890, color: '#38bdf8' },
        { platform: 'Instagram Reels', clicks: 520, conv: 24, rev: 510, color: '#ec4899' },
        { platform: 'LinkedIn', clicks: 180, conv: 8, rev: 180, color: '#0284c7' },
        { platform: 'Pinterest', clicks: 100, conv: 4, rev: 100.50, color: '#e11d48' }
      ],
      recentAuditLogs: dbStore.auditLogs.slice(0, 10)
    }
  });
});

router.get('/audit-logs', (req, res) => {
  res.json({ success: true, count: dbStore.auditLogs.length, data: dbStore.auditLogs });
});

export default router;
