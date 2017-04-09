import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import ItemComponent from "./ItemComponent";
import ActivityApiService from "./ActivityApiService";

var activityApiService = new ActivityApiService();

class RecentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [], current: 0};
    var that = this;

    activityApiService.list("/v1/activities?size=6&page=0").then(function (data) {
      that.notify(data[0]);
      that.setState({items: data});
    });
    this.current = 0;
    this.startLoop();
  }

  notify(currentActivity, preActivity){
    this.props.change(currentActivity, preActivity);
  }

  startLoop() {
    var that = this;
    this.interval = setInterval(function () {
      var items = that.state.items;
      var index = that.current % items.length;
      var pre = items[index];

      that.current++;
      if (items == undefined || items.length == 0) {
        return;
      }
      index = that.current % items.length;
      that.notify(items[index], pre);

      that.setState({items: items, current: that.current});
    }, 3000)
  }



  componentWillUnmount() {
    this.stopLoop();
  }

  stopLoop() {
    clearInterval(this.interval);
  }

  render() {

    var size = this.state.items.length;
    var that = this;
    var items = this.state.items.map(function (activity, index) {
      return (
        <ItemComponent activity={activity} key={activity.id} active={index == (that.current % size)}/>
      );
    });
    return (
      <div className={classNames(scss.recentdiv)}>
        <div className={classNames(scss.recenttext)} onClick={this.stopLoop.bind(this)}>近期活动</div>
        <div className={classNames(scss.recentlistdiv)}>
          {items}
        </div>
      </div>
    );
  }
}

export default RecentComponent;
