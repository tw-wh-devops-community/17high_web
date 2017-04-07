import React from 'react';
import 'jquery-validation';
import $ from 'jquery';
import EditorBase from '../EditorBase/EditorBase';

/* eslint-disable */
class NewsEditor extends EditorBase {

  componentDidMount() {
    this.initValidator();
  }

  onRenderContent() {
    return (
      <div>
        <div className="inputBlock">
          {this.getInputName('新闻名称', true)}
          <div>
            <input
              name="name" className="newsNameInput" type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              onInput={event => this.inputBytesLimiter(event, 40)} />
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('展示时间', true)}
          <div>
            {this.getDateInput()}
            <div className="invalidTimeError">活动时间不能为空且结束时间不能早于开始时间</div>
          </div>
        </div>
        <div className="inputBlock">
          {this.getInputName('新闻内容', true)}
          <div>
            <textarea
              name="description" className="newsDescriptionInput" type="text"
              placeholder="请输入内容详情, 最多200个字符" maxLength="200"
              onInput={event => this.inputBytesLimiter(event, 200)} />
          </div>
        </div>
      </div>
    );
  }

  validateContent() {
    return this.validateElement("textarea[name='description']");
  }

  onSubmit() {
    const eventName = document.getElementsByName('name')[0].value;
    const startDay = document.getElementsByName('startDay')[0].value;
    const startHour = document.getElementsByName('startHour')[0].value;
    const startTime = `${startDay} ${startHour}`;
    const endDay = document.getElementsByName('endDay')[0].value;
    const endHour = document.getElementsByName('endHour')[0].value;
    const endTime = `${endDay} ${endHour}`;
    const description = document.getElementsByName('description')[0].value;
    const selectedTemplateId = this.state.selectedTemplateId;
    const type = this.getEditorType();

    $.ajax({
      url: 'http://localhost:8080/v1/activities',
      type: 'post',
      xhrFields: { withCredentials: true },
      data: JSON.stringify({
        name: eventName,
        startTime,
        endTime,
        description,
        imageURL: selectedTemplateId,
        type
      }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log(data);
      },
      error: (xhr, status, err) => {
        console.error('error', status, err.toString());
      }
    });
  }

  getEditorType() {
    return 'NEWS';
  }
}

export default NewsEditor;
