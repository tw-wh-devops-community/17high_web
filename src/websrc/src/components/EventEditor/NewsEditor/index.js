import React from 'react';
import  'jquery-validation';
import $ from 'jquery';
import EditorBase from '../EditorBase/EditorBase'

class NewsEditor extends EditorBase {

  componentDidMount() {
    this.initValidator();
  }

  onRenderContent() {
    return (
      <div>
        <div className='inputBlock'>
          {this.getInputName('新闻名称', true)}
          <div>
            <input name="name" className='newsNameInput' type="text"
                   placeholder="请输入活动名称, 最多40个字符" maxLength='40'
                   onInput={(event) => this.inputBytesLimiter(event, 40)}/>
          </div>
        </div>
        <div className='inputBlock'>
          {this.getInputName('展示时间', true)}
          <div>
            {this.getDateInput()}
            <div className="invalidTimeError">活动时间不能为空且结束时间不能早于开始时间</div>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('新闻内容', true)}
          <div>
            <textarea name="description" className='newsDescriptionInput' type="text"
                      placeholder="请输入内容详情, 最多200个字符" maxLength='200'
                      onInput={(event) => this.inputBytesLimiter(event, 200)}/>
          </div>
        </div>
      </div>
    )
  }

  validateContent() {
    return this.validateElement("textarea[name='description']");
  }

  onSubmit() {
    let eventName = document.getElementsByName('name')[0].value;

    let startDay = document.getElementsByName('startDay')[0].value;
    let startHour = document.getElementsByName('startHour')[0].value;
    let startTime = startDay + " " + startHour;
    let endDay = document.getElementsByName('endDay')[0].value;
    let endHour = document.getElementsByName('endHour')[0].value;
    let endTime = endDay + " " + endHour;

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
        description: description,
        imageURL: `style${selectedTemplateId + 1}`,
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

  getEditorType() {
    return 'NEWS';
  }
}

export default NewsEditor;
