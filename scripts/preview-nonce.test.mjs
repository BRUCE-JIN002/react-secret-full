import test from 'node:test';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { createPreviewNonce } from '../src/ai-playground/previewNonce.js';

test('preview and theme audit identifiers work without the secure-context UUID API', () => {
  const httpCrypto = { getRandomValues: webcrypto.getRandomValues.bind(webcrypto) };
  assert.equal(httpCrypto.randomUUID, undefined);
  const identifiers = Array.from({length: 100}, () => createPreviewNonce(httpCrypto));
  assert.equal(new Set(identifiers).size, identifiers.length);
  for (const identifier of identifiers) assert.match(identifier, /^[a-f0-9]{32}$/);
});
