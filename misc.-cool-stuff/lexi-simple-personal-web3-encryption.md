# Lexi - Simple personal web3 encryption

The [Lexi](https://github.com/civicteam/lexi) library allows anyone with a Solana wallet to encrypt and decrypt data in just a couple of lines of code.

Use Lexi to allow users of your dApp to store private information without having to manage extra key material, interact with third-party infrastructure, or even connect to the blockchain.

{% hint style="warning" %}
Caveat 1: Lexi is in \*experimental mode\*. This means that it has not yet been audited, and that integrators should use it at their own risk.
{% endhint %}

{% hint style="warning" %}
Caveat 2: Lexi currently does not support Ledger wallets.
{% endhint %}

## How it Works

In PKI cryptography, decryption, like signing, requires private key material (encryption and signature verification need only public keys). Although most crypto wallets do not expose decryption functions, they can act as the source of secure randomness that can be used to derive an encryption/decryption key.

Lexi derives an encryption key by asking the wallet to sign a random seed, such that the same seed signed by the same wallet will produce the same encryption key. If data are encrypted and stored alongside this seed, then the same seed can be used to decrypt.&#x20;

The key derived by Lexi is an asymmetric key. Therefore, the public key can also be shared (for example, stored on the user's DID) in order to allow others to send encrypted payloads to the user. However, for maximum security, keys should not be reused, and each payload should use a different Lexi key, derived from a different seed, which can only be performed by the user themselves. Therefore, Lexi is best used as a personal data encryption tool.

Lexi uses the following standards or proposed standards behind the scenes:

[DIDs](https://www.w3.org/TR/did-core/): A W3C standard for decentralized identifiers.

[JOSE](https://datatracker.ietf.org/group/jose/about/): An IETF proposal for JSON signing and encryption

[X25519](https://cr.yp.to/ecdh/curve25519-20060209.pdf): An elliptic-curve Diffie-Hellman key exchange algorithm

## Usage

### Encryption

Encrypt with Lexi as follows:

```
import { LexiWallet } from "@civic/lexi";
import { MessageSignerWalletAdapter } from "@solana/wallet-adapter-base";

export type UnencryptedPayload = {
    data: Buffer;
    name: string;
    mimeType: string;
}

export type EncryptedPayload = {
    jwe: string;
    seed: string;
    name: string;
    mimeType: string;
}

// Example: Not guaranteed to run in a secure context
// Although exposing the seed does not expose the encryption key (the seed is public)
// a non-secure random seed may expose details about the key that could be used as an attack vector
// consider instead something like tweetnacl's 'randomBytes'
const generateSeed = () => window.crypto.getRandomValues(new Uint8Array(32));

const encrypt = async (unencryptedPayload: UnencryptedPayload, did: string, wallet: MessageSignerWalletAdapter): Promise<EncryptedPayload> => {
    const seed = Buffer.from(generateSeed()).toString('hex');
    const lexi = new LexiWallet(wallet, did, {publicSigningString: seed});

    const jwe = await lexi.encryptForMe({
        data: unencryptedPayload.data.toString('base64'),
        name: unencryptedPayload.name,
        mimeType: unencryptedPayload.mimeType,
    });

    // Store the encrypted JWE alongside the seed.
    return {
        jwe,
        seed,
        name: unencryptedPayload.name,
        mimeType: unencryptedPayload.mimeType,
    }
}
```

### Decryption

Decrypt as follows:



```
const decrypt = async (payload: EncryptedPayload, did: string, wallet: MessageSignerWalletAdapter): Promise<UnencryptedPayload> => {
    const lexi = new LexiWallet(wallet, did, {publicSigningString: payload.seed})

    const decryptedPayload = (await lexi.decrypt(payload.jwe)) as Omit<UnencryptedPayload, 'data'> & {data: string}

    return {
        data: Buffer.from(decryptedPayload.data, 'base64'),
        name: payload.name,
        mimeType: payload.mimeType,
    };
}
```
