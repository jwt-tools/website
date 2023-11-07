import React, { useState } from 'react';
import './Home.scss';
import Encoded from './Encoded/Encoded';
import Decoded from './Decoded/Decoded';

const Home: React.FC = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT.≤4fwpMeJf36POk6yJV_adQssw5c7Y6RT45EFDSXZ/'
  );

  return (
    <div className="home">
      <button className="primary-button decoded-button-generate">
        Generate example JWT
      </button>

      <Encoded setToken={setToken} token={token} />
      <Decoded setToken={setToken} token={token} />
    </div>
  );
};

export default Home;
