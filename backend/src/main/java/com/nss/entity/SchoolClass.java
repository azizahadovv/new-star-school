package com.nss.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class SchoolClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String grade;
    private String groupLetter;
    private Boolean active=Boolean.FALSE;

    @OneToMany(mappedBy = "schoolClass", cascade = CascadeType.ALL, fetch = FetchType.EAGER,orphanRemoval = true)
    private Set<Student> students = new HashSet<>();

    @OneToMany(mappedBy = "schoolClass", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<Timetable> timetables = new HashSet<>();

    public Set<Timetable> getTimetables() {
        return timetables;
    }

    public void setTimetables(Set<Timetable> timetables) {
        this.timetables = timetables;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getGroupLetter() {
        return groupLetter;
    }

    public void setGroupLetter(String group) {
        this.groupLetter = group;
    }

    public Set<Student> getStudents() {
        return students;
    }

    public void setStudents(Set<Student> students) {
        this.students = students;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
