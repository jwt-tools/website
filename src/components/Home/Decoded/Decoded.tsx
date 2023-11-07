import React, { useCallback } from 'react';
import './Decoded.scss';
import Copy from '../../../assets/copy-link.svg';
import Tooltip from '../../../common/Tooltip/Tooltip';
import { TokenProvider } from '../../../detector/engine';
import { JWTHeaderParameters, JWTPayload } from 'jose';

const Decoded: React.FC<{
  token: string;
  setToken: (e: string) => void;
  provider: TokenProvider | null;
  header?: JWTHeaderParameters;
  payload?: JWTPayload;
  signature: string;
  setSecret: (secret: string) => void;
}> = ({ header, payload, setSecret }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidDate = useCallback((d: any): boolean => {
    return d instanceof Date && !isNaN(d.getTime());
  }, []);

  return (
    <div className="decoded">
      <div className="decoded__header">
        <h1>Decoded</h1>
        <button className="primary-button">
          Explain JWT
          <span className="button-image">
            <svg
              viewBox="0 0 20 20"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  transform="translate(-1088, -283)"
                  stroke="#C8AAFF"
                >
                  <g transform="translate(1088, 283)">
                    <path
                      d="M7.89479771,1.40074471 C8.54977605,2.91058086 9.41963471,4.20568886 10.5017098,5.28776392 C11.5838683,6.36992248 12.8790927,7.23983189 14.388729,7.89479771 C12.8788928,8.54977605 11.5837848,9.41963471 10.5017098,10.5017098 C9.41963471,11.5837848 8.54977605,12.8788928 7.89467598,14.388729 C7.23969763,12.8788928 6.36983898,11.5837848 5.28776392,10.5017098 C4.20568886,9.41963471 2.91058086,8.54977605 1.40074471,7.89467598 C2.91058086,7.23969763 4.20568886,6.36983898 5.28776392,5.28776392 C6.36983898,4.20568886 7.23969763,2.91058086 7.89479771,1.40074471 Z"
                    ></path>
                    <path
                      d="M15.7895074,11.9529893 C16.1153329,12.6606762 16.517666,13.2823423 16.9947164,13.819024 C17.5102585,14.3990089 18.113381,14.8807342 18.8046158,15.2632466 C18.1132732,15.6456677 17.5102124,16.1273587 16.9947164,16.7072918 C16.517666,17.2439735 16.1153329,17.8656396 15.7894399,18.5733265 C15.4636144,17.8656396 15.0612814,17.2439735 14.584231,16.7072918 C14.0686889,16.1273069 13.4655664,15.6455816 12.7743315,15.2630692 C13.4656742,14.8806481 14.0687349,14.3989571 14.584231,13.819024 C15.0612814,13.2823423 15.4636144,12.6606762 15.7895074,11.9529893 Z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </button>
      </div>

      <div className="decoded__content">
        <div className="decoded__content__column">
          <div className="decoded__header">
            <div className="decoded__header__title">Header and token type</div>
            <div className="decoded__header__content">
              <pre>
                <code>{JSON.stringify(header, null, 4)}</code>
              </pre>
            </div>
          </div>
          <div className="decoded__signature">
            <div className="decoded__signature__title">Verify signature</div>
            <div className="decoded__signature__content">
              HMACSHA256(
              <br />
              &nbsp;&nbsp;&nbsp;base64UrlEncode(header) + "." +
              <br />
              &nbsp;&nbsp;&nbsp;base64UrlEncode(payload),
              <br /> <br />{' '}
              <input
                className="decoded__signature__content__secret"
                placeholder="your-256-bit-secret"
                onBlur={(e) => setSecret(e.target.value)}
              />
              <br />
              <br /> ) secret base64 encoded
            </div>
            <Tooltip
              tooltipContent="Copy"
              label={
                <img
                  onClick={() =>
                    navigator.clipboard.writeText(JSON.stringify('Secret'))
                  }
                  src={Copy}
                  className="home__encoded__copy"
                />
              }
            />
          </div>
        </div>
        <div className="decoded__payload">
          <div className="decoded__payload__title">Payload data</div>
          <div className="decoded__payload__content">
            {`{`}
            <br />
            {payload
              ? Object.keys(payload).map((key) => {
                  const value = payload?.[key] as string;
                  const isDate = isValidDate(new Date(value));
                  return (
                    <div
                      key={`payload-item-${key}`}
                      className="decoded__payload__content__item"
                    >
                      "{key}": {payload?.[key] as string},{' '}
                      {isDate && (
                        <div className="decoded__payload__content__item__date">
                          {new Date(value).toString()}
                        </div>
                      )}
                    </div>
                  );
                })
              : 'Invalid payload'}
            {`}`}
          </div>
          <Tooltip
            tooltipContent="Copy"
            label={
              <img
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(payload))
                }
                src={Copy}
                className="home__encoded__copy"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Decoded;
