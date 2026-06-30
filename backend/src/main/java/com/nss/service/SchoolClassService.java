package com.nss.service;

import com.nss.entity.Role;
import com.nss.entity.SchoolClass;
import com.nss.entity.Student;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotAllowedException;
import com.nss.error.NotFoundException;
import com.nss.model.mapper.SchoolClassMapper;
import com.nss.model.mapper.StudentMapper;
import com.nss.model.request.SchoolClassRequest;
import com.nss.model.request.StudentCsvRepresentation;
import com.nss.model.request.UserRequest;
import com.nss.model.response.ClassStudentResponse;
import com.nss.model.response.SchoolClassResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.repository.RoleRepository;
import com.nss.repository.SchoolClassRepository;
import com.nss.repository.StudentRepository;
import com.nss.repository.UserRepository;
import com.nss.utility.UserRole;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;
import com.opencsv.bean.HeaderColumnNameMappingStrategy;
import jakarta.validation.ValidationException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SchoolClassService {

    private static final Logger LOGGER = LogManager.getLogger(SchoolClassService.class);

    private final SchoolClassRepository schoolClassRepository;
    private final StudentRepository studentRepository;
    private final RoleRepository roleRepository;

    private final SchoolClassMapper schoolClassMapper = SchoolClassMapper.INSTANCE;
    private final StudentMapper studentMapper = StudentMapper.INSTANCE;
    private final TimetableService timetableService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public SchoolClassService(SchoolClassRepository schoolClassRepository, StudentRepository studentRepository, RoleRepository roleRepository, TimetableService timetableService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.schoolClassRepository = schoolClassRepository;
        this.studentRepository = studentRepository;
        this.roleRepository = roleRepository;
        this.timetableService = timetableService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public void activateClass(Long id,Boolean activate){
        SchoolClass schoolClass = schoolClassRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + id));
        if (schoolClass.getActive().equals(activate)){
            throw new NotAllowedException("Class with id ["+id+"] is already active ["+activate+"]");
        }
        schoolClass.setActive(activate);
        schoolClassRepository.save(schoolClass);
    }

    public List<SchoolClassResponse> getAllClasses() {
        LOGGER.info("Fetching all school classes");
        return schoolClassRepository.findAll().stream()
                .map(schoolClassMapper::toResponse)
                .collect(Collectors.toList());
    }

    public ClassStudentResponse getClassById(Long id) {
        LOGGER.info("Fetching school class with id {}", id);
        SchoolClass schoolClass = schoolClassRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + id));
        return schoolClassMapper.toClassStudentResponse(schoolClass);
    }
    public List<TimetableDayResponse> getTimetablesForClass(Long classId) {
        LOGGER.info("Fetching timetables for class with id {}", classId);
        return timetableService.getTimetablesByClassId(classId);
    }

    @Transactional
    public Long createClass(SchoolClassRequest request) {
        LOGGER.info("Creating new school class with grade {}, groupLetter {}", request.grade(), request.groupLetter());
        if (schoolClassRepository.existsByGradeAndGroupLetter(request.grade(), request.groupLetter())) {
            throw new AlreadyExistsException("Class already exists with grade " + request.grade() + " and groupLetter " + request.groupLetter());
        }

        SchoolClass schoolClass = schoolClassMapper.toEntity(request);
        return schoolClassRepository.save(schoolClass).getId();
    }

    @Transactional
    public void updateClass(Long id, SchoolClassRequest request) {
        LOGGER.info("Updating school class with id {}", id);
        SchoolClass schoolClass = schoolClassRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + id));

        if (schoolClassRepository.existsByGradeAndGroupLetter(request.grade(), request.groupLetter())) {
            SchoolClass existingClass = schoolClassRepository.findByGradeAndGroupLetter(request.grade(), request.groupLetter()).orElse(null);
            if (existingClass != null && !existingClass.getId().equals(id)) {
                throw new AlreadyExistsException("Another class already exists with grade " + request.grade() + " and groupLetter " + request.groupLetter());
            }
        }

        schoolClassMapper.updateEntityFromRequest(request, schoolClass);
        schoolClassRepository.save(schoolClass);
        LOGGER.info("Updated school class with id {}", id);
    }

    public void deleteClass(Long id) {
        LOGGER.info("Deleting school class with id {}", id);
        SchoolClass schoolClass = schoolClassRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + id));
        schoolClassRepository.delete(schoolClass);
    }
    public void deleteStudentFromClass(Long classId, Long studentId) {
        LOGGER.info("Removing student with id {} from class with id {}", studentId, classId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found with id " + studentId));

        if (student.isArchived()){
            throw new NotFoundException("Student with id [" + studentId + "] is already archived");
        }

        if (!student.getSchoolClass().getId().equals(classId)) {
            throw new NotAllowedException("Student with id [" + studentId + "] does not belong to class with id [" + classId + "]");
        }

        student.setArchived(true);
        studentRepository.save(student);

        LOGGER.info("Student with id {} archived (removed) from class with id {}", studentId, classId);
    }



    public Long addStudentToClass(Long classId, UserRequest userRequest) {
        LOGGER.info("Adding student to class with id {}", classId);
        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + classId));

        Role studentRole = roleRepository.findByRole(UserRole.STUDENT)
                .orElseThrow(() -> new NotFoundException("Role 'STUDENT' not found"));

        Student student = studentMapper.toEntity(userRequest);
        student.setPassword(passwordEncoder.encode(userRequest.password()));
        student.setSchoolClass(schoolClass);
        student.getRoles().add(studentRole);

        Student savedStudent = studentRepository.save(student);
        return savedStudent.getId();
    }

    public int addStudentsFromCSV(Long classId, MultipartFile file) throws IOException {
        LOGGER.info("Adding students from CSV to class with id {}", classId);
        SchoolClass schoolClass = schoolClassRepository.findById(classId)
                .orElseThrow(() -> new NotFoundException("Class not found with id " + classId));

        Role studentRole = roleRepository.findByRole(UserRole.STUDENT)
                .orElseThrow(() -> new NotFoundException("Role 'STUDENT' not found"));

        Set<Student> students = parseCsv(file, schoolClass, studentRole);

        for (Student student : students) {
            if (userRepository.findByLogin(student.getLogin()).isPresent()) {
                String errorMessage = String.format("Error: Student with login '%s' already exists in the database.", student.getLogin());
                LOGGER.error(errorMessage);
                throw new ValidationException(errorMessage);
            }
        }

        studentRepository.saveAll(students);
        LOGGER.info("Uploaded {} students to class with id {}", students.size(), classId);
        return students.size();
    }

    private Set<Student> parseCsv(MultipartFile file, SchoolClass schoolClass, Role studentRole) throws IOException {
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            HeaderColumnNameMappingStrategy<StudentCsvRepresentation> strategy = new HeaderColumnNameMappingStrategy<>();
            strategy.setType(StudentCsvRepresentation.class);
            CsvToBean<StudentCsvRepresentation> csvToBean = new CsvToBeanBuilder<StudentCsvRepresentation>(reader)
                    .withMappingStrategy(strategy)
                    .withIgnoreEmptyLine(true)
                    .withIgnoreLeadingWhiteSpace(true)
                    .build();

            return csvToBean.parse().stream()
                    .map(csvLine -> {
                        Student student = new Student();
                        student.setFirstName(csvLine.getFirstName());
                        student.setLastName(csvLine.getLastName());
                        student.setPatronymic(csvLine.getPatronymic());
                        student.setBirthDate(csvLine.getBirthDate());
                        student.setGender(csvLine.getGender());
                        student.setNationality(csvLine.getNationality());
                        student.setCountry(csvLine.getCountry());
                        student.setRegion(csvLine.getRegion());
                        student.setDistrict(csvLine.getDistrict());
                        student.setAddress(csvLine.getAddress());
                        student.setPhoneNumber(csvLine.getPhoneNumber());
                        student.setLogin(csvLine.getLogin());
                        student.setPassword(passwordEncoder.encode(csvLine.getPassword()));
                        student.setParentPhoneNumber(csvLine.getParentPhoneNumber());
                        student.setImageUrl(csvLine.getImage());
                        student.setSchoolClass(schoolClass);
                        student.getRoles().add(studentRole);
                        return student;
                    })
                    .collect(Collectors.toSet());
        } catch (Exception e) {
            LOGGER.error("Error parsing CSV file: {}", e.getMessage());
            throw new IOException("Error parsing CSV file: " + e.getMessage(), e);
        }
    }

}
