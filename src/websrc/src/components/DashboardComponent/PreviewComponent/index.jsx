import React, { Component } from 'react';
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';
import ActivityApiService from "../../services/ActivityApiService";
import 'react-popupbox/dist/react-popupbox.css'
import PreviewDetailComponent from "./PreviewDetailComponent.jsx"

class PreviewComponent extends Component {
  constructor(props) {
    super(props);
    this.activity = {
      name: '',
      startTime: new Date(),
      endTime: new Date(),
      sponsor: '',
      guest: '',
      type: 'SESSION',
      location: '',
      description: '',
      imageURL: 'style1'
    };
  }

  openPopupbox(id, activity) {
    if (null == activity) {
      ActivityApiService.selectActivity(id, (data) => {
        this.activity = {
          name: data.name,
          startTime: data.startTime,
          endTime: data.endTime,
          sponsor: data.sponsor,
          guest: data.guest,
          type: data.type,
          location: data.location,
          description: data.description,
          imageURL: data.imageURL
        };
        this.openWindow()
      });
    } else {
      activity = JSON.parse(activity);
      this.activity = {
        name: activity.name,
        startTime: activity.startTime,
        endTime: activity.endTime,
        sponsor: activity.sponsor,
        guest: activity.guest,
        type: activity.type,
        location: activity.location,
        description: activity.description,
        imageURL: activity.imageURL
      };
      this.openWindow();
    }
  }

  openWindow() {
    let content = <PreviewDetailComponent activity={this.activity} />;
    PopupboxManager.open({
      content,
      config: {
        titleBar: {
          enable: true,
          text: '公告预览'
        },
        fadeIn: true,
        fadeInSpeed: 500
      }
    });
  }
  
  render() {
    return (
      <div>
        <PopupboxContainer />
      </div>
    )
  }
}


export default PreviewComponent;
