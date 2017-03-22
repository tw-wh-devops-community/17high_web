import React from 'react';
import TemplateSelector from '../TemplateSelector';
import $ from 'jquery';
import  'jquery-validation';
var DatePicker = require('react-datetime');


class EditorBase extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedTemplateId: 0
    };
    console.log('super con');
  }

  render() {
    console.log('super render');
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

    this.formValidator = $("#editorForm").validate({
      rules: {
        name: {required: true},
        startDay: {required: true, date: true},
        startHour: {required: true, time24: true},
        endDay: {required: true, date: true},
        endHour: {required: true, time24: true},
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
    if (!this.validateElement("input[name='name']")
      || !this.validateElement("input[name='startDay']")
      || !this.validateElement("input[name='startHour']")
      || !this.validateElement("input[name='endDay']")
      || !this.validateElement("input[name='endHour']")
      || !this.validateElement("input[name='location']")
      || !this.validateElement("input[name='organizer']")
      || !this.validateElement("textarea[name='description']")) {
      this.formValidator.focusInvalid();
      return false;
    }
    return true;
  }

  validateElement(name) {
    console.log('name' + name);
    return $(name).valid();
  }

  getDateInput() {
    return (
      <div className="timeBlock">
        <DatePicker inputProps={{name: 'startDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
                    onChange={() => {
                      $("input[name='startDay']").removeClass('error');
                    }}
                    onBlur={() => {
                      this.validateElement("input[name='startDay']")
                    }}
        />
        <DatePicker inputProps={{name: 'startHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm" defaultValue="HH:mm"
                    onChange={() => {
                      $("input[name='startHour']").removeClass('error');
                    }}
                    onBlur={() => {
                      this.validateElement("input[name='startHour']")
                    }}
        />
        <div className='timeDivider'>-</div>
        <DatePicker inputProps={{name: 'endDay', readOnly: 'readonly'}} className='newsTimeDay'
                    viewMode="days" dateFormat="YYYY-MM-DD" defaultValue="yyyy-mm-dd" timeFormat={false}
                    onChange={() => {
                      $("input[name='endDay']").removeClass('error');
                    }}
                    onBlur={() => {
                      this.validateElement("input[name='endDay']")
                    }}
        />
        <DatePicker inputProps={{name: 'endHour', readOnly: 'readonly'}} className='newsTimeHour'
                    viewMode="time" dateFormat={false} timeFormat="HH:mm" defaultValue="HH:mm"
                    onChange={() => {
                      $("input[name='endHour']").removeClass('error');
                    }}
                    onBlur={() => {
                      this.validateElement("input[name='endHour']")
                    }}
        />
      </div>
    )
  }

  onRenderContent() {
  }

  getEditorType() {
  }
}

export default EditorBase
