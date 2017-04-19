import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames/bind';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);
const selectedIcon = require('../../../image/selected_icon.png');

export default class TemplateItem extends Component {

  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    isFirst: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      iconStyle: props.isSelected ? 'selectedIcon' : 'selectedIconHidden'
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
        onClick={(evt) => {
          this.props.onClick(this.props.index, evt);
        }}>
        <div>
          <img
            alt=""
            className={cx('templatesImg')}
            src={this.props.url} />
          <img
            alt=""
            className={cx(this.state.iconStyle)}
            src={ selectedIcon } />
        </div>
      </button>
    );
  }
}
