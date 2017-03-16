import React from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import gift from './gift.png';
import RecentComponent from "./RecentComponent"

const ScreenComponent = () =>
  <div className={classNames(scss.screen)}>

    <RecentComponent />

    <div className={classNames(scss.detaildiv)}>
      <div className={classNames(scss.typediv)}>
        <img src={gift} className={classNames(scss.typeicon)} /><span className={classNames(scss.typetext)}>活动</span>
      </div>
      <div className={classNames(scss.datediv)}>
        <span className={classNames(scss.datetext)}>3月4日 9:00 - 17:00</span>
      </div>
      <div className={classNames(scss.titlediv)}>
        <span className={classNames(scss.titletext)}>Thoughtworks Android Session技术大会</span>
      </div>
      <div className={classNames(scss.locationdiv)}>
        <span className={classNames(scss.locationdivtext)}>武汉 武当山会议室</span>
      </div>
      <div className={classNames(scss.ownerdiv)}>
        <span>主办方:</span>
        <span>谢威 QA community</span>
        /
        <span>活动嘉宾:</span>
        <span>万学凡</span>
      </div>
      <div className={classNames(scss.describediv)}>
        面对充满负责和不确定的商业环境，只依靠经验，运用左脑思维方式解决问题是远远不够的，小伙伴赶紧报名来参加吧，机会难得哦~
      </div>
    </div>

  </div>;

export default ScreenComponent;
