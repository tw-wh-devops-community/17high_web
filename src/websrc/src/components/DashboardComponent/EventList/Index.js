import React, {Component} from 'react';
import ActivityApiService from "../../ScreenComponent/ActivityApiService";

import scss from  "./eventList.scss";

const activityApiService = new ActivityApiService();

class EventList extends Component {

  constructor() {
    super();
    this.state = {items: []};

    activityApiService.list("/v1/activities?size=10&page=0").then((data) => {
      this.setState({items: data});
    });
  }

  render() {
    let items = this.state.items.map(function (activity, index) {
      if(activity.type === 'SESSION') {
        return (
          <div key={activity.id}>
            <div className={scss.title}>[活动] {activity.name}</div>
            <div>活动时间:{activity.startTime} - {activity.endTime} 活动地点:{activity.location} 主办方:{activity.sponsor}</div>
            <div>{activity.description}</div>
            <br/>
          </div>
        );
      } else if(activity.type === 'NEWS') {
        return (
          <div key={activity.id}>
            <div className={scss.title}>[新闻] {activity.name}</div>
            <div>展示时间:{activity.startTime} - {activity.endTime}</div>
            <div>{activity.description}</div>
            <br/>
          </div>
        );
      } else {
        return (
          <div>未知的活动类型</div>
        )
      }
    });

    return (
      <div>{items}</div>
    )
  }
}

export default EventList;
