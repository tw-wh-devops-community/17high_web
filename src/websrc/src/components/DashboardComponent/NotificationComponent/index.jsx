import React, { Component } from 'react';
import $ from 'jquery';
import classNames from 'classnames/bind';
import styles from '../../css/notification.scss';


const cx = classNames.bind(styles);

class NotificationComponent extends Component {

  componentDidMount() {
    window.scrollTo(0, 0);
    $('.notificationContainer').fadeIn(2000).delay(2000).fadeOut(1000);
    window.location.href = window.location.href.replace('publishSuccessful', '');
  }

  render() {
    return this.generateNotification();
  }

  generateNotification() {
    if (window.location.hash.match('activityPublished')) {
      return this.notificationTemplate('活动发布成功');
    } else if (window.location.hash.match('activityUpdated')) {
      return this.notificationTemplate('活动更新成功');
    } else if (window.location.hash.match('newsPublished')) {
      return this.notificationTemplate('新闻发布成功');
    } else if (window.location.hash.match('newsUpdated')) {
      return this.notificationTemplate('新闻更新成功');
    } else {
      return (<div></div>);
    }
  }

  notificationTemplate(message) {
    return (
      <div className={cx('notificationContainer')}>
        <div className={cx('notificationText')}>{ message }</div>
      </div>
    );
  }
}

export default NotificationComponent;
