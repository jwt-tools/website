import React, { useCallback, useState } from 'react';
import './History.scss';
import Trash from '../../assets/trash-can.svg';
import classNames from 'classnames';
import storage from '../../storage/db';
import { Token } from '../../storage/stores/tokens';

const MAX_LENGTH = 4;

const History: React.FC<{
  setToken: (e: string) => void;
  tokens: Token[];
  setTokens: (e: Token[]) => void;
}> = ({ setToken, setTokens, tokens }) => {
  const [showAll, setShowAll] = useState(false);

  React.useEffect(() => {
    (async () => {
      const tokens = await storage.tokens.getAllTokens();
      setTokens(tokens);
    })();
  }, []);

  const removeToken = (id?: number) => {
    (async () => {
      if (!id) return;
      await storage.tokens.deleteToken(id);
      const tokens = await storage.tokens.getAllTokens();
      setTokens(tokens);
    })();
  };

  const viewToken = useCallback((token: string) => {
    setToken(token)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setToken])

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
          <div onClick={() => viewToken(token.token)} key={`history-${time}`} className={classNames("history__item", {
            "history__item--first": isFirst,
            "history__item--last": isLast && !showAll
          })}>
            <div className="history__item__date">
              {date.toString()}
            </div>
            <div className="history__item__buttons">
              <button
                className="text-button"
                onClick={() => viewToken(token.token)}
              >
                View
              </button>
              <img
                alt="delete"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeToken(token.id)
                }}
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
