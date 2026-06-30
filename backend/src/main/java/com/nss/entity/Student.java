package com.nss.entity;

import jakarta.persistence.*;

@Entity
public class Student extends User {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "class_id")
    private SchoolClass schoolClass;


    private String parentPhoneNumber;


    public SchoolClass getSchoolClass() {
        return schoolClass;
    }

    public void setSchoolClass(SchoolClass schoolClass) {
        this.schoolClass = schoolClass;
    }


    public String getParentPhoneNumber() {
        return parentPhoneNumber;
    }

    public void setParentPhoneNumber(String parentPhoneNumber) {
        this.parentPhoneNumber = parentPhoneNumber;
    }
}
