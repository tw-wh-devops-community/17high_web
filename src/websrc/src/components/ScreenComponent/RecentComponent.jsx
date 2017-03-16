import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import ItemComponent from "./ItemComponent"

class RecentComponent extends Component {

  getInitialState(){
    return {
      "items":[]
    };
  }

  render(){
    return (
      <div className={classNames(scss.recentdiv)}>
        <div className={classNames(scss.recenttext)}>近期活动</div>
        <div className={classNames(scss.recentlistdiv)}>
          <ItemComponent />
          <ItemComponent />
          <ItemComponent />
          <ItemComponent />
          <ItemComponent />
          <ItemComponent />
        </div>
      </div>
    );
  }
}

export default RecentComponent;
