import React from 'react';
import TemplateSelector from '../TemplateSelector';
import $ from 'jquery';
import  'jquery-validation';
import Moment from 'moment';
var DatePicker = require('react-datetime');
import Dialog from '../Dialog'


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
        <TemplateSelector onSelect={this.onTemplateSelect.bind(this)}/>
        <div className="newsSubmit">
          <div className="publish" onClick={this.publishEvent.bind(this)}>发布</div>
          <div className="cancelPublish" onClick={this.cancelPublish.bind(this)}>取消</div>
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
      </form>
    );
  }

  cancelPublish() {
    this.refs.dialog.showDialog("cancelPublish");
  }

  backToDashboard() {
    window.location = '/#/home';
  }

  componentDidMount() {
    this.initValidator();
  }

  getInputName(name, isRequired) {
    return (
      <div className='inputNameContainer'><span
        className={isRequired ? 'starChar' : 'starCharHidden'}>*</span>{name}：
      </div>
    )
  }


  publishEvent() {
    if (!this.validateAllElements()) {
      return;
    }
    console.log('try to submit');
    this.refs.dialog.showDialog("publishActivity");
  }

  handleSubmit() {
    console.log('try to submit');
    this.onSubmit();
  }

  onTemplateSelect(templateId) {
    this.setState({selectedTemplateId: templateId});
  }

  initValidator() {
    $.validator.addMethod("time24", function (value, element) {
      return /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/.test(value);
    }, null);

    $.validator.addMethod("startBeforeEnd", function (value, element) {
      function isValidDate(value) {
        return /^[1-2][0-9][0-9][0-9]-([1][0-2]|0?[1-9])-([12][0-9]|3[01]|0?[1-9]) ([01][0-9]|[2][0-3]):[0-5][0-9]$/.test(value);
      }

      let startDay = document.getElementsByName('startDay')[0].value;
      let startHour = document.getElementsByName('startHour')[0].value;
      let startTime = startDay + " " + startHour;
      let endDay = document.getElementsByName('endDay')[0].value;
      let endHour = document.getElementsByName('endHour')[0].value;
      let endTime = endDay + " " + endHour;

      return isValidDate(startTime) && isValidDate(endTime) && startTime < endTime;
    }, null);

    this.formValidator = $("#editorForm").validate({
      rules: {
        name: {required: true},
        startDay: {required: true, startBeforeEnd: true},
        startHour: {required: true, startBeforeEnd: true},
        endDay: {required: true, startBeforeEnd: true},
        endHour: {required: true, startBeforeEnd: true},
        location: {required: true},
        organizer: {required: true},
        description: {required: true}
      },
      errorPlacement: function () {
        return false;
      }
    });
  }


  validateAllElements() {
    if (!this.validateElement("input[name='name']")) {
      this.formValidator.focusInvalid();
      return false;
    } else if (!this.validateTime()) {
      //not to focus,just change all time input border color.
      this.showInvalidTimeError();
      return false;
    } else if (!this.validateContent()) {
      this.formValidator.focusInvalid();
      return false;
    }
    return true;
  }

  validateElement(name) {
    return $(name).valid();
  }

  getDateInput() {
    let now = Moment();

    return (
      <div className="timeBlock">
        <DatePicker inputProps={{name: 'startDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}
                    isValidDate={(currentDate, selectedDate) => {
                      return currentDate.diff(now, 'days') >= 0;
                    }}/>
        <DatePicker inputProps={{name: 'startHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm"/>
        <div className='timeDivider'>-</div>
        <DatePicker inputProps={{name: 'endDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}
                    isValidDate={(currentDate, selectedDate) => {
                      let startDay = Moment($("input[name='startDay']").val());
                      return currentDate.diff(startDay, 'days') >= 0;
                    }}/>
        <DatePicker inputProps={{name: 'endHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm"
                    onBlur={() => {
                      if(this.validateTime()){
                        this.hideInvalidTimeError();
                      }
                    }}/>
      </div>
    );
  }

  onRenderContent() {
  }

  getEditorType() {
  }

  validateTime() {
    let rt = this.validateElement("input[name='startDay']") |
      this.validateElement("input[name='startHour']") |
      this.validateElement("input[name='endDay']") |
      this.validateElement("input[name='endHour']");
    return rt == 1;
  }

  onSubmit() {
  }

  validateContent() {
  }

  showInvalidTimeError() {
    $('.invalidTimeError').css('display', 'block');
  }

  hideInvalidTimeError() {
    $('.invalidTimeError').css('display', 'none');
  }

  inputBytesLimiter(event, maxBytes) {
    var bytesCounter = 0;
    for(var i = 0; i < maxBytes && bytesCounter < maxBytes; i++ ) {
      var c = event.target.value.charCodeAt(i);
      if((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
        bytesCounter++;
      }else {
        bytesCounter+=2;
      }
    }
    event.target.maxLength = i;
  }
}

export default EditorBase
