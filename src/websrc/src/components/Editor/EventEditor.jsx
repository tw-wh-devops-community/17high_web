import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Nav from './PublishmentNavigator';
import ActivityEditor from './ActivityEditor';
import NewsEditor from './NewsEditor';
import Header from '../Header/index';
import styles from '../css/editor.scss';
import activityService from '../services/ActivityApiService';

const cx = classNames.bind(styles);
const editorsIndex = { SESSION: 0, NEWS: 1 };

export default class PublishActivity extends React.Component {

  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      currentEvent: {},
    };
    if (!isNaN(props.params.id)) {
      this.initEvent(props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.initEvent(nextProps.params.id);
  }

  render() {
    return (
      <div className={cx('eventEditorPage')}>
        <Header />
        <div className={cx('contentContainer')}>
          <div className={cx('content')}>
            <Nav
              onSelect={index => this.handleSelect(index)}
              isUpdate={this.isUpdate()}
              selectedIndex={this.getSelectedTabIndex()} />
            {this.getSelectedEditor(this.state.selectedTab)}
          </div>
        </div>
      </div>
    );
  }

  getSelectedEditor(selectedTab) {
    if (selectedTab === 0) {
      return <ActivityEditor currentEvent={this.state.currentEvent} />;
    }
    return <NewsEditor currentEvent={this.state.currentEvent} />;
  }

  handleSelect(selectedKey) {
    if (this.state.selectedTab !== selectedKey) {
      this.setState({
        selectedTab: selectedKey,
      });
    }
  }

  getSelectedTabIndex() {
    return this.state.selectedTab;
  }

  isUpdate() {
    return this.props.params.id !== undefined;
  }

  initEvent(eventId) {
    if (eventId) {
      activityService.selectActivity(eventId, (data) => {
        this.setState({ selectedTab: editorsIndex[data.type], currentEvent: data });
      });
    } else {
      this.setState({ currentEvent: {}, selectedTab: 0 });
    }
  }

}
