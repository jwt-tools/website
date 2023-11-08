import type { JWK, JWTVerifyResult, JWTPayload, JWTHeaderParameters } from 'jose';
import { decodeJwt, decodeProtectedHeader, errors, importJWK, jwtVerify } from 'jose';
import * as ed from '@noble/ed25519';
import { Buffer } from 'buffer';
import { polyfillEd25519 } from "@yoursunny/webcrypto-ed25519";

polyfillEd25519();

export async function validateToken(jwt: string, secret?: string): Promise<{
  verified: boolean;
  decoded: JWTVerifyResult<JWTPayload>;
  expired: boolean;
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

  let expired = false;
  if (decodedResponse.payload.exp) {
    expired = new Date() >new Date(decodedResponse.payload.exp * 1000);
  }

  // Verify the token with symmetric encryption
  if (secret) {
    try {
      jwtVerify(jwt, new TextEncoder().encode(secret));
      return {
        verified: true,
        decoded: decodedResponse,
        expired,
      };
    } catch (err) {
      if (err instanceof errors.JWTExpired) {
        return {
          verified: true,
          decoded: decodedResponse,
          expired,
        };
      }

      return {
        verified: false,
        decoded: decodedResponse,
        expired,
        error: (err as Error).message,
      };
    }
  }

  const jwks = (JSON.parse(localStorage.getItem('keys') || '[]') as JWK[]);
  if (jwks.length === 0) {
    return {
      verified: false,
      decoded: decodedResponse,
      expired,
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
      expired,
      error: (rejected[0] as PromiseRejectedResult).reason,
    };
  }

  return {
    verified: true,
    decoded: decodedResponse,
    expired,
  };
}

async function importJwkAndVerify(jwt: string, key: JWK): Promise<any | null> {
  const keyLike = await importJWK(key);

  if (key.alg?.toLowerCase() === 'eddsa') {
    const { 0: header, 1: payload, 2: sig } = jwt.split('.');
    // const message = Buffer.from(payload, 'base64').toString('utf-8');
    const message = Buffer.from(`${header}.${payload}`).toString('hex');
    const signature = Buffer.from(sig, 'base64').toString('hex');

    const pubKeyBytes = Object.values(keyLike).filter((v) => v instanceof Uint8Array)[0];
    const pubKey = ed.etc.bytesToHex(pubKeyBytes);

    const isValid = await ed.verifyAsync(signature, message, pubKey);
    if (!isValid) {
      throw new Error('eddsa token verification failed');
    }
    return;
  }

  try {
    return jwtVerify(jwt, keyLike);
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      throw err;
    }
    return null;
  }
}