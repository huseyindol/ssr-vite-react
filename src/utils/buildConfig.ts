/**
 * Provides access to build configuration values
 * These values are available both in server and client
 */

// Get build hash from meta tag in client mode
function getBuildHash(): string {
  if (typeof window !== 'undefined') {
    // We're in the browser
    const buildIdMeta = document.querySelector('meta[name="build-id"]');
    if (buildIdMeta && buildIdMeta.getAttribute('content')) {
      return buildIdMeta.getAttribute('content') || '';
    }

    const buildVersionMeta = document.querySelector('meta[name="build-version"]');
    if (buildVersionMeta && buildVersionMeta.getAttribute('content')) {
      return buildVersionMeta.getAttribute('content') || '';
    }

    return '';
  }

  // In SSR context, we'll import our hash utility
  try {
    const { buildInfo } = require('./hash');
    return buildInfo.buildId;
  } catch (error) {
    return '';
  }
}

// Generate asset URL with cache busting hash
export function getAssetUrl(path: string): string {
  const buildHash = getBuildHash();

  if (!buildHash) {
    return path;
  }

  const separator = path.includes('?') ? '&' : '?';
  return `${path}${separator}v=${buildHash}`;
}

// Get current build information
export const buildConfig = {
  hash: getBuildHash(),
  timestamp: new Date().toISOString(),
  isDevelopment: process.env.NODE_ENV !== 'production',
  version: process.env.npm_package_version || '1.0.0',
};

export default buildConfig; 