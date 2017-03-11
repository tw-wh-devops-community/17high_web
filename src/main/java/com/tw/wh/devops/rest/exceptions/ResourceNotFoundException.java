package com.tw.wh.devops.rest.exceptions;

/**
 * Created by xjzhou on 2/24/17.
 */
public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException(){
        super();
    }

    public ResourceNotFoundException(String message){
        super(message);
    }

}
