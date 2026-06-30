package com.nss.model.request;

import java.time.LocalTime;

public record SchoolTimeRequest(int number, LocalTime startTime, LocalTime endTime) {
}
