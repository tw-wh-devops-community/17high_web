import React from 'react';
import Header from '../Header';
import Notification from './NotificationComponent';
import EventList from './EventList';

class DashboardComponent extends React.Component {
  render() {
    return (
      <div className="pageContainer dashboardPage">
        <Header/>
        <Notification/>
        <div className='contentContainer'>
          <div className="content">
            <EventList/>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardComponent;
