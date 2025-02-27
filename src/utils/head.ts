export interface PageMeta {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  additionalTags?: string;
}

export interface PageWithMeta {
  pageMeta?: PageMeta;
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