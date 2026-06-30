package com.nss.api;

import com.nss.model.request.UserRequest;
import com.nss.model.response.AdminResponse;
import com.nss.service.AdminService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admins")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping
    public ResponseEntity<AdminResponse> createAdmin(@RequestBody UserRequest userRequest) {
        AdminResponse adminResponse = adminService.createAdmin(userRequest);
        return new ResponseEntity<>(adminResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponse> getAdminById(@PathVariable Long id) {
        AdminResponse adminResponse = adminService.findById(id);
        return ResponseEntity.ok(adminResponse);
    }

    @GetMapping
    public ResponseEntity<List<AdminResponse>> getAllAdmins() {
        List<AdminResponse> admins = adminService.findAll();
        return ResponseEntity.ok(admins);
    }
    @GetMapping("/archived")
    public ResponseEntity<List<AdminResponse>> get() {
        List<AdminResponse> admins = adminService.getArchived();
        return ResponseEntity.ok(admins);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdminResponse> updateAdmin(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        AdminResponse updatedAdmin = adminService.updateAdmin(id, userRequest);
        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
    @PostMapping(value = "/{adminId}/upload-image", consumes = {"multipart/form-data"})
    public ResponseEntity<String> uploadAdminImage(@PathVariable Long adminId,@RequestPart("file") MultipartFile file) {
        adminService.uploadAdminImage(adminId, file);
        return ResponseEntity.status(HttpStatus.OK).body("Image uploaded successfully");
    }
}
