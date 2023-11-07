import React, { useMemo } from 'react';
import ContentEditable from 'react-contenteditable';
import Tooltip from '../../../common/Tooltip/Tooltip';
import Copy from '../../../assets/copy-link.svg';

const Encoded: React.FC<{ token: string; setToken: (e: string) => void }> = ({
  token,
  setToken,
}) => {
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
