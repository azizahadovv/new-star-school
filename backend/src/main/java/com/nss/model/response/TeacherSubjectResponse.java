package com.nss.model.response;

import java.util.List;

public record TeacherSubjectResponse(
        List<SubjectResponse> subjects
) {
}
