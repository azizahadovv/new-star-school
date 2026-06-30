package com.nss.error.handler;

import com.nss.error.AlreadyExistsException;
import com.nss.error.ErrorResponse;
import com.nss.error.NotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.ValidationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.nio.file.AccessDeniedException;
import java.security.SignatureException;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;

import static org.springframework.http.HttpStatus.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LogManager.getLogger();

    @ExceptionHandler({
            AlreadyExistsException.class,
            DateTimeParseException.class,
            UnsupportedOperationException.class,
            IllegalArgumentException.class,
            IllegalStateException.class,
            NullPointerException.class,
            RuntimeException.class,
            NotFoundException.class,
            ValidationException.class
    })
    public ResponseEntity<ErrorResponse> handleBadRequest(final RuntimeException e, final WebRequest webRequest){
        return constructExceptionResponse(e, webRequest, BAD_REQUEST);
    }

    @ExceptionHandler({
            AccessDeniedException.class,
            BadCredentialsException.class,
            SignatureException.class,
            ExpiredJwtException.class
    })
    public ResponseEntity<ErrorResponse> handleAuthExceptions(final Exception e, final WebRequest webRequest) {
        HttpStatus status;
        String message;

        if (e instanceof AccessDeniedException) {
            status = FORBIDDEN;
            message = "You don't have permission to access this resource";
        } else if (e instanceof BadCredentialsException) {
            status = UNAUTHORIZED;
            message = "Username or password is incorrect";
        } else if (e instanceof SignatureException) {
            status = UNAUTHORIZED;
            message = "This token is not valid";
        } else if (e instanceof ExpiredJwtException) {
            status = UNAUTHORIZED;
            message = "This token is expired";
        } else {
            // This should not happen as all specific cases should be handled
            status = INTERNAL_SERVER_ERROR;
            message = "An unexpected error occurred";
        }

        return new ResponseEntity<>(
                new ErrorResponse(
                        status.value(),
                        webRequest.getDescription(false),
                        message,
                        LocalDateTime.now().toString()),
                status
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAll(final Exception e, final WebRequest webRequest) {
        LOGGER.error("Handling exception: {}", e.getClass().getName(), e);
        return constructExceptionResponse(e, webRequest, INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ErrorResponse> constructExceptionResponse(
            final Exception e, final WebRequest request, final HttpStatus status) {
        final String path = request.getDescription(false);
        String timestamp = LocalDateTime.now().toString();

        LOGGER.error("Failed to request [{}] path. Error:", path, e);
        ErrorResponse errorResponse = new ErrorResponse(status.value(), path, e.getMessage(), timestamp);

        return new ResponseEntity<>(errorResponse, status);
    }
}
