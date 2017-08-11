import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import NewsIcon from './svg/NewsIcon';
import ActivityIcon from './svg/ActivityIcon';
import LogoIcon from './svg/LogoIcon';
import DateUtil from './DateUtils';

const DetailComponent = (props) => {
  const item = props.activity;
  const style = classNames(scss.detaildiv, scss[item.imageURL]);
  let hideNewsField = '';
  let typeicon = ActivityIcon;
  if (item.type === 'NEWS') {
    typeicon = NewsIcon;
    hideNewsField = scss.hideinfo;
  } else {
    item.type = 'SESSION';
  }

  return (
    <div className={style} data-additionflag={props.addition}>
      <div className={classNames(scss.typediv)}>
        { typeicon({ className: classNames(scss.labelIcon) }) }
        <span className={classNames(scss.typetext)}><FormattedMessage id={item.type} /></span>
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
        <span className={classNames(scss.locationdivtext)}>{item.location}</span>
      </div>
      <div className={classNames(scss.ownerdiv, hideNewsField)}>
        <span><FormattedMessage id="hold_by" />:</span>
        <span>{item.sponsor}</span>
        /
        <span><FormattedMessage id="guest" />:</span>
        <span>{item.guest}</span>
      </div>
      <div className={classNames(scss.describediv)}>
        {item.description}
      </div>
    </div>
  );
};

DetailComponent.propTypes = {
  activity: PropTypes.shape({
    sponsor: PropTypes.string,
    location: PropTypes.string,
    guest: PropTypes.string,
    description: PropTypes.string,
    endTime: PropTypes.date,
    name: PropTypes.string,
    type: PropTypes.string,
    imageURL: PropTypes.string
  }).isRequired,
  addition: PropTypes.string.isRequired
};


export default DetailComponent;
