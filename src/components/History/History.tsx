import React, { useState } from 'react';
import './History.scss';
import Trash from '../../assets/trash-can.svg';
import Edit from '../../assets/edit.svg';
import { getAllTokens, Token, deleteToken, getToken } from '../../storage/db';
import classNames from 'classnames';

const MAX_LENGTH = 4;

const History: React.FC<{
  setToken: (e: string) => void;
  tokens: Token[];
  setTokens: (e: Token[]) => void;
}> = ({ setToken, setTokens, tokens }) => {
  const [showAll, setShowAll] = useState(false);

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
      {tokens.slice(0, showAll ? tokens.length : MAX_LENGTH).map((token, idx) => {
        const date = new Date(token.created);
        const time = date.toISOString();
        const isFirst = idx === 0;
        const isLast = tokens.length === (idx + 1);

        return (
          <div key={`history-${time}`} className={classNames("history__item", {
            "history__item--first": isFirst,
            "history__item--last": isLast && !showAll
          })}>
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

      {tokens.length > MAX_LENGTH && <div className='history__show-more'>
        <button onClick={() => setShowAll((prev) => !prev)} className='text-button'>{showAll ? 'Show less' : 'Show more'}</button></div>}
    </div>
  );
};

export default History;
