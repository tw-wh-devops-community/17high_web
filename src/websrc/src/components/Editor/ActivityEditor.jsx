import React from 'react';
import { FormattedMessage } from 'react-intl';
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
          {this.getInputName(<FormattedMessage id="session_name" />, true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              value={getEventAttribute('name')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="session_time_range" />, true)}
          <div>
            {this.getDateInput()}
            <div className={cx('inputBlock')}>
              <input type="checkbox" className={cx('inputCheck')} name="weeklyRepeat" defaultChecked={this.getChecked('weeklyRepeat')} onChange={event => this.handleInputChange(event)} />每周重复
            </div>
            <div className='invalidTimeError'><FormattedMessage id="invalid_time_error" /></div>
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="session_location" />, true)}
          <div>
            <input
              name="location" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动地点, 最多40个字符" maxLength="40"
              value={getEventAttribute('location')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="session_host" />, true)}
          <div>
            <input
              name="sponsor" className={cx('newsNameInput')} type="text"
              placeholder="请输入主办方, 最多20个字符" maxLength="20"
              value={getEventAttribute('sponsor')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="session_guest" />, false)}
          <div>
            <input
              name="guest" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动嘉宾, 最多20个字符" maxLength="20"
              value={getEventAttribute('guest')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="session_description" />, true)}
          <div>
            <textarea
              name="description" className={cx('newsDescriptionInput')} type="text"
              placeholder="请输入一句简短的宣传语, 最多100个字符" maxLength="200"
              value={getEventAttribute('description')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
      </div>
    );
  }

  validateContent() {
    return this.validateElement("input[name='location']") && this.validateElement("input[name='sponsor']") && this.validateElement("textarea[name='description']");
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
