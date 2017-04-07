import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import $ from 'jquery';
import scss from './ScreenComponent.scss';
import RecentComponent from './RecentComponent';
import DetailComponent from './DetailComponent';


class ScreenComponent extends Component {

  constructor(props) {
    super(props);
    this.defaultActivity = {
      name: '',
      startTime: new Date(),
      endTime: new Date(),
      sponsor: '',
      guest: '',
      type: 'SESSION',
      location: '',
      description: '',
      imageURL: 'style1'
    };
    this.activity = this.defaultActivity;
    this.preActivity = this.defaultActivity;

    this.screens = ['firstDetail', 'secondDetail', 'thirdDetail'];
    this.current = 0;
  }

  onChange = (activiy, preActivity) => {
    let previous = preActivity;
    if (previous === undefined) {
      previous = this.defaultActivity;
    }
    this.activity = activiy;
    this.preActivity = previous;
    this.setState({ time: new Date() });
  };

  componentDidMount() {
    this.inturnShowDetail();
  }

  inturnShowDetail(dealwithTopMethod) {
    this.current -= 1;
    if (this.current < 0) {
      this.current = this.screens.length - 1;
    }

    const el = findDOMNode(this);
    const windowHeight = el.clientHeight;

    const outScreenName = this.screens[(this.current + 2) % this.screens.length];
    const $outerScreen = $(`[name='detailScreen'] [data-additionflag='${outScreenName}']`);
    $outerScreen.css('top', windowHeight);
    $outerScreen.css('bottom', -windowHeight);

    if (dealwithTopMethod !== undefined) {
      dealwithTopMethod.call(this, $outerScreen);
    }


    const preScreenName = this.screens[(this.current + 1) % this.screens.length];
    const $preScreen = $(`[name='detailScreen'] [data-additionflag='${preScreenName}']`);
    $preScreen.css('top', -windowHeight);
    $preScreen.css('bottom', windowHeight);

    const currentScreenName = this.screens[(this.current) % this.screens.length];
    const $currentScreen = $(`[name='detailScreen'] [data-additionflag='${currentScreenName}']`);
    $currentScreen.css('top', 0);
    $currentScreen.css('bottom', 0);
  }

  componentDidUpdate() {
    this.inturnShowDetail(($outerScreen) => {
      $outerScreen.css('display', 'none');
      setTimeout(() => {
        $outerScreen.css('display', '');
      }, 1300);
    });
  }

  render() {
    let first = this.activity;
    let second = this.activity;
    let third = this.activity;
    switch (this.current) {
      case 0:
        first = this.preActivity;
        third = this.activity;
        break;
      case 1:
        second = this.preActivity;
        first = this.activity;
        break;
      case 2:
        third = this.preActivity;
        second = this.activity;
        break;
      default:
    }
    return (
      <div className={classNames(scss.screen)}>
        <div name="detailScreen">
          <DetailComponent activity={third} addition={this.screens[2]} />
          <DetailComponent activity={second} addition={this.screens[1]} />
          <DetailComponent activity={first} addition={this.screens[0]} />
        </div>
        <RecentComponent change={this.onChange} />
      </div>
    );
  }
}

export default ScreenComponent;
