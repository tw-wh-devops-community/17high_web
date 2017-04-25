import React from 'react';
import 'jquery-validation';
import classNames from 'classnames/bind';

import EditorBase from './EditorBase';
import styles from '../css/editor.scss';

import ActivityApiService from '../services/ActivityApiService';

const cx = classNames.bind(styles);

/* eslint-disable */
class ActivityEditor extends EditorBase {

  onRenderContent(getEventAttribute) {
    return (
      <div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动名称', true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              value={getEventAttribute('name')}
              onInput={event => this.handleInputChange(event)} />
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
              value={getEventAttribute('location')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('主办方', true)}
          <div>
            <input
              name="sponsor" className={cx('newsNameInput')} type="text"
              placeholder="请输入主办方, 最多20个字符" maxLength="20"
              value={getEventAttribute('sponsor')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动嘉宾', false)}
          <div>
            <input
              name="guest" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动嘉宾, 最多20个字符" maxLength="20"
              value={getEventAttribute('guest')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName('活动描述', true)}
          <div>
            <textarea
              name="description" className={cx('newsDescriptionInput')} type="text"
              placeholder="请输入一句简短的宣传语, 最多100个字符" maxLength="100"
              value={getEventAttribute('description')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
      </div>
    );
  }

  validateContent() {
    this.validateElement("input[name='location']");
    this.validateElement("input[name='sponsor']");
    this.validateElement("textarea[name='description']");
  }

  onSubmit() {
    ActivityApiService.submitData('/v1/activities', this.getActivity('PUBLISHED'), (data) => {
        console.log('活动发布成功', data);
        window.location = '/#/home?activityPublished';
      });
  }

  onUpdate(id) {
    ActivityApiService.updateActivity('/v1/activities/' + id, this.getActivity('UPDATED'), (data) => {
      console.log('活动更新成功', data);
      window.location = '/#/home?activityUpdated';
    });
  }

  getEditorType() {
    return 'SESSION';
  }

}

export default ActivityEditor;
