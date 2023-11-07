import { JWTPayload, decodeJwt } from 'jose';
import { providers } from './providers';

export type TokenProvider = {
    name: string;
    url: string;
    match: TokenMatch[];
    claims: ClaimMatcher;
}

export type TokenMatch = {
    [key: string]: string;
}

export type ClaimMatcher = {
    [key: string]: {
        match: string;
        link: {
            label: string;
            url: string;
        }
    }
}

export function detectProvider(token: string): TokenProvider | null {
    const tokenPayload = decodeJwt(token);
    for (const provider of providers) {
        if (provider.match.some(match => matchToken(tokenPayload, match))) {
            return provider;
        }
    }
    return null;
}

function matchToken(tokenPayload: JWTPayload, match: TokenMatch): boolean {
    const [key, value] = Object.entries(match)[0];
    const matcher = new RegExp(value);
    return matcher.test(tokenPayload[key] as string);
}