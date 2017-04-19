import React from "react";
import classNames from "classnames/bind";
import Nav from "./PublishmentNavigator";
import ActivityEditor from "./ActivityEditor";
import NewsEditor from "./NewsEditor";
import Header from "../Header/index";
import styles from "../css/editor.scss";
import ApiService from "../services/ActivityApiService";

const cx = classNames.bind(styles);
const editorsIndex = {SESSION: 0, NEWS: 1};

export default class PublishActivity extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
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
            <Nav
              onSelect={index => this.handleSelect(index)}/>
              { this.getSelectedEditor(this.state.selectedTab) }
          </div>
        </div>
      </div>
    );
  }

  getSelectedEditor(selectedTab) {
    if (0 === selectedTab) return <ActivityEditor />;
    else return <NewsEditor />;
  }

  handleSelect(selectedKey) {
    if (this.state.selectedTab !== selectedKey) {
      this.setState({
        selectedTab: selectedKey,
      });
    }
  }

  initEvent(eventId) {
    if (eventId) {
      ApiService.selectActivity(eventId, () => this.updateCurrentEvent(event))
    }
  }

  updateCurrentEvent(event) {
    this.setState( { eventLoaded: true, currentEvent: event, selectedTab: editorsIndex[event.type]} );
  }


}
