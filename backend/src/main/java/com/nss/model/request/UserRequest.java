package com.nss.model.request;

import com.opencsv.bean.CsvBindByName;
import java.time.LocalDate;

public record UserRequest(
    @CsvBindByName(column = "firstName")
    String firstName,

    @CsvBindByName(column = "lastName")
    String lastName,

    @CsvBindByName(column = "patronymic")
    String patronymic,

    @CsvBindByName(column = "birthDate")
    LocalDate birthDate,

    @CsvBindByName(column = "gender")
    String gender,

    @CsvBindByName(column = "nationality")
    String nationality,

    @CsvBindByName(column = "country")
    String country,

    @CsvBindByName(column = "region")
    String region,

    @CsvBindByName(column = "district")
    String district,

    @CsvBindByName(column = "address")
    String address,

    @CsvBindByName(column = "phoneNumber")
    String phoneNumber,

    @CsvBindByName(column = "login")
    String login,

    @CsvBindByName(column = "password")
    String password,

    @CsvBindByName(column = "parentPhoneNumber")
    String parentPhoneNumber ,

    @CsvBindByName(column = "image")
    String imageUrl
) {}
