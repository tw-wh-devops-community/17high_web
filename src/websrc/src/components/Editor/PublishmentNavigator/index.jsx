import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);

class Navigator extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    isUpdate: PropTypes.bool.isRequired,
    selectedIndex: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isUpdate: nextProps.isUpdate, selectedIndex: nextProps.selectedIndex });
  }

  render() {
    return (
      <div className={cx('navBlock')}>
        <nav className={cx('navigation')}>
          {this.shouldShowTab(0) &&
            <div className={cx('activityNavBlock')}>
              <button
                className={cx(this.state.selectedIndex === 0
                  ? 'activityNavSelected'
                  : 'activityNav')}
                onClick={() => this.onSelectNav(0)}>
                {this.getActivityTabTitle()}
              </button>
            </div>
          }
          {this.shouldShowTab(1) &&
            <div className={cx('activityNavBlock')}>
              <button
                className={cx(this.state.selectedIndex === 1
                  ? 'newsNavSelected'
                  : 'newsNav')}
                onClick={() => this.onSelectNav(1)}>
                {this.getNewsTabTitle()}
              </button>
            </div>
          }
        </nav>
        <div className={cx('horizontalLine')} />
      </div>
    );
  }
  onSelectNav(index) {
    if (this.state.selectedIndex === index) {
      return;
    }
    this.setState({ selectedIndex: index });
    this.props.onSelect(index);
  }

  shouldShowTab(index) {
    return !(this.props.isUpdate && this.state.selectedIndex !== index);
  }

  getActivityTabTitle() {
    return this.props.isUpdate ? '更新活动' : '发布活动';
  }

  getNewsTabTitle() {
    return this.props.isUpdate ? '更新新闻' : '发布新闻';
  }

}

export default Navigator;
