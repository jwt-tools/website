import React from 'react';
import './History.scss';
import Trash from '../../../assets/trash-can.svg';
import Edit from '../../../assets/edit.svg';

const History: React.FC = () => {
  const items = [{ time: '2023-11-07T20:00:07Z' }];
  return (
    <div className="history">
      <h1>History</h1>
      {items.map(({ time }) => {
        const date = new Date(time);
        return (
          <div key={`history-${time}`} className="history__item">
            <div className="history__item__date">
              {date.toString()}
              <img src={Edit} />
            </div>
            <div className="history__item__buttons">
              <button className="text-button">View</button>
              <img src={Trash} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
