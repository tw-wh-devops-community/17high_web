import React from 'react';
import classNames from 'classnames';
import scss from './ScreenComponent.scss';
import gift from './gift.png';

const ScreenComponent = () =>
  <div className={classNames(scss.screen)}>

    <div className={classNames(scss.recentdiv)}>
      <div className={classNames(scss.recenttext)}>近期活动</div>
      <div className={classNames(scss.recentlistdiv)}>
        <div className={classNames(scss.recentitemdiv)}>
          <div className={classNames(scss.recentitemdate)}>3月2日 12:00－14:00</div>
          <div className={classNames(scss.recentitemtitle)}>OFFICE UPDATE</div>
        </div>
        <div className={classNames(scss.recentitemdiv)}>
          <div className={classNames(scss.recentitemdate)}>3月4日 9:00－17:00</div>
          <div className={classNames(scss.recentitemtitle)}>设计思维工作坊</div>
        </div>
        <div className={classNames(scss.recentitemdiv, scss.recentitemactive)}>
          <div className={classNames(scss.recentitemdate)}>3月7日 9:00－3月8日 17:00</div>
          <div className={classNames(scss.recentitemtitle)}>三月八日放假通知</div>
        </div>
        <div className={classNames(scss.recentitemdiv)}>
          <div className={classNames(scss.recentitemdate)}>3月12日 9:00－17:00</div>
          <div className={classNames(scss.recentitemtitle)}>BATTT培训第4期</div>
        </div>
        <div className={classNames(scss.recentitemdiv)}>
          <div className={classNames(scss.recentitemdate)}>3月16日 9:00－17:00</div>
          <div className={classNames(scss.recentitemtitle)}>TW技术分享大会</div>
        </div>
        <div className={classNames(scss.recentitemdiv)}>
          <div className={classNames(scss.recentitemdate)}>3月22日 12:00－13:30</div>
          <div className={classNames(scss.recentitemtitle)}>摄影 session 分享</div>
        </div>
      </div>
    </div>

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
