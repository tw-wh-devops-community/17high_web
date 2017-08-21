package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.domains.Activity;
import com.tw.wh.devops.repositories.ActivityRepository;
import com.tw.wh.devops.rest.exceptions.ResourceNotFoundException;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Date;
import java.util.Iterator;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;

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

    @Rule
    public final ExpectedException exception = ExpectedException.none();

    @Test
    public void testGetActivityShouldReturnActivityInRepository() throws Exception {
        Activity act = new Activity();
        act.setId(1L);
        when(mockActivityRepository.findOne(1L)).thenReturn(act);
        Activity expectedActivity = ac.getActivity(1L);

        verify(mockActivityRepository).findOne(1L);
        assertThat(expectedActivity.getId(), is(1L));
    }

    @Test
    public void testGetActivityShouldThrowExceptionWhenNotExist() throws Exception {
        when(mockActivityRepository.findOne(anyLong())).thenReturn(null);

        exception.expect(ResourceNotFoundException.class);
        ac.getActivity(1L);
        verify(mockActivityRepository).findOne(1L);
    }

    @Test
    public void testGetActivitiesShouldReturnActivitiesInRepository() throws Exception {
        Iterator iterator = Mockito.spy(Iterator.class);
        Page activityPage = Mockito.mock(Page.class, RETURNS_DEEP_STUBS);
        Sort sort = new Sort(Sort.Direction.ASC, "id");

        when(activityPage.getContent().iterator()).thenReturn(iterator);

        when(mockActivityRepository.findAll(any(Pageable.class))).thenReturn(activityPage);

        Iterator expectedIterator = ac.getActivities(1, 1, "", "", false, sort);

        verify(mockActivityRepository).findAll(any(Pageable.class));
        assertThat(expectedIterator, equalTo(iterator));
    }

    @Test
    public void testGetActivitiesShouldFilterStartTime() throws Exception {
        Iterator iterator = Mockito.spy(Iterator.class);
        Page activityPage = Mockito.mock(Page.class, RETURNS_DEEP_STUBS);
        Sort sort = new Sort(Sort.Direction.ASC, "id");

        when(activityPage.getContent().iterator()).thenReturn(iterator);
        when(mockActivityRepository.findAllWithEndTimeLaterThan(any(Date.class), any(Pageable.class))).thenReturn(activityPage);
        Iterator expectedIterator = ac.getActivities(1, 1, "", "", true, sort);

        verify(mockActivityRepository).findAllWithEndTimeLaterThan(any(Date.class), any(Pageable.class));
        assertThat(expectedIterator, equalTo(iterator));
    }

    @Test
    public void testAddActivityShouldCallSaveAndFlushInRepository() throws Exception {
        Activity act = new Activity();
        act.setId(1L);
        when(mockActivityRepository.saveAndFlush(any(Activity.class))).thenReturn(act);
        Activity expectedActivity = ac.addActivity(act);

        verify(mockActivityRepository).saveAndFlush(any(Activity.class));
        assertThat(expectedActivity, equalTo(act));
    }
}
