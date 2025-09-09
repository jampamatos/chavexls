/** UTM/local tracking keys persisted in localStorage */
export const UTM_STORAGE_KEY = 'chavexls_utm';
export const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
  'ts', // timestamp of capture
] as const;

export type UTMKey = typeof UTM_KEYS[number];

/** Capture UTM params from the current querystring and persist them. */
export function captureUtms(search: string): void {
  const params = new URLSearchParams(search || '');
  const utm: Partial<Record<UTMKey, string>> = {};
  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  if (Object.keys(utm).length > 0) {
    utm.ts = String(Date.now());
    try {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    } catch {
      // ignore storage failures (private mode, quota, etc.)
    }
  }
}

/** Safely read UTMs from localStorage (best-effort) */
export function readStoredUtms(): Partial<Record<UTMKey, string>> {
  try {
    const raw = localStorage.getItem(UTM_STORAGE_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw) as Record<string, string>;
    const picked: Partial<Record<UTMKey, string>> = {};
    for (const k of UTM_KEYS) {
      if (obj[k]) picked[k] = String(obj[k]);
    }
    return picked;
  } catch {
    return {};
  }
}

