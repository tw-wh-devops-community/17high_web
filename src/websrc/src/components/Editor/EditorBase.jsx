import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import Moment from 'moment';
import DatePicker from 'react-datetime';
import classNames from 'classnames/bind';

import Dialog from '../BaseComponent/PopupComponent';
import TemplateSelector from './TemplateSelector';
import styles from '../css/editor.scss';
import Preview from '../DashboardComponent/PreviewComponent'

const cx = classNames.bind(styles);
const previewImg = require('../../image/preview.png');

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

const DEFAULT_OWNER = 'admin';
const DEFAULT_DISPLAY_TIME = '10';
const DEFAULT_IMAGE_URL = 'style1';

/* eslint-disable */
class EditorBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      currentEvent: props.currentEvent ? props.currentEvent : {},
      selectedTemplateId: this.getSelectedTemplateId()
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentEvent: this.getInitialEvent(nextProps), selectedTemplateId: this.getSelectedTemplateId(nextProps.currentEvent)});
  }

  getInitialEvent(nextProps) {
    return nextProps.currentEvent.id ? nextProps.currentEvent : {type: this.getEditorType(), owner: DEFAULT_OWNER, display_time: DEFAULT_DISPLAY_TIME, imageURL: DEFAULT_IMAGE_URL};
  };

  render() {
    return (
      <form noValidate="noValidate" id="editorForm" className={cx('formContainer')} onSubmit={(event) => event.preventDefault()}>
        {this.onRenderContent(this.getEventAttribute)}
        <TemplateSelector onSelect={ this.onTemplateSelect } selectedTemplate={this.getSelectedTemplateId(this.state.currentEvent)} />
        <div className={cx('previewBlock')}>
          <div className={cx('preview')} onClick={ this.handlePreviewDetailClick }>
            <img
              alt=""
              className={cx('previewIcon')}
              src={previewImg} />
            <div className={cx('previewText')}>预览看看</div>
          </div>
        </div>
        <div className={cx('newsSubmit')}>
          <button type="button" className={cx('publish')} onClick={this.publishEvent}>{ this.getPublishTitle() }</button>
          <button type="button" className={cx('cancelPublish')} onClick={ this.cancelPublish}>取消</button>
        </div>
        <Preview
          ref={ preview => this.preview = preview }>
        </Preview>
        <Dialog
          ref='dialog'
          id="publishActivity"
          title="发布公告"
          message="确认要发布这篇公告吗？"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={ this.handleSubmit}
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

  getSelectedTemplateId(currentEvent) {
    return currentEvent && currentEvent.imageURL ? imageURLMap[currentEvent.imageURL] : 0;
  }

  getPublishTitle() {
    return this.props.currentEvent.id ? '更新' : '发布';
  }

  cancelPublish = () => {
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
    return (this.state.currentEvent && this.state.currentEvent[attrName]) || '';
  }

  publishEvent = () => {
    if (!this.validateAllElements()) {
      return;
    }
    this.refs.dialog.showDialog(this.state.currentEvent.id ? 'updateActivity' : 'publishActivity');
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
    let currentEvent = this.state.currentEvent;
    currentEvent.imageURL = indexToStyle[templateId];
    this.setState({ selectedTemplateId: templateId, currentEvent: currentEvent});
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
    let isFormValid = this.validateElement("input[name='name']") && this.validateTime() && this.validateContent();
    this.focusToFirstInvalidField();
    return isFormValid;
  }

  focusToFirstInvalidField() {
    const invalidAria = $('[aria-invalid=true]').not("[class='form-control error']");
    if (invalidAria.length > 0) {
      invalidAria.filter(':first').focus();
      return false;
    }
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
          value={this.getDateString("startTime")}
          onChange={(selectedTime) => this.handleDateChange(selectedTime, 'startTime')}
          isValidDate={ currentDate => currentDate.diff(now, 'days') >= 0} />
        <DatePicker
          inputProps={{ name: 'startHour' }} className={cx('newsTimeHour')}
          value={this.getTimeString("startTime")}
          onChange={(selectedTime) => this.handleTimeChange(selectedTime, 'startTime')}
          viewMode="time" dateFormat={false} timeFormat="HH:mm" />
        <div className={cx('timeDivider')}>-</div>
        <DatePicker
          inputProps={{ name: 'endDay', readOnly: 'readonly' }} className={cx('newsTimeDay')}
          viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}
          value={this.getDateString("endTime")}
          onChange={(selectedTime) => this.handleDateChange(selectedTime, 'endTime')}
          isValidDate={(currentDate) => {
            const startDay = Moment($("input[name='startDay']").val());
            return currentDate.diff(startDay, 'days') >= 0;
          }} />
        <DatePicker
          inputProps={{ name: 'endHour' }} className={cx('newsTimeHour')}
          viewMode="time" dateFormat={false} timeFormat="HH:mm"
          value={this.getTimeString("endTime")}
          onChange={(selectedTime) => this.handleTimeChange(selectedTime, 'endTime')}
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
    let isTimeValid = this.validateElement("input[name='startDay']")
      && this.validateElement("input[name='startHour']")
      && this.validateElement("input[name='endDay']")
      && this.validateElement("input[name='endHour']");
    if (!this.validateElement("input[name='endHour']")) {
      this.showInvalidTimeError();
    }
    return isTimeValid;
  }

  onSubmit() {
  }

  onUpdate(id) {
  }

  validateContent() {
  }

  getActivity(status) {
    return JSON.stringify(Object.assign(this.state.currentEvent, {status: status}));

  }

  showInvalidTimeError() {
    $('.invalidTimeError').show();
  }

  hideInvalidTimeError() {
    $('.invalidTimeError').hide();
  }

  getDateString(attrName) {
    let currentEvent = this.state.currentEvent;
    return currentEvent && currentEvent[attrName] && currentEvent[attrName].substr(0,10);
  }

  getTimeString(attrName) {
    let currentEvent = this.state.currentEvent;
    return currentEvent && currentEvent[attrName] && currentEvent[attrName].substr(11);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      currentEvent: Object.assign(this.state.currentEvent, {[name]: value})
    });
  }

  handleDateChange(time, attrName) {
    let selectedDate = time.format('YYYY-MM-DD');
    let dateTime = this.state.currentEvent[attrName];
    let existingTime = '';
    if (dateTime) {
      existingTime = ' ' + dateTime.substr(11);
    }
    this.setState({
      currentEvent: Object.assign(this.state.currentEvent, {[attrName]: selectedDate + existingTime})
    });
  }

  handleTimeChange(time, attrName) {
    let dateTime = this.state.currentEvent[attrName];
    let selectedTime = time.format('HH:mm');
    let existingDate = '';
    if (dateTime) {
      existingDate = dateTime.substr(0, 10)  + ' ' ;
    }
    this.setState({
      currentEvent: Object.assign(this.state.currentEvent, {[attrName]: existingDate + selectedTime})
    });
  }

  handlePreviewDetailClick = (evt) => {
    this.preview.openPopupbox(null, this.getActivity('PUBLISHED'));
  }
}

export default EditorBase;
