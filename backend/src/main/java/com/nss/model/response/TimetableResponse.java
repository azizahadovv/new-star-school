package com.nss.model.response;

import java.time.DayOfWeek;
import java.time.LocalTime;

public record TimetableResponse(
        Long id,
        Long termId,
        Long classId,
        Long teacherId,
        String teacherName,
        String subjectName,
        DayOfWeek dayOfWeek,
        LocalTime startTime,
        LocalTime endTime,
        int lessonNumber) {}
