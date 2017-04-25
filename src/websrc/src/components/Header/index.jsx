import React from 'react';
import {Link} from "react-router";
import classNames from 'classnames/bind';
import styles from '../css/header.scss';

const editImage = require('../../image/edit.png');
const messageImage = require('../../image/message.png');
const downArrowImage = require('../../image/down_arrow.png');

const cx = classNames.bind(styles);

class Header extends React.Component {

  render() {
    return (
      Header.getHeader()
    );
  }

  static getHeader() {
    return (
      <div className={cx('headerContainer')}>
        <div className={cx('header')}>
          <div className={cx('projectName')}>
            17 High
          </div>
          <div className={cx('launch')}>
            <button className={cx('launchText')}><Link to={ 'editor'}>发布公告</Link></button>
          </div>

          <div className={cx('rightContainer')}>
            <div className={cx('innerContainer')}>
              <img alt="" src={ editImage } />
              <img alt="" src={ messageImage } />
              <div className={cx('divider')}>|</div>
              <div className={cx('userNameContainer')}>
                <div className={cx('nameText')}>NAME</div>
                <img
                  alt=""
                  className={cx('nameTextArrow')}
                  src={ downArrowImage } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
