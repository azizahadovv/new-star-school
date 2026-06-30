package com.nss.api;

import com.nss.model.request.UserRequest;
import com.nss.model.response.SchoolClassResponse;
import com.nss.model.response.TeacherResponse;
import com.nss.model.response.TeacherSubjectResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.service.TeacherService;
import com.nss.service.TimetableService;
import com.nss.utility.UserRole;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.DayOfWeek;
import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    private final TeacherService teacherService;
    private final TimetableService timetableService;

    public TeacherController(final TeacherService teacherService,
                             final TimetableService timetableService) {
        this.teacherService = teacherService;
        this.timetableService = timetableService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping
    public ResponseEntity<List<TeacherResponse>> getAllTeachers() {
        return ResponseEntity.ok(teacherService.getAllTeachers());
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping("/archived")
    public ResponseEntity<List<TeacherResponse>> getAllArchived() {
        return ResponseEntity.ok(teacherService.getAllArchived());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherResponse> getTeacherById(@PathVariable Long id) {
        return ResponseEntity.ok(teacherService.getTeacherById(id));
    }

    @GetMapping("/{id}/subjects")
    public ResponseEntity<TeacherSubjectResponse> getTeacherSubjects(@PathVariable Long id) {
        return ResponseEntity.ok(teacherService.getTeacherSubjects(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping
    public ResponseEntity<Long> createTeacher(
            @RequestBody UserRequest request,
            @RequestParam Long subjectId,
            @RequestParam UserRole role) {
        Long id = teacherService.createTeacher(request, subjectId, role);
        return ResponseEntity.ok(id);
    }
//    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
//    @PutMapping("/{teacherId}/addRole")
//    public ResponseEntity<Void> addRoleToTeacher(@PathVariable Long teacherId, @RequestParam List<UserRole> role) {
//        teacherService.addRoleToTeacher(teacherId, role);
//        return ResponseEntity.ok().build();
//    }

//    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
//    @PutMapping("/{teacherId}/removeRole")
//    public ResponseEntity<Void> removeRoleFromTeacher(@PathVariable Long teacherId, @RequestParam List<UserRole> role) {
//        teacherService.removeRoleFromTeacher(teacherId, role);
//        return ResponseEntity.ok().build();
//    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PutMapping("/{teacherId}/assign-role")
    public ResponseEntity<Void> assignRole(@PathVariable Long teacherId, @RequestParam List<UserRole> role) {
        teacherService.assignRolesToTeacher(teacherId, role);
        return ResponseEntity.ok().build();
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping("/{teacherId}/add/subject/{subjectId}")
    public ResponseEntity<Void> addSubjectToTeacher(@PathVariable Long teacherId, @PathVariable Long subjectId) {
        teacherService.addSubjectToTeacher(teacherId, subjectId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping("/{teacherId}/remove/subject/{subjectId}")
    public ResponseEntity<Void> removeSubjectToTeacher(@PathVariable Long teacherId, @PathVariable Long subjectId) {
        teacherService.removeSubjectFromTeacher(teacherId, subjectId);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateTeacher(@PathVariable Long id, @RequestBody UserRequest request) {
        teacherService.updateTeacher(id, request);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        teacherService.deleteTeacher(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/subject/{subjectId}")
    public ResponseEntity<List<TeacherResponse>> getTeachersBySubjectId(@PathVariable Long subjectId) {
        return ResponseEntity.ok(teacherService.findTeachersBySubjectId(subjectId));
    }
    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping("/available")
    public ResponseEntity<List<TeacherResponse>> findAvailableTeachers(
            @RequestParam DayOfWeek dayOfWeek,
            @RequestParam Long schoolTimeId,
            @RequestParam(required = false) Long subjectId) {

        List<TeacherResponse> availableTeachers = teacherService.findAvailableTeachers(dayOfWeek, schoolTimeId, subjectId);
        return ResponseEntity.ok(availableTeachers);
    }

    @GetMapping("/{teacherId}/classes")
    public ResponseEntity<List<SchoolClassResponse>> getTeachingClasses(@PathVariable Long teacherId) {
        List<SchoolClassResponse> teachingClasses = teacherService.findTeachingClasses(teacherId);
        return ResponseEntity.ok(teachingClasses);
    }
    @GetMapping("/search")
    public ResponseEntity<List<TeacherResponse>> searchTeachers(
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) String name) {
        List<TeacherResponse> teachers = teacherService.searchTeachers(subjectId, name);
        return ResponseEntity.ok(teachers);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR','TEACHER', 'DEPUTY_DIRECTOR')")
    @GetMapping("/{id}/timetable")
    public List<TimetableDayResponse> getTeacherTimetable(@PathVariable Long id) {
        return timetableService.getTeacherTimetable(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR','TEACHER', 'DEPUTY_DIRECTOR')")
    @PostMapping(value = "/{teacherId}/upload-image", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadUserImage(@PathVariable Long teacherId,@RequestPart("file") MultipartFile file) {
        teacherService.uploadTeacherImage(teacherId, file);
        return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
    }
}
