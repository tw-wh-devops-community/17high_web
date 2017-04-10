import React from 'react';
import classNames from 'classnames/bind';
import styles from '../../css/editor.scss';

const cx = classNames.bind(styles);


class Navigator extends React.Component {
  static propTypes = {
    onSelect: React.PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }
  render() {
    return (
      <div className={cx('navBlock')}>
        <nav className={cx('navigation')}>
          <div className={cx('activityNavBlock')}>
            <button
              className={cx(this.state.selectedIndex === 0 ? 'activityNavSelected' : 'activityNav')}
              onClick={() => this.onSelectNav(0)}>
              发布活动
            </button>
          </div>
          <div className={cx('activityNavBlock')}>
            <button
              className={cx(this.state.selectedIndex === 1 ? 'newsNavSelected' : 'newsNav')}
              onClick={() => this.onSelectNav(1)}>
              发布新闻
            </button>
          </div>
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
}

export default Navigator;
