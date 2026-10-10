import { BasePlatformAdapter } from '../baseAdapter.js';

export class PinterestAdapter extends BasePlatformAdapter {
  constructor() {
    super('pinterest', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: false,
      maxTextLength: 500,
      requiresCreatorApproval: false,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '2:3 or 9:16'
    });
  }

  validateContent(content, account) {
    const errors = [];
    if (!content.mediaUrl) errors.push('Pinterest requires an image or video pin asset.');
    if (!content.affiliateUrl) errors.push('Pinterest Pin requires a destination affiliate link.');
    return { valid: errors.length === 0, errors, warnings: [] };
  }

  formatPayload(content, account) {
    return {
      endpoint: 'https://api.pinterest.com/v5/pins',
      method: 'POST',
      body: {
        title: (content.title || 'Product Discovery').slice(0, 100),
        description: `${(content.caption || '').slice(0, 420)}\n\n#affiliatelink #ad`,
        link: content.affiliateUrl,
        media_source: { source_type: 'image_url', url: content.mediaUrl }
      }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const pinId = `pin_${Date.now()}`;
    return {
      success: true,
      postId: pinId,
      postUrl: `https://www.pinterest.com/pin/${pinId}/`,
      timestamp: new Date().toISOString(),
      platform: 'pinterest',
      responseMessage: 'Rich Pin published to Pinterest board with affiliate link redirect'
    };
  }
}
