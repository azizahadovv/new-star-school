package com.nss.api;


import com.nss.model.request.SchoolClassRequest;
import com.nss.model.request.UserRequest;
import com.nss.model.response.ClassStudentResponse;
import com.nss.model.response.SchoolClassResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.service.SchoolClassService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class SchoolClassController {

    private final SchoolClassService schoolClassService;

    public SchoolClassController(SchoolClassService schoolClassService) {
        this.schoolClassService = schoolClassService;
    }

    @GetMapping
    public List<SchoolClassResponse> getAllClasses() {
        return schoolClassService.getAllClasses();
    }

    @PostMapping("/{id}/change-active/{activate}")
    public void changeActiveStatus(@PathVariable Boolean activate, @PathVariable Long id){
        schoolClassService.activateClass(id, activate);
    }

    @GetMapping("/{id}")
    public ClassStudentResponse getClassById(@PathVariable Long id) {
        return schoolClassService.getClassById(id);
    }

    @GetMapping("/classes/{classId}/timetables")
    public List<TimetableDayResponse> getClassTimetables(@PathVariable Long classId) {
        return schoolClassService.getTimetablesForClass(classId);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping
    public Long createClass(@RequestBody SchoolClassRequest request) {
        return schoolClassService.createClass(request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PutMapping("/{id}")
    public void updateClass(@PathVariable Long id, @RequestBody SchoolClassRequest request) {
         schoolClassService.updateClass(id, request);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public void deleteClass(@PathVariable Long id) {
        schoolClassService.deleteClass(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping("/{classId}/students")
    public Long addStudentToClass(@PathVariable Long classId, @RequestBody UserRequest userRequest) {
        return schoolClassService.addStudentToClass(classId, userRequest);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping(value = "/{classId}/students/csv",consumes = {"multipart/form-data"})
    public int addStudentsFromCSV(@PathVariable Long classId,  @RequestPart("file") MultipartFile file) throws IOException {
        return schoolClassService.addStudentsFromCSV(classId, file);
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{classId}/students/{studentId}")
    public ResponseEntity<Void> deleteStudentFromClass(@PathVariable Long classId, @PathVariable Long studentId) {
        schoolClassService.deleteStudentFromClass(classId, studentId);
        return ResponseEntity.noContent().build();
    }
}
