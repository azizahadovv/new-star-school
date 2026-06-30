package com.nss.repository;

import com.nss.entity.SchoolTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface SchoolTimeRepository extends JpaRepository<SchoolTime, Long> {
    Optional<SchoolTime> findByNumber(int number);

}
