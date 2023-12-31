import React, { useCallback } from 'react';
import ContentEditable from 'react-contenteditable';
import Tooltip from '../../common/Tooltip/Tooltip';
import Copy from '../../assets/copy-link.svg';
import { TokenProvider, detectProvider } from '../../providers/engine';
import './Encoded.scss';

const Encoded: React.FC<{
  token: string;
  setToken: (e: string) => void;
  setProvider: (provider: TokenProvider | null) => void;
  header: string;
  payload?: string;
  signature: string;
}> = ({ token, setToken, setProvider, header, payload, signature }) => {
  const setText = useCallback(
    (text: string) => {
      text = text.replace(/&nbsp;/g, ' ');
      setToken(text);
      const provider = detectProvider(text);
      setProvider(provider);
    },
    [setProvider, setToken]
  );

  return (
    <>
      <h1 className="title-encoded">Encoded</h1>
      <div className="encoded">
        <ContentEditable
          className="encoded__editable"
          onPaste={(e) => {
            e.stopPropagation();
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            setText(text);
          }}
          html={token} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) => {
            const text = e.target.value;
            setText(text);
          }} // handle innerHTML change
          onKeyDown={(e) => {
            const key = e.which;
            if ([13, 32].includes(key)) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
        />
        <div className="encoded__overlay">
          <div
            spellCheck={false}
            autoCorrect="false"
            className="encoded__overlay__header"
          >
            {header}
          </div>
          {payload && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="encoded__overlay__payload"
            >
              {payload}
            </div>
          )}
          {signature && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="encoded__overlay__signature"
            >
              {signature}
            </div>
          )}
        </div>

        <Tooltip
          tooltipContent="Copy"
          label={
            <img
              onClick={() => navigator.clipboard.writeText(token)}
              src={Copy}
              className="encoded__copy"
              alt="copy"
            />
          }
        />
      </div>
      <div className='encoded__footer'>Note: JWTs are powerful credentials. Be mindful where you share them, as we perform all validation and debugging on the client side and do not retain token records.</div>
    </>
  );
};

export default Encoded;
