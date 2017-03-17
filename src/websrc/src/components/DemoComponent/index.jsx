import React from 'react';
import classNames from 'classnames';
import scss from './DemoComponent.scss';
import { Link } from 'react-router'

const DemoComponent = () =>
  <div  className={classNames(scss.screen)}>
    <Link className={classNames(scss.screenlink)} to="screen"><h2>活动滚屏显示效果</h2></Link>
  </div>

export default DemoComponent;
