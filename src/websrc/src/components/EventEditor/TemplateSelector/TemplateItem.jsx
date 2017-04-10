import React from 'react';

import classNames from 'classnames/bind';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);
const selectedIcon = require('../../../image/selected_icon.png');

export default class TemplateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconStyle: this.props.isSelected ? 'selectedIcon' : 'selectedIconHidden'
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isSelected !== this.props.isSelected) {
      this.setState({
        iconStyle: nextProps.isSelected ? 'selectedIcon' : 'selectedIconHidden'
      });
    }
  }

  render() {
    return (
      <button
        className={cx(this.props.isFirst ? 'templateItemFirst' : 'templateItem')}
        onClick={() => {
          this.props.onClick(this.props.index);
        }}>
        <div>
          <img alt="" className={cx('templatesImg')} src={this.props.url} />
          <img alt="" className={cx(this.state.iconStyle)} src={ selectedIcon } />
        </div>
      </button>
    );
  }
}
