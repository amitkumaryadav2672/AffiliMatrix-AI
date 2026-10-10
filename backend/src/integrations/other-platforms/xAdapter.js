import { BasePlatformAdapter } from '../baseAdapter.js';

export class XAdapter extends BasePlatformAdapter {
  constructor() {
    super('x', {
      supportsShortVideo: true,
      supportsImages: true,
      supportsLongText: true,
      maxTextLength: 280,
      requiresCreatorApproval: false,
      requiresCommercialDisclosureParam: true,
      recommendedAspectRatio: '16:9 or 1:1'
    });
  }

  validateContent(content, account) {
    const errors = [];
    const fullText = `${content.caption || ''} ${content.hashtags ? content.hashtags.join(' ') : ''}`.trim();

    if (!/#ad|#affiliate|#sponsored|commission/i.test(fullText)) {
      errors.push('X compliance failure: Post must include clear disclosure (#ad or #affiliate).');
    }

    return { valid: errors.length === 0, errors, warnings: [] };
  }

  formatPayload(content, account) {
    let text = `${content.caption || ''}\n\n${(content.hashtags || []).join(' ')}`.trim();
    if (!/#ad|#affiliate/i.test(text)) text += ' #ad';

    return {
      endpoint: 'https://api.twitter.com/2/tweets',
      method: 'POST',
      body: { text: text.slice(0, 280) }
    };
  }

  async publish(payload, account, isSimulation = true) {
    const rateCheck = this.checkRateLimits(account);
    if (!rateCheck.allowed) throw new Error(rateCheck.reason);

    const tweetId = `tweet_${Date.now()}`;
    return {
      success: true,
      postId: tweetId,
      postUrl: `https://x.com/${account.handle.replace('@', '')}/status/${tweetId}`,
      timestamp: new Date().toISOString(),
      platform: 'x',
      responseMessage: 'Tweet broadcasted to X Feed with #ad disclosure'
    };
  }
}
