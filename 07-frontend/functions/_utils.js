// Shared utilities for all API endpoints

/**
 * Decode a session cookie value.
 * Supports both new UTF-8 base64url format and legacy btoa/atob format.
 */
function decodeSessionCookie(rawValue) {
  if (!rawValue) return null;

  // New format: UTF-8 JSON encoded as base64url
  try {
    const padded = rawValue.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((rawValue.length + 3) % 4);
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (e) {
    // Fall through to legacy format
  }

  // Legacy format: btoa(JSON.stringify(...)). Keep so existing sessions still work.
  try {
    return JSON.parse(atob(rawValue));
  } catch (e) {
    return null;
  }
}

/**
 * Get the current logged-in user session from the request cookie.
 * Returns { email, name?, picture?, googleId? } or null.
 */
export function getSessionUser(request) {
  const cookie = request.headers.get('Cookie') || '';
  const sessionMatch = cookie.match(/(?:^|;\s*)session=([^;]+)/);
  if (!sessionMatch) return null;
  return decodeSessionCookie(sessionMatch[1]);
}
