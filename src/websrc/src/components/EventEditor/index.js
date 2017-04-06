import React from 'react';
import Header from '../Header'
import Nav from './PublishmentNavigator'
import ActivityEditor from './ActivityEditor'
import NewsEditor from './NewsEditor'
import Dialog from './Dialog'

import '../css/react-datetime.css'
import '../css/editor.css';

const editors = [ActivityEditor, NewsEditor];

export default class PublishActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedEditor: editors[0]
    };
  }

  render() {
    return (
      <div className="pageContainer eventEditorPage">
        { this.renderHeader() }
        <div className='contentContainer'>
          <div className="content">
            <Nav onSelect={(index) => {
              this.handleSelect(index);
            }}
            />
            <this.state.selectedEditor/>
          </div>
        </div>
        <Dialog
          ref='dialog'
          id="cancelPublish"
          title="放弃发布"
          message="确认要放弃发布这篇公告吗?"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={() => {
            this.backToDashboard();
          }}
          />
      </div>
    )
  }

  renderHeader() {
    return (
      <div className='headerContainer'>
        <div className='header'>
          <div className='projectName'>
            17 high
          </div>
          <div className="leftContainer">
            <div className="backButton" onClick={this.cancelPublish.bind(this)}>
              <img className="backIcon" src={require('../../image/back.png')}/>
              <span className="backText">返回</span>
            </div>
            <div className='launch'>
              <span className="launchText">发布公告</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  cancelPublish() {
    this.refs.dialog.showDialog("cancelPublish");
  }

  backToDashboard() {
    window.location = '/#/home';
  }

  handleSelect(selectedKey) {
    if (this.state.selectedTab != selectedKey) {
      this.setState({
          selectedTab: selectedKey,
          selectedEditor: editors[selectedKey]
        }
      );
    }
  }
}
