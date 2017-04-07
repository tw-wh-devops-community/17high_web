import React from 'react';

const selectedIcon = require('../../../image/selected_icon.png');

export default class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconStyle: this.props.isSelected ? 'selectedIcon' : 'selectedIconHidden'
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      iconStyle: nextProps.isSelected ? 'selectedIcon' : 'selectedIconHidden'
    });
  }

  render() {
    return (
      <button
        className={this.props.isFirst ? 'templateItemFirst' : 'templateItem'}
        onClick={() => {
          this.props.onClick(this.props.index);
        }}>
        <div>
          <img alt="" className="templatesImg" src={this.props.url} />
          <img alt="" className={this.state.iconStyle} src={ selectedIcon } />
        </div>
      </button>
    );
  }
}
