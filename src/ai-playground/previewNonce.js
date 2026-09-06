// getRandomValues also works on HTTP previews, unlike randomUUID.
export function createPreviewNonce(cryptoApi = globalThis.crypto) {
  const bytes = cryptoApi.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}
