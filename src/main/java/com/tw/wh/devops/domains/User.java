package com.tw.wh.devops.domains;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by xjzhou on 2/13/17.
 */
@Entity
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String firstName;
    private String lastName;
    private String avatarURL;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date dob;
    private String gender;

    @JsonIgnore
    @ManyToMany(mappedBy="participants", fetch = FetchType.LAZY)
    private List<Activity> joinedActivities = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy="sponsor", fetch = FetchType.LAZY)
    private List<Activity> ownedActivities = new ArrayList<>();;


    public List<Activity> getJoinedActivities() {
        return joinedActivities;
    }

    public void setJoinedActivities(List<Activity> joinedActivities) {
        this.joinedActivities = joinedActivities;
    }


    public List<Activity> getOwnedActivities() {
        return ownedActivities;
    }


    public void setOwnedActivities(List<Activity> ownedActivities) {
        this.ownedActivities = ownedActivities;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAvatarURL() {
        return avatarURL;
    }

    public void setAvatarURL(String avatarURL) {
        this.avatarURL = avatarURL;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
