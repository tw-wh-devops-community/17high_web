package com.tw.wh.devops.rest.repositories;

import com.tw.wh.devops.domains.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivitiesRepository extends JpaRepository<Activity, Long> {
}
