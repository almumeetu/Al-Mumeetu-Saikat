export type BlogReference = {
  label: string;
  url: string;
};

export function getTodayBlogDateInput() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function toBlogDateInput(value: Date | string | undefined) {
  if (!value) return getTodayBlogDateInput();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? getTodayBlogDateInput() : date.toISOString().slice(0, 10);
}

export function parseBlogPublishDate(value: unknown) {
  if (typeof value !== 'string' || !value.trim()) return null;

  const normalized = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    const date = new Date(`${normalized}T00:00:00.000Z`);
    return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === normalized ? date : null;
  }

  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function normalizeBlogReferences(value: unknown): BlogReference[] | null {
  if (!Array.isArray(value) || value.length > 20) return null;

  const references: BlogReference[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const label = typeof item.label === 'string' ? item.label.trim() : '';
    const rawUrl = typeof item.url === 'string' ? item.url.trim() : '';
    if (!label && !rawUrl) continue;
    if (!rawUrl || label.length > 120) return null;

    try {
      const parsedUrl = new URL(rawUrl);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) return null;
      references.push({ label: label || parsedUrl.hostname, url: parsedUrl.toString() });
    } catch {
      return null;
    }
  }

  return references;
}
