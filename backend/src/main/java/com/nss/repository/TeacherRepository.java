package com.nss.repository;

import com.nss.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
    boolean existsByLogin(String login);
    @Query("SELECT t FROM Teacher t JOIN t.subjects s WHERE s.id = :subjectId and t.archived is false")
    List<Teacher> findTeachersBySubjectId(@Param("subjectId") Long subjectId);

    @Query("SELECT t FROM Teacher t JOIN t.subjects s WHERE s.id = :subjectId AND  t.archived is false AND " +
            "(LOWER(t.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(t.lastName) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Teacher> findTeachersBySubjectIdAndName(@Param("subjectId") Long subjectId, @Param("name") String name);

    @Query("SELECT t FROM Teacher t WHERE t.archived is false AND (LOWER(t.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(t.lastName) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Teacher> findTeachersByName(@Param("name") String name);

    List<Teacher> findAllByArchivedFalse();

    List<Teacher> findAllByArchivedTrue();
}
