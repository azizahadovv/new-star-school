package com.nss.api;

import com.nss.model.request.UserRequest;
import com.nss.model.response.StudentResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.service.StudentService;
import com.nss.service.TimetableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentService studentService;
    private final TimetableService timetableService;

    @Autowired
    public StudentController(StudentService studentService, TimetableService timetableService) {
        this.studentService = studentService;
        this.timetableService = timetableService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> findStudentById(@PathVariable Long id) {
        StudentResponse studentResponse = studentService.findStudentById(id);
        return ResponseEntity.ok(studentResponse);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR','STUDENT')")
    @PutMapping("/{id}")
    public ResponseEntity<StudentResponse> updateStudent(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        StudentResponse studentResponse = studentService.updateStudent(id, userRequest);
        return ResponseEntity.ok(studentResponse);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR','STUDENT')")
    @PostMapping
    public ResponseEntity<StudentResponse> createStudent(@RequestBody UserRequest userRequest) {
        StudentResponse studentResponse = studentService.createStudent(userRequest);
        return ResponseEntity.status(201).body(studentResponse);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR','TEACHER')")
    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAllStudents() {
        List<StudentResponse> studentResponses = studentService.getAllStudents();
        return ResponseEntity.ok(studentResponses);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR','TEACHER')")
    @GetMapping("/archived")
    public ResponseEntity<List<StudentResponse>> getAllArchived() {
        List<StudentResponse> studentResponses = studentService.getAllArchived();
        return ResponseEntity.ok(studentResponses);
    }
    @GetMapping("/search-by")
    public ResponseEntity<List<StudentResponse>> getAllStudents(
            @RequestParam(required = false) Long classId,
            @RequestParam(required = false) String name) {
        List<StudentResponse> students = studentService.getAllStudents(classId, name);
        return ResponseEntity.ok(students);
    }
    @GetMapping("/search")
    public List<StudentResponse> searchStudents(@RequestParam String keyword) {
        return studentService.searchStudents(keyword);
    }
    @GetMapping("/{id}/timetable")
    public List<TimetableDayResponse> getStudentTimetable(@PathVariable Long id) {
        return timetableService.getStudentTimetable(id);
    }
    @PostMapping(value = "/{studentId}/upload-image", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadUserImage(@PathVariable Long studentId,@RequestPart("file") MultipartFile file) {
        studentService.uploadStudentImage(studentId, file);
        return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
    }
}
