package com.tw.wh.devops.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by xjzhou on 3/11/17.
 */
@RestController
public class ActivitiesWebController {

    @GetMapping("/activity")
    public String addActivities(Model model) {
        model.addAttribute("title", "Add a new Activities");
        return "addActivityForm";
    }
}
