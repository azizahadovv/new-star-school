package com.nss.repository;

import com.nss.entity.SchoolClass;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SchoolClassRepository extends JpaRepository<SchoolClass, Long> {
    boolean existsByGradeAndGroupLetter(String grade, String groupLetter);
    Optional<SchoolClass> findByGradeAndGroupLetter(String grade, String groupLetter);
}
