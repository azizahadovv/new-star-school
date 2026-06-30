package com.nss.service;

import com.nss.entity.*;
import com.nss.error.NotFoundException;
import com.nss.model.request.GradeFilter;
import com.nss.model.request.GradeGroupResponse;
import com.nss.model.request.GradeRequest;
import com.nss.model.response.GradeResponse;
import com.nss.repository.*;
import com.nss.utility.FilterType;
import jakarta.validation.ValidationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class GradeService {

    private final TeacherRepository teacherRepository;
    private final GradeRepository gradeRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final TermRepository termRepository;
    private final SchoolClassRepository schoolClassRepository;

    public GradeService(TeacherRepository teacherRepository, GradeRepository gradeRepository, StudentRepository studentRepository, SubjectRepository subjectRepository, TermRepository termRepository, SchoolClassRepository schoolClassRepository) {
        this.teacherRepository = teacherRepository;
        this.gradeRepository = gradeRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.termRepository = termRepository;
        this.schoolClassRepository = schoolClassRepository;
    }

    public List<GradeResponse> assignGrades(List<GradeRequest> requests) {
        List<GradeResponse> responses = new ArrayList<>();

        for (GradeRequest request : requests) {
            Student student = studentRepository.findById(request.studentId())
                    .orElseThrow(() -> new NotFoundException("Student not found with id " + request.studentId()));
            Teacher teacher = teacherRepository.findById(request.teacherId())
                    .orElseThrow(() -> new NotFoundException("Teacher not found with id " + request.teacherId()));
            Subject subject = subjectRepository.findById(request.subjectId())
                    .orElseThrow(() -> new NotFoundException("Subject not found with id " + request.subjectId()));
            Term term = termRepository.findById(request.termId())
                    .orElseThrow(() -> new NotFoundException("Term not found with id " + request.termId()));
            SchoolClass schoolClass = schoolClassRepository.findById(request.schoolClassId())
                    .orElseThrow(() -> new NotFoundException("SchoolClass not found with id " + request.schoolClassId()));

            // Check if a grade already exists for the student on the same date
            boolean gradeExists = gradeRepository.existsByStudentAndDateAssigned(student, request.dateAssigned());
            if (gradeExists) {
                throw new ValidationException("Student with id " + student.getId() + " already has a grade assigned on " + request.dateAssigned());
            }

            Grade grade = new Grade();
            grade.setStudent(student);
            grade.setTeacher(teacher);
            grade.setSubject(subject);
            grade.setTerm(term);
            grade.setSchoolClass(schoolClass);
            grade.setGrade(request.gradeValue());
            grade.setDateAssigned(request.dateAssigned());

            Grade savedGrade = gradeRepository.save(grade);

            responses.add(mapToGradeResponse(savedGrade));
        }

        return responses.stream()
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }

    public GradeResponse updateGrade(Long gradeId, GradeRequest request) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new NotFoundException("Grade not found with id " + gradeId));

        Student student = studentRepository.findById(request.studentId())
                .orElseThrow(() -> new NotFoundException("Student not found with id " + request.studentId()));
        Teacher teacher = teacherRepository.findById(request.teacherId())
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + request.teacherId()));
        Subject subject = subjectRepository.findById(request.subjectId())
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + request.subjectId()));
        Term term = termRepository.findById(request.termId())
                .orElseThrow(() -> new NotFoundException("Term not found with id " + request.termId()));
        SchoolClass schoolClass = schoolClassRepository.findById(request.schoolClassId())
                .orElseThrow(() -> new NotFoundException("SchoolClass not found with id " + request.schoolClassId()));

        // Check if a grade already exists for the student on the same date (except for the current grade being updated)
        boolean gradeExists = gradeRepository.existsByStudentAndDateAssignedAndIdNot(student, request.dateAssigned(), gradeId);
        if (gradeExists) {
            throw new ValidationException("Student with id " + student.getId() + " already has a grade assigned on " + request.dateAssigned());
        }

        grade.setStudent(student);
        grade.setTeacher(teacher);
        grade.setSubject(subject);
        grade.setTerm(term);
        grade.setSchoolClass(schoolClass);
        grade.setGrade(request.gradeValue());
        grade.setDateAssigned(request.dateAssigned());

        Grade updatedGrade = gradeRepository.save(grade);

        return mapToGradeResponse(updatedGrade);
    }

    public void deleteGrade(Long gradeId) {
        Grade grade = gradeRepository.findById(gradeId)
                .orElseThrow(() -> new NotFoundException("Grade not found with id " + gradeId));
        gradeRepository.delete(grade);
    }

    public List<GradeResponse> getGradesByFilter(GradeFilter filter) {
        Specification<Grade> spec = Specification.where(null);

        if (filter.studentId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("student").get("id"), filter.studentId()));
        }
        if (filter.teacherId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("teacher").get("id"), filter.teacherId()));
        }
        if (filter.subjectId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("subject").get("id"), filter.subjectId()));
        }
        if (filter.termId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("term").get("id"), filter.termId()));
        }
        if (filter.schoolClassId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("schoolClass").get("id"), filter.schoolClassId()));
        }
        if (filter.grade() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("grade"), filter.grade()));
        }
        if (filter.dateAssignedFrom() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("dateAssigned"), filter.dateAssignedFrom()));
        }
        if (filter.dateAssignedTo() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("dateAssigned"), filter.dateAssignedTo()));
        }

        List<Grade> grades = gradeRepository.findAll(spec);
        return grades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }

    public List<GradeGroupResponse> getGradesGroupedByDate(GradeFilter filter) {
        Specification<Grade> spec = Specification.where(null);

        if (filter.studentId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("student").get("id"), filter.studentId()));
        }
        if (filter.teacherId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("teacher").get("id"), filter.teacherId()));
        }
        if (filter.subjectId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("subject").get("id"), filter.subjectId()));
        }
        if (filter.termId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("term").get("id"), filter.termId()));
        }
        if (filter.schoolClassId() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("schoolClass").get("id"), filter.schoolClassId()));
        }
        if (filter.grade() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("grade"), filter.grade()));
        }
        if (filter.dateAssignedFrom() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("dateAssigned"), filter.dateAssignedFrom()));
        }
        if (filter.dateAssignedTo() != null) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("dateAssigned"), filter.dateAssignedTo()));
        }

        List<Grade> grades = gradeRepository.findAll(spec);

        // Group the grades by dateAssigned in descending order
        Map<LocalDate, List<GradeResponse>> groupedByDate = grades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.groupingBy(
                        GradeResponse::dateAssigned,
                        () -> new TreeMap<>(Comparator.reverseOrder()), // TreeMap with reverse order comparator for descending order
                        Collectors.toList()
                ));

        // Convert the grouped data to GradeGroupResponse
        return groupedByDate.entrySet().stream()
                .map(entry -> new GradeGroupResponse(entry.getKey(), entry.getValue()))
                .toList();
    }


    public List<LocalDate> getUniqueDatesBySubjectAndClass(Long subjectId, Long classId) {
        if (subjectId == null || classId == null) {
            throw new IllegalArgumentException("Subject ID and Class ID cannot be null");
        }

        return gradeRepository.findDistinctDatesBySubjectAndClass(subjectId, classId);
    }

    public Page<GradeResponse> getGradesForStudent(Long studentId, Long termId, Long subjectId, Pageable pageable) {
        if (studentId == null) {
            throw new IllegalArgumentException("Student ID cannot be null");
        }

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found with id " + studentId));

        Page<Grade> grades;

        if (termId != null && subjectId != null) {
            Term term = termRepository.findById(termId)
                    .orElseThrow(() -> new NotFoundException("Term not found with id " + termId));
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));
            grades = gradeRepository.findByStudentAndTermAndSubject(student, term, subject, pageable);
        } else if (termId != null) {
            Term term = termRepository.findById(termId)
                    .orElseThrow(() -> new NotFoundException("Term not found with id " + termId));
            grades = gradeRepository.findByStudentAndTerm(student, term, pageable);
        } else if (subjectId != null) {
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));
            grades = gradeRepository.findByStudentAndSubject(student, subject, pageable);
        } else {
            grades = gradeRepository.findByStudent(student, pageable);
        }

        return grades.map(this::mapToGradeResponse);
    }

    public List<GradeResponse> getGradesForStudent(Long studentId, Long termId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found"));
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new NotFoundException("Term not found"));

        List<Grade> grades = gradeRepository.findByStudentAndTerm(student, term);
        return grades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }

    public List<GradeResponse> getGradesByTeacherSubjectTermClass(
            Long teacherId, Long subjectId, Long termId, Long schoolClassId) {

        if (teacherId == null || subjectId == null || termId == null || schoolClassId == null) {
            throw new IllegalArgumentException("Teacher ID, Subject ID, Term ID, and School Class ID cannot be null");
        }

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new NotFoundException("Term not found with id " + termId));
        SchoolClass schoolClass = schoolClassRepository.findById(schoolClassId)
                .orElseThrow(() -> new NotFoundException("SchoolClass not found with id " + schoolClassId));

        // Check if the subject is associated with the teacher
        if (!teacher.getSubjects().contains(subject)) {
            throw new IllegalArgumentException("Subject with id " + subjectId + " is not associated with teacher with id " + teacherId);
        }

        // Retrieve grades based on the criteria
        List<Grade> grades = gradeRepository.findByTeacherAndSubjectAndTermAndSchoolClass(
                teacher, subject, term, schoolClass);

        // Map the grades to GradeResponse
        return grades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }

    public List<GradeResponse> getGradesAssignedByTeacher(Long teacherId, Long termId) {
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found"));
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new NotFoundException("Term not found"));

        List<Grade> grades = gradeRepository.findByTeacherAndTerm(teacher, term);
        return grades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }

    private int compareStudentsAlphabetically(GradeResponse g1, GradeResponse g2) {
        String[] g1NameParts = g1.studentName().split(" ");
        String[] g2NameParts = g2.studentName().split(" ");

        // Compare last names
        int lastNameComparison = g1NameParts[1].compareToIgnoreCase(g2NameParts[1]);
        if (lastNameComparison == 0) {
            // If last names are the same, compare by first name
            return g1NameParts[0].compareToIgnoreCase(g2NameParts[0]);
        }
        return lastNameComparison;
    }

    private GradeResponse mapToGradeResponse(Grade grade) {
        return new GradeResponse(
                grade.getId(),
                grade.getStudent().getId(),
                grade.getStudent().getFirstName() + " " + grade.getStudent().getLastName(),
                grade.getTeacher().getId(),
                grade.getTeacher().getFirstName() + " " + grade.getTeacher().getLastName(),
                grade.getSubject().getId(),
                grade.getSubject().getName(),
                grade.getTerm().getId(),
                grade.getTerm().getName(),
                grade.getSchoolClass().getId(),
                grade.getSchoolClass().getName() + " " + grade.getSchoolClass().getGroupLetter(),
                grade.getGrade(),
                grade.getDateAssigned()
        );
    }

    public List<GradeResponse> filterGradesAndAttendance(Long studentId, Long termId, FilterType filterType, Long teacherId, Long subjectId) {
        String filter = filterType.name();
        List<Grade> filteredGrades = gradeRepository.filterGradesAndAttendance(studentId, termId, teacherId, subjectId, filter);

        return filteredGrades.stream()
                .map(this::mapToGradeResponse)
                .sorted(this::compareStudentsAlphabetically)
                .collect(Collectors.toList());
    }
    public Page<GradeResponse> filterGradesAndAttendance(
            Long studentId, Long termId, FilterType filterType, Long teacherId, Long subjectId, Pageable pageable) {

        String filter = filterType.name();
        Page<Grade> gradesPage = gradeRepository.filterGradesAndAttendance(studentId, termId, teacherId, subjectId, filter, pageable);

        return gradesPage.map(this::mapToGradeResponse);
    }

}
