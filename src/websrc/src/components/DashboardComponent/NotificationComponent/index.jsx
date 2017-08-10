import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
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
      return this.notificationTemplate(<FormattedMessage id="dashboard_label_post_success" />);
    } else if (window.location.hash.match('activityUpdated')) {
      return this.notificationTemplate(<FormattedMessage id="dashboard_label_update_success" />);
    } else if (window.location.hash.match('newsPublished')) {
      return this.notificationTemplate(<FormattedMessage id="dashboard_label_post_news_success" />);
    } else if (window.location.hash.match('newsUpdated')) {
      return this.notificationTemplate(<FormattedMessage id="dashboard_label_update_news_success" />);
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
