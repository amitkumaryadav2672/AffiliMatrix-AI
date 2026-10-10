import mongoose from 'mongoose';

// User Schema
export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, default: 'Creator Lead' },
  role: { type: String, default: 'admin' },
  plan: { type: String, default: 'pro' },
  creditsRemaining: { type: Number, default: 2000 },
  workspaceId: { type: String, default: 'ws_default' },
  createdAt: { type: Date, default: Date.now }
});

// SocialAccount Schema
export const SocialAccountSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  platform: { type: String, required: true },
  accountName: { type: String, required: true },
  handle: { type: String, required: true },
  avatar: { type: String },
  status: { type: String, default: 'connected' },
  dailyPostLimit: { type: Number, default: 10 },
  postsToday: { type: Number, default: 0 },
  encryptedTokens: { type: String },
  scopes: [{ type: String }],
  connectedAt: { type: Date, default: Date.now }
});

// AffiliateProduct Schema
export const AffiliateProductSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  name: { type: String, required: true },
  network: { type: String, required: true },
  affiliateUrl: { type: String, required: true },
  commissionRate: { type: String, default: '30%' },
  price: { type: String, default: '$29' },
  epc: { type: String, default: '$1.50' },
  category: { type: String, default: 'Productivity' },
  approvedClaims: [{ type: String }],
  forbiddenClaims: [{ type: String }],
  targetAudience: { type: String },
  status: { type: String, default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

// Campaign Schema
export const CampaignSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  name: { type: String, required: true },
  objective: { type: String, default: 'Affiliate Conversions' },
  productIds: [{ type: String }],
  targetAudience: { type: String },
  platforms: [{ type: String }],
  status: { type: String, default: 'Active' },
  totalClicks: { type: Number, default: 0 },
  conversions: { type: Number, default: 0 },
  revenue: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// ContentItem Schema
export const ContentItemSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  campaignId: { type: String },
  productId: { type: String },
  title: { type: String, required: true },
  script: {
    hook: String,
    visualDirectionHook: String,
    body: String,
    visualDirectionBody: String,
    cta: String,
    visualDirectionCta: String
  },
  caption: { type: String },
  platformCaptions: { type: mongoose.Schema.Types.Mixed },
  hashtags: [{ type: String }],
  mediaUrl: { type: String },
  thumbnail: { type: String },
  affiliateDisclosure: { type: String },
  complianceScore: { type: Number, default: 100 },
  complianceNotes: { type: String },
  approvalStatus: { type: String, default: 'awaiting_approval' },
  approvedBy: { type: String },
  approvedAt: { type: Date },
  rejectionReason: { type: String },
  createdAt: { type: Date, default: Date.now }
});

// PublishJob Schema
export const PublishJobSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  contentId: { type: String, required: true },
  platform: { type: String, required: true },
  scheduledAt: { type: Date, default: Date.now },
  publishedAt: { type: Date },
  status: { type: String, default: 'queued' },
  attempts: { type: Number, default: 0 },
  postId: { type: String },
  postUrl: { type: String },
  error: { type: String },
  metrics: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 }
  }
});

// EmailSubscriber Schema
export const EmailSubscriberSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  email: { type: String, required: true },
  name: { type: String },
  sourceCampaign: { type: String },
  consentRecord: { type: String, default: 'Explicit Double Opt-In verified per GDPR/CAN-SPAM' },
  status: { type: String, default: 'subscribed' }, // subscribed, unsubscribed
  tags: [{ type: String }],
  subscribedAt: { type: Date, default: Date.now }
});

// AuditLog Schema
export const AuditLogSchema = new mongoose.Schema({
  workspaceId: { type: String, default: 'ws_default' },
  actor: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: String },
  status: { type: String, default: 'SUCCESS' },
  timestamp: { type: Date, default: Date.now }
});

// Models
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const SocialAccount = mongoose.models.SocialAccount || mongoose.model('SocialAccount', SocialAccountSchema);
export const AffiliateProduct = mongoose.models.AffiliateProduct || mongoose.model('AffiliateProduct', AffiliateProductSchema);
export const Campaign = mongoose.models.Campaign || mongoose.model('Campaign', CampaignSchema);
export const ContentItem = mongoose.models.ContentItem || mongoose.model('ContentItem', ContentItemSchema);
export const PublishJob = mongoose.models.PublishJob || mongoose.model('PublishJob', PublishJobSchema);
export const EmailSubscriber = mongoose.models.EmailSubscriber || mongoose.model('EmailSubscriber', EmailSubscriberSchema);
export const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
