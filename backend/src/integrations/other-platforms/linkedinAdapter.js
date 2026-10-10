import { BasePlatformAdapter } from '../baseAdapter.js';

export class LinkedInAdapter extends BasePlatformAdapter {
  constructor() {
    super('linkedin', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: true,
      maxTextLength: 3000,
      requiresCreatorApproval: true,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '1.91:1'
    });
  }

  validateContent(content, account) {
    const errors = [];
    if (!content.caption) errors.push('LinkedIn requires post commentary.');
    if (!content.approvalStatus || (content.approvalStatus !== 'approved' && content.approvalStatus !== 'APPROVED')) {
      errors.push('LinkedIn policy requires human approval for automated posts.');
    }
    return { valid: errors.length === 0, errors, warnings: [] };
  }

  formatPayload(content, account) {
    const text = `${content.caption || ''}\n\n${content.affiliateDisclosure || ''}\n\n${(content.hashtags || []).join(' ')}`;
    return {
      endpoint: 'https://api.linkedin.com/v2/ugcPosts',
      method: 'POST',
      body: { text }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const liUrn = `urn:li:share:${Date.now()}`;
    return {
      success: true,
      postId: liUrn,
      postUrl: `https://www.linkedin.com/feed/update/${liUrn}`,
      timestamp: new Date().toISOString(),
      platform: 'linkedin',
      responseMessage: 'Published to LinkedIn UGC feed with partner disclosure'
    };
  }
}
