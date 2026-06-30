package com.nss.error;

public class NotAllowedException extends RuntimeException{
    public NotAllowedException() {

    }

    public NotAllowedException(final String message) {
        super(message);
    }

    public NotAllowedException(final String message, final Throwable cause) {
        super(message, cause);
    }

    public NotAllowedException(final Throwable cause) {
        super(cause);
    }

    public NotAllowedException(
           final String message,
           final Throwable cause,
           final boolean enableSuppression,
           final boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
