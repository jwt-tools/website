import React from 'react';

const Decoded: React.FC<{
  token: string;
  setToken: (e: string) => void;
}> = () => {
  return (
    <div className="home__decoded">
      <div className="home__decoded__header">
        <h1>Decoded</h1>
        <button className="primary-button">JWT GPT Explained</button>
      </div>

      <div className="home__decoded__content">
        <div className="home__decoded__content__column">
          <div className="home__decoded__header">Header</div>
          <div className="home__decoded__signature">Signature</div>
        </div>
        <div className="home__decoded__payload">Payload</div>
      </div>
    </div>
  );
};

export default Decoded;
