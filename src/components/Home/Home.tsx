import React, { useEffect, useMemo, useState } from 'react';
import './Home.scss';
import Encoded from './Encoded/Encoded';
import Decoded from './Decoded/Decoded';
import { validateToken } from '../../scripts/tokens';
import type { JWTVerifyResult } from 'jose';
import { TokenProvider } from '../../detector/engine';
import History from './History/History';
import JWKinput from './JWKInput/JWKInput';
import Signature from './Signature/Signature';
import Community from './Community/Community';

const Home: React.FC = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT'
  );
  const [jwtVerifyResult, setJwtVerifyResult] = useState<{
    verified: boolean;
    decoded: JWTVerifyResult;
  } | null>(null);
  const [provider, setProvider] = useState<TokenProvider | null>(null);

  const header = useMemo(() => {
    const tokenSplit = token.split('.');
    if (tokenSplit.length < 2) {
      return tokenSplit?.[0] || token;
    }
    return `${tokenSplit?.[0]}.`;
  }, [token]);

  const payload = useMemo(() => {
    const tokenSplit = token.split('.');

    if (tokenSplit.length < 3) {
      return tokenSplit?.[1] || undefined;
    }
    return `${tokenSplit?.[1]}.`;
  }, [token]);

  const signature = useMemo(() => {
    const tokenSplit = token.split('.').slice(2);
    return tokenSplit.join('.');
  }, [token]);

  useEffect(() => {
    (async (jwt: string) => {
      const result = await validateToken(jwt);
      setJwtVerifyResult(result);
    })(token);
  }, [token]);

  return (
    <div className="home">
      <button className="primary-button decoded-button-generate">
        Generate example JWT
      </button>

      <Encoded
        header={header}
        payload={payload}
        signature={signature}
        setToken={setToken}
        token={token}
        setProvider={setProvider}
      />
      <Decoded
        header={jwtVerifyResult?.decoded.protectedHeader}
        payload={jwtVerifyResult?.decoded.payload}
        signature={signature}
        setToken={setToken}
        token={token}
        provider={provider}
      />
      <JWKinput />
      <Signature verified={jwtVerifyResult?.verified} />
      <History />
      <Community />
    </div>
  );
};

export default Home;
