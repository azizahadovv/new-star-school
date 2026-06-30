package com.nss.model.response;

public record SchoolSettingsResponse(
        Long id,
        String schoolName,
        String shortName,
        String academicYear,
        String address,
        String phone,
        String email,
        String website,
        Long logoFileId,
        String logoUrl
) { }
