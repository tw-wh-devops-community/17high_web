import React from 'react';
import $ from 'jquery';
import classNames from 'classnames/bind';

import styles from '../../css/notification.scss';


const cx = classNames.bind(styles);

class NotificationComponent extends React.Component {

  render() {
    return (
      <div className={'notificationContainer'}>
        <div className={cx('notificationText')}>活动发布成功!</div>
      </div>
    );
  }

  componentDidMount() {
    if (window.location.hash.match('publishSuccessful')) {
      $('.notificationContainer').fadeIn(2000).delay(2000).fadeOut(1000);
      window.location.href = window.location.href.replace('publishSuccessful', '');
    }
  }
}

export default NotificationComponent;
