import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import DateUtils from './DateUtils';

const ItemComponent = (props) => {
  const activity = props.activity;
  const active = props.active;
  let recentStyle = classNames(scss.recentitemdiv);
  if (active) {
    recentStyle = classNames(scss.recentitemdiv, scss.recentitemactive);
  }
  const formatFromTo = DateUtils.formatFromTo(activity.startTime, activity.endTime);
  return (
    <div className={recentStyle}>
      <div className={classNames(scss.recentitemtitle)}>{activity.name}</div>
      <div className={classNames(scss.recentitemdate)}>{formatFromTo}</div>
    </div>
  );
};

ItemComponent.propTypes = {
  activity: PropTypes.shape({
    sponsor: PropTypes.string,
    location: PropTypes.string,
    guest: PropTypes.string,
    description: PropTypes.string,
    startTime: PropTypes.date,
    endTime: PropTypes.date,
    name: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string
  }).isRequired,
  active: PropTypes.bool.isRequired
};

export default ItemComponent;
