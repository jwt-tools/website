import React from 'react';
import ContentEditable from 'react-contenteditable';
import Tooltip from '../../../common/Tooltip/Tooltip';
import Copy from '../../../assets/copy-link.svg';
import { TokenProvider, detectProvider } from '../../../detector/engine';

const Encoded: React.FC<{
  token: string;
  setToken: (e: string) => void;
  setProvider: (provider: TokenProvider | null) => void;
  header: string;
  payload?: string;
  signature: string;
}> = ({ token, setToken, setProvider, header, payload, signature }) => {
  return (
    <>
      <h1>Encoded</h1>
      <div className="home__encoded">
        <ContentEditable
          className="home__encoded__editable"
          html={token} // innerHTML of the editable div
          disabled={false} // use true to disable editing
          onChange={(e) => {
            const text = e.target.value.replace(/&nbsp;/g, ' ');
            console.log({ text });
            setToken(text);
            const provider = detectProvider(token);
            setProvider(provider);
            console.log('provider', provider);
          }} // handle innerHTML change
        />
        <div className="home__encoded__overlay">
          <div
            spellCheck={false}
            autoCorrect="false"
            className="home__encoded__overlay__header"
          >
            {header}
          </div>
          {payload && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="home__encoded__overlay__payload"
            >
              {payload}
            </div>
          )}
          {signature && (
            <div
              spellCheck={false}
              autoCorrect="false"
              className="home__encoded__overlay__signature"
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
              className="home__encoded__copy"
            />
          }
        />
      </div>
    </>
  );
};

export default Encoded;
