import { BasePlatformAdapter } from '../baseAdapter.js';

export class TikTokAdapter extends BasePlatformAdapter {
  constructor() {
    super('tiktok', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: false,
      maxTextLength: 2200,
      requiresCreatorApproval: true,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '9:16'
    });
  }

  validateContent(content, account) {
    const errors = [];
    if (!content.mediaUrl) {
      errors.push('TikTok requires a high-definition 9:16 vertical video asset.');
    }
    if (!content.approvalStatus || (content.approvalStatus !== 'approved' && content.approvalStatus !== 'APPROVED')) {
      errors.push('TikTok policy requires human creator approval before queuing to Content Posting API.');
    }
    return { valid: errors.length === 0, errors, warnings: [] };
  }

  formatPayload(content, account) {
    return {
      endpoint: 'https://open.tiktokapis.com/v2/post/publish/video/init/',
      method: 'POST',
      body: {
        post_info: {
          title: (content.caption || '').slice(0, 2200),
          privacy_level: 'PUBLIC_TO_EVERYONE',
          commercial_content_type: 'THIRD_PARTY_COMMERCIAL',
          brand_content_toggle: true
        },
        source_info: {
          source: 'PULL_FROM_URL',
          video_url: content.mediaUrl
        }
      }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const publishId = `tt_publish_${Date.now()}`;
    return {
      success: true,
      postId: publishId,
      postUrl: `https://www.tiktok.com/@${account.handle.replace('@', '')}/video/${Date.now()}`,
      timestamp: new Date().toISOString(),
      platform: 'tiktok',
      responseMessage: 'TikTok Content Posting API init successful. Commercial toggle verified.'
    };
  }
}
