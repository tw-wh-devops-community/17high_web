import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import gift from "./image/gift.png";
import news from "./image/news.png";
import DateUtilComponent from "./DateUtilComponent";

var dateUtil = new DateUtilComponent();

class DetailComponent extends Component {
  render() {
    var item = this.props.activity;
    var style = classNames(scss.detaildiv, scss[item.imageURL]);
    var typeText = "活动";
    var typeicon = gift;
    var hideNewsField="";
    if(item.type == "NEWS"){
      typeText = "新闻";
      typeicon = news;
      hideNewsField = scss.hideinfo;
    }

    return (
      <div className={style} data-additionflag={this.props.addition}>

        <div className={classNames(scss.typediv)}>
          <img src={typeicon} className={classNames(scss.typeicon)}/><span className={classNames(scss.typetext)}>{typeText}</span>
        </div>
        <div className={classNames(scss.datediv)}>
          <span className={classNames(scss.datetext)}>{dateUtil.formatFromTo(item.startTime, item.endTime)}</span>
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
