import type { JWK, JWTVerifyResult, JWTPayload } from 'jose';
import { importJWK, jwtVerify } from 'jose';

export async function validateToken(jwt: string): Promise<JWTVerifyResult<JWTPayload>> {
  // TODO:[Racheal] Get key by ID from storage
  // let jwtHeader: ProtectedHeaderParameters | undefined;
  // try {
  //   jwtHeader = decodeProtectedHeader(jwt);
  // } catch (err) {
  //   // throw error
  // }

  // const jwks = storage.getKeysByKid(jwtHeader.kid)

  const jwks = (JSON.parse(localStorage.getItem('keys') || '[]') as JWK[]);
  if (jwks.length === 0) {
    throw new Error('No matching JWKs found');
  }

  const settled = await Promise.allSettled(jwks.map((key) => {
    return importJwkAndVerify(jwt, key);
  }));

  const rejected = settled.filter((result) => result.status === 'rejected');
  const fulfilled = settled.filter((result) => result.status === 'fulfilled');

  if (fulfilled.length === 0) {
    throw new Error((rejected[0] as PromiseRejectedResult).reason);
  }

  const result = (fulfilled[0] as PromiseFulfilledResult<JWTVerifyResult<JWTPayload>>).value;
  console.log('Validated token', { result });
  return result;
}

async function importJwkAndVerify(jwt: string, key: JWK): Promise<JWTVerifyResult<JWTPayload>> {
  const keyLike = await importJWK(key);
  return jwtVerify(jwt, keyLike);
}