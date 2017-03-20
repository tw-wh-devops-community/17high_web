package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repository.ActivityRepository;
import com.tw.wh.devops.rest.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

/**
 * Created by xjzhou on 2/15/17.
 */
@RestController
@RequestMapping("/v1/activities")
public class ActivitiesController {

    @Autowired
    private ActivityRepository activityRepository;


    @RequestMapping(method = GET)
    public Iterable getActivities(@RequestParam(defaultValue = "${17high.page.size}") int size,
                                  @RequestParam(defaultValue = "${17high.page.number}") int page,
                                  @RequestParam(required = false, defaultValue = "") String type,
                                  @RequestParam(required = false, defaultValue = "") String status,
                                  @RequestParam(required = false, defaultValue = "") String sort,
                                  HttpServletRequest request,
                                  HttpServletResponse response) {

        Iterable<Activity> activities = activityRepository.findAll();
        return activities;
    }

    @RequestMapping(path = "/{id}", method = GET)
    public @ResponseBody Activity getActivity(@PathVariable(value = "id") long id) {
        Activity activity = activityRepository.findOne(id);
        if (null == activity) {
            throw new ResourceNotFoundException("Activities can not be found.");
        }
        return activity;
    }

//    @SuppressWarnings("unused")
//    public void setActivityRepository(ActivityRepository activityRepository) {
//        this.activityRepository = activityRepository;
//    }

    @PostMapping
    public Activity addActivity(@RequestBody Activity activity) {

        Activity tempActivity = new Activity();
        tempActivity.setEventName(activity.getEventName());
        tempActivity.setStartTime(activity.getStartTime());
        tempActivity.setEndTime(activity.getEndTime());
        tempActivity.setEventDescription(activity.getEventDescription());
        tempActivity.setEventOrganizer(activity.getEventOrganizer());
        tempActivity.setEventGuest(activity.getEventGuest());
        tempActivity.setEventType(activity.getEventType());
        tempActivity.setTemplateId(activity.getTemplateId());

        return activityRepository.save(tempActivity);

    }

}
