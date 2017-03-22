import React from 'react';
import TemplateSelector from '../TemplateSelector';
import $ from 'jquery';
import  'jquery-validation';
import Moment from 'moment';
var DatePicker = require('react-datetime');


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
          <button className="publish" onClick={this.handleSubmit.bind(this)}>发布
          </button>
          <div className="cancelPublish">取消</div>
        </div>
      </form>
    )
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

  handleSubmit(event) {
    event.preventDefault();

    if (!this.validateAllElements()) {
      return;
    }

    let eventName = document.getElementsByName('name')[0].value;

    let startDay = document.getElementsByName('startDay')[0].value;
    let startHour = document.getElementsByName('startHour')[0].value;
    let startTime = startDay + " " + startHour;
    let endDay = document.getElementsByName('endDay')[0].value;
    let endHour = document.getElementsByName('endHour')[0].value;
    let endTime = endDay + " " + endHour;

    let location = document.getElementsByName('location')[0].value;
    let organizer = document.getElementsByName('organizer')[0].value;
    let guest = document.getElementsByName('guest')[0].value;
    let description = document.getElementsByName('description')[0].value;
    let selectedTemplateId = this.state.selectedTemplateId;
    let type = this.getEditorType();

    $.ajax({
      url: 'http://localhost:8080/v1/activities',
      type: 'post',
      xhrFields: {withCredentials: true},
      data: JSON.stringify({
        name: eventName,
        startTime: startTime,
        endTime: endTime,
        sponsor: organizer,
        guest: guest,
        description: description,
        location: location,
        imageURL: selectedTemplateId,
        type: type
      }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data);
      },
      error: function (xhr, status, err) {
        console.error("error", status, err.toString());
      }
    });

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
      //not to focus,just change all time input border.
      return false;
    } else if (!this.validateElement("input[name='location']")
      || !this.validateElement("input[name='organizer']")
      || !this.validateElement("textarea[name='description']")) {
      this.formValidator.focusInvalid();
      return false;
    }
    return true;
  }

  validateElement(name) {
    return $(name).valid();
  }

  getDateInput() {
    return (
      <div className="timeBlock">
        <DatePicker inputProps={{name: 'startDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
                    isValidDate={(currentDate, selectedDate) => {
                      let now = Moment();
                      return currentDate.diff(now, 'days') >= 0;
                    }}
                    onBlur={() => {
                      this.validateTime();
                    }}
        />
        <DatePicker inputProps={{name: 'startHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm" defaultValue="HH:mm"
                    onBlur={() => {
                      this.validateTime();
                    }}
        />
        <div className='timeDivider'>-</div>
        <DatePicker inputProps={{name: 'endDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
                    isValidDate={(currentDate, selectedDate) => {
                      let now = Moment();
                      return currentDate.diff(now, 'days') >= 0;
                    }}
                    onBlur={() => {
                      this.validateTime();
                    }}
        />
        <DatePicker inputProps={{name: 'endHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm" defaultValue="HH:mm"
                    onBlur={() => {
                      this.validateTime();
                    }}
        />
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

  getValidHour() {

  }
}

export default EditorBase
