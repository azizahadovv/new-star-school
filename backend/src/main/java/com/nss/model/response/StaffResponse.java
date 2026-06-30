package com.nss.model.response;

public  record StaffResponse(
        Long id,
        String firstName,
        String lastName,
        String middleName,
        String birthDate,
        String profession,
        String phoneNumber,
        String imageUrl
    ) {}