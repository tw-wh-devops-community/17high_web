import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import gift from "./image/gift.png";
import DateUtilComponent from "./DateUtilComponent";

var dateUtil = new DateUtilComponent();

class DetailComponent extends Component {
  render() {
    var item = this.props.activity;
    var style = classNames(scss.detaildiv, scss[item.imageURL]);

    return (
      <div className={style} data-additionflag={this.props.addition}>

        <div className={classNames(scss.typediv)}>
          <img src={gift} className={classNames(scss.typeicon)}/><span className={classNames(scss.typetext)}>活动</span>
        </div>
        <div className={classNames(scss.datediv)}>
          <span className={classNames(scss.datetext)}>{dateUtil.formatFromTo(item.startTime, item.endTime)}</span>
        </div>
        <div className={classNames(scss.titlediv)}>
          <span className={classNames(scss.titletext)}>{item.name}</span>
        </div>
        <div className={classNames(scss.locationdiv)}>
          <span className={classNames(scss.locationdivtext)}>{item.location}</span>
        </div>
        <div className={classNames(scss.ownerdiv)}>
          <span>主办方:</span>
          <span>{item.sponsor.lastName + " " + item.sponsor.firstName}</span>
          /
          <span>活动嘉宾:</span>
          <span>-</span>
        </div>
        <div className={classNames(scss.describediv)}>
          {item.longDescription}
        </div>
      </div>
    );
  }
}

export default DetailComponent;
