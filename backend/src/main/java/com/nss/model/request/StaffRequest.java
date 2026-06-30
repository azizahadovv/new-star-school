package com.nss.model.request;

public record StaffRequest(
        String firstName,
        String lastName,
        String middleName,
        String birthDate,
        String profession,
        String phoneNumber
    ) {}