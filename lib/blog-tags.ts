export function normalizeBlogTags(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const tags = value.flatMap((item) => {
    if (typeof item !== 'string') return [];
    const raw = item.trim();
    if (!raw) return [];

    const hashtags = Array.from(raw.matchAll(/#([\p{L}\p{M}\p{N}_-]+)/gu), (match) => match[1]);
    if (hashtags.length) return hashtags;

    return raw.split(',').map((tag) => tag.trim().replace(/^#/, '')).filter(Boolean);
  });

  const seen = new Set<string>();
  return tags
    .map((tag) => tag.trim().slice(0, 50))
    .filter((tag) => {
      const key = tag.toLocaleLowerCase();
      if (!tag || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}
