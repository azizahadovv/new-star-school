package com.nss.api;

import com.nss.model.request.TimetableRequest;
import com.nss.model.response.ClassTimetableResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.model.response.TimetableResponse;
import com.nss.service.TimetableService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/timetables")
public class TimetableController {

    private final TimetableService timetableService;

    public TimetableController(TimetableService timetableService) {
        this.timetableService = timetableService;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('DEPUTY_DIRECTOR')")
    @PostMapping
    public ResponseEntity<TimetableResponse> createTimetable(@RequestBody TimetableRequest timetableRequest) {
        TimetableResponse timetableResponse = timetableService.createTimetable(timetableRequest);
        return ResponseEntity.ok(timetableResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimetableResponse> getTimetable(@PathVariable Long id) {
        TimetableResponse timetableResponse = timetableService.getTimetable(id);
        return ResponseEntity.ok(timetableResponse);
    }

    @GetMapping
    public ResponseEntity<List<TimetableResponse>> getAllTimetables() {
        List<TimetableResponse> timetables = timetableService.getAllTimetables();
        return ResponseEntity.ok(timetables);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<TimetableResponse> updateTimetable(@PathVariable Long id, @RequestBody TimetableRequest timetableRequest) {
        TimetableResponse timetableResponse = timetableService.updateTimetable(id, timetableRequest);
        return ResponseEntity.ok(timetableResponse);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimetable(@PathVariable Long id) {
        timetableService.deleteTimetable(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TimetableDayResponse>> getFilteredTimetables(
            @RequestParam(required = false) Long termId,
            @RequestParam(required = false) Long classId,
            @RequestParam(required = false) Long teacherId,
            @RequestParam(required = false) Long subjectId,
            @RequestParam(required = false) Long studentId) {

        List<TimetableDayResponse> timetableDayResponses = timetableService.getFilteredTimetables(
                termId, classId, teacherId, subjectId, studentId);

        return ResponseEntity.ok(timetableDayResponses);
    }
    @GetMapping("/all-classes")
    public List<ClassTimetableResponse> getAllClassTimetables() {
        return timetableService.getAllClassesTimetables();
    }
}
