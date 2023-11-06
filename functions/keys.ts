import * as jose from 'jose';
import type { Env } from './index';

export const onRequest: PagesFunction<Env> = async (context) => {
  const keysEndpoint = context.params.endpoint as string;

  if (!keysEndpoint) {
    const headers = new Headers();
    headers.append('content/type', 'application/json')

    return new Response(JSON.stringify({
      message: 'jwks endpoint not provided',
    }), {
      status: 400,
      headers,
    });
  }

  const keysResponse = await fetch(keysEndpoint);
  const keys = await keysResponse.json<jose.JSONWebKeySet>();

  // TODO: Save keys response to indexdb
  
  const headers = new Headers();
  headers.append('content/type', 'application/json')

  return new Response(JSON.stringify(keys), {
    status: 200,
    headers,
  });
}