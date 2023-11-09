import React from 'react';
import classNames from 'classnames';
import CheckmarkOutline from '../../assets/checkmark--outline.svg';
import CloseOutline from '../../assets/close--outline.svg';
import './Signature.scss';

const Signature: React.FC<{ verified?: boolean }> = ({ verified }) => {
  const message = verified ? 'Signature verified' : 'Signature unverified!';
  const icon = verified ? CheckmarkOutline : CloseOutline;
  return (
    <>
      {verified !== undefined && (
        <div
          className={classNames('signature', {
            success: verified,
            failure: verified === false,
          })}
        >
          <img src={icon} alt="verified" />
          <p>{message}</p>
        </div>
      )}
    </>
  );
};

export default Signature;
