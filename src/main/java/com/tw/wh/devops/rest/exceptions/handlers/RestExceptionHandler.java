package com.tw.wh.devops.rest.exceptions.handlers;

import com.tw.wh.devops.rest.data.GenericErrorData;
import com.tw.wh.devops.rest.exceptions.ResourceNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

/**
 * Created by xjzhou on 2/24/17.
 */
@ControllerAdvice
public class RestExceptionHandler extends BaseExceptionHandler {

    @ResponseStatus(NOT_FOUND)
    @ExceptionHandler(ResourceNotFoundException.class)
    public @ResponseBody GenericErrorData handleResourceNotFoundException(ResourceNotFoundException e) {
        return new GenericErrorData(NOT_FOUND.toString(), e.getMessage());
    }
}
