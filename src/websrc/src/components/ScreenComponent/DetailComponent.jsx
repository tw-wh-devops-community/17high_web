import React from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import gift from './image/gift.png';
import news from './image/news.png';
import DateUtils from './DateUtils';

const DetailComponent = (props) => {
  const activity = props.activity;
  const addition = props.addition;
  const style = classNames(scss.detaildiv, scss[activity.imageURL]);
  let typeText = '活动';
  let typeicon = gift;
  let hideNewsField = '';
  if (activity.type === 'NEWS') {
    typeText = '新闻';
    typeicon = news;
    hideNewsField = scss.hideinfo;
  }
  return (
    <div className={style} data-additionflag={addition}>
      <div className={classNames(scss.typediv)}>
        <img alt="" src={typeicon} className={classNames(scss.typeicon)}>
        </img>
        <span
          className={classNames(scss.typetext)}>{typeText}</span>
      </div>
      <div className={classNames(scss.datediv)}>
        <span className={classNames(scss.datetext)}>
          {DateUtils.formatFromTo(activity.startTime, activity.endTime)}</span>
      </div>
      <div className={classNames(scss.titlediv)}>
        <span className={classNames(scss.titletext)}>{activity.name}</span>
      </div>
      <div className={classNames(scss.locationdiv, hideNewsField)}>
        <span className={classNames(scss.locationdivtext)}>{activity.location}</span>
      </div>
      <div className={classNames(scss.ownerdiv, hideNewsField)}>
        <span>主办方:</span>
        <span>{activity.sponsor}</span>
        /
        <span>活动嘉宾:</span>
        <span>{activity.guest}</span>
      </div>
      <div className={classNames(scss.describediv)}>
        {activity.description}
      </div>
    </div>
  );
};

DetailComponent.propTypes = {
  activity: React.PropTypes.shape({
    sponsor: React.PropTypes.string,
    location: React.PropTypes.string,
    guest: React.PropTypes.string,
    description: React.PropTypes.string,
    endTime: React.PropTypes.date,
    name: React.PropTypes.string,
    type: React.PropTypes.string,
    imageURL: React.PropTypes.string
  }).isRequired,
  addition: React.PropTypes.string.isRequired
};

export default DetailComponent;
