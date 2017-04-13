import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import NewsIcon from "./svg/NewsIcon";
import ActivityIcon from "./svg/ActivityIcon";
import LogoIcon from "./svg/LogoIcon";
import DateUtil from "./DateUtils";

class DetailComponent extends Component {
  render() {
    let item = this.props.activity;
    let style = classNames(scss.detaildiv, scss[item.imageURL]);
    let typeText = "活动";
    let hideNewsField="";
    let typeicon = ActivityIcon;
    if(item.type == "NEWS"){
      typeText = "新闻";
      typeicon = NewsIcon;
      hideNewsField = scss.hideinfo;
    }

    return (
      <div className={style} data-additionflag={this.props.addition}>
        <div className={classNames(scss.typediv)}>
          { typeicon({ className: classNames(scss.labelIcon) }) }<span className={classNames(scss.typetext)}>{typeText}</span>
        </div>
        <div className={classNames(scss.logoIconWrapper)}>
          <LogoIcon className={classNames(scss.logoIcon)}/>
        </div>
        <div className={classNames(scss.datediv)}>
          <span className={classNames(scss.datetext)}>{DateUtil.formatFromTo(item.startTime, item.endTime)}</span>
        </div>
        <div className={classNames(scss.titlediv)}>
          <span className={classNames(scss.titletext)}>{item.name}</span>
        </div>
        <div className={classNames(scss.locationdiv, hideNewsField)}>
          <span className={classNames(scss.locationdivtext)}>{item.location}</span>
        </div>
        <div className={classNames(scss.ownerdiv, hideNewsField)}>
          <span>主办方:</span>
          <span>{item.sponsor}</span>
          /
          <span>活动嘉宾:</span>
          <span>{item.guest}</span>
        </div>
        <div className={classNames(scss.describediv)}>
          {item.description}
        </div>
      </div>
    );
  }
}

export default DetailComponent;
