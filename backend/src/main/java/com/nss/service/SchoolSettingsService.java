package com.nss.service;

import com.nss.entity.SchoolSettings;
import com.nss.model.request.SchoolSettingsRequest;
import com.nss.model.response.SchoolSettingsResponse;
import com.nss.repository.SchoolSettingsRepository;
import com.nss.utility.Utility;
import org.springframework.stereotype.Service;

/**
 * Yagona (singleton) maktab sozlamalari xizmati. Doim id=1 yozuv bilan ishlaydi.
 */
@Service
public class SchoolSettingsService {

    private static final Long SINGLETON_ID = 1L;

    private final SchoolSettingsRepository repository;

    public SchoolSettingsService(SchoolSettingsRepository repository) {
        this.repository = repository;
    }

    public SchoolSettingsResponse getSettings() {
        SchoolSettings settings = loadOrCreate();
        return toResponse(settings);
    }

    public SchoolSettingsResponse updateSettings(SchoolSettingsRequest request) {
        SchoolSettings settings = loadOrCreate();
        // Qisman yangilash: faqat berilgan (null bo'lmagan) maydonlar yoziladi
        if (request.schoolName() != null) settings.setSchoolName(request.schoolName());
        if (request.shortName() != null) settings.setShortName(request.shortName());
        if (request.academicYear() != null) settings.setAcademicYear(request.academicYear());
        if (request.address() != null) settings.setAddress(request.address());
        if (request.phone() != null) settings.setPhone(request.phone());
        if (request.email() != null) settings.setEmail(request.email());
        if (request.website() != null) settings.setWebsite(request.website());
        if (request.logoFileId() != null) settings.setLogoFileId(request.logoFileId());
        return toResponse(repository.save(settings));
    }

    private SchoolSettings loadOrCreate() {
        return repository.findById(SINGLETON_ID).orElseGet(() -> {
            SchoolSettings s = new SchoolSettings();
            s.setId(SINGLETON_ID);
            s.setSchoolName("New Star School");
            s.setShortName("NSS");
            return repository.save(s);
        });
    }

    private SchoolSettingsResponse toResponse(SchoolSettings s) {
        String logoUrl = s.getLogoFileId() != null ? Utility.IMAGE_URL + s.getLogoFileId() : null;
        return new SchoolSettingsResponse(
                s.getId(),
                s.getSchoolName(),
                s.getShortName(),
                s.getAcademicYear(),
                s.getAddress(),
                s.getPhone(),
                s.getEmail(),
                s.getWebsite(),
                s.getLogoFileId(),
                logoUrl
        );
    }
}
