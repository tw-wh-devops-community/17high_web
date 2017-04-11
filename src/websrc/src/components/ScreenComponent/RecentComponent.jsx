import React, { Component } from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import ItemComponent from './ItemComponent';
import ActivityApiService from './ActivityApiService';


class RecentComponent extends Component {
  static propTypes = {
    change: PropTypes.func.isRequired
  }

  constructor() {
    super();
    this.current = 0;
    this.timer = [];
    this.fetchData(true);

    this.state = {
      items: [],
      current: 0
    };
  }

  componentDidMount() {
    this.initInterval();
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  render() {
    const size = this.state.items.length;
    const that = this;
    const items = this.state.items.map((activity, index) => (
      <ItemComponent
        activity={activity}
        key={activity.id}
        active={index === (that.current % size)} />
    ));
    return (
      <div className={classNames(scss.recentdiv)}>
        <button className={classNames(scss.recenttext)} onClick={ this.stopLoop }>近期活动</button>
        <div className={classNames(scss.recentlistdiv)}>
          {items}
        </div>
      </div>
    );
  }

  fetchData = (firstTime) => {
    ActivityApiService.list('/v1/activities?size=6&page=0&sort=startTime&sort.dir=asc&validation=true').then((items) => {
      if (JSON.stringify(this.state.items) !== JSON.stringify(items)) {
        if (firstTime) {
          this.notify(items[0]);
        }
        this.setState({ items });
      }
    });
  }

  initInterval = () => {
    this.timer.push(setInterval(() => {
      const items = this.state.items;
      let index = this.current % items.length;
      const pre = items[index];

      this.current += 1;
      if (items === undefined || items.length === 0) {
        return;
      }
      index = this.current % items.length;
      this.notify(items[index], pre);

      this.setState({ items: items, current: this.current });
    }, 3000));

    this.timer.push(setInterval(this.fetchData, 30000));
  }

  clearTimer() {
    this.timer && this.timer.length && this.timer.forEach(interval => clearInterval(interval));
  }

  notify = (currentActivity, preActivity) => this.props.change(currentActivity, preActivity);

}

export default RecentComponent;
