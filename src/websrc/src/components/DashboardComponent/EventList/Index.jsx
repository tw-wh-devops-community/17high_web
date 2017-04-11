import React, { Component, Proptypes } from 'react';
import classNames from 'classnames/bind';
import ActivityApiService from '../../ScreenComponent/ActivityApiService';
import scss from './eventList.scss';

const activityApiService = new ActivityApiService();
const cx = classNames.bind(scss);

const SORT_DIRECTION = {
  startTime: 'asc',
  createTime: 'desc'
};

class EventList extends Component {
  static propTypes = {
    filter: Proptypes.string
  }

  static defaultProps = {
    filter: 'createTime'
  }

  state = {
    items: [],
    displayedIds: []
  }

  componentDidMount() {
    this.updateData(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    const filter = nextProps.filter;
    if (filter !== this.props.filter) {
      this.updateData(filter);
    }
  }

  render() {
    const titleClassNames = id => cx({
      title: true,
      displayed: this.state.displayedIds.indexOf(id) > -1
    });

    const formatDate = date => {
      return date.split('-').join('/');
    };

    return (
      <div className={cx('event-list-container')}>
        {
          this.state.items.map((activity) => {
            const startTime = formatDate(activity.startTime);
            const endTime = formatDate(activity.endTime);
            const createTime = formatDate(activity.createTime);

            if (activity.type === 'SESSION') {
              return (
                <div key={activity.id} className={ cx('activity-event') }>
                  <div className={ titleClassNames(activity.id) }>[活动] &nbsp;{ activity.name }</div>
                  <div className={ cx('activity-loc-time') }>活动时间:{ startTime } - { endTime } 活动地点:{ activity.location } 主办方:{ activity.sponsor }</div>
                  <div className={ cx('activity-desc') }>{ activity.description }</div>
                  <div className={ cx('activity-owner') }>{ createTime } { activity.owner } 发布</div>
                  <br />
                </div>
              );
            } else if (activity.type === 'NEWS') {
              return (
                <div key={ activity.id } className={ cx('activity-event') }>
                  <div className={ titleClassNames(activity.id) }>[新闻] &nbsp;{ activity.name }</div>
                  <div className={ cx('activity-loc-time') }>展示时间:{ startTime } - { endTime }</div>
                  <div className={ cx('activity-desc') }>{ activity.description }</div>
                  <div className={ cx('activity-owner') }>{ createTime } { activity.owner } 发布</div>
                  <br />
                </div>
              );
            }

            return <div>未知的活动类型</div>;
          })
        }
      </div>
    );
  }

  updateData(filter) {
    this.fetchData(this.buildUrl(16, 0, `${filter},${SORT_DIRECTION[filter]}`), (data) => {
      this.setState({
        items: data
      });
    });

    this.fetchData(this.buildUrl(6, 0, `startTime,${SORT_DIRECTION.startTime}`), data => {
        const displayedIds = [];
        data && data.forEach(item => displayedIds.push(item.id));
        this.setState({
          displayedIds
        });
      }
    );
  }

  fetchData = (url, callback) => {
    activityApiService.list(url).then(
      data => callback(data)
    );
  }

  buildUrl = (size, page, sort, validation = true) => {
    return `/v1/activities?size=${size}&page=${page}&sort=${sort}&validation=${validation}`;
  }
}

export default EventList;
