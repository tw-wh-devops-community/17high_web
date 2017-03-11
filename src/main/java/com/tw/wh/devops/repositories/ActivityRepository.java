package com.tw.wh.devops.repositories;

import com.tw.wh.devops.domains.Activity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xjzhou on 2/13/17.
 */
@Repository
public interface ActivityRepository extends CrudRepository<Activity, Long>{

}
