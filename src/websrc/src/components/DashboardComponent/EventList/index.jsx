import React, {Component} from "react";
import { FormattedMessage } from 'react-intl';
import {Link} from "react-router";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import $ from 'jquery';
import Preview from '../PreviewComponent/'

import ActivityApiService from "../../services/ActivityApiService";
import scss from "./eventList.scss";
import Dialog from "../../BaseComponent/PopupComponent";

const cx = classNames.bind(scss);

const SORT_DIRECTION = {
  startTime: 'asc',
  createTime: 'desc'
};

class EventList extends Component {
  static propTypes = {
    filter: PropTypes.string
  }

  static defaultProps = {
    filter: 'createTime'
  }

  state = {
    items: [],
    displayedIds: [],
    selectedId: ''
  }

  componentDidMount() {
    this.updateData(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    const filter = nextProps.filter;
    if (filter !== this.props.filter) {
      this.updateData(filter);
    }
  }

  render() {
    const titleClassNames = id => cx({
      title: true,
      displayed: this.state.displayedIds.indexOf(id) > -1
    });

    const formatDate = date => (date || '').split('-').join('/');

    return (
      <div className={cx('event-list-container')}>
        {
          this.state.items.map((activity, index) => {
            const startTime = formatDate(activity.startTime);
            const endTime = formatDate(activity.endTime);
            const createTime = formatDate(activity.createTime);
            const sessionTimeTemp = (loc, sponsor) => <FormattedMessage
              id="dashboard_session_time"
              values={{
                startTime,
                endTime,
                loc,
                sponsor
              }} />;
            const newsTimeTemp = () => <FormattedMessage
              id="dashboard_news_time"
              values={{
                startTime,
                endTime
              }} />;

            if (activity.type) {
              return (
                <div key={activity.id} className={ cx('activity-event') }>
                  <div className={ titleClassNames(activity.id) }>[活动] &nbsp;{ activity.name }</div>
                  <div className={ cx('activity-operations') }>
                    <button
                      className={ cx('option') }
                      id={ activity.id }
                      onClick={ this.handlePreviewClick }>
                      <FormattedMessage id="dashboard_preview" />
                    </button>
                    <button className={ cx('option') }><Link to={ 'editor/' + activity.id }><FormattedMessage id="dashboard_edit" /></Link></button>
                    <button
                      className={ cx('option') }
                      id={ activity.id }
                      onClick={ this.handleDeleteClick }>
                      <FormattedMessage id="dashboard_delete" />
                    </button>
                    <div className={ cx('display-time') }>
                      <button><FormattedMessage id="dashboard_display_10s" /></button>
                      <div id="options" className={ cx('options') }>
                        <a data-id={ activity.id } onClick={ (evt) => this.updateDisplayTime(10, evt) }><FormattedMessage id="dashboard_display_10s" /></a>
                        <a data-id={ activity.id } onClick={ (evt) => this.updateDisplayTime(20, evt) }><FormattedMessage id="dashboard_display_20s" /></a>
                      </div>
                    </div>
                  </div>
                  <div
                    className={ cx('activity-loc-time') }>{ activity.type === 'SESSION' ? sessionTimeTemp(activity.location, activity.sponsor) : newsTimeTemp(startTime, endTime) }</div>
                  <div className={ cx('activity-desc') }>{ activity.description }</div>
                  <div className={ cx('activity-owner') }>{ createTime } { activity.owner } <FormattedMessage id="dashboard_label_post" /></div>
                  <br />
                </div>
              );
            }

            return <div key={`unknown-activity-type-${index}`}><FormattedMessage id="dashboard_warn_unknown_type" /></div>;
          })
        }
        <Dialog
          ref={ dialog => this.dialog = dialog }
          id="event-list-dialog"
          title="删除"
          message="确认要删除这篇公告么?"
          positiveText="确认"
          negativeText="取消"
          onPositiveClick={
            () => ActivityApiService.deleteActivity(this.state.selectedId,
              () => this.updateData(this.props.filter))
          } />
        <Preview
          ref={ preview => this.preview = preview }>
        </Preview>
      </div>
    );
  }

  updateData = (filter) => {
    this.fetchData(this.buildUrl(16, 0, `${filter},${SORT_DIRECTION[filter]}`), (data) => {
      this.setState({
        items: data
      });
    });

    this.fetchData(this.buildUrl(6, 0, `startTime,${SORT_DIRECTION.startTime}`), (data) => {
      const displayedIds = [];
      data && data.forEach(item => displayedIds.push(item.id));
      this.setState({
        displayedIds
      });
    });
  }

  updateDisplayTime = (time, evt) => {
    let id = evt.target.getAttribute('data-id');

    let items = this.state.items;
    let item = this.state.items.filter(item => item.id.toString() === id);
    ActivityApiService.updateActivity(`/v1/activities/${id}`,
      JSON.stringify({...item[0], displayTime: time}), () => $('#options')[0].style.display = 'none');
  }

  fetchData = (url, callback) => {
    ActivityApiService.list(url).then(
      data => callback(data)
    );
  }

  buildUrl = (size, page, sort, validation = false) => (`/v1/activities?size=${size}&page=${page}&sort=${sort}&validation=${validation}`)


  handleDeleteClick = (evt) => {
    const id = evt.target.id;
    this.setState({ selectedId: id }, this.dialog.showDialog('event-list-dialog'));
  }

  handlePreviewClick = (evt) => {
    const id = evt.target.id;
    this.setState({ selectedId: id }, this.preview.openPopupbox(id));
  }
}


export default EventList;
