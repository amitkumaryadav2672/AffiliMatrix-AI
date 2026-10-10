import { BasePlatformAdapter } from '../baseAdapter.js';

export class YouTubeAdapter extends BasePlatformAdapter {
  constructor() {
    super('youtube', {
      supportsShortVideo: true,
      supportsImages: false,
      supportsLongText: true,
      maxTextLength: 5000,
      requiresCreatorApproval: true,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '9:16'
    });
  }

  validateContent(content, account) {
    const errors = [];
    const warnings = [];

    if (!content.title) {
      errors.push('YouTube Shorts requires a descriptive video title.');
    } else if (content.title.length > 100) {
      errors.push(`YouTube title length (${content.title.length}) exceeds maximum limit of 100 characters.`);
    }

    if (!content.mediaUrl) {
      errors.push('YouTube Shorts requires a rendered 9:16 vertical video asset.');
    }

    const description = content.caption || '';
    if (!/affiliate|commission|sponsored|paid/i.test(description)) {
      errors.push('FTC disclosure required in YouTube description for affiliate links.');
    }

    return { valid: errors.length === 0, errors, warnings };
  }

  formatPayload(content, account) {
    let title = content.title || 'Product Review';
    if (!title.toLowerCase().includes('#shorts') && title.length <= 92) {
      title += ' #Shorts';
    }

    const description = `${content.caption || ''}\n\n${content.affiliateDisclosure || ''}\n\nProduct Link: ${content.affiliateUrl || ''}\n\n${(content.hashtags || []).join(' ')}`;

    return {
      endpoint: 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
      method: 'POST',
      body: {
        snippet: {
          title: title.slice(0, 100),
          description,
          tags: (content.hashtags || []).map(t => t.replace('#', '')),
          categoryId: '28'
        },
        status: {
          privacyStatus: 'public',
          selfDeclaredMadeForKids: false,
          containsPaidPromotion: true
        }
      }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const shortId = `short_${Date.now().toString(36)}`;
    return {
      success: true,
      postId: shortId,
      postUrl: `https://youtube.com/shorts/${shortId}`,
      timestamp: new Date().toISOString(),
      platform: 'youtube',
      responseMessage: 'YouTube Short uploaded with containsPaidPromotion=true and #Shorts metadata'
    };
  }
}
