import React, {Component} from 'react';
import ActivityApiService from "../../ScreenComponent/ActivityApiService";

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
      return (
        <div key={activity.id}>{activity.name}</div>
      );
    });

    return (
      <div>{items}</div>
    )
  }
}

export default EventList;
