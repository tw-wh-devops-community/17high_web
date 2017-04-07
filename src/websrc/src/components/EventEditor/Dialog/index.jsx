import React from 'react';
import $ from 'jquery';
import '../../css/dialog.css';

/* eslint-disable */
class Dialog extends React.Component {

  render() {
    return (
      <div>
        <div id={this.props.id} className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <button className="close" onClick={this.onCancel()}>&times;</button>
              {this.props.title}
            </div>
            <div className="modal-body">
              {this.props.message}
            </div>
            <div className="modal-footer">
              <button className="publish" onClick={this.onPositiveClick()}>{this.props.positiveText}</button>
              <button className="cancelPublish" onClick={this.onNegativeClick()}>{this.props.negativeText}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  dismiss() {
    $(`#${this.props.id}`)[0].style.display = 'none';
  }

  onCancel = () => {
    if (this.props.onNegativeClick) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  };

  onPositiveClick = () => {
    if (this.props.onPositiveClick()) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  };

  onNegativeClick = () => {
    if (this.props.onNegativeClick) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  };

  showDialog() {
    const modal = $(`#${this.props.id}`)[0];
    modal.style.display = 'block';
  }
}

export default Dialog;
