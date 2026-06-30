package com.nss.auth;

import com.nss.model.request.AuthenticateRequest;
import com.nss.model.response.AuthenticationResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {

    private final AuthenticateService authenticateService;

    public AuthenticationController(AuthenticateService authenticateService) {
        this.authenticateService = authenticateService;
    }
    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestParam String refreshToken) {
        try {
            AuthenticationResponse response = authenticateService.refreshToken(refreshToken);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid refresh token");
        }
    }
    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestParam String token) {
        return ResponseEntity.ok(authenticateService.validateToken(token));
    }
    @GetMapping("/validate-refresh-token")
    public ResponseEntity<?> validateRefreshToken(@RequestParam String refreshToken) {
        return ResponseEntity.ok(authenticateService.refreshToken(refreshToken));
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticateRequest request) {
        return ResponseEntity.ok(authenticateService.login(request));
    }
}
