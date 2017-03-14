import React from 'react';
import classNames from 'classnames';
import { transition } from './DemoComponent.scss';

const DemoComponent = () =>
  <p className={classNames(transition)}>Hi,fine,ok</p>;

export default DemoComponent;
