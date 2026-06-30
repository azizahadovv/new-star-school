package com.nss.model.request;

import com.nss.model.response.GradeResponse;

import java.time.LocalDate;
import java.util.List;

public record GradeGroupResponse(
        LocalDate date,
        List<GradeResponse> grades
) {
}
