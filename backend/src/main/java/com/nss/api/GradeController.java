package com.nss.api;

import com.nss.model.request.GradeFilter;
import com.nss.model.request.GradeGroupResponse;
import com.nss.model.request.GradeRequest;
import com.nss.model.response.GradeResponse;
import com.nss.service.GradeService;
import com.nss.utility.FilterType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/v1/grades")
public class GradeController {

    private final GradeService gradeService;

    public GradeController(GradeService gradeService) {
        this.gradeService = gradeService;
    }

    @GetMapping("/dates")
    public List<LocalDate> getUniqueDatesBySubjectAndClass(
            @RequestParam Long subjectId,
            @RequestParam Long classId) {

        return gradeService.getUniqueDatesBySubjectAndClass(subjectId, classId);
    }
    @GetMapping("/grouped-by-date")
    public List<GradeGroupResponse> getGradesGroupedByDate(
            @RequestParam(required = false) Long studentId,
            @RequestParam(required = false) Long teacherId,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long termId,
            @RequestParam(required = false) Long schoolClassId,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateAssignedFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateAssignedTo
    ) {
        GradeFilter filter = new GradeFilter(
                studentId,
                teacherId,
                subjectId,
                termId,
                schoolClassId,
                grade,
                dateAssignedFrom,
                dateAssignedTo
        );

        return gradeService.getGradesGroupedByDate(filter);
    }

    @GetMapping("/universal/filter")
    public List<GradeResponse> getFilteredGrades(
            @RequestParam(required = false) Long studentId,
            @RequestParam(required = false) Long teacherId,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long termId,
            @RequestParam(required = false) Long schoolClassId,
            @RequestParam(required = false) String grade,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateAssignedFrom,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dateAssignedTo) {

        GradeFilter filter = new GradeFilter(
                studentId,
                teacherId,
                subjectId,
                termId,
                schoolClassId,
                grade,
                dateAssignedFrom,
                dateAssignedTo
        );

        return gradeService.getGradesByFilter(filter);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR','TEACHER')")
    @PostMapping
    public ResponseEntity<List<GradeResponse>> assignGrade(@RequestBody List<GradeRequest> request) {
        List<GradeResponse> grade = gradeService.assignGrades(request);
        return ResponseEntity.ok(grade);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PutMapping("/{gradeId}")
    public ResponseEntity<GradeResponse> updateGrade(@PathVariable Long gradeId, @RequestBody GradeRequest request) {
        GradeResponse updatedGrade = gradeService.updateGrade(gradeId, request);
        return ResponseEntity.ok(updatedGrade);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{gradeId}")
    public ResponseEntity<Void> deleteGrade(@PathVariable Long gradeId) {
        gradeService.deleteGrade(gradeId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<Page<GradeResponse>> getGradesForStudent(
            @PathVariable Long studentId,
            @RequestParam(required = false) Long termId,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);
        Page<GradeResponse> grades = gradeService.getGradesForStudent(studentId, termId, subjectId, pageable);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/teacher/{teacherId}/term/{termId}")
    public ResponseEntity<List<GradeResponse>> getGradesAssignedByTeacher(
            @PathVariable Long teacherId,
            @PathVariable Long termId) {

        List<GradeResponse> grades = gradeService.getGradesAssignedByTeacher(teacherId, termId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/filter/grades-and-attendance")
    public ResponseEntity<Page<GradeResponse>> filterGradesAndAttendance(
            @RequestParam("studentId") Long studentId,
            @RequestParam("termId") Long termId,
            @RequestParam("filterType") FilterType filterType,
            @RequestParam(value = "teacherId", required = false) Long teacherId,
            @RequestParam(value = "subjectId", required = false) Long subjectId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<GradeResponse> gradesPage = gradeService.filterGradesAndAttendance(studentId, termId, filterType, teacherId, subjectId, pageable);

        return ResponseEntity.ok(gradesPage);
    }
//    public ResponseEntity<List<GradeResponse>> filterGradesAndAttendance(
//            @RequestParam Long studentId,
//            @RequestParam Long termId,
//            @RequestParam FilterType filterType,
//            @RequestParam(required = false) Long teacherId,
//            @RequestParam(required = false) Long subjectId) {
//
//        List<GradeResponse> filteredResponses = gradeService.filterGradesAndAttendance(studentId, termId, filterType, teacherId, subjectId);
//        return ResponseEntity.ok(filteredResponses);
//    }

    @GetMapping("/filter")
    public ResponseEntity<List<GradeResponse>> getGradesByTeacherSubjectTermClass(
            @RequestParam Long teacherId,
            @RequestParam Long subjectId,
            @RequestParam Long termId,
            @RequestParam Long schoolClassId) {

        List<GradeResponse> grades = gradeService.getGradesByTeacherSubjectTermClass(teacherId, subjectId, termId, schoolClassId);
        return ResponseEntity.ok(grades);
    }

    @GetMapping("/student/{studentId}/term/{termId}")
    public ResponseEntity<List<GradeResponse>> getGradesForStudentByTerm(
            @PathVariable Long studentId,
            @PathVariable Long termId) {

        List<GradeResponse> grades = gradeService.getGradesForStudent(studentId, termId);
        return ResponseEntity.ok(grades);
    }
}
