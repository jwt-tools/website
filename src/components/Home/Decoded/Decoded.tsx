import React, { useMemo } from 'react';
import './Decoded.scss';

const Decoded: React.FC<{
  token: string;
  setToken: (e: string) => void;
  header: string;
  payload?: string;
  signature: string;
}> = ({ header }) => {
  const headerObject = useMemo(() => {
    const formatedHeader = header.replace(/\./g, '');
    const decodedString = atob(formatedHeader);
    return JSON.parse(decodedString);
  }, [header]);
  return (
    <div className="decoded">
      <div className="decoded__header">
        <h1>Decoded</h1>
        <button className="primary-button">JWT GPT Explained</button>
      </div>

      <div className="decoded__content">
        <div className="decoded__content__column">
          <div className="decoded__header">
            <div className="decoded__header__title">Header and token type</div>
            <div className="decoded__header__content">
              <pre>
                <code>{JSON.stringify(headerObject, null, 4)}</code>
              </pre>
            </div>
          </div>
          <div className="decoded__signature">
            <div className="decoded__signature__title">Verify signature</div>
            <div className="decoded__signature__content">content</div>
          </div>
        </div>
        <div className="decoded__payload">
          <div className="decoded__payload__title">Payload data</div>
          <div className="decoded__payload__content">content</div>
        </div>
      </div>
    </div>
  );
};

export default Decoded;
