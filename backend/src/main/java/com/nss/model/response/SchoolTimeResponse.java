package com.nss.model.response;

import java.time.LocalTime;

public record SchoolTimeResponse(Long id, int number, LocalTime startTime, LocalTime endTime) {
}
