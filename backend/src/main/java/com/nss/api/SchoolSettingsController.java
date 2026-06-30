package com.nss.api;

import com.nss.model.request.SchoolSettingsRequest;
import com.nss.model.response.SchoolSettingsResponse;
import com.nss.service.SchoolSettingsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/school-settings")
public class SchoolSettingsController {

    private final SchoolSettingsService service;

    public SchoolSettingsController(SchoolSettingsService service) {
        this.service = service;
    }

    // O'qish — login/navbar'da ko'rsatish uchun ochiq
    @GetMapping
    public ResponseEntity<SchoolSettingsResponse> getSettings() {
        return ResponseEntity.ok(service.getSettings());
    }

    // Yozish — faqat ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<SchoolSettingsResponse> updateSettings(@RequestBody SchoolSettingsRequest request) {
        return ResponseEntity.ok(service.updateSettings(request));
    }
}
