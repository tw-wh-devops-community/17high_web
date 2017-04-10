import React from 'react';
import classNames from 'classnames/bind';

import Nav from './PublishmentNavigator';
import ActivityEditor from './ActivityEditor';
import NewsEditor from './NewsEditor';
import Header from '../Header/index';

import styles from '../css/editor.scss';

const cx = classNames.bind(styles);
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
      <div className={ cx('eventEditorPage')}>
        <Header />
        <div className={cx('contentContainer')}>
          <div className={cx('content')}>
            <Nav
              onSelect={index => this.handleSelect(index)} />
            <this.state.selectedEditor />
          </div>
        </div>
      </div>
    );
  }

  handleSelect(selectedKey) {
    if (this.state.selectedTab !== selectedKey) {
      this.setState({
        selectedTab: selectedKey,
        selectedEditor: editors[selectedKey]
      });
    }
  }
}
