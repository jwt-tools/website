import React from 'react';
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
}> = ({ header, payload }) => {
  return (
    <div className="decoded">
      <div className="decoded__header">
        <h1>Decoded</h1>
        <button className="primary-button">Explain JWT</button>
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
            <pre>
              <code>{JSON.stringify(payload, null, 4)}</code>
            </pre>
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
