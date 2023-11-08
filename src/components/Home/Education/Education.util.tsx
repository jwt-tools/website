import JWTLogo from '../../../assets/logoimageJWT.svg';
import Lock from '../../../assets/Group 22-2.svg';
import Award from '../../../assets/Group 20-2.svg';
import Debugger from '../../../assets/Group 2 Copy-2.svg';

export const EducationContent: {
  content: React.ReactNode;
  id: string;
  image: string;
}[] = [
  {
    id: 'what',
    image: JWTLogo,
    content: (
      <>
        <strong>What are JWTs?</strong>
        <br />
        <br />
        JWT, or JSON Web Token, is a compact, URL-safe means of representing
        claims to be transferred between two parties. The information contained
        in a JWT is encoded as a JSON object, which is then digitally signed
        using a cryptographic algorithm to ensure its veracity. JWTs can be
        signed using a secret (with the{' '}
        <a
          target="_blank"
          className="link"
          href="https://xilinx.github.io/Vitis_Libraries/security/2020.1/guide_L1/internals/hmac.html#:~:text=HMAC%20is%20a%20message%20authentication,function%20involving%20the%20hash%20function."
        >
          HMAC algorithm
        </a>
        ) or a public/private key pair using RSA or ECDSA.
        <br />
        <br />
        <strong>
          They consist of three parts: a header, a payload, and a signature.{' '}
        </strong>
        <br />
        <br />
        <strong>Header:</strong> The header typically consists of two parts: the
        type of the token, which is JWT, and the signing algorithm.
        <br />
        <br />
        <strong>Payload:</strong> The payload contains the claims, which are
        statements about an entity (typically, the user) and additional
        metadata.
        <br />
        <br />
        <strong> Signature:</strong> The signature is used to verify that the
        sender of the JWT is who it says it is and to ensure that the message
        wasn't changed along the way.
        <br />
        <br />
        This compact form allows JWTs to be easily passed through a URL, POST
        parameter, or inside an HTTP header. Additionally, JWTs are
        self-contained, carrying all the necessary information within itself,
        thus reducing the need for a backend to retrieve user information, which
        can be beneficial for scalability and decoupling. They are widely used
        in web applications for creating access tokens that authenticate the
        requests of a client to a server.
      </>
    ),
  },
  {
    id: 'why',
    image: Lock,
    content: (
      <>
        <strong>Why JWTs?</strong>
        <br />
        <br />
        JWTs have several advantages that can make them better than other
        methods in specific scenarios:
        <br />
        <br />
        Compact and Self-contained: JWTs are small when encoded, which makes
        them easy to send through URLs, POST requests, or HTTP headers. Plus,
        they carry all the information within them, so you don't need to ask a
        database for more details every time. Speed and Efficiency: Because JWTs
        contain all the necessary information, a server doesn't need to reach
        out to a database to fetch user details, which can save time and
        resources.
        <br />
        <br />
        Stateless Sessions: JWTs enable stateless authentication. The server
        doesn't need to keep a record of tokens issued, as each token is
        self-contained and carries all the user information needed.
        <br />
        <br />
        Decoupling and Scalability: Since JWTs don't require server-side
        storage, they are a good fit for distributed systems where you want to
        reduce the dependencies between systems or services.
        <br />
        <br />
        Standardization: JWT is a standard (RFC 7519), which means it's
        maintained by an international organization and has a set of rules
        everyone agrees on. This makes it easier for different services and
        systems to use JWTs because they all follow the same rules.
        <br />
        <br />
        Flexibility: JWTs can be used across many different domains and can be
        signed by using a variety of algorithms to meet the security
        requirements of various applications.
        <br />
        <br />
        However, it's important to note that JWTs are not inherently better in
        every situation. They are well-suited for certain types of applications,
        especially where scalability and performance are concerns. For other
        contexts, such as sessions that require immediate invalidation,
        traditional session cookies might be more appropriate. The choice
        between JWTs and other methods should be based on the specific needs and
        constraints of the application you're developing.
      </>
    ),
  },
  {
    id: 'best',
    image: Award,
    content: (
      <>
        <strong>BEST Practices for JWT:</strong>
        <br />
        <br />
        When using JWTs (JSON Web Tokens), it’s important to follow best
        practices to ensure they are implemented securely and effectively:
        <br />
        <br />
        1. Use HTTPS: Always use JWTs over HTTPS to prevent tokens from being
        intercepted during transmission.
        <br />
        <br />
        2. Keep it Secret, Keep it Safe: The secret key used to sign the JWT
        should be kept confidential. If the key is exposed, anyone can forge
        tokens.
        <br />
        <br />
        3. Choose Strong Signing Algorithms: Use robust algorithms like RS256
        (RSA Signature with SHA-256) for signing JWTs. Avoid using none
        algorithm or weaker algorithms like HS256 with a weak secret.
        <br />
        <br />
        4. Short Expiration Times: JWTs should have a short expiration time (exp
        claim), forcing the client to obtain a new token regularly. This limits
        the window of time an attacker has to use a compromised token.
        <br />
        <br />
        5. Handle Token Expiry Gracefully: Implement token renewal strategies to
        improve user experience, allowing sessions to be extended without
        forcing the user to re-authenticate.
        <br />
        <br />
        6. Do Not Store Sensitive Information in JWTs: Since JWTs can be decoded
        easily, do not store sensitive or personally identifiable information in
        the token.
        <br />
        <br />
        7. Use Claims Wisely: Utilize standard claims (like iss, sub, aud, exp,
        nbf, iat, jti) to provide a structure to your tokens and to facilitate
        validation.
        <br />
        <br />
        8. Manage JWTs for Logout: Since JWTs are stateless, implement a
        server-side blacklist or use a token store to allow tokens to be revoked
        or invalidated when a user logs out.
        <br />
        <br />
        9. Limit JWT Scope: Use JWTs for a single purpose (like authentication)
        and avoid using the same token for other purposes (like password reset).
        <br />
        <br />
        10. Set the 'typ' Header: Ensure that the JWT 'typ' header is set to
        "JWT" to make it clear that this token is a JWT.
        <br />
        <br />
        11. Implement Proper Error Handling: Your application should handle
        JWT-related errors, such as signature validation failures and expired
        tokens, in a secure manner.
        <br />
        <br />
        By adhering to these best practices, you can leverage the benefits of
        JWTs while mitigating potential security risks.
      </>
    ),
  },
  {
    id: 'debugger',
    image: Debugger,
    content: (
      <>
        <strong>Using the debugger</strong>
        <br />
        <br />
        1. Copy a JWT (or use the “create a sample” button)
        <br />
        <br />
        2. Paste JWT into the “Encoded” section
        <br />
        <br />
        3. (optional) Add a JWK endpoint (or select from other ones)
      </>
    ),
  },
];
