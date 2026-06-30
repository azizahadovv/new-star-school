package com.nss.api;


import com.nss.model.request.TermRequest;
import com.nss.model.response.TermResponse;
import com.nss.service.TermService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/terms")
public class TermController {

    private final TermService termService;

    public TermController(TermService termService) {
        this.termService = termService;
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('DEPUTY_DIRECTOR')")
    @PostMapping
    public ResponseEntity<TermResponse> createTerm(@RequestBody TermRequest termRequest) {
        TermResponse termResponse = termService.createTerm(termRequest);
        return ResponseEntity.ok(termResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TermResponse> getTerm(@PathVariable Long id) {
        TermResponse termResponse = termService.getTerm(id);
        return ResponseEntity.ok(termResponse);
    }

    @GetMapping
    public ResponseEntity<List<TermResponse>> getAllTerms() {
        List<TermResponse> terms = termService.getAllTerms();
        return ResponseEntity.ok(terms);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('DEPUTY_DIRECTOR')")
    @PutMapping("/{id}")
    public ResponseEntity<TermResponse> updateTerm(@PathVariable Long id, @RequestBody TermRequest termRequest) {
        TermResponse termResponse = termService.updateTerm(id, termRequest);
        return ResponseEntity.ok(termResponse);
    }

    @PreAuthorize("hasRole('ADMIN') or hasRole('DIRECTOR') or hasRole('DEPUTY_DIRECTOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTerm(@PathVariable Long id) {
        termService.deleteTerm(id);
        return ResponseEntity.noContent().build();
    }
}
