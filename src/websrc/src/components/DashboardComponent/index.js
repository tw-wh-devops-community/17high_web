import React, {Component} from 'react';
import Header from '../Header';
import Notification from './NotificationComponent';
import EventList from './EventList';
import FilterDropDown from './FilterDropDown';


class DashboardComponent extends Component {
  state = {
    filter: 'createTime'
  }

  render() {
    return (
      <div className="pageContainer dashboardPage">
        <Header/>
        <Notification/>
        <div className='contentContainer'>
          <div className="content">
            <FilterDropDown {...this.state} onSelect={ filter => this.setState({ filter }) }/>
            <EventList {...this.state}/>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
