package com.tw.wh.devops.repository;

import com.tw.wh.devops.domains.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

}
