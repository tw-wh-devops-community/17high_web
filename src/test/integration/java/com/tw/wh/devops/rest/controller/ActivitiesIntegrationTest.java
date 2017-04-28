package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.Application;
import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repositories.ActivityRepository;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.data.domain.Page;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.text.SimpleDateFormat;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.greaterThanOrEqualTo;

/**
 * Created by xjzhou on 2/24/17.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=Application.class)
@Profile("test")
public class ActivitiesIntegrationTest {

    @Autowired
    ActivityRepository activityRepository;

    @Test
    public void testFindAll() throws Exception {
        List<Activity> activities = activityRepository.findAll();
        assertThat(activities.size(), is(greaterThanOrEqualTo(0)));
    }

    @Test
    @Ignore
    @Sql("FindAllWithStartTimeTest.sql")
    public void testFindAllWithStartTimeLaterThan() throws Exception {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Page<Activity> activities = activityRepository.findAllWithStartTimeLaterThan(formatter.parse("2018-02-17 18:00:00"), null);
        assertThat(activities.getSize(), is(2));
    }
}
