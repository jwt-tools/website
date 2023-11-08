import React, { useCallback, useState } from 'react';
import './Education.scss';
import classNames from 'classnames';
import Chevron from '../../../assets/arrow-down-sign.svg';
import { EducationContent } from './Education.util';

const Education: React.FC = () => {
  const [array, setArray] = useState<string[]>([]);

  const toggleEducationItem = useCallback(
    (id: string) => {
      if (array.includes(id)) {
        return setArray((prev) => prev.filter((x) => x !== id));
      }

      setArray((prev) => [...prev, id]);
    },
    [array]
  );
  return (
    <div className="education">
      <h1 className="title-education">What is a JWT?</h1>

      {EducationContent.map(({ content, id, image }) => {
        const isOpen = array.includes(id);
        return (
          <div
            className={classNames('education__item', {
              'education__item--open': isOpen,
            })}
            key={`education-${id}`}
          >
            <img className="education__logo" src={image} />
            <div
              className={classNames('education__item__content', {
                'education__item__content--open': isOpen,
              })}
            >
              {content}
              <button
                onClick={() => toggleEducationItem(id)}
                className="text-button"
              >
                {isOpen ? (
                  'Read less'
                ) : (
                  <>
                    <div>...</div>Read more
                  </>
                )}
              </button>
            </div>
            <img
              src={Chevron}
              onClick={() => toggleEducationItem(id)}
              className={classNames('chevron', {
                'chevron--open': isOpen,
              })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Education;
