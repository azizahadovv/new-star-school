package com.nss.repository;

import com.nss.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    boolean existsByLogin(String login);

    @Query("SELECT s FROM Student s WHERE " +
            "(s.archived is false) and"+
            "((s.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(s.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(s.patronymic) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Student> searchByKeyword(String keyword);

    @Query("SELECT s FROM Student s WHERE s.schoolClass.id = :classId and s.archived is false")
    List<Student> findByClassId(Long classId);

    @Query("SELECT s FROM Student s WHERE (s.archived is false) and (LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%')))")
    List<Student> searchByName(String name);

    List<Student> findAllByArchivedFalse();
    List<Student> findAllByArchivedTrue();

    Optional<Student> findByLogin(String login);
}
