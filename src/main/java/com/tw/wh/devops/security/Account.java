package com.tw.wh.devops.security;

public class Account {
    private final String name;
    private final boolean isAdmin;

    public Account(String name, boolean isAdmin) {
        this.name = name;
        this.isAdmin = isAdmin;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public String getName() {
        return name;
    }

}