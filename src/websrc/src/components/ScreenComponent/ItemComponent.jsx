import React, { Component } from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";

class ItemComponent extends Component{
  render(){
    return (
      <div className={classNames(scss.recentitemdiv)}>
        <div className={classNames(scss.recentitemdate)}>3月2日 12:00－14:00</div>
        <div className={classNames(scss.recentitemtitle)}>OFFICE UPDATE</div>
      </div>
    );
  }
}

export default ItemComponent;
