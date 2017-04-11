import React, {Component} from 'react';
import AccountApiService from './AccountApiService';
import classNames from 'classnames';
import scss from './LoginComponent.scss';
import {Link} from 'react-router';

var accountApiService = new AccountApiService();

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    var that = this;
    accountApiService.getLoginInfo().then(function (account) {
      that.account = account;
      that.setState({time: new Date()});
    });
    this.account = {};
  }

  render() {
    return (
      <div>
        <div className={classNames(scss.accountinfo)}>acount:{JSON.stringify(this.account)}</div>
        <form action="/saml/logout" method="post">
          <input type="hidden" name="local" value="false"/>
          <input className={classNames(scss.screenlink)} type="submit" value="Log Out"/>
        </form>

        <div className={classNames(scss.screen)}>
          <Link className={classNames(scss.screenlink)} to="screen"><h2>活动滚屏显示效果</h2></Link>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
