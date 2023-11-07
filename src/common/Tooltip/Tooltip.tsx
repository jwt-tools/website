import React from 'react';
import './Tooltip.scss';
import classNames from 'classnames';

interface TooltipProps {
  tooltipContent: string | React.ReactNode;
  label: string | React.ReactNode;
  customClass?: string;
  callback?: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  tooltipContent,
  label,
  customClass,
  callback,
}) => {
  return (
    <div
      className={classNames('tooltip', {
        [`${customClass}`]: customClass,
        'tooltip-callback': callback,
      })}
      onClick={() => {
        if (callback) callback();
      }}
    >
      {label}
      <div className="tooltip__content-container">
        <div className="tooltip__content">
          {tooltipContent}
          <span className="tooltip__content-arrow" />
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
