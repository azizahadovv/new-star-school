package com.nss.repository;

import com.nss.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Long>, JpaSpecificationExecutor<Grade> {

//    List<Grade> findByStudentAndSubjectAndTerm(Student student, Subject subject, Term term);

    List<Grade> findByStudentAndTerm(Student student, Term term);

    List<Grade> findByTeacherAndTerm(Teacher teacher, Term term);

    Page<Grade> findByStudentAndTermAndSubject(Student student, Term term, Subject subject, Pageable pageable);

    Page<Grade> findByStudentAndTerm(Student student, Term term, Pageable pageable);

    Page<Grade> findByStudentAndSubject(Student student, Subject subject, Pageable pageable);

    Page<Grade> findByStudent(Student student, Pageable pageable);

    List<Grade> findByTeacherAndSubjectAndTermAndSchoolClass(
            Teacher teacher, Subject subject, Term term, SchoolClass schoolClass);

    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END " +
            "FROM Grade g " +
            "WHERE g.student = :student " +
            "AND g.dateAssigned = :dateAssigned")
    boolean existsByStudentAndDateAssigned(@Param("student") Student student, @Param("dateAssigned") LocalDate dateAssigned);

    @Query("SELECT CASE WHEN COUNT(g) > 0 THEN true ELSE false END " +
            "FROM Grade g " +
            "WHERE g.student = :student " +
            "AND g.dateAssigned = :dateAssigned " +
            "AND g.id != :id")
    boolean existsByStudentAndDateAssignedAndIdNot(@Param("student") Student student, @Param("dateAssigned") LocalDate dateAssigned, @Param("id") Long id);

    @Query("SELECT DISTINCT g.dateAssigned FROM Grade g WHERE g.subject.id = :subjectId AND g.schoolClass.id = :classId")
    List<LocalDate> findDistinctDatesBySubjectAndClass(@Param("subjectId") Long subjectId, @Param("classId") Long classId);

    @Query("SELECT g FROM Grade g WHERE g.student.id = :studentId AND g.term.id = :termId" +
            " AND (:teacherId IS NULL OR g.teacher.id = :teacherId)" +
            " AND (:subjectId IS NULL OR g.subject.id = :subjectId)" +
            " AND ((:filterType = 'ATTENDANCE' AND (g.grade = 'present' OR g.grade = 'sababli' OR g.grade = 'sababsiz'))" +
            " OR (:filterType = 'GRADE' AND (g.grade = '5' OR g.grade = '4' OR g.grade = '3')))")
    List<Grade> filterGradesAndAttendance(
            @Param("studentId") Long studentId,
            @Param("termId") Long termId,
            @Param("teacherId") Long teacherId,
            @Param("subjectId") Long subjectId,
            @Param("filterType") String filterType);



    @Query("SELECT g FROM Grade g WHERE g.student.id = :studentId AND g.term.id = :termId" +
            " AND (:teacherId IS NULL OR g.teacher.id = :teacherId)" +
            " AND (:subjectId IS NULL OR g.subject.id = :subjectId)" +
            " AND ((:filterType = 'ATTENDANCE' AND (g.grade = 'present' OR g.grade = 'sababli' OR g.grade = 'sababsiz'))" +
            " OR (:filterType = 'GRADE' AND (g.grade = '5' OR g.grade = '4' OR g.grade = '3')))" +
            " ORDER BY g.dateAssigned DESC")
    Page<Grade> filterGradesAndAttendance(
            @Param("studentId") Long studentId,
            @Param("termId") Long termId,
            @Param("teacherId") Long teacherId,
            @Param("subjectId") Long subjectId,
            @Param("filterType") String filterType,
            Pageable pageable);

}
