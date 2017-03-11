package com.tw.wh.devops.rest.data;

import java.io.Serializable;

/**
 * Created by xjzhou on 2/24/17.
 */
public class GenericErrorData implements Serializable {

    private String code;
    private String message;

    public GenericErrorData(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
