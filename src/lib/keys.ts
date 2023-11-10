import type { JSONWebKeySet } from 'jose';
import api from './api';
import storage from '../storage/db';
import { isBefore, subMinutes } from 'date-fns';

const commonEndpoints: string[] = [
  'https://www.googleapis.com/oauth2/v3/certs',
  'https://www.facebook.com/.well-known/oauth/openid/jwks/',
  'https://appleid.apple.com/auth/keys',
];

export async function loadKeys(endpoint: string, saveEndpoint: boolean = true): Promise<JSONWebKeySet> {
  const keysResponse = await api.get(`/api/keys?endpoint=${encodeURIComponent(endpoint)}`);
  const keys = await keysResponse.json<JSONWebKeySet>();

  // Save keys response to indexdb
  console.log('loaded keys', keys);

  await Promise.all(keys.keys.map((key) => {
    return (async () => {
      if (key.kid) {
        const jwk = {kid: key.kid, key: JSON.stringify(key)};
        try {
          await storage.keys.addKey(jwk);
        } catch (err) {
          if ((err as any).error.name !== 'ConstraintError') {
            throw err;
          }
        }
      }
    })();
  }))

  if (saveEndpoint) {
    await storage.endpoints.putEndpoint({
      url: endpoint,
      last_fetched: new Date(),
    });
  }
  return keys;
}


export async function addCommonKeysEndpointsToStorage(): Promise<void> {
  try {
    const existingEndpoints = await storage.endpoints.getAllEndpoints();
    const endpointsToAdd = commonEndpoints.filter((ep) => {
      return existingEndpoints.find((e) => e.url === ep) === undefined;
    });
    await Promise.all(endpointsToAdd.map((ep) => {
      return (async () => {
        await storage.endpoints.addEndpoint({
          url: ep,
        });
      })();
    }))
  } catch (err) {
    console.error('Failed to add all common JWKs edpoints to storage', err);
  }
}

export async function loadAllKeys(): Promise<void> {
  try {
    const existingEndpoints = await storage.endpoints.getAllEndpoints();

    const endpointsToLoad = existingEndpoints.filter((ep) => {
      return !ep.last_fetched || isBefore(ep.last_fetched, subMinutes(new Date(), 30));
    })

    await Promise.all(endpointsToLoad.map((ep) => {
      return loadKeys(ep.url);
    }))
  } catch (err) {
    console.error('Failed to load all keys', err);
  }
}