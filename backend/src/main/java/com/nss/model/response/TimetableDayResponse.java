package com.nss.model.response;

import java.util.List;

public record TimetableDayResponse(
    String dayOfWeek,
    List<TimetableScheduleResponse> schedule
) {}
