import React from 'react';
import classNames from 'classnames';
import './Signature.scss';


const Signature: React.FC<{ verified?: boolean }> = ({ verified }) => {
  return (
    <div className={classNames('signature', {
      success: verified,
      failure: verified === false,
    })}>
      {verified === undefined && <></>}
      {verified === true && <p>Signature verified</p>}
      {verified === false && <p>Signature unverified!</p>}
    </div>
  )
};

export default Signature;
