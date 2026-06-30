package com.nss.service;

import com.nss.entity.Term;
import com.nss.model.request.TermRequest;
import com.nss.model.response.TermResponse;
import com.nss.repository.TermRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TermService {

    private final TermRepository termRepository;

    public TermService(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    public TermResponse createTerm(TermRequest termRequest) {
        Term term = new Term();
        term.setName(termRequest.name());
        term.setYear(termRequest.year());
        term.setTerm(termRequest.term());
        Term savedTerm = termRepository.save(term);
        return new TermResponse(savedTerm.getId(), savedTerm.getName(), savedTerm.getYear(), savedTerm.getTerm());
    }

    public TermResponse getTerm(Long id) {
        Term term = termRepository.findById(id).orElseThrow(() -> new RuntimeException("Term not found"));
        return new TermResponse(term.getId(), term.getName(), term.getYear(), term.getTerm());
    }

    public List<TermResponse> getAllTerms() {
        return termRepository.findAll().stream()
                .map(term -> new TermResponse(term.getId(), term.getName(), term.getYear(), term.getTerm()))
                .collect(Collectors.toList());
    }

    public TermResponse updateTerm(Long id, TermRequest termRequest) {
        Term term = termRepository.findById(id).orElseThrow(() -> new RuntimeException("Term not found"));
        term.setName(termRequest.name());
        term.setYear(termRequest.year());
        term.setTerm(termRequest.term());
        Term updatedTerm = termRepository.save(term);
        return new TermResponse(updatedTerm.getId(), updatedTerm.getName(), updatedTerm.getYear(), updatedTerm.getTerm());
    }

    public void deleteTerm(Long id) {
        termRepository.deleteById(id);
    }
}
