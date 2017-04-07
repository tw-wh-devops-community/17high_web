import React from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import DateUtils from './DateUtils';

const ItemComponent = (active, activity) => {
  let recentStyle = classNames(scss.recentitemdiv);
  if (active) {
    recentStyle = classNames(scss.recentitemdiv, scss.recentitemactive);
  }
  const formatFromTo = DateUtils.formatFromTo(activity.startTime, activity.endTime);
  return (
    <div className={recentStyle}>
      <div className={classNames(scss.recentitemdate)}>{formatFromTo}</div>
      <div className={classNames(scss.recentitemtitle)}>{activity.name}</div>
    </div>
  );
};

ItemComponent.propTypes = {
  activity: React.PropTypes.shape({
    sponsor: React.PropTypes.string,
    location: React.PropTypes.string,
    guest: React.PropTypes.string,
    description: React.PropTypes.string,
    endTime: React.PropTypes.string,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    imageURL: React.PropTypes.string
  }).isRequired,
  active: React.PropTypes.boolean.isRequired
};

export default ItemComponent;
