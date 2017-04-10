import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import Moment from 'moment';
import DatePicker from 'react-datetime';
import classNames from 'classnames/bind';

import Dialog from '../Dialog';
import TemplateSelector from '../TemplateSelector';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);

/* eslint-disable */
class EditorBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedTemplateId: 0
    };
  }

  render() {
    return (
      <form noValidate="noValidate" id="editorForm" className={cx('formContainer')}>
        {this.onRenderContent()}
        <TemplateSelector onSelect={ this.onTemplateSelect } />
        <div className={cx('newsSubmit')}>
          <button type="button" className={cx('publish')} onClick={this.publishEvent}>发布</button>
          <button type="button" className={cx('cancelPublish')} onClick={this.cancelPublish}>取消</button>
        </div>
        <Dialog
          ref='dialog'
          id="publishActivity"
          title="发布公告"
          message="一经发布，将不可自行修改，确认要发布这篇公告吗"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={() => {
            this.handleSubmit();
          }}
        />
        <Dialog
          ref='dialog'
          id="cancelPublish"
          title="放弃发布"
          message="确认要放弃发布这篇公告吗?"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={() => {
            this.backToDashboard();
          }}
          />
      </form>
    );
  }

  cancelPublish = () => {
    this.refs.dialog.showDialog('cancelPublish');
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


  publishEvent = () => {
    if (!this.validateAllElements()) {
      return;
    }
    console.log('try to submit');
    this.refs.dialog.showDialog('publishActivity');
  };

  handleSubmit() {
    console.log('try to submit');
    this.onSubmit();
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
      },
      errorPlacement: () => false
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
          isValidDate={ currentDate => currentDate.diff(now, 'days') >= 0} />
        <DatePicker
          inputProps={{ name: 'startHour', readOnly: 'readonly' }} className={cx('newsTimeHour')}
          viewMode="time" dateFormat={false} timeFormat="HH:mm" />
        <div className={cx('timeDivider')}>-</div>
        <DatePicker
          inputProps={{ name: 'endDay', readOnly: 'readonly' }} className={cx('newsTimeDay')}
          viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}
          isValidDate={(currentDate) => {
            const startDay = Moment($("input[name='startDay']").val());
            return currentDate.diff(startDay, 'days') >= 0;
          }} />
        <DatePicker
          inputProps={{ name: 'endHour', readOnly: 'readonly' }} className={cx('newsTimeHour')}
          viewMode="time" dateFormat={false} timeFormat="HH:mm"
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

  validateContent() {
  }

  showInvalidTimeError() {
    $('.invalidTimeError').show();
  }

  hideInvalidTimeError() {
    $('.invalidTimeError').hide();
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
