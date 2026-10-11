function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Convert simple text-and-arrow LaTeX chains from older posts into readable steps. */
export function renderBlogContent(content: string) {
  return content.replace(
    /\$\$\s*((?:\\text\{[^{}]*\}\s*\\longrightarrow\s*)+\\text\{[^{}]*\})\s*\$\$/g,
    (equation) => {
      const labels = Array.from(equation.matchAll(/\\text\{([^{}]*)\}/g), (match) => match[1].trim());
      if (labels.length < 2 || labels.some((label) => !label)) return equation;

      const steps = labels.map((label, index) => {
        const arrow = index < labels.length - 1
          ? '<span class="blog-journey__arrow" aria-hidden="true">→</span>'
          : '';
        return `<span class="blog-journey__step" role="listitem">${escapeHtml(label)}${arrow}</span>`;
      }).join('');

      return `<span class="blog-journey" role="list" aria-label="Career journey">${steps}</span>`;
    },
  );
}
