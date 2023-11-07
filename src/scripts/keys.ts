import type { JSONWebKeySet, JWK } from 'jose';
import api from './api';
// import * as storage from '../storage/db';

export async function loadKeys(endpoint: string): Promise<JSONWebKeySet> {
  const keysResponse = await api.get(`/api/keys?endpoint=${encodeURIComponent(endpoint)}`);
  const keys = await keysResponse.json<JSONWebKeySet>();

  // TODO:[Racheal] Save keys response to indexdb
  
  console.log('loaded keys', keys);

  // TODO: removeme when indexdb storage is ready
  const existingKeys = JSON.parse(localStorage.getItem('keys') || '[]') as JWK[];
  const newKeys = existingKeys.concat(keys.keys);

  localStorage.setItem('keys', JSON.stringify(newKeys));

  return keys;
}
