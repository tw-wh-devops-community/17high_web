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

    var formatFromTo = dateUtil.formatFromTo(activity.startTime, activity.startTime);
    return (
      <div className={recentStyle}>
        <div className={classNames(scss.recentitemdate)}>{formatFromTo}</div>
        <div className={classNames(scss.recentitemtitle)}>{activity.name}</div>
      </div>
    );
  }
}

export default ItemComponent;
