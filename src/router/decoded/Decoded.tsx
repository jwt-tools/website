import React from 'react';
import './Decoded.scss';

const Decoded: React.FC = () => {
  return (
    <div className="decoded">
      <button className="primary-button decoded-button-generate">
        Generate example JWT
      </button>
    </div>
  );
};

export default Decoded;
