import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import ItemComponent from "./ItemComponent";
import ActivityApiService from "./ActivityApiService";

let activityApiService = new ActivityApiService();

class RecentComponent extends Component {
  constructor(props) {
    super(props);
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

  notify = (currentActivity, preActivity) => this.props.change(currentActivity, preActivity);

  fetchData = (firstTime) => {
    activityApiService.list('/v1/activities?size=6&page=0&sort=startTime&sort.dir=asc&validation=true').then(items => {
      if(JSON.stringify(this.state.items) !== JSON.stringify(items)) {
        if(firstTime) {
          this.notify(items[0]);
        }
        this.setState({items});
      }
    });
  }

  initInterval = () => {
    this.timer.push(setInterval(() => {
      let items = this.state.items;
      let index = this.current % items.length;
      let pre = items[index];

      this.current++;
      if (items == undefined || items.length == 0) {
        return;
      }
      index = this.current % items.length;
      this.notify(items[index], pre);

      this.setState({items: items, current: this.current});
    }, 3000));

    this.timer.push(setInterval(this.fetchData, 30000));
  }

  componentWillUnmount() {
    this.timer && this.timer.length && this.timer.forEach(interval => clearInterval(interval));
  }

  render() {
    let size = this.state.items.length;
    let that = this;
    let items = this.state.items.map(function (activity, index) {
      return (
        <ItemComponent activity={activity} key={activity.id} active={index == (that.current % size)}/>
      );
    });
    return (
      <div className={classNames(scss.recentdiv)}>
        <div className={classNames(scss.recenttext)}>近期活动</div>
        <div className={classNames(scss.recentlistdiv)}>
          {items}
        </div>
      </div>
    );
  }
}

export default RecentComponent;
