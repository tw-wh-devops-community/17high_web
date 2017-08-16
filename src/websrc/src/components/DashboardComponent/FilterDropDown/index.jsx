import React, { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import scss from './filterDropDown.scss';

const cx = classNames.bind(scss);
const TEXT_MAPPER = {
  createTime: <FormattedMessage id="dashboard_label_sort_by_post_time" />,
  startTime: <FormattedMessage id="dashboard_label_sort_by_start_time" />
};

class FilterDropDown extends PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    filter: PropTypes.string
  }

  static defaultProps = {
    filter: 'createTime'
  }

  state = {
    showList: false
  }

  render() {
    return (
      <div className={ cx('drop-down-container') }>
        <button className={ cx('drop-down-btn') } onClick={ () => this.setState({ showList: !this.state.showList }) }>
          {TEXT_MAPPER[this.props.filter]}
        </button>
        {
          this.state.showList && (
            <div className={ cx('options') }>
              <a
                className={ cx('option') }
                tabIndex="0"
                key="createTime"
                onClick={ () => this.onOptionSelected('createTime') }>
                { TEXT_MAPPER.createTime }
              </a>
              <a
                className={ cx('option') }
                tabIndex="-1"
                key="startTime"
                onClick={ () => this.onOptionSelected('startTime') }>
                { TEXT_MAPPER.startTime }
              </a>
            </div>
          )
        }
      </div>
    );
  }

  onOptionSelected = (filter) => {
    this.setState({ showList: false }, () => this.props.onSelect(filter));
  }

}

export default FilterDropDown;
