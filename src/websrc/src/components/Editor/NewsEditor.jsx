import React from 'react';
import 'jquery-validation';
import classNames from 'classnames/bind';

import EditorBase from './EditorBase';
import styles from '../css/editor.scss';

import ActivityApiService from '../services/ActivityApiService';

const cx = classNames.bind(styles);

/* eslint-disable */
class NewsEditor extends EditorBase {

  componentDidMount() {
    this.initValidator();
  }

  onRenderContent(getEventAttribute) {
    return (
      <div>
        <div className={cx('inputBlock')}>
          {this.getInputName('新闻名称', true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              value={getEventAttribute('name')}
              onInput={event => this.handleInputChange(event)} />
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
              value={getEventAttribute('description')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
      </div>
    );
  }

  validateContent() {
    return this.validateElement("textarea[name='description']");
  }

  onSubmit() {
    ActivityApiService.submitData('/v1/activities', this.getActivity('PUBLISHED'),(data) => {
        console.log('新闻发布成功', data);
        window.location = '/#/home?newsPublished';
      }
    );
  }

  onUpdate(id) {
    ActivityApiService.updateActivity('/v1/activities/' + id, this.getActivity('UPDATED'), (data) => {
      console.log('新闻更新成功', data);
      window.location = '/#/home?newsUpdated';
    });
  }

  getEditorType() {
    return 'NEWS';
  }
}

export default NewsEditor;
