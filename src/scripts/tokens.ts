import type { JSONWebKeySet } from 'jose';
import api from './api';
// import * as storage from '../storage/db';

export async function loadKeys(endpoint: string): Promise<JSONWebKeySet> {
  const keysResponse = await api.get(`/api/keys?endpoint=${encodeURIComponent(endpoint)}`);
  const keys = await keysResponse.json<JSONWebKeySet>();

  // TODO:[Racheal] Save keys response to indexdb
  
  console.log('loaded keys', keys);

  return keys;
}