import React from "react";
import classNames from "classnames/bind";
import Nav from "./PublishmentNavigator";
import ActivityEditor from "./ActivityEditor";
import NewsEditor from "./NewsEditor";
import Header from "../Header/index";
import styles from "../css/editor.scss";

const cx = classNames.bind(styles);
const editorsIndex = {SESSION: 0, NEWS: 1};

export default class PublishActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0
    };
  }

  componentWillMount () {
    this.initEvent(this.props.params.id);
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
    let currentEvent = this.state.currentEvent;
    if (0 === selectedTab) {
      return <ActivityEditor currentEvent={ currentEvent } />;
    } else {
      return <NewsEditor currentEvent={ currentEvent } />;
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
      let selectedEvent = window.allEvents.filter((event) => {return event.id == eventId})[0];
      this.setState({selectedTab: editorsIndex[selectedEvent.type], currentEvent: selectedEvent});
    } else {
      this.setState({currentEvent: undefined});
    }
  }

}
