import React from 'react';
import Header from '../Header';
import Notification from './NotificationComponent';

class DashboardComponent extends React.Component {
  render() {
    return(
      <div>
        <Header/>
        <Notification/>
      </div>
    )
  }
}

export default DashboardComponent;
