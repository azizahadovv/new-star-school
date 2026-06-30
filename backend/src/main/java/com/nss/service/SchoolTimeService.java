package com.nss.service;

import com.nss.entity.SchoolTime;
import com.nss.error.NotFoundException;
import com.nss.model.request.SchoolTimeRequest;
import com.nss.model.response.SchoolTimeResponse;
import com.nss.repository.SchoolTimeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SchoolTimeService {

    private final SchoolTimeRepository schoolTimeRepository;

    public SchoolTimeService(SchoolTimeRepository schoolTimeRepository) {
        this.schoolTimeRepository = schoolTimeRepository;
    }

    public SchoolTimeResponse createSchoolTime(SchoolTimeRequest schoolTimeRequest) {
        Optional<SchoolTime> existingSchoolTime = schoolTimeRepository.findByNumber(schoolTimeRequest.number());
        if (existingSchoolTime.isPresent()) {
            throw new IllegalArgumentException("SchoolTime with number " + schoolTimeRequest.number() + " already exists.");
        }

        SchoolTime schoolTime = new SchoolTime();
        schoolTime.setNumber(schoolTimeRequest.number());
        schoolTime.setStartTime(schoolTimeRequest.startTime());
        schoolTime.setEndTime(schoolTimeRequest.endTime());

        SchoolTime savedSchoolTime = schoolTimeRepository.save(schoolTime);
        return toResponse(savedSchoolTime);
    }

    public SchoolTimeResponse updateSchoolTime(Long id, SchoolTimeRequest schoolTimeRequest) {
        SchoolTime schoolTime = schoolTimeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("School time not found with ID " + id));

        Optional<SchoolTime> existingSchoolTime = schoolTimeRepository.findByNumber(schoolTimeRequest.number());
        if (existingSchoolTime.isPresent() && !existingSchoolTime.get().getId().equals(id)) {
            throw new IllegalArgumentException("SchoolTime with number " + schoolTimeRequest.number() + " already exists.");
        }

        schoolTime.setNumber(schoolTimeRequest.number());
        schoolTime.setStartTime(schoolTimeRequest.startTime());
        schoolTime.setEndTime(schoolTimeRequest.endTime());

        SchoolTime updatedSchoolTime = schoolTimeRepository.save(schoolTime);
        return toResponse(updatedSchoolTime);
    }

    public SchoolTimeResponse getSchoolTimeById(Long id) {
        SchoolTime schoolTime = schoolTimeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("School time not found with ID " + id));
        return toResponse(schoolTime);
    }

    public List<SchoolTimeResponse> getAllSchoolTimes() {
        List<SchoolTime> schoolTimes = schoolTimeRepository.findAll(Sort.by(Sort.Direction.ASC, "number"));
        return schoolTimes.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public void deleteSchoolTime(Long id) {
        SchoolTime schoolTime = schoolTimeRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("School time not found with ID " + id));
        schoolTimeRepository.delete(schoolTime);
    }

    private SchoolTimeResponse toResponse(SchoolTime schoolTime) {
        return new SchoolTimeResponse(
                schoolTime.getId(),
                schoolTime.getNumber(),
                schoolTime.getStartTime(),
                schoolTime.getEndTime()
        );
    }
}
