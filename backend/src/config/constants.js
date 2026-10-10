export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free Starter',
    price: 0,
    monthlyAiCredits: 50,
    dailyPublishLimit: 2,
    maxCampaigns: 1,
    platformsAllowed: ['x', 'youtube']
  },
  STARTER: {
    id: 'starter',
    name: 'Starter Creator',
    price: 799,
    monthlyAiCredits: 500,
    dailyPublishLimit: 10,
    maxCampaigns: 5,
    platformsAllowed: ['x', 'youtube', 'tiktok', 'instagram']
  },
  PRO: {
    id: 'pro',
    name: 'Pro Marketer',
    price: 2499,
    monthlyAiCredits: 2000,
    dailyPublishLimit: 30,
    maxCampaigns: 20,
    platformsAllowed: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']
  },
  AGENCY: {
    id: 'agency',
    name: 'Agency & Multi-Workspace',
    price: 5999,
    monthlyAiCredits: 10000,
    dailyPublishLimit: 100,
    maxCampaigns: 100,
    platformsAllowed: ['x', 'youtube', 'tiktok', 'instagram', 'facebook', 'linkedin', 'pinterest']
  }
};

export const WORKFLOW_STATES = {
  DRAFT: 'draft',
  VALIDATED: 'validated',
  AWAITING_APPROVAL: 'awaiting_approval',
  APPROVED: 'approved',
  SCHEDULED: 'scheduled',
  PUBLISHING: 'publishing',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
  FAILED: 'failed',
  PAUSED: 'paused'
};

export const FTC_DISCLOSURE_TEXT = 
  "Affiliate disclosure: I may earn a commission if you purchase through links in this post, at no additional cost to you.";
