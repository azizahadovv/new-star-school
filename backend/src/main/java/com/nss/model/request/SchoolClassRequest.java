package com.nss.model.request;

public record SchoolClassRequest(
    String name,
    String grade,
    String groupLetter
) {}