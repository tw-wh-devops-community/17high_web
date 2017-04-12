import React from 'react';
import $ from 'jquery';
import 'jquery-validation';
import classNames from 'classnames/bind';

import EditorBase from '../EditorBase/EditorBase';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);

const imageURLMap = {
  0: 'style1',
  1: 'style2',
  2: 'style3',
  3: 'style4',
  4: 'style5',
  5: 'style6'
};

/* eslint-disable */
class ActivityEditor extends EditorBase {

  onRenderContent() {
    return (
      <div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动名称', true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              onInput={event => this.inputBytesLimiter(event, 40)}/>
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动时间', true)}
          <div>
            {this.getDateInput()}
            <div className='invalidTimeError'>活动时间不能为空且结束时间不能早于开始时间</div>
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动地点', true)}
          <div>
            <input
              name="location" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动地点, 最多40个字符" maxLength="40"
              onInput={event => this.inputBytesLimiter(event, 40)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('主办方', true)}
          <div>
            <input
              name="organizer" className={cx('newsNameInput')} type="text"
              placeholder="请输入主办方, 最多20个字符" maxLength="20"
              onInput={event => this.inputBytesLimiter(event, 20)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动嘉宾', false)}
          <div>
            <input
              name="guest" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动嘉宾, 最多20个字符" maxLength="20"
              onInput={event => this.inputBytesLimiter(event, 40)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动描述', true)}
          <div>
            <textarea
              name="description" className={cx('newsDescriptionInput')} type="text"
              placeholder="请输入一句简短的宣传语, 最多100个字符" maxLength="100"
              onInput={event => this.inputBytesLimiter(event, 100)} />
          </div>
        </div>
      </div>
    );
  }

  validateContent() {
    this.validateElement("input[name='location']");
    this.validateElement("input[name='organizer']");
    this.validateElement("textarea[name='description']");
  }

  onSubmit() {
    const eventName = document.getElementsByName('name')[0].value;
    const startDay = document.getElementsByName('startDay')[0].value;
    const startHour = document.getElementsByName('startHour')[0].value;
    const startTime = `${startDay} ${startHour}`;
    const endDay = document.getElementsByName('endDay')[0].value;
    const endHour = document.getElementsByName('endHour')[0].value;
    const endTime = `${endDay} ${endHour}`;
    const location = document.getElementsByName('location')[0].value;
    const organizer = document.getElementsByName('organizer')[0].value;
    const guest = document.getElementsByName('guest')[0].value;
    const description = document.getElementsByName('description')[0].value;
    const imageURL = this.getImageURL(this.state.selectedTemplateId);
    const type = this.getEditorType();
    const status = this.getStatus();

    $.ajax({
      url: '/v1/activities',
      type: 'post',
      xhrFields: { withCredentials: true },
      data: JSON.stringify({
        name: eventName,
        sponsor: organizer,
        startTime,
        endTime,
        guest,
        description,
        location,
        imageURL,
        type,
        status,
        displayTime: 10
      }),
      dataType: 'json',
      headers: {
        'Content-Type': 'application/json'
      },
      success: (data) => {
        console.log(data);
        console.log('活动发布成功');
        window.location = '/#/home?publishSuccessful';
      },
      error: (xhr, status, err) => {
        console.error('error', status, err.toString());
      }
    });
  }

  getEditorType() {
    return 'SESSION';
  }

  getStatus() {
    return 'PUBLISHED';
  }

  getImageURL(index) {
    return imageURLMap[index];
  }
}

export default ActivityEditor;
