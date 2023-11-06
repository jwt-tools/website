import type { JSONWebKeySet } from 'jose';
import type { Env } from '../index';

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  const keysEndpoint = new URL(request.url).searchParams.get('endpoint');

  if (!keysEndpoint) {
    const headers = new Headers();
    headers.append('content-type', 'application/json')

    return new Response(JSON.stringify({
      message: 'jwks endpoint not provided',
    }), {
      status: 400,
      headers,
    });
  }

  const keysResponse = await fetch(keysEndpoint);
  const keys = await keysResponse.json<JSONWebKeySet>();

  // TODO:[Racheal] Save keys response to indexdb
  
  const headers = new Headers();
  headers.append('content-type', 'application/json')

  return new Response(JSON.stringify(keys), {
    status: 200,
    headers,
  });
}