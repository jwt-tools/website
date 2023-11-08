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
        <a
          href="https://discord.gg/GMpYjxatmF"
          target="_blank"
          className="primary-button"
        >
          Join
        </a>
      </div>
    </div>
  );
};

export default Community;
