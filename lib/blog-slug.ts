export const MAX_BLOG_SLUG_LENGTH = 120;

export function appendBlogSlugSuffix(slug: string, suffix: number) {
  const ending = `-${suffix}`;
  const prefix = slug.slice(0, MAX_BLOG_SLUG_LENGTH - ending.length)
    .replace(/[\uD800-\uDBFF]$/u, '')
    .replace(/-+$/g, '');
  return `${prefix}${ending}`;
}

export function createBlogSlug(title: string) {
  return title
    .normalize('NFKC')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

export function blogSlugMatchesTitle(title: string, slug: string) {
  const base = createBlogSlug(title);
  if (!base) return false;
  if (slug === base) return true;
  const collisionSuffix = slug.slice(base.length + 1);
  return slug.startsWith(`${base}-`) && /^\d+$/.test(collisionSuffix);
}
