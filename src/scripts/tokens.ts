import type { JWK, JWTVerifyResult, JWTPayload, JWTHeaderParameters } from 'jose';
import { decodeJwt, decodeProtectedHeader, importJWK, jwtVerify } from 'jose';

export async function validateToken(jwt: string, secret?: string): Promise<{
  verified: boolean;
  decoded: JWTVerifyResult<JWTPayload>;
  error?: string;
}> {
  // TODO:[Racheal] Get key by ID from storage
  // let jwtHeader: ProtectedHeaderParameters | undefined;
  // try {
  //   jwtHeader = decodeProtectedHeader(jwt);
  // } catch (err) {
  //   // throw error
  // }

  // const jwks = storage.getKeysByKid(jwtHeader.kid)
  const deocdedHeader = decodeProtectedHeader(jwt) as JWTHeaderParameters;
  const decodedPayload = decodeJwt(jwt);
  const decodedResponse: JWTVerifyResult = {
    protectedHeader: deocdedHeader,
    payload: decodedPayload,
  };

  // Verify the token with symmetric encryption
  if (secret) {
    try {
      jwtVerify(jwt, new TextEncoder().encode(secret));
      return {
        verified: true,
        decoded: decodedResponse,
      };
    } catch (err) {
      return {
        verified: false,
        decoded: decodedResponse,
        error: (err as Error).message,
      };
    }
  }

  const jwks = (JSON.parse(localStorage.getItem('keys') || '[]') as JWK[]);
  if (jwks.length === 0) {
    return {
      verified: false,
      decoded: decodedResponse,
    };
  }

  const settled = await Promise.allSettled(jwks.map((key) => {
    return importJwkAndVerify(jwt, key);
  }));

  const rejected = settled.filter((result) => result.status === 'rejected');
  const fulfilled = settled.filter((result) => result.status === 'fulfilled');

  if (fulfilled.length === 0) {
    return {
      verified: false,
      decoded: decodedResponse,
      error: (rejected[0] as PromiseRejectedResult).reason,
    };
  }

  const result = (fulfilled[0] as PromiseFulfilledResult<JWTVerifyResult<JWTPayload>>).value;
  console.log('Validated token', result);
  return {
    verified: true,
    decoded: decodedResponse,
  };
}

async function importJwkAndVerify(jwt: string, key: JWK): Promise<JWTVerifyResult<JWTPayload>> {
  const keyLike = await importJWK(key);
  return jwtVerify(jwt, keyLike);
}