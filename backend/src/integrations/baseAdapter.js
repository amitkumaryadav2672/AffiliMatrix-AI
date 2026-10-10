export class BasePlatformAdapter {
  constructor(platformName, capabilities = {}) {
    this.platform = platformName;
    this.capabilities = {
      supportsShortVideo: false,
      supportsImages: true,
      supportsLongText: false,
      maxTextLength: 280,
      requiresCreatorApproval: false,
      requiresCommercialDisclosureParam: false,
      recommendedAspectRatio: '1:1',
      ...capabilities
    };
  }

  validateContent(content, account) {
    throw new Error(`validateContent() not implemented for ${this.platform}`);
  }

  formatPayload(content, account) {
    throw new Error(`formatPayload() not implemented for ${this.platform}`);
  }

  async publish(payload, account, isSimulation = true) {
    throw new Error(`publish() not implemented for ${this.platform}`);
  }

  checkRateLimits(account) {
    if (account.postsToday >= account.dailyPostLimit) {
      return {
        allowed: false,
        reason: `Daily quota of ${account.dailyPostLimit} posts reached for ${this.platform}.`
      };
    }
    return { allowed: true };
  }
}
