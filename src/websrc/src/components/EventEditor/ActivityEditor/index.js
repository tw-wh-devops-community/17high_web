import React from 'react';
import TemplateSelector from '../TemplateSelector';
import $ from 'jquery';

var DatePicker = require('react-datetime');

class ActivityEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0,
      selectedTemplateId: 0
    };
  }

  render() {
    return (
      <div>
        {this.getForm()}
      </div>
    )
  }

  getForm() {
    return (
      <form className='formContainer' onSubmit={this.handleSubmit.bind(this)}>
        <div className='inputBlock'>
          {this.getInputName('活动名称', true)}
          <div><input name="name" className='newsNameInput' type="text" placeholder="请输入活动名称,15个字内"/></div>
        </div>
        <div className='inputBlock'>
          {this.getInputName('活动时间', true)}
          <div className="timeBlock">
            <DatePicker inputProps={{name: 'startDay',readOnly:'readonly'}} className='newsTimeDay'
                        viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}/>
            <DatePicker inputProps={{name: 'startHour',readOnly:'readonly'}} className='newsTimeHour'
                        viewMode="time" dateFormat={false} timeFormat="HH:mm"/>
            <div className='timeDivider'>-</div>
            <DatePicker inputProps={{name: 'endDay',readOnly:'readonly'}} className='newsTimeDay'
                        viewMode="days" dateFormat="YYYY-MM-DD" timeFormat={false}/>
            <DatePicker inputProps={{name: 'endHour',readOnly:'readonly'}} className='newsTimeHour'
                        viewMode="time" dateFormat={false} timeFormat="HH:mm"/>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动地点', true)}
          <div><input name="location" className='newsNameInput' type="text"/></div>
        </div>
        <div className="inputBlock">
          {this.getInputName('主办方', true)}
          <div><input name="organizer" className='newsNameInput' type="text"/></div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动嘉宾', false)}
          <div><input name="guest" className='newsNameInput' type="text"/></div>
        </div>
        <div className="inputBlock">
          {this.getInputName('活动描述', true)}
          <div><textarea name="description" className='newsDescriptionInput' type="text"/></div>
        </div>
        <TemplateSelector onSelect={this.onTemplateSelect.bind(this)}/>
        <div className="newsSubmit">
          <button className="publish" type="submit">发布
          </button>
          <div className="cancelPublish">取消</div>
        </div>
      </form>
    )
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
    let type = 'activity';

    console.log('eventName ' + eventName);
    console.log('startTime ' + startTime);
    console.log('endTime ' + endTime);
    console.log('organizer ' + organizer);
    console.log('guest ' + guest);
    console.log('description ' + description);
    console.log('selectedTemplateId ' + selectedTemplateId);
    console.log('type ' + type);

    $.ajax({
      url: 'http://127.0.0.1:8080/v1/activities',
      type: 'post',
      xhrFields: { withCredentials: true },
      data: JSON.stringify({
        name: eventName,
        startTime: startTime,
        endTime: endTime,
        sponsor: organizer,
        guest: guest,
        description: description,
        location: location,
        imageURL: selectedTemplateId,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data);
      },
      error: function(xhr, status, err) {
        console.error("here", status, err.toString());
      }
    });

  }

  onTemplateSelect(templateId) {
    this.setState({selectedTemplateId: templateId});
  }

}

export default ActivityEditor
