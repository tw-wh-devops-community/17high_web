import React from 'react';
import '../css/header.css';

class Header extends React.Component {

  render() {
    return (
      this.getHeader()
    )
  }

  getHeader() {
    return (
      <div className='headerContainer'>
        <div className='header'>
          <div className='projectName'>
            17 high
          </div>
          <div className='launch'>
            <div className="launchText">+ 发布公告</div>
          </div>

          <div className="rightContainer">
            <div className="innerContainer">
              <img src={require('../../image/edit.png')}/>
              <img src={require('../../image/message.png')}/>
              <div className="divider">|</div>
              <div className="userNameContainer">
                <div className="nameText">NAME</div>
                <img className="nameTextArrow" src={require("../../image/down_arrow.png")}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header;
