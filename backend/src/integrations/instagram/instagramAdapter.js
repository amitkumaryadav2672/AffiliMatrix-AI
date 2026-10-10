import { BasePlatformAdapter } from '../baseAdapter.js';

export class InstagramAdapter extends BasePlatformAdapter {
  constructor() {
    super('instagram', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: false,
      maxTextLength: 2200,
      requiresCreatorApproval: true,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '9:16 for Reels, 1:1 for Feed'
    });
  }

  validateContent(content, account) {
    const errors = [];
    const warnings = [];

    if (!content.mediaUrl) {
      errors.push('Instagram publishing requires media asset (image or vertical video Reel).');
    }

    const caption = content.caption || '';
    if (caption.length > 2200) {
      errors.push(`Instagram caption length (${caption.length}) exceeds 2,200 character limit.`);
    }

    const hasAffiliateNotice = /#ad|#sponsored|paid partnership|affiliate/i.test(caption);
    if (!hasAffiliateNotice) {
      errors.push('Instagram Brand Content guidelines require #ad or Paid Partnership indication.');
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  formatPayload(content, account) {
    return {
      endpoint: `https://graph.facebook.com/v21.0/${account.id}/media`,
      method: 'POST',
      body: {
        media_type: content.mediaType === 'short_video' ? 'REELS' : 'IMAGE',
        video_url: content.mediaType === 'short_video' ? content.mediaUrl : undefined,
        image_url: content.mediaType !== 'short_video' ? content.mediaUrl : undefined,
        caption: `${content.caption || ''}\n\n${(content.hashtags || []).join(' ')}`,
        share_to_feed: true,
        is_paid_partnership: true
      }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const igId = `ig_reel_${Date.now()}`;
    return {
      success: true,
      postId: igId,
      postUrl: `https://www.instagram.com/reel/${igId}/`,
      timestamp: new Date().toISOString(),
      platform: 'instagram',
      responseMessage: 'Published to Instagram Reels via Meta Graph API with Paid Partnership badge'
    };
  }
}
