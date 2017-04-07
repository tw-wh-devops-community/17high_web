import React from 'react';
import '../css/header.css';

const editImage = require('../../image/edit.png');
const messageImage = require('../../image/message.png');
const downArrowImage = require('../../image/down_arrow.png');

class Header extends React.Component {

  render() {
    return (
      Header.getHeader()
    );
  }

  static getHeader() {
    return (
      <div className="headerContainer">
        <div className="header">
          <div className="projectName">
            17 High
          </div>
          <div className="launch">
            <button className="launchText" onClick={Header.goToEditorPage()}>+ 发布公告</button>
          </div>

          <div className="rightContainer">
            <div className="innerContainer">
              <img alt="" src={ editImage } />
              <img alt="" src={ messageImage } />
              <div className="divider">|</div>
              <div className="userNameContainer">
                <div className="nameText">NAME</div>
                <img alt="" className="nameTextArrow" src={ downArrowImage } />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  static goToEditorPage() {
    window.location = '/#/editor';
  }
}

export default Header;
