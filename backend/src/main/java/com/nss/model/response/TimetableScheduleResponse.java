package com.nss.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalTime;

public record TimetableScheduleResponse(
    Long id,
    Long termId,
    Long classId,
    @JsonProperty("class_name")
    String className,
    Long teacherId,
    String teacherName,
    String subjectName,
    String dayOfWeek,
    LocalTime startTime,
    LocalTime endTime,
    int lessonNumber
) {}
