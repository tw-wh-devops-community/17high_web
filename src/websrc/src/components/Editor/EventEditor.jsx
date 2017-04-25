import React from "react";
import classNames from "classnames/bind";
import Nav from "./PublishmentNavigator";
import ActivityEditor from "./ActivityEditor";
import NewsEditor from "./NewsEditor";
import Header from "../Header/index";
import styles from "../css/editor.scss";
import activityService from "../services/ActivityApiService";

const cx = classNames.bind(styles);
const editorsIndex = {SESSION: 0, NEWS: 1};

export default class PublishActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    this.initEvent(nextProps.params.id);
  }

  render() {
    return (
      <div className={ cx('eventEditorPage') }>
        <Header />
        <div className={cx('contentContainer')}>
          <div className={cx('content')}>
            <Nav onSelect={index => this.handleSelect(index)} isUpdate={this.isUpdate()} selectedIndex={this.getSelectedTabIndex()}/>
            { this.getSelectedEditor(this.state.selectedTab) }
          </div>
        </div>
      </div>
    );
  }

  getSelectedEditor(selectedTab) {
    if (0 === selectedTab) {
      return <ActivityEditor currentEvent={ this.state.currentEvent } />;
    } else {
      return <NewsEditor currentEvent={ this.state.currentEvent } />;
    }
  }

  handleSelect(selectedKey) {
    if (this.state.selectedTab !== selectedKey) {
      this.setState({
        selectedTab: selectedKey,
      });
    }
  }

  getSelectedTabIndex() {
    let selectedEvent = this.state.currentEvent;
    return selectedEvent ? editorsIndex[selectedEvent.type] : 0;
  }

  isUpdate() {
    return this.props.params.id !== undefined;
  }

  initEvent(eventId) {
    if (eventId) {
      activityService.selectActivity(eventId, (data) => {
        this.setState({selectedTab: editorsIndex[data.type], currentEvent: data});
      });
    } else {
      this.setState({currentEvent: {}, selectedTab: 0});
    }
  }

}
