package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repositories.ActivityRepository;
import com.tw.wh.devops.rest.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Iterator;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by xjzhou on 2/15/17.
 */
@RestController
@RequestMapping("/v1/activities")
public class ActivitiesController {

    @Autowired
    private ActivityRepository activityRepository;


    @RequestMapping(method = GET)
    public Iterator getActivities(@RequestParam(defaultValue = "${17high.page.size}") int size,
                                  @RequestParam(defaultValue = "${17high.page.number}") int page,
                                  @RequestParam(required = false, defaultValue = "") String type,
                                  @RequestParam(required = false, defaultValue = "") String status,
                                  @RequestParam(required = false, defaultValue = "") String sort,
                                  HttpServletRequest request,
                                  HttpServletResponse response) {
        PageRequest pageRequest = new PageRequest(page, size);
        Page<Activity> all = activityRepository.findAll(pageRequest);
        Iterator<Activity> iterator = all.getContent().iterator();
        return iterator;
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

    @RequestMapping(method = POST)
    public Activity addActivity(@RequestBody Activity activity) {
        System.out.println("we are here");
        Activity tempActivity = new Activity();
        tempActivity.setName(activity.getName());
        tempActivity.setStartTime(activity.getStartTime());
        tempActivity.setEndTime(activity.getEndTime());
        tempActivity.setDescription(activity.getDescription());
        tempActivity.setSponsor(activity.getSponsor());
        tempActivity.setGuest(activity.getGuest());
        tempActivity.setType(activity.getType());
        tempActivity.setImageURL(activity.getImageURL());
        return activityRepository.save(tempActivity);

    }

}
