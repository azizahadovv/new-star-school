package com.nss.model.response;

public record AdminResponse(
    Long id,
    String firstName,
    String lastName,
    String patronymic,
    String birthDate,
    String gender,
    String nationality,
    String country,
    String region,
    String district,
    String address,
    String phoneNumber,
    String login,
    String imageUrl
) {}
