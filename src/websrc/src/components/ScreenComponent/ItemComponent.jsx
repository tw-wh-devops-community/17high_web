import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import DateUtilComponent from "./DateUtilComponent";

var dateUtil = new DateUtilComponent();

class ItemComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var recentStyle = classNames(scss.recentitemdiv);
    if (this.props.active == true) {
      recentStyle = classNames(scss.recentitemdiv, scss.recentitemactive);
    }

    var activity = this.props.activity;

    return (
      <div className={recentStyle}>
        <div className={classNames(scss.recentitemdate)}>{dateUtil.formatFromTo(activity.startTime, activity.startTime)}</div>
        <div className={classNames(scss.recentitemtitle)}>{activity.name}</div>
      </div>
    );
  }
}

export default ItemComponent;
