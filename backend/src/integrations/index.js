import { XAdapter } from './other-platforms/xAdapter.js';
import { YouTubeAdapter } from './youtube/youtubeAdapter.js';
import { TikTokAdapter } from './tiktok/tiktokAdapter.js';
import { InstagramAdapter } from './instagram/instagramAdapter.js';
import { FacebookAdapter } from './facebook/facebookAdapter.js';
import { LinkedInAdapter } from './other-platforms/linkedinAdapter.js';
import { PinterestAdapter } from './other-platforms/pinterestAdapter.js';

const adapters = {
  x: new XAdapter(),
  youtube: new YouTubeAdapter(),
  tiktok: new TikTokAdapter(),
  instagram: new InstagramAdapter(),
  facebook: new FacebookAdapter(),
  linkedin: new LinkedInAdapter(),
  pinterest: new PinterestAdapter()
};

export function getAdapter(platform) {
  const adapter = adapters[platform.toLowerCase()];
  if (!adapter) {
    throw new Error(`Unsupported platform adapter: '${platform}'`);
  }
  return adapter;
}

export function listAvailablePlatforms() {
  return Object.keys(adapters).map(key => ({
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    capabilities: adapters[key].capabilities
  }));
}

export async function validateForPlatform(platform, content, account) {
  const adapter = getAdapter(platform);
  return adapter.validateContent(content, account);
}

export async function executePlatformPublish(platform, content, account, isSimulation = true) {
  const adapter = getAdapter(platform);
  const validation = adapter.validateContent(content, account);
  if (!validation.valid) {
    throw new Error(`Validation failed for ${platform}: ${validation.errors.join('; ')}`);
  }
  const payload = adapter.formatPayload(content, account);
  return await adapter.publish(payload, account, isSimulation);
}

export default adapters;
