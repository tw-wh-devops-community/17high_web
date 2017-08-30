package com.tw.wh.devops.repositories;

import com.tw.wh.devops.domains.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    @Query("SELECT a FROM Activity a WHERE a.endTime >= :currentTime")
    Page<Activity> findAllWithEndTimeLaterThan(@Param("currentTime") Date currentTime, Pageable pageable);

    @Modifying(clearAutomatically = true)
    @Query("UPDATE Activity a SET a.startTime = TIMESTAMPADD(DAY, (TIMESTAMPDIFF(WEEK, a.startTime, NOW()) + 1) * 7, a.startTime), a.endTime = TIMESTAMPADD(DAY, (TIMESTAMPDIFF(WEEK, a.startTime, NOW()) + 1) * 7, a.endTime) WHERE a.endTime < NOW() AND a.weeklyRepeat = 1")
    void updateWeeklyActivityStartTime();
}
