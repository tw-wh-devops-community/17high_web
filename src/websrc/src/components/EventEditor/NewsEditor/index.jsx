import React from 'react';
import 'jquery-validation';
import $ from 'jquery';
import classNames from 'classnames/bind';

import EditorBase from '../EditorBase/EditorBase';
import styles from '../../css/editor.scss';

import ActivityApiService from '../../services/ActivityApiService';

const cx = classNames.bind(styles);

/* eslint-disable */
class NewsEditor extends EditorBase {

  componentDidMount() {
    this.initValidator();
  }

  onRenderContent() {
    return (
      <div>
        <div className={cx('inputBlock')}>
          {this.getInputName('新闻名称', true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              onInput={event => this.inputBytesLimiter(event, 40)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('展示时间', true)}
          <div>
            {this.getDateInput()}
            <div className='invalidTimeError'>活动时间不能为空且结束时间不能早于开始时间</div>
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('新闻内容', true)}
          <div>
            <textarea
              name="description" className={cx('newsDescriptionInput')} type="text"
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

    ActivityApiService.submitData('/v1/activities', JSON.stringify({
        name: eventName,
        startTime,
        endTime,
        description,
        imageURL: selectedTemplateId,
        type,
        displayTime: 10
      }),(data) => {
        console.log(data);
        window.location = '/#/home?publishSuccessful';
      }
    );
  }

  getEditorType() {
    return 'NEWS';
  }
}

export default NewsEditor;
