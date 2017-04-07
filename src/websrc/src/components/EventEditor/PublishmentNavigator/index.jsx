import React from 'react';

class Navigator extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }
  render() {
    return (
      <div className="navBlock">
        <nav className="navigation">
          <div className="activityNavBlock">
            <button
              className={this.state.selectedIndex === 0 ? 'activityNavSelected' : 'activityNav'}
              onClick={() => this.onSelectNav(0)}>
              发布活动
            </button>
          </div>
          <div className="activityNavBlock">
            <button
              className={this.state.selectedIndex === 1 ? 'newsNavSelected' : 'newsNav'}
              onClick={() => this.onSelectNav(1)}>
              发布新闻
            </button>
          </div>
        </nav>
        <div className="horizontalLine" />
      </div>
    );
  }
  onSelectNav(index) {
    if (this.state.selectedIndex === index) {
      return;
    }
    this.setState({ selectedIndex: index });
    this.props.onSelect(index);
  }
}

export default Navigator;
