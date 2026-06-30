package com.nss.model.response;

import java.util.List;

public record ClassStudentResponse(
    Long id,
    String name,
    String grade,
    String groupLetter,
    int size,
    List<StudentResponse> students
) {}