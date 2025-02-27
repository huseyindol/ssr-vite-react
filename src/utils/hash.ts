import crypto from 'crypto';

/**
 * Generates a content hash based on input string
 */
export function generateContentHash(content: string): string {
  return crypto.createHash('md5').update(content).digest('hex');
}

/**
 * Generates a timestamp-based hash with optional prefix
 */
export function generateTimestampHash(prefix: string = ''): string {
  return `${prefix}${Date.now().toString(36)}`;
}

/**
 * Generates a 10-character short build hash
 * This is ideal for cache busting or short build identifiers
 */
export function generateShortBuildHash(): string {
  // Use combination of timestamp and random values for uniqueness
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');

  // Create a 10-character base36 hash using both values
  return Buffer.from(timestamp + random).toString('base64').replace(/[+/=]/g, '').substring(0, 10);
}

/**
 * Appends build hash to a URL for cache busting
 */
export function appendHashToUrl(url: string, hash: string): string {
  // Skip if URL already has a hash parameter
  if (url.includes('?v=') || url.includes('&v=')) {
    return url;
  }

  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}v=${hash}`;
}

/**
 * Generates a random UUID for use as a hash
 */
export function generateUUID(): string {
  return crypto.randomUUID ? crypto.randomUUID() :
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

/**
 * Build information for the current build
 */
export const buildInfo = {
  timestamp: new Date().toISOString(),
  version: process.env.npm_package_version || '1.0.0',
  buildId: generateShortBuildHash(),
  environment: process.env.NODE_ENV || 'development',
};

/**
 * Generates build hash information HTML comment
 */
export function generateBuildInfoHtml(): string {
  return `<!-- Build: ${buildInfo.buildId} | ${buildInfo.timestamp} | ${buildInfo.version} -->`;
} 