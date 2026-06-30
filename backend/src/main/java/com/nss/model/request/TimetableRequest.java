package com.nss.model.request;

import java.time.DayOfWeek;

public record TimetableRequest(
        Long termId,
        Long classId,
        Long subjectId,
        Long teacherId,
        DayOfWeek dayOfWeek,
        Long schoolTimeId) {}
