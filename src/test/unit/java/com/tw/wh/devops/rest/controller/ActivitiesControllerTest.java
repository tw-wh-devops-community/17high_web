package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repositories.ActivityRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Created by xjzhou on 2/24/17.
 */
public class ActivitiesControllerTest {

    @InjectMocks
    private ActivitiesController ac;

    @Mock
    private ActivityRepository mockActivityRepository;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void shouldReturnActivityInRepository() throws Exception {
        Activity act = new Activity();
        act.setId(1L);
        when(mockActivityRepository.findOne(1L)).thenReturn(act);
        Activity expectedActivity = ac.getActivity(1L);

        verify(mockActivityRepository).findOne(1L);
        assertThat(expectedActivity.getId(), is(1L));
    }
}