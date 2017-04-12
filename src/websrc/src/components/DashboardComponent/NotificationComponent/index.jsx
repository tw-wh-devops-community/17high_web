import React, { Component } from 'react';
import $ from 'jquery';
import classNames from 'classnames/bind';

import styles from '../../css/notification.scss';


const cx = classNames.bind(styles);

class NotificationComponent extends Component {

  componentDidMount() {
    if (window.location.hash.match('publishSuccessful')) {
      window.scrollTo(0, 0);
      $('.notificationContainer').fadeIn(2000).delay(2000).fadeOut(1000);
      window.location.href = window.location.href.replace('publishSuccessful', '');
    }
  }

  render() {
    return (
      <div className={'notificationContainer'}>
        <div className={cx('notificationText')}>活动发布成功!</div>
      </div>
    );
  }
}

export default NotificationComponent;
