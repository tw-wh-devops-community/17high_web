import React from 'react';
import { FormattedMessage } from 'react-intl';
import 'jquery-validation';
import classNames from 'classnames/bind';

import BaseEditor from './BaseEditor';
import styles from '../css/editor.scss';

import ActivityApiService from '../services/ActivityApiService';

const cx = classNames.bind(styles);

/* eslint-disable */
class NewsEditor extends BaseEditor {

  componentDidMount() {
    this.initValidator();
  }

  onRenderContent(getEventAttribute) {
    return (
      <div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="news_name" />, true)}
          <div>
            <input
              name="name" className={cx('newsNameInput')} type="text"
              placeholder="请输入活动名称, 最多40个字符" maxLength="40"
              value={getEventAttribute('name')}
              onInput={event => this.handleInputChange(event)} />
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="display_time_range" />, true)}
          <div>
            {this.getDateInput()}
            <div className='invalidTimeError'><FormattedMessage id="invalid_time_error" /></div>
          </div>
        </div>
        <div className={cx('inputBlock')}>
          {this.getInputName(<FormattedMessage id="news_content" />, true)}
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
