import React, { Component } from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";

class ItemComponent extends Component{

  constructor(props) {
    super(props);
    console.log(props);
  }

  formatDate(from, to){
    var begin = new Date(from);
    var end = new Date(to);

    return begin.getMonth()+ "月" + begin.getDate() + "日" + begin.getHours() + ":" + begin.getMinutes() + " - " + end.getHours() + ":" + end.getMinutes();
  }

  render(){
    var recentStyle = classNames(scss.recentitemdiv);
    if(this.props.active == true){
      recentStyle = classNames(scss.recentitemdiv, scss.recentitemactive);
      console.log("----" + recentStyle);
    }
    console.log(recentStyle);

    var activity = this.props.activity;

    return (
      <div className={recentStyle}>
        <div className={classNames(scss.recentitemdate)}>{this.formatDate(activity.startTime,activity.startTime)}</div>
        <div className={classNames(scss.recentitemtitle)}>{activity.name}</div>
      </div>
    );
  }
}

export default ItemComponent;
