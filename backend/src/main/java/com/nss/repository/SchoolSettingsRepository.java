package com.nss.repository;

import com.nss.entity.SchoolSettings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchoolSettingsRepository extends JpaRepository<SchoolSettings, Long> {
}
