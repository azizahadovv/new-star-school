package com.nss.model.request;

import com.nss.utility.LocalDateConverter;
import com.opencsv.bean.CsvBindByName;
import com.opencsv.bean.CsvCustomBindByName;

import java.time.LocalDate;

public class StudentCsvRepresentation {

    @CsvBindByName
    private String firstName;

    @CsvBindByName
    private String lastName;

    @CsvBindByName
    private String patronymic;

    @CsvCustomBindByName(converter = LocalDateConverter.class)
    private LocalDate birthDate;

    @CsvBindByName
    private String gender;

    @CsvBindByName
    private String nationality;

    @CsvBindByName
    private String country;

    @CsvBindByName
    private String region;

    @CsvBindByName
    private String district;

    @CsvBindByName
    private String address;

    @CsvBindByName
    private String phoneNumber;

    @CsvBindByName
    private String login;

    @CsvBindByName
    private String password;

    @CsvBindByName
    private String parentPhoneNumber;

    @CsvBindByName()
    private String image; // Optional field

    // Getters and setters

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPatronymic() {
        return patronymic;
    }

    public void setPatronymic(String patronymic) {
        this.patronymic = patronymic;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getParentPhoneNumber() {
        return parentPhoneNumber;
    }

    public void setParentPhoneNumber(String parentPhoneNumber) {
        this.parentPhoneNumber = parentPhoneNumber;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String  image) {
        this.image = image;
    }
}
