package com.nss.auth;

import com.nss.entity.User;
import com.nss.error.NotAllowedException;
import com.nss.model.request.AuthenticateRequest;
import com.nss.model.response.AuthenticationResponse;
import com.nss.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuthenticateService {

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final UserRepository userRepository;

    public AuthenticateService(JwtService jwtService, AuthenticationManager authenticationManager, CustomUserDetailsService userDetailsService, UserRepository userRepository) {

        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
    }



    public AuthenticationResponse login(AuthenticateRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByLogin(
                request.username())
                .orElseThrow(() -> new UsernameNotFoundException("Username " + request.username() + " not found"));

        if(user.isArchived()) {
            throw new NotAllowedException("User is archived");
        }
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        String jwtToken = jwtService.generateToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);
        List<String> roles = user.getRoles().stream().map(role -> role.getRole().name()).toList();

        return new AuthenticationResponse(jwtToken, refreshToken, user.getId(), roles);
    }
    public AuthenticationResponse refreshToken(String refreshToken) {
        String username = jwtService.extractUsername(refreshToken);
        User user = userRepository.findByLogin(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));

        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        if (jwtService.isTokenValid(refreshToken, userDetails)) {
            String newJwtToken = jwtService.generateToken(userDetails);
            String newRefreshToken = jwtService.generateRefreshToken(userDetails);
            List<String> roles = user.getRoles().stream().map(role -> role.getRole().name()).toList();

            return new AuthenticationResponse(newJwtToken, newRefreshToken,user.getId(), roles);
        } else {
            throw new RuntimeException("Invalid refresh token");
        }
    }
    public boolean validateToken(String token) {
        return jwtService.validateToken(token);
    }
    public boolean validateRefreshToken(String token) {
        return jwtService.validateRefreshToken(token);
    }

}
