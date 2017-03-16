import React, {Component} from "react";
import classNames from "classnames";
import scss from "./ScreenComponent.scss";
import RecentComponent from "./RecentComponent";
import DetailComponent from "./DetailComponent";

class ScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.activity = {
      name: "",
      startTime: new Date(),
      endTime: new Date(),
      sponsor: {lastName: "", firstName: ""},
      location: "",
      longDescription: ""
    };
    var that = this;
    this.onChange = function (activiy) {
      that.activity = activiy;
      that.setState({time: new Date()});
    };
  }

  render() {
    return (

      <div className={classNames(scss.screen)}>

        <RecentComponent change={this.onChange}/>

        <DetailComponent activity={this.activity}/>

      </div>
    );
  }
}

export default ScreenComponent;
