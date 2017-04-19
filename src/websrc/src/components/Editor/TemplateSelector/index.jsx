import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import TemplateItem from './TemplateItem';
import styles from '../../css/editor.scss';

const COLUMN_NUMBER = 3;
const icon1 = require('../../../image/temp_icon1.png');
const icon2 = require('../../../image/temp_icon2.png');
const icon3 = require('../../../image/temp_icon3.png');
const icon4 = require('../../../image/temp_icon4.png');
const icon5 = require('../../../image/temp_icon5.png');
const icon6 = require('../../../image/temp_icon6.png');
const previewImg = require('../../../image/preview.png');

const cx = classNames.bind(styles);

class TemplateSelector extends Component {

  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      templates: [
        { id: 1, url: icon1 },
        { id: 2, url: icon2 },
        { id: 3, url: icon3 },
        { id: 4, url: icon4 },
        { id: 5, url: icon5 },
        { id: 6, url: icon6 }
      ],
      selectedTemplate: 0
    };
  }

  render() {
    return (
      <div className={cx('templateSelectBlock')}>
        {TemplateSelector.getInputName('选择模板', true)}
        {this.getTemplates(this.state.templates)}
        <div className={cx('previewBlock')}>
          <div className={cx('preview')}>
            <img
              alt=""
              className={cx('previewIcon')}
              src={previewImg} />
            <div className={cx('previewText')}>预览看看</div>
          </div>
        </div>
      </div>
    );
  }

  static getInputName(name, isRequired) {
    return (
      <div className={cx('inputNameContainer')}><span className={cx(isRequired ? 'starChar' : 'starCharHidden')}>*</span>{name}：
      </div>
    );
  }

  getTemplates(templates) {
    const items = [];
    for (let i = 0; i < templates.length; i += 1) {
      items.push(this.getTemplateItem(templates[i], i));
    }
    return (
      <div className={cx('templates')}>
        {items}
      </div>
    );
  }

  getTemplateItem(template, index) {
    const isFirst = index % COLUMN_NUMBER === 0;

    return (
      <TemplateItem
        key={index}
        index={index}
        isFirst={isFirst}
        url={template.url}
        onClick={this.handleTemplateClick}
        isSelected={this.state.selectedTemplate === index} />
    );
  }

  handleTemplateClick = (index, evt) => {
    evt.preventDefault();
    if (index === this.state.selectedTemplate) {
      return;
    }
    this.setState({ selectedTemplate: index });
    this.props.onSelect(index);
  };
}

export default TemplateSelector;
