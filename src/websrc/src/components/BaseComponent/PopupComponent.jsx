import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import classNames from '../../../node_modules/classnames/bind';
import styles from '../css/dialog.scss';

const cx = classNames.bind(styles);

/* eslint-disable */
class Dialog extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    message: PropTypes.string,
    onNegativeClick: PropTypes.func,
    onPositiveClick: PropTypes.func.isRequired
  }

  static defaultProps = {
    title: '',
    message: ''
  }

  render() {
    return (
      <div>
        <div id={this.props.id} className={cx('modal')}>
          <div className={cx('modal-content')}>
            <div className={cx('modal-header')}>
              <button className={cx("close")} onClick={this.onCancel}>&times;</button>
              {this.props.title}
            </div>
            <div className={cx('modal-body')}>
              {this.props.message}
            </div>
            <div className={cx('modal-footer')}>
              <button className={cx('publish')} onClick={this.onPositiveClick}>{this.props.positiveText}</button>
              <button className={cx('cancelPublish')} onClick={this.onNegativeClick}>{this.props.negativeText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  dismiss () {
    $(`#${this.props.id}`)[0].style.display = 'none';
  };

  onCancel = () => {
    this.props.onNegativeClick && this.props.onNegativeClick();
    this.dismiss();
  };

  onPositiveClick = () => {
    this.props.onPositiveClick && this.props.onPositiveClick();
    this.dismiss();
  };

  onNegativeClick = () => {
    if (this.props.onNegativeClick) {
      this.props.onNegativeClick();
    }
    this.dismiss();
  };

  showDialog(id) {
    const modal = $(`#${id}`)[0];
    if (modal !== null) {
      modal.style.display = 'block';
    }
  };
}

export default Dialog;
