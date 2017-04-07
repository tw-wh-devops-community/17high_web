package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repositories.ActivityRepository;
import com.tw.wh.devops.rest.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Iterator;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Created by xjzhou on 2/15/17.
 */
@CrossOrigin(origins = "${cross.origin.url}")
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
                                  @RequestParam(required = false, defaultValue = "") boolean validation) {
        PageRequest pageRequest = new PageRequest(page, size);
        Page<Activity> all;
        if (validation) {
            all = activityRepository.findAllWithStartTimeLaterThan(new Date(), pageRequest);
        } else {
            all = activityRepository.findAll(pageRequest);
        }
        return all.getContent().iterator();
    }

    @RequestMapping(path = "/{id}", method = GET)
    public @ResponseBody Activity getActivity(@PathVariable(value = "id") long id) {
        Activity activity = activityRepository.findOne(id);
        if (null == activity) {
            throw new ResourceNotFoundException("Activities can not be found.");
        }
        return activity;
    }

    @RequestMapping(method = POST)
    public Activity addActivity(@RequestBody Activity activity) {
        return activityRepository.saveAndFlush(activity);
    }

}
