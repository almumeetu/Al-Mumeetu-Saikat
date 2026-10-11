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
