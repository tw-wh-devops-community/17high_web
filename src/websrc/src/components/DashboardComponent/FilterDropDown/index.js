import React, { PureComponent, PropTypes } from 'react';
import classNames from 'classnames/bind';

import scss from './filterDropDown.scss';

const cx = classNames.bind(scss);
const TEXT_MAPPER = {
  'createTime': '按活动发布时间排序',
  'startTime': '按活动开始时间排序'
};

class FilterDropDown extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    filter: PropTypes.string
  }

  state = {
    showList: false
  }

  render() {
    return (
      <div className={cx('drop-down-container')} >
        <button className={cx('drop-down-btn')} onClick={ () => this.setState({showList: !this.state.showList}) }>
          {TEXT_MAPPER[this.props.filter || 'createTime']}
        </button>
          {
            this.state.showList && (
              <div className={cx('options')}>
                <a className={cx('option')} key="createTime" onClick={ this.onOptionSelected.bind(null, 'createTime') }>{ TEXT_MAPPER['createTime'] }</a>
                <a className={cx('option')} key="startTime" onClick={ this.onOptionSelected.bind(null, 'startTime') }>{ TEXT_MAPPER['startTime'] }</a>
              </div>
            )
          }
        </div>
    );
  }

  onOptionSelected = (filter) => {
    this.setState({showList: false}, this.props.onSelect.bind(null, filter));
  }

}

export default FilterDropDown;
