import React from 'react';
import $ from 'jquery';
import '../../css/dialog.css';

class Dialog extends React.Component {

  render() {
    return (
      <div>
        <div id={this.props.id} className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={this.onCancel.bind(this)}>&times;</span>
              {this.props.title}
            </div>
            <div className="modal-body">
              {this.props.message}
            </div>
            <div className="modal-footer">
              <div className="publish" onClick={this.onPositiveClick.bind(this)}>{this.props.positiveText}</div>
              <div className="cancelPublish"
                      onClick={this.onNegativeClick.bind(this)}>{this.props.negativeText}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  dismiss() {
    $('#'+ this.props.id)[0].style.display = "none";
  }

  onCancel() {
    if (this.props.onNegativeClick) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  }

  onPositiveClick() {
    if (this.props.onPositiveClick()) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  }

  onNegativeClick() {
    if (this.props.onNegativeClick) {
      this.props.onPositiveClick();
    }
    this.dismiss();
  }

  showDialog(id) {
    var modal = $('#'+ id)[0];
    modal.style.display = "block";
  }
}

export default Dialog
