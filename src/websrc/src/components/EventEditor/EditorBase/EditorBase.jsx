import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import Moment from 'moment';
import DatePicker from 'react-datetime';

import Dialog from '../Dialog';
import TemplateSelector from '../TemplateSelector';

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
      <form noValidate="noValidate" id="editorForm" className='formContainer'>
        {this.onRenderContent()}
        <TemplateSelector onSelect={this.onTemplateSelect}/>
        <div className="newsSubmit">
          <div className="publish" onClick={this.publishEvent}>发布
          </div>
          <div className="cancelPublish">取消</div>
        </div>
        <Dialog
          ref='dialog'
          title="发布公告"
          message="一经发布，将不可自行修改，确认要发布这篇公告吗"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={() => {
            this.handleSubmit();
          }}
        />
      </form>
    );
  }

  componentDidMount() {
    this.initValidator();
  }

  getInputName(name, isRequired) {
    return (
      <div className='inputNameContainer'><span
        className={isRequired ? 'starChar' : 'starCharHidden'}>*</span>{name}：
      </div>
    );
  }


  publishEvent = () => {
    if (!this.validateAllElements()) {
      return;
    }
    console.log('try to submit');
    this.refs.dialog.showDialog();
  };

  handleSubmit() {
    console.log('try to submit');
    this.onSubmit();
  }

  onTemplateSelect = (templateId) => {
    this.setState({ selectedTemplateId: templateId });
  };

  initValidator() {
    // noinspection Eslint
    $.validator.addMethod('time24', (value, element) => /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(value), null);
    // noinspection Eslint
    $.validator.addMethod('startBeforeEnd', (value, element) => {
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
    if (!EditorBase.validateElement("input[name='name']")) {
      this.formValidator.focusInvalid();
      return false;
    } else if (!EditorBase.validateTime()) {
      // not to focus,just change all time input border color.
      return false;
    } else if (!this.validateContent()) {
      this.formValidator.focusInvalid();
      return false;
    }
    return true;
  }

  static validateElement(name) {
    return $(name).valid();
  }

  getDateInput() {
    return (
      <div className="timeBlock">
        <DatePicker
          inputProps={{ name: 'startDay', readOnly: 'readonly' }} className="newsTimeDay"
          viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
          isValidDate={currentDate => currentDate.diff(Moment(), 'days') >= 0}
          onBlur={() => EditorBase.validateTime()}
        />
        <DatePicker
          inputProps={{ name: 'startHour', readOnly: 'readonly' }} className="newsTimeHour"
          viewMode="time" dateFormat={false} timeFormat="HH:mm" defaultValue="HH:mm"
          onBlur={() => EditorBase.validateTime()}
        />
        <div className="timeDivider">-</div>
        <DatePicker
          inputProps={{ name: 'endDay', readOnly: 'readonly' }} className="newsTimeDay"
          viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
          isValidDate={ currentDate => currentDate.diff(Moment(), 'days') >= 0 }
          onBlur={() => EditorBase.validateTime()}
        />
        <DatePicker
          inputProps={{ name: 'endHour', readOnly: 'readonly' }} className="newsTimeHour"
          viewMode="time" dateFormat timeFormat="HH:mm" defaultValue="HH:mm"
          onBlur={() => EditorBase.validateTime()}
        />
      </div>
    );
  }

  onRenderContent() {
  }

  getEditorType() {
  }

  static validateTime() {
    return EditorBase.validateElement("input[name='startDay']") ||
      EditorBase.validateElement("input[name='startHour']") ||
      EditorBase.validateElement("input[name='endDay']") ||
      EditorBase.validateElement("input[name='endHour']");
  }

  onSubmit() {
  }

  validateContent() {
  }

}

export default EditorBase;
