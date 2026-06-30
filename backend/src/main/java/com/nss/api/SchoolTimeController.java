package com.nss.api;


import com.nss.model.request.SchoolTimeRequest;
import com.nss.model.response.SchoolTimeResponse;
import com.nss.service.SchoolTimeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/school-time")
public class SchoolTimeController {

    private final SchoolTimeService schoolTimeService;

    public SchoolTimeController(SchoolTimeService schoolTimeService) {
        this.schoolTimeService = schoolTimeService;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @PostMapping
    public ResponseEntity<SchoolTimeResponse> createSchoolTime(@RequestBody SchoolTimeRequest schoolTimeRequest) {
        SchoolTimeResponse createdSchoolTime = schoolTimeService.createSchoolTime(schoolTimeRequest);
        return new ResponseEntity<>(createdSchoolTime, HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<SchoolTimeResponse> updateSchoolTime(@PathVariable Long id, @RequestBody SchoolTimeRequest schoolTimeRequest) {
        SchoolTimeResponse updatedSchoolTime = schoolTimeService.updateSchoolTime(id, schoolTimeRequest);
        return ResponseEntity.ok(updatedSchoolTime);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @GetMapping("/{id}")
    public ResponseEntity<SchoolTimeResponse> getSchoolTimeById(@PathVariable Long id) {
        SchoolTimeResponse schoolTime = schoolTimeService.getSchoolTimeById(id);
        return ResponseEntity.ok(schoolTime);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @GetMapping
    public ResponseEntity<List<SchoolTimeResponse>> getAllSchoolTimes() {
        List<SchoolTimeResponse> allSchoolTimes = schoolTimeService.getAllSchoolTimes();
        return ResponseEntity.ok(allSchoolTimes);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR')or hasRole('DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchoolTime(@PathVariable Long id) {
        schoolTimeService.deleteSchoolTime(id);
        return ResponseEntity.noContent().build();
    }
}
