package com.nss.model.request;

import java.time.LocalDate;

public record GradeRequest(
        Long studentId,
        Long teacherId,
        Long subjectId,
        Long termId,
        Long schoolClassId,
        String gradeValue,
        LocalDate dateAssigned
) {}
