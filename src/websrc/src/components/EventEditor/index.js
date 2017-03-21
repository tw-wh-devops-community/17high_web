import React from 'react';
import Header from '../Header'
import Nav from './PublishmentNavigator'
import ActivityEditor from './ActivityEditor'
import NewsEditor from './NewsEditor'

import '../css/react-datetime.css'
const COLUMN_NUMBER = 3;

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
      <div className="pageContainer">
        <Header/>
        <div className='contentContainer'>
          <div className="content">
            <Nav onSelect={(index) => {
              this.handleSelect(index);
            }}
            />
            <this.state.selectedEditor/>
          </div>
        </div>
      </div>
    )
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
