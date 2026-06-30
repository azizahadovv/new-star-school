package com.nss.model.request;

public record SchoolSettingsRequest(
        String schoolName,
        String shortName,
        String academicYear,
        String address,
        String phone,
        String email,
        String website,
        Long logoFileId
) { }
