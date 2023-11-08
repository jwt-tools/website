export type SigningAlgorithm = {
    name: string;
    type: string;
    bits?: number;
}

export const hs256: SigningAlgorithm = {
    name: "HS256",
    type: "HMAC",
    bits: 256,
}

export const hs384: SigningAlgorithm = {
    name: "HS384",
    type: "HMAC",
    bits: 384,
}

export const hs512: SigningAlgorithm = {
    name: "HS512",
    type: "HMAC",
    bits: 512,
}

export const es256: SigningAlgorithm = {
    name: "ES256",
    type: "ECDSA",
    bits: 256,
}

export const es384: SigningAlgorithm = {
    name: "ES384",
    type: "ECDSA",
    bits: 384,
}

export const es512: SigningAlgorithm = {
    name: "ES512",
    type: "ECDSA",
    bits: 512,
}

export const ps256: SigningAlgorithm = {
    name: "PS256",
    type: "RSA-PSS",
    bits: 256,
}

export const ps384: SigningAlgorithm = {
    name: "PS384",
    type: "RSA-PSS",
    bits: 384,
}

export const ps512: SigningAlgorithm = {
    name: "PS512",
    type: "RSA-PSS",
    bits: 512,
}

export const rs256: SigningAlgorithm = {
    name: "RS256",
    type: "RSA",
    bits: 256,
}

export const rs384: SigningAlgorithm = {
    name: "RS384",
    type: "RSA",
    bits: 384,
}

export const rs512: SigningAlgorithm = {
    name: "RS512",
    type: "RSA",
    bits: 512,
}

export const eddsa: SigningAlgorithm = {
    name: "EdDSA",
    type: "EdDSA",
}

export const algorithms = [
    hs256,
    hs384,
    hs512,
    rs256,
    rs384,
    rs512,
    es256,
    es384,
    es512,
    ps256,
    ps384,
    ps512,
    eddsa,
]
