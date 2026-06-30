package com.nss.api;

import com.nss.model.request.StaffRequest;
import com.nss.model.response.StaffResponse;
import com.nss.service.StaffService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping
    public List<StaffResponse> getAllStaff() {
        return staffService.getAllStaff();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping("/{id}")
    public StaffResponse getStaffById(@PathVariable Long id) {
         return staffService.getStaffById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping
    public StaffResponse createStaff(@RequestBody StaffRequest staffRequest) {
        return staffService.createStaff(staffRequest);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StaffResponse> updateStaff(@PathVariable Long id, @RequestBody StaffRequest staffRequest) {
        StaffResponse updatedStaff = staffService.updateStaff(id, staffRequest);
        return ResponseEntity.ok(updatedStaff);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @GetMapping("/search")
    public List<StaffResponse> searchStaff(@RequestParam(required = false) String name) {
        return staffService.searchStaff(name);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DIRECTOR', 'DEPUTY_DIRECTOR')")
    @PostMapping(value = "/{staffId}/upload-image", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadUserImage(@PathVariable Long staffId,@RequestPart("file") MultipartFile file) {
        Long imageId = staffService.uploadStaffImage(staffId, file);
        return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully with id: " + imageId);
    }
}
