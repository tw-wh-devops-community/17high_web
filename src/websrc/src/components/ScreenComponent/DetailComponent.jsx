import React from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import NewsIcon from './svg/NewsIcon';
import ActivityIcon from './svg/ActivityIcon';
import LogoIcon from './svg/LogoIcon';
import DateUtil from './DateUtils';

const DetailComponent = (props) => {
  const item = props.activity;
  const style = classNames(scss.detaildiv, scss[item.imageURL]);
  let typeText = '活动';
  let hideNewsField = '';
  let typeicon = ActivityIcon;
  if (item.type === 'NEWS') {
    typeText = '新闻';
    typeicon = NewsIcon;
    hideNewsField = scss.hideinfo;
  }

  return (
    <div className={style} data-additionflag={props.addition}>
      <div className={classNames(scss.typediv)}>
        { typeicon({ className: classNames(scss.labelIcon) }) }
        <span className={classNames(scss.typetext)}>{typeText}</span>
      </div>
      <div className={classNames(scss.logoIconWrapper)}>
        <LogoIcon className={classNames(scss.logoIcon)} />
      </div>
      <div className={classNames(scss.datediv)}>
        <span className={classNames(scss.datetext)}>
          {DateUtil.formatFromTo(item.startTime, item.endTime)}
        </span>
      </div>
      <div className={classNames(scss.titlediv)}>
        <span className={classNames(scss.titletext)}>{item.name}</span>
      </div>
      <div className={classNames(scss.locationdiv, hideNewsField)}>
        <span>地点: </span>
        <span className={classNames(scss.locationdivtext)}>{item.location}</span>
      </div>
      <div className={classNames(scss.ownerdiv, hideNewsField)}>
        { item.sponsor && (
              <span>主办方: {item.sponsor}</span>
          )
        }
        { item.guest && (
              <span> / 活动嘉宾: {item.guest}</span>
            )
        }
      </div>
      <div className={classNames(scss.describediv)}>
        {item.description}
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
