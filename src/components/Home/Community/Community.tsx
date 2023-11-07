import React from 'react';
import './Community.scss';

const Community: React.FC = () => {
  return (
    <div className="community">
      <h1>Community</h1>
      <div className="community__content">
        <div>
          <strong>Join the community.</strong> Ask questions, make requests, and
          more.
        </div>
        <button className="primary-button">Join</button>
      </div>
    </div>
  );
};

export default Community;
