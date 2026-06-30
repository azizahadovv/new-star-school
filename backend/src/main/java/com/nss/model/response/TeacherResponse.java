package com.nss.model.response;

import com.nss.entity.Subject;
import com.nss.utility.UserRole;

import java.time.LocalDate;
import java.util.Set;

public record TeacherResponse(
    Long id,
    String firstName,
    String lastName,
    String patronymic,
    LocalDate birthDate,
    String gender,
    String nationality,
    String country,
    String region,
    String district,
    String address,
    String phoneNumber,
    String login,
    String imageUrl,
    Set<Subject> subject,
    Set<UserRole> roles
) {}
