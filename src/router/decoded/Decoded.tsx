import React, { useMemo, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import './Decoded.scss';

const Decoded: React.FC = () => {
  const [token, setToken] = useState(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT.≤4fwpMeJf36POk6yJV_adQssw5c7Y6RT45EFDSXZ/'
  );

  const header = useMemo(() => {
    const tokenSplit = token.split('.');
    console.log({ tokenSplit });
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
    <div className="decoded">
      <button className="primary-button decoded-button-generate">
        Generate example JWT
      </button>
      <h1>Encoded</h1>
      <div className="decoded__token">
        <ContentEditable
          className="decoded__token__editable"
          html={token} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) => {
            const text = e.target.value.replace(/&nbsp;/g, ' ');
            console.log({ text });
            setToken(text);
          }} // handle innerHTML change
        />
        <div className="decoded__token__overlay">
          <div
            spellCheck={false}
            autoCorrect="false"
            className="decoded__token__overlay__header"
          >
            {header}
          </div>
          {payload && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="decoded__token__overlay__payload"
            >
              {payload}
            </div>
          )}
          {signature && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="decoded__token__overlay__signature"
            >
              {signature}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Decoded;
