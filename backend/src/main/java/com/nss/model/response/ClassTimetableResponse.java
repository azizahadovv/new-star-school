package com.nss.model.response;

import java.util.List;

public record ClassTimetableResponse(Long classId,String className,List<TimetableDayResponse>timetables) {
}
