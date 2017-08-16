package com.tw.wh.devops.repositories;

import com.tw.wh.devops.domains.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    @Query("SELECT a FROM Activity a WHERE a.startTime >= :startTime")
    Page<Activity> findAllWithStartTimeLaterThan(@Param("startTime") Date startTime, Pageable pageable);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Activity a SET a.startTime = TIMESTAMPADD(DAY, CEIL(TIMESTAMPDIFF(DAY, a.startTime, NOW())/7.0) * 7, a.startTime), end_time = TIMESTAMPADD(DAY, CEIL(TIMESTAMPDIFF(DAY, a.startTime, NOW())/7.0) * 7, end_time) WHERE a.startTime < NOW() AND a.weeklyRepeat = 1")
    void updateWeeklyActivityStartTime();
}
