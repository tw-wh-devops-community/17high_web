import React, {Component, Proptypes} from 'react';
import ActivityApiService from "../../ScreenComponent/ActivityApiService";
import classNames from 'classnames/bind';
import scss from  "./eventList.scss";

const activityApiService = new ActivityApiService();
const cx = classNames.bind(scss);

const SORT_DIRECTION = {
  'startTime': 'asc',
  'createTime': 'desc'
};

class EventList extends Component {

  state = {
    items: [],
    displayedIds: []
  }

  componentDidMount() {
    this.updateData(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    let filter = nextProps.filter;
    if(filter != this.props.filter) {
      this.updateData(filter);
    }
  }

  buildUrl(size, page, sort, validation = true) {
    return `/v1/activities?size=${size}&page=${page}&sort=${sort}&validation=${validation}`;
  }

  updateData(filter) {
    this.fetchData(this.buildUrl(16, 0, `${filter},${SORT_DIRECTION[filter]}`), data => this.setState({
      items: data
    }));

    this.fetchData(this.buildUrl(6, 0, `startTime,${SORT_DIRECTION['startTime']}`), data => {
      let displayedIds = [];
      data && data.forEach(item => displayedIds.push(item.id));
      this.setState({
        displayedIds
      });
    }
  );
  }

  fetchData(url, callback) {
    activityApiService.list(url).then(
       data => callback(data)
    );
  }

  render() {
    const titleClassNames = id => cx({
      'title': true,
      'displayed': this.state.displayedIds.indexOf(id) > -1
    });

    return (
      <div className={cx('event-list-container')}>
        {
          this.state.items.map(activity => {
            if(activity.type === 'SESSION') {
              return (
                <div key={activity.id}>
                  <div className={titleClassNames(activity.id)}>[活动] &nbsp;{activity.name}</div>
                  <div className={cx('activity-loc-time')}>活动时间:{activity.startTime} - {activity.endTime} 活动地点:{activity.location} 主办方:{activity.sponsor}</div>
                  <div className={cx('activity-desc')}>{activity.description}</div>
                  <div className={cx('activity-owner')}>{activity.createTime} {activity.owner} 发布</div>
                  <br/>
                </div>
              );
            } else if (activity.type === 'NEWS') {
              return (
                <div key={activity.id}>
                  <div className={titleClassNames(activity.id)}>[新闻] &nbsp;{activity.name}</div>
                  <div className={cx('activity-loc-time')}>展示时间:{activity.startTime} - {activity.endTime}</div>
                  <div className={cx('activity-desc')}>{activity.description}</div>
                  <div className={cx('activity-owner')}>{activity.createTime} {activity.owner} 发布</div>
                  <br/>
                </div>
              );
            } else {
              return <div>未知的活动类型</div>;
            }
          })
        }
      </div>
    )
  }
}

export default EventList;
