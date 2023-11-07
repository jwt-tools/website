import React, { useMemo, useState } from 'react';
import './Home.scss';
import Encoded from './Encoded/Encoded';
import Decoded from './Decoded/Decoded';

const Home: React.FC = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT.≤4fwpMeJf36POk6yJV_adQssw5c7Y6RT45EFDSXZ/'
  );

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
      />
      <Decoded
        header={header}
        payload={payload}
        signature={signature}
        setToken={setToken}
        token={token}
      />
    </div>
  );
};

export default Home;
