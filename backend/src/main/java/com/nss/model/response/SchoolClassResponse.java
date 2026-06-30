package com.nss.model.response;

public record SchoolClassResponse(
    Long id,
    String name,
    String grade,
    String groupLetter,
    int size,
    Boolean active
) {}