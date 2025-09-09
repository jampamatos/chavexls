/** Encode an object for application/x-www-form-urlencoded */
export function encodeFormUrl(data: Record<string, string>): string {
  return Object.keys(data)
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&');
}

