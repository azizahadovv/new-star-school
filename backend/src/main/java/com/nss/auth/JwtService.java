package com.nss.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);
    private final CustomUserDetailsService userDetailsService;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    @Value("${jwt.refreshExpiration}")
    private long refreshExpiration;

    public JwtService(CustomUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public String extractUsername(String token) {
        logger.info("Extracting username from token");
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        logger.info("Generating token for user: {}", userDetails.getUsername());
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(Object::toString).collect(Collectors.toList()));
        return generateToken(claims, userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        logger.info("Generating token with extra claims for user: {}", userDetails.getUsername());
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateRefreshToken(UserDetails userDetails) {
        logger.info("Generating refresh token for user: {}", userDetails.getUsername());
        return Jwts
                .builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + refreshExpiration))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        logger.info("Validating token for user: {}", userDetails.getUsername());
        final String username = extractUsername(token);
        boolean isValid = (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
        logger.info("Token for user: {} is valid: {}", userDetails.getUsername(), isValid);
        return isValid;
    }

    private boolean isTokenExpired(String token) {
        logger.info("Checking if token is expired");
        boolean isExpired = extractExpiration(token).before(new Date());
        logger.info("Token is expired: {}", isExpired);
        return isExpired;
    }

    private Date extractExpiration(String token) {
        logger.info("Extracting expiration date from token");
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        try {
            logger.info("Extracting all claims from token");
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.error("Failed to extract claims from token: {}", e.getMessage());
            throw e;
        }
    }

    private Key getSigningKey() {
        logger.info("Getting signing key");
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public List<String> extractRoles(String token) {
        logger.info("Extracting roles from token");
        Claims claims = extractAllClaims(token);
        List<String> roles = claims.get("roles", List.class);
        logger.info("Extracted roles: {}", roles);
        return roles;
    }

    public boolean validateToken(String token) {
        try {
            // Extract username from the token
            String username = extractUsername(token);

            // Load user details from the database or another source
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // If user is not found, validation fails
            if (userDetails == null) {
                logger.error("User not found: {}", username);
                return false;
            }

            // Check if the token is expired
            boolean isExpired = isTokenExpired(token);

            // Log the result
            logger.info("Token is valid for user {}: {}", username, !isExpired);

            // Return true if the token is not expired and the user exists
            return !isExpired;
        } catch (UsernameNotFoundException e) {
            // Log the exception if the user is not found
            logger.error("User not found during token validation: {}", e.getMessage());
            return false;
        } catch (Exception e) {
            // Log any other exception that occurs during validation
            logger.error("Token validation failed: {}", e.getMessage());
            return false;
        }

    }
    public boolean validateRefreshToken(String refreshToken) {
        try {
            // Extract the username from the refresh token
            String username = extractUsername(refreshToken);

            // Check if the user exists
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (userDetails == null) {
                logger.warn("User does not exist: {}", username);
                return false;
            }

            // Extract all claims to ensure the refresh token is valid and not tampered with
            Claims claims = extractAllClaims(refreshToken);

            // Check if the refresh token is expired
            boolean isExpired = isRefreshTokenExpired(refreshToken);

            // Log the result
            logger.info("Refresh token is valid: {}", !isExpired);

            // Return true if the refresh token is not expired and the user exists
            return !isExpired;
        } catch (Exception e) {
            // Log the exception in case of any validation failure
            logger.error("Refresh token validation failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean isRefreshTokenExpired(String refreshToken) {
        logger.info("Checking if refresh token is expired");
        boolean isExpired = extractExpiration(refreshToken).before(new Date());
        logger.info("Refresh token is expired: {}", isExpired);
        return isExpired;
    }

}
