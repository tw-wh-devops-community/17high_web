import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import ItemComponent from "./ItemComponent";
import ActivityApiService from "./ActivityApiService";

var activityApiService = new ActivityApiService();

class RecentComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {items: [],current: 0};
    var that = this;

    activityApiService.list().then(function (data) {
      that.setState({items: data});
    });
    this.current = 0;
    setInterval(function () {
      that.current++;
      that.setState({items: that.state.items, current: that.current});
    }, 2000);
  }

  render() {

    var size = this.state.items.length;
    console.log("size:" + size);
    console.log("current:" + this.current);

    console.log("result: " + (this.current%size));
    var that = this;
    var items = this.state.items.map(function (activity, index) {
      return (
        <ItemComponent activity={activity} key={activity.id} active={index == (that.current%size)}/>
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
