package com.nss.model.request;

import java.util.Date;

public record GradeFilter(
    Long studentId,
    Long teacherId,
    Long subjectId,
    Long termId,
    Long schoolClassId,
    String grade,
    Date dateAssignedFrom,
    Date dateAssignedTo
) {}
