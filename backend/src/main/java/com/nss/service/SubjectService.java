package com.nss.service;

import com.nss.entity.Subject;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotFoundException;
import com.nss.model.mapper.SubjectMapper;
import com.nss.model.request.SubjectRequest;
import com.nss.model.response.SubjectResponse;
import com.nss.repository.SubjectRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectService {
    private static final Logger LOGGER = LogManager.getLogger(SubjectService.class);
    private final SubjectRepository subjectRepository;
    private final SubjectMapper subjectMapper = SubjectMapper.INSTANCE;

    public SubjectService(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    public List<SubjectResponse> getAllSubjects() {
        LOGGER.info("Fetching all subjects");
        return subjectRepository.findAll().stream()
                .map(subjectMapper::toResponse)
                .collect(Collectors.toList());
    }

    public SubjectResponse getSubjectById(Long id) {
        LOGGER.info("Fetching subject with id {}", id);
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + id));
        return subjectMapper.toResponse(subject);
    }

    public Long createSubject(SubjectRequest request) {
        LOGGER.info("Creating new subject with name {}", request.name());
        if (subjectRepository.existsByName(request.name())) {
            throw new AlreadyExistsException("Subject already exists with name " + request.name());
        }

        Subject subject = subjectMapper.toEntity(request);
        return subjectRepository.save(subject).getId();
    }

    public void updateSubject(Long id, SubjectRequest request) {
        LOGGER.info("Updating subject with id {}", id);
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + id));

        subjectMapper.updateEntityFromRequest(request, subject);
        subjectMapper.toResponse(subjectRepository.save(subject));
    }

    public void deleteSubject(Long id) {
        LOGGER.info("Deleting subject with id {}", id);
        Subject subject = subjectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + id));
        subjectRepository.delete(subject);
    }
}
