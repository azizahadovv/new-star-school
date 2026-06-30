package com.nss.error;



public record ErrorResponse(
        int  status, String path, String message, String timestamp
) {

}
