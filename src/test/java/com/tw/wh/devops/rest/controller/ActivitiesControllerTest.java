package com.tw.wh.devops.rest.controller;

import com.tw.wh.devops.repositories.ActivityRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * Created by xjzhou on 2/24/17.
 */
@RunWith(SpringRunner.class)
@WebMvcTest(ActivitiesController.class)
public class ActivitiesControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    ActivityRepository mockActivityRepository;

    @Test
    public void shouldReturn404WhenCannotFindActivity() throws Exception {
        given(mockActivityRepository.findOne(new Long(1))).willReturn(null);

        mockMvc.perform(get("/v1/activities/1").contentType(APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code", is("404")))
                .andExpect(jsonPath("$.message", is("Activities can not be found.")));

    }

    public void setMockMvc(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
    }

    public void setMockActivityRepository(ActivityRepository mockActivityRepository) {
        this.mockActivityRepository = mockActivityRepository;
    }

}