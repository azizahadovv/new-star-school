package com.nss.model.response;

import java.util.List;

public record AuthenticationResponse(
    String jwtToken,
    String refreshToken,
    Long userId,
    List<String> roles
) {
}
