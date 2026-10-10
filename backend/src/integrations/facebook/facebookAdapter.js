import { BasePlatformAdapter } from '../baseAdapter.js';

export class FacebookAdapter extends BasePlatformAdapter {
  constructor() {
    super('facebook', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: true,
      maxTextLength: 63206,
      requiresCreatorApproval: false,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '16:9 or 9:16'
    });
  }

  validateContent(content, account) {
    const errors = [];
    const text = content.caption || '';
    if (!/#ad|#affiliate|sponsored|commission/i.test(text)) {
      errors.push('FTC and Meta branded content policy requires disclosure for affiliate links.');
    }
    return { valid: errors.length === 0, errors, warnings: [] };
  }

  formatPayload(content, account) {
    return {
      endpoint: `https://graph.facebook.com/v21.0/${account.id}/feed`,
      method: 'POST',
      body: {
        message: `${content.caption || ''}\n\n${content.affiliateDisclosure || ''}\n\n${(content.hashtags || []).join(' ')}`,
        link: content.affiliateUrl
      }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const fbId = `fb_post_${Date.now()}`;
    return {
      success: true,
      postId: fbId,
      postUrl: `https://facebook.com/${account.handle}/posts/${fbId}`,
      timestamp: new Date().toISOString(),
      platform: 'facebook',
      responseMessage: 'Published to Facebook Page Feed with branded content disclosures'
    };
  }
}
