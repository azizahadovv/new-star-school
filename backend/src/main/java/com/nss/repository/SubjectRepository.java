package com.nss.repository;

import com.nss.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<Subject, Long> {
    boolean existsByName(String name);
}
