import React from 'react';
import './History.scss';
import Trash from '../../../assets/trash-can.svg';
import Edit from '../../../assets/edit.svg';
import { getAllTokens, Token, deleteToken } from '../../../storage/db';

const History: React.FC = () => {
  const [tokens, setTokens] = React.useState<Token[]>([]);

  React.useEffect(() => {
    (async () => {
      const tokens = await getAllTokens();
      setTokens(tokens);
    })();
  }, []);

  const removeToken = (id: number) => {
  
    (async () => {
      await deleteToken(id);
      const tokens = await getAllTokens();
      setTokens(tokens);
    })();
  }

  return (
    <div className="history">
      <h1>History</h1>
      {tokens.map((token) => {
        const date = new Date(token.created);
        const time = date.toISOString;
        return (
          <div key={`history-${time}`} className="history__item">
            <div className="history__item__date">
              {date.toString()}
              <img src={Edit} />
            </div>
            <div className="history__item__buttons">
              <button className="text-button">View</button>
              <img 
                 onClick={()=>removeToken(token.id)}
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
