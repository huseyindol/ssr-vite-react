export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  additionalTags?: string;
}

// This will be a map of routes to their metadata
const routeMetaMap = new Map<string, PageMeta>();

// Register metadata for a specific route
export function registerMetaForRoute(route: string, meta: PageMeta): void {
  routeMetaMap.set(route, meta);
}

// Get metadata for a specific route
export function getMetaForRoute(route: string): PageMeta | undefined {
  // First try direct match
  if (routeMetaMap.has(route)) {
    return routeMetaMap.get(route);
  }

  // Then try to match by path parts
  for (const [registeredRoute, meta] of routeMetaMap.entries()) {
    // Simple route matching, can be improved for more complex scenarios
    if (route.startsWith(registeredRoute) || registeredRoute === '/') {
      return meta;
    }
  }

  return undefined;
}

export function generateHeadContent(meta: PageMeta): string {
  const parts: string[] = [];

  if (meta.title) {
    parts.push(`<title>${meta.title}</title>`);
  }

  if (meta.description) {
    parts.push(`<meta name="description" content="${meta.description}" />`);
  }

  if (meta.keywords) {
    parts.push(`<meta name="keywords" content="${meta.keywords}" />`);
  }

  if (meta.ogImage) {
    parts.push(`<meta property="og:image" content="${meta.ogImage}" />`);
  }

  if (meta.canonicalUrl) {
    parts.push(`<link rel="canonical" href="${meta.canonicalUrl}" />`);
  }

  if (meta.additionalTags) {
    parts.push(meta.additionalTags);
  }

  return parts.join('\n');
} 