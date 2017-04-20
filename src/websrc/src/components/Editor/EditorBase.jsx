import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import Moment from 'moment';
import DatePicker from 'react-datetime';
import classNames from 'classnames/bind';

import Dialog from '../BaseComponent/PopupComponent';
import TemplateSelector from './TemplateSelector';
import styles from '../css/editor.scss';

const cx = classNames.bind(styles);

const imageURLMap = {
  style1 : 0,
  style2 : 1,
  style3 : 2,
  style4 : 3,
  style5 : 4,
  style6 : 5
};

const indexToStyle = {
  0: 'style1',
  1: 'style2',
  2: 'style3',
  3: 'style4',
  4: 'style5',
  5: 'style6'
};

/* eslint-disable */
class EditorBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      currentEvent: props.currentEvent,
      selectedTemplateId: this.getSelectedTemplateId()
    };
    console.log(props.currentEvent);
    console.log('props.selectedTemplate  EditorBase', this.state.selectedTemplateId);
  }

  render() {
    return (
      <form noValidate="noValidate" id="editorForm" className={cx('formContainer')}>
        {this.onRenderContent(this.getEventAttribute)}
        <TemplateSelector onSelect={ this.onTemplateSelect } selectedTemplate={this.getSelectedTemplateId()}/>
        <div className={cx('newsSubmit')}>
          <button type="button" className={cx('publish')} onClick={this.publishEvent}>{ this.getPublishTitle() }</button>
          <button type="button" className={cx('cancelPublish')} onClick={this.cancelPublish}>取消</button>
        </div>
        <Dialog
          ref='dialog'
          id="publishActivity"
          title="发布公告"
          message="确认要发布这篇公告吗？"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={ this.handleSubmit }
        />
        <Dialog
          ref='dialog'
          id="cancelPublish"
          title="放弃发布"
          message="确认要取消发布这篇公告吗?"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={ this.backToDashboard }
          />
        <Dialog
          ref='dialog'
          id="updateActivity"
          title="更新公告"
          message="确认要更新这篇公告吗？"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={ this.handleUpdate }
        />
        <Dialog
          ref='dialog'
          id="cancelUpdate"
          title="放弃更新"
          message="确认要取消更新这篇公告吗？"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={ this.backToDashboard }
        />
      </form>
    );
  }

  getSelectedTemplateId() {
    return this.props.currentEvent ? imageURLMap[this.props.currentEvent.imageURL] :0;
  }

  getPublishTitle() {
    return this.state.currentEvent ? '更新' : '发布';
  }

  cancelPublish = (event) => {
    event.preventDefault();
    this.refs.dialog.showDialog( this.props.currentEvent ? 'cancelUpdate' : 'cancelPublish');
  };

  backToDashboard() {
    window.location = '/#/home';
  }

  componentDidMount() {
    this.initValidator();
  }

  getInputName(name, isRequired) {
    return (
      <div className={cx('inputNameContainer')}><span
        className={cx(isRequired ? 'starChar' : 'starCharHidden')}>*</span>{name}：
      </div>
    );
  }

  getEventAttribute = (attrName) => {
    return this.props.currentEvent && this.props.currentEvent[attrName];
  }

  publishEvent = () => {
    if (!this.validateAllElements()) {
      return;
    }
    this.refs.dialog.showDialog(this.props.currentEvent ? 'updateActivity' : 'publishActivity');
  };

  handleSubmit = () => {
    console.log('try to add');
    this.onSubmit();
  };

  handleUpdate = () => {
    console.log('try to update');
    this.onUpdate(this.state.currentEvent.id);
  };

  onTemplateSelect = (templateId) => {
    this.setState({ selectedTemplateId: templateId });
  };

  initValidator() {
    $.validator.addMethod('time24', value => /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(value), null);
    $.validator.addMethod('startBeforeEnd', () => {
      function isValidDate(v) {
        return /^[1-2][0-9][0-9][0-9]-([1][0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9]) ([01][0-9]|[2][0-3]):[0-5][0-9]$/.test(v);
      }
      const startDay = document.getElementsByName('startDay')[0].value;
      const startHour = document.getElementsByName('startHour')[0].value;
      const startTime = `${startDay} ${startHour}`;
      const endDay = document.getElementsByName('endDay')[0].value;
      const endHour = document.getElementsByName('endHour')[0].value;
      const endTime = `${endDay} ${endHour}`;

      return isValidDate(startTime) && isValidDate(endTime) && startTime < endTime;
    }, null);

    this.formValidator = $('#editorForm').validate({
      rules: {
        name: { required: true },
        startDay: { required: true, startBeforeEnd: true },
        startHour: { required: true, startBeforeEnd: true },
        endDay: { required: true, startBeforeEnd: true },
        endHour: { required: true, startBeforeEnd: true },
        location: { required: true },
        organizer: { required: true },
        description: { required: true }
      }
    });
  }


  validateAllElements() {
    this.validateElement("input[name='name']")
    this.validateTime();
    this.validateContent();
    const invalidAria = $('[aria-invalid=true]').not("[class='form-control error']");
    if (invalidAria.length > 0) {
      invalidAria.filter(':first').focus();
      return false;
    }
    return true;
  }

  validateElement(name) {
    return $(name).valid();
  }

  getDateInput() {
    const now = Moment();

    return (
      <div className={cx('timeBlock')}>
        <DatePicker
          inputProps={{ name: 'startDay', readOnly: 'readonly' } } className={cx('newsTimeDay')}
          viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={ false }
          defaultValue={this.getDateString("startTime")}
          isValidDate={ currentDate => currentDate.diff(now, 'days') >= 0} />
        <DatePicker
          inputProps={{ name: 'startHour', readOnly: 'readonly' }} className={cx('newsTimeHour')}
          defaultValue={this.getTimeString("startTime")}
          viewMode="time" dateFormat={false} timeFormat="HH:mm" />
        <div className={cx('timeDivider')}>-</div>
        <DatePicker
          inputProps={{ name: 'endDay', readOnly: 'readonly' }} className={cx('newsTimeDay')}
          viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}
          defaultValue={this.getDateString("endTime")}
          isValidDate={(currentDate) => {
            const startDay = Moment($("input[name='startDay']").val());
            return currentDate.diff(startDay, 'days') >= 0;
          }} />
        <DatePicker
          inputProps={{ name: 'endHour', readOnly: 'readonly' }} className={cx('newsTimeHour')}
          viewMode="time" dateFormat={false} timeFormat="HH:mm"
          defaultValue={this.getTimeString("endTime")}
          onBlur={() => {
            if (this.validateTime()) {
              this.hideInvalidTimeError();
            }
          }} />
      </div>
    );
  }

  onRenderContent() {
  }

  getEditorType() {
  }

  validateTime() {
    this.validateElement("input[name='startDay']");
    this.validateElement("input[name='startHour']");
    this.validateElement("input[name='endDay']");
    if (!this.validateElement("input[name='endHour']")) {
      this.showInvalidTimeError();
      return false;
    }
    return true;
  }

  onSubmit() {
  }

  onUpdate(id) {
  }

  validateContent() {
  }

  showInvalidTimeError() {
    $('.invalidTimeError').show();
  }

  hideInvalidTimeError() {
    $('.invalidTimeError').hide();
  }

  getImageURL(index) {
    return indexToStyle[index];
  }

  getDateString(attrName) {
    let currentEvent = this.props.currentEvent;
    return currentEvent && currentEvent[attrName] && currentEvent[attrName].substr(0,10);
  }

  getTimeString(attrName) {
    let currentEvent = this.props.currentEvent;
    return currentEvent && currentEvent[attrName] && currentEvent[attrName].substr(11);
  }

  inputBytesLimiter(event, maxBytes) {
    const targetedEvent = event;
    let bytesCounter = 0;
    let i = 0;
    for (; i < maxBytes && bytesCounter < maxBytes; i += 1) {
      const c = event.target.value.charCodeAt(i);
      if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
        bytesCounter += 1;
      } else {
        bytesCounter += 2;
      }
    }
    if (i === maxBytes / 2) {
      targetedEvent.target.value = event.target.value.substring(0, i);
    }
    targetedEvent.target.maxLength = i;
  }
}

export default EditorBase;
