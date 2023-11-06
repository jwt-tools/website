import * as jose from 'jose';

export const onRequest: PagesFunction<Env> = async (context) => {
  const keysEndpoint = context.params.endpoint as string;
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