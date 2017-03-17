package com.tw.wh.devops.domains;

/**
 * Created by genli on 3/17/17.
 */
public class NewActivity {
    String eventName;
    String startTime;
    String endTime;

    String location;
    String organizer;
    String guest;
    String description;
    String selectedTemplateId;
    String type;

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getOrganizer() {
        return organizer;
    }

    public void setOrganizer(String organizer) {
        this.organizer = organizer;
    }

    public String getGuest() {
        return guest;
    }

    public void setGuest(String guest) {
        this.guest = guest;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSelectedTemplateId() {
        return selectedTemplateId;
    }

    public void setSelectedTemplateId(String selectedTemplateId) {
        this.selectedTemplateId = selectedTemplateId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "NewActivity{" +
                "eventName='" + eventName + '\'' +
                ", startTime='" + startTime + '\'' +
                ", endTime='" + endTime + '\'' +
                ", location='" + location + '\'' +
                ", organizer='" + organizer + '\'' +
                ", guest='" + guest + '\'' +
                ", description='" + description + '\'' +
                ", selectedTemplateId='" + selectedTemplateId + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
