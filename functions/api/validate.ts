import * as jose from 'jose';
import type { Env } from '../index';

export const onRequest: PagesFunction<Env> = async (context) => {
  const jwt = context.params.jwt as string;
  let jwtHeader: jose.ProtectedHeaderParameters | undefined;
  try {
    jwtHeader = jose.decodeProtectedHeader(jwt);
  } catch (err) {
    // TODO: Response with error
  }

  // TODO:[Racheal] Get key by ID from storage
  // const jwk = jwtHeader.kid

  const headers = new Headers();
  headers.append('content-type', 'application/json')

  return new Response(JSON.stringify(jwtHeader), {
    status: 200,
    headers,
  });
}