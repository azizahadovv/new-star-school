package com.nss.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

/**
 * Maktab darajasidagi yagona (singleton) sozlamalar — har doim id=1.
 * Maktab nomi, logo, o'quv yili, aloqa ma'lumotlari. Faqat ADMIN o'zgartiradi.
 */
@Entity
public class SchoolSettings {

    @Id
    private Long id = 1L;

    private String schoolName;
    private String shortName;
    private String academicYear;
    private String address;
    private String phone;
    private String email;
    private String website;
    private Long logoFileId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public Long getLogoFileId() {
        return logoFileId;
    }

    public void setLogoFileId(Long logoFileId) {
        this.logoFileId = logoFileId;
    }
}
