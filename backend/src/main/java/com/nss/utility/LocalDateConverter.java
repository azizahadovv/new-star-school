package com.nss.utility;

import com.opencsv.bean.AbstractBeanField;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class LocalDateConverter extends AbstractBeanField<LocalDate, String> {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Override
    protected LocalDate convert(String value) {
        try {
            return LocalDate.parse(value, DATE_FORMATTER);
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Unable to parse date: " + value, e);
        }
    }
}
