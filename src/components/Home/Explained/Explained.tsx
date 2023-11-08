import React, { useEffect, useState } from 'react';
import Close from '../../../assets/close.svg';
import './Explained.scss';
import api from '../../../lib/api';
import Sparkle from '../../../assets/AI-sparkle.svg';

const Explained: React.FC<{ onClose: () => void; token: string }> = ({
  onClose,
  token,
}) => {
  const [state, setState] = useState('init');
  const [gptResponse, setGptResponse] = useState<string | undefined>(undefined);

  const loadGPTReponse = async () => {
    setState('fetching');
    try {
      const res = await api.get(`/api/gpt?token=${token}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json: any = await res.json();
      const message: string | undefined = json?.choices?.[0]?.message?.content;

      if (message) {
        setState('complete');
        setGptResponse(message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Disable body scroll
    document.body.style.overflowY = 'hidden';
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  useEffect(() => {
    if (state == 'init') {
      loadGPTReponse();
    }
  }, []);

  return (
    <>
      <div className="explained__background" onClick={onClose} />
      <div className="explained">
        <button className="explained__close" onClick={onClose}>
          <img src={Close} />
        </button>
        <div className="explained__title">
          JWT GPT Explained
          <img src={Sparkle} />
        </div>
        {(state === 'init' || state === 'fetching') && <h1>Generating...</h1>}
        {gptResponse}
      </div>
    </>
  );
};

export default Explained;
