import React, { useMemo, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import './Decoded.scss';

const Decoded: React.FC = () => {
  const [token, setToken] = useState('random.yellow.green');

  const header = useMemo(() => {
    const tokenSplit = token.split('.');
    return tokenSplit?.[0] || token;
  }, [token]);

  const payload = useMemo(() => {
    const tokenSplit = token.split('.');
    return tokenSplit?.[1];
  }, [token]);

  return (
    <div className="decoded">
      <button className="primary-button decoded-button-generate">
        Generate example JWT
      </button>
      <h1>Encoded</h1>
      <div className="decoded__token">
        <ContentEditable
          html={token} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) => {
            const text = e.target.value;
            setToken(text);
          }} // handle innerHTML change
        />
        <div className="decoded__token__overlay">
          <div className="decoded__token__overlay__header">{header}</div>
          {payload && (
            <div className="decoded__token__overlay__payload">{payload}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Decoded;
