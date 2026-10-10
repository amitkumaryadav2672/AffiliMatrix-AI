export const logger = {
  info: (msg, meta = '') => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, meta),
  warn: (msg, meta = '') => console.warn(`[WARN] ${new Date().toISOString()} - ${msg}`, meta),
  error: (msg, meta = '') => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, meta)
};

export const encryptToken = (token) => {
  // Simple reversible base64 encryption placeholder for dev tokens
  return Buffer.from(token).toString('base64');
};

export const decryptToken = (encrypted) => {
  return Buffer.from(encrypted, 'base64').toString('ascii');
};
