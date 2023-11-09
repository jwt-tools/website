import React from 'react';
import './History.scss';
import Trash from '../../assets/trash-can.svg';
import Edit from '../../assets/edit.svg';
import { getAllTokens, Token, deleteToken, getToken } from '../../storage/db';

const History: React.FC<{
  setToken: (e: string) => void;
  tokens: Token[];
  setTokens: (e: Token[]) => void;
}> = ({ setToken, setTokens, tokens }) => {

  React.useEffect(() => {
    (async () => {
      const tokens = await getAllTokens();
      setTokens(tokens);
    })();
  }, []);

  const removeToken = (id?: number) => {
    (async () => {
      if (!id) return;
      await deleteToken(id);
      const tokens = await getAllTokens();
      setTokens(tokens);
    })();
  };

  const viewToken = (id?: number) => {
    (async () => {
      if (!id) return;
      const savedToken = await getToken(id);
      console.log(savedToken);
      if (savedToken) {
        setToken(savedToken.token);
      }
    })();
  };

  return (
    <div className="history">
      <h1 className="title-history">History</h1>
      {
        tokens.length === 0 && <div className='history__empty-state'>No history to show</div>
      }
      {tokens.map((token) => {
        const date = new Date(token.created);
        const time = date.toISOString();
        return (
          <div key={`history-${time}`} className="history__item">
            <div className="history__item__date">
              {date.toString()}
              <img src={Edit} alt="edit" />
            </div>
            <div className="history__item__buttons">
              <button
                className="text-button"
                onClick={() => {
                  viewToken(token.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                View
              </button>
              <img
                alt="delete"
                onClick={() => removeToken(token.id)}
                src={Trash}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
