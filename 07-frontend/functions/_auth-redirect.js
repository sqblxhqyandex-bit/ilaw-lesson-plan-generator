const ALLOWED_ATTRIBUTION_PARAMS = new Set([
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
]);

export function sanitizeRedirect(value) {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//')) return '/';

  try {
    const parsed = new URL(value, 'https://ilawlessonplan.net');
    if (parsed.origin !== 'https://ilawlessonplan.net') return '/';

    const clean = new URLSearchParams();
    for (const key of ALLOWED_ATTRIBUTION_PARAMS) {
      const raw = parsed.searchParams.get(key);
      if (raw) clean.set(key, raw.slice(0, 100));
    }
    const query = clean.toString();
    return `${parsed.pathname}${query ? `?${query}` : ''}`;
  } catch {
    return '/';
  }
}

export function redirectFromRequest(request) {
  const url = new URL(request.url);
  return sanitizeRedirect(url.searchParams.get('redirect') || '/');
}
