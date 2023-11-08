import React, { useEffect, useMemo, useState } from 'react';
import './Home.scss';
import Encoded from '../Encoded/Encoded';
import Decoded from '../Decoded/Decoded.tsx';
import { validateToken } from '../../lib/tokens';
import type { JWTVerifyResult } from 'jose';
import { TokenProvider } from '../../providers/engine';
import History from '../History/History';
import Signature from '../Signature/Signature';
import Community from '../Community/Community';
import Education from './Education/Education';
import { addToken } from '../../storage/db';

const placeholder =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT';
const Home: React.FC = () => {
  const [token, setToken] = useState(placeholder);
  const [jwtVerifyResult, setJwtVerifyResult] = useState<{
    verified: boolean;
    expired: boolean;
    decoded: JWTVerifyResult;
  } | null>(null);
  const [provider, setProvider] = useState<TokenProvider | null>(null);
  const [secret, setSecret] = useState('');

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
      const result = await validateToken(jwt, secret);
      setJwtVerifyResult(result);
    })(token);
  }, [secret, token]);

  useEffect(() => {
    (async (jwt: string) => {
      if (token === placeholder) return;
      await addToken({
        token: jwt,
        created: new Date(),
      });
    })(token);
  }, [token]);

  return (
    <div className="home">
      {/* <button className="primary-button decoded-button-generate">
        Generate example
        <span className="button-image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path
              d="M12,10H6.78A11,11,0,0,1,27,16h2A13,13,0,0,0,6,7.68V4H4v8h8Z"
              fill="#C8AAFF"
            />
            <path
              d="M20,22h5.22A11,11,0,0,1,5,16H3a13,13,0,0,0,23,8.32V28h2V20H20Z"
              fill="#C8AAFF"
            />
          </svg>
        </span>
      </button> */}

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
        expired={jwtVerifyResult?.expired}
        signature={signature}
        setToken={setToken}
        token={token}
        provider={provider}
        setSecret={setSecret}
        secret={secret}
      />
      <Signature verified={jwtVerifyResult?.verified} />
      <History 
      setToken={setToken}/>
      <Education />
      <Community />
    </div>
  );
};

export default Home;
