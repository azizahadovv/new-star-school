package com.nss.repository;

import com.nss.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Repository
public interface TimetableRepository extends JpaRepository<Timetable, Long> {
    List<Timetable> findBySchoolClassId(Long classId);
    List<Timetable> findByTeacherId(Long teacherId);

    Optional<Timetable> findByTermAndSchoolClassAndDayOfWeekAndSchoolTime(
            Term term,
            SchoolClass schoolClass,
            DayOfWeek dayOfWeek,
            SchoolTime schoolTime
    );

    @Query("SELECT t FROM Timetable t " +
            "WHERE (:termId IS NULL OR t.term.id = :termId) " +
            "AND (:classId IS NULL OR t.schoolClass.id = :classId) " +
            "AND (:teacherId IS NULL OR t.teacher.id = :teacherId) " +
            "AND (:subjectId IS NULL OR t.subject.id = :subjectId) " +
            "AND (:studentId IS NULL OR t.schoolClass.id = (SELECT s.schoolClass.id FROM Student s WHERE s.id = :studentId))")
    List<Timetable> findFilteredTimetables(
            @Param("termId") Long termId,
            @Param("classId") Long classId,
            @Param("teacherId") Long teacherId,
            @Param("subjectId") Long subjectId,
            @Param("studentId") Long studentId);

    List<Timetable> findByTeacherIdAndDayOfWeek(Long id, DayOfWeek dayOfWeek);
}
