import React from 'react';

const Signature: React.FC<{ verified?: boolean }> = ({ verified }) => {
  return (
    <div className="signature">
      {verified === undefined && <></>}
      {verified === true && <p>Signature verified</p>}
      {verified === false && <p>Signature unverified!</p>}
    </div>
  )
};

export default Signature;
