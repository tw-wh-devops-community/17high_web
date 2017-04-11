import React, { Component } from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import ItemComponent from './ItemComponent';
import ActivityApiService from './ActivityApiService';

class RecentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = { items: [], current: 0 };
    const that = this;
    ActivityApiService.list().then((data) => {
      that.notify(data[0]);
      that.setState({ items: data });
    });
    this.current = 0;
    this.startLoop();
  }

  notify(currentActivity, preActivity) {
    this.props.change(currentActivity, preActivity);
  }

  startLoop = () => {
    this.interval = setInterval(() => {
      const items = this.state.items;
      let index = this.current % items.length;
      const pre = items[index];
      this.current += 1;
      if (items === undefined || items.length === 0) {
        return;
      }
      index = this.current % items.length;
      this.notify(items[index], pre);

      this.setState({ items, current: this.current });
    }, 3000);
  };

  componentWillUnmount() {
    this.stopLoop();
  }

  stopLoop() {
    clearInterval(this.interval);
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
}

export default RecentComponent;
