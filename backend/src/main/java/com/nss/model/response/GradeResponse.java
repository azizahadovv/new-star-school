package com.nss.model.response;

import java.time.LocalDate;

public record GradeResponse(
        Long id,
        Long studentId,
        String studentName,
        Long teacherId,
        String teacherName,
        Long subjectId,
        String subjectName,
        Long termId,
        String termName,
        Long schoolClassId,
        String schoolClassName,
        String gradeValue,
        LocalDate dateAssigned
) {}
