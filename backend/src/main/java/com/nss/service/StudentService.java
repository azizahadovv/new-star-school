package com.nss.service;


import com.nss.entity.Role;
import com.nss.entity.Student;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotFoundException;
import com.nss.model.mapper.StudentMapper;
import com.nss.model.request.UserRequest;
import com.nss.model.response.StudentResponse;
import com.nss.repository.RoleRepository;
import com.nss.repository.SchoolClassRepository;
import com.nss.repository.StudentRepository;
import com.nss.repository.UserRepository;
import com.nss.utility.UserRole;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final RoleRepository roleRepository;
    private final SchoolClassRepository schoolClassRepository;
    private static final Logger LOGGER = LogManager.getLogger(StudentService.class);
    private final StudentMapper studentMapper = StudentMapper.INSTANCE;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    public StudentService(StudentRepository studentRepository, RoleRepository roleRepository, SchoolClassRepository schoolClassRepository, FileService fileService, PasswordEncoder passwordEncoder, UserRepository userRepository) {
        this.studentRepository = studentRepository;
        this.roleRepository = roleRepository;
        this.schoolClassRepository = schoolClassRepository;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public StudentResponse findStudentById(Long id) {
        LOGGER.info("Find student by id: {}", id);
        Student student = studentRepository.findById(id)
                .orElseThrow(
                        () -> {
                            LOGGER.error(" Student with id: {} not found", id);
                            return new NotFoundException("Student with id [" + id + "] not found");
                        });
        if (student.isArchived()){
            LOGGER.error("Student with id: {} is archived", id);
            throw new NotFoundException("Student with id [" + id + "] is archived");
        }
        return studentMapper.toResponse(student);
    }

    @Transactional
    public void deleteStudent(Long id) {
        LOGGER.info("Deleting student by id: {}", id);
        Student student = studentRepository.findById(id)
                .orElseThrow(
                        () -> {
                            LOGGER.error("Student with id: {} not found.", id);
                            return new NotFoundException("Student with id [" + id + "] not found");
                        });
        if (student.isArchived()){
            LOGGER.error("Student with id: {} is archived", id);
            throw new NotFoundException("Student with id [" + id + "] is archived");
        }
        student.setArchived(true);

        studentRepository.save(student);
        LOGGER.info("Student with id: {} archived (deleted) successfully", id);
    }

    public StudentResponse updateStudent(Long id, UserRequest userRequest) {
        LOGGER.info("Updating student by id: {}", id);
        Student student = studentRepository.findById(id)
                .orElseThrow(
                        () -> {
                            LOGGER.error("Student with id: {} not found", id);
                            return new NotFoundException("Student with id [" + id + "] not found");
                        });

        if (student.isArchived()){
            LOGGER.error("Student with id: {} is archived", id);
            throw new NotFoundException("Student with id [" + id + "] is archived");
        }

        studentMapper.updateEntityFromRequest(userRequest, student);
        // Parol faqat berilgan bo'lsa yangilanadi (aks holda mavjud parol saqlanadi)
        if (userRequest.password() != null && !userRequest.password().isBlank()) {
            student.setPassword(passwordEncoder.encode(userRequest.password()));
        }
        Student updatedStudent = studentRepository.save(student);
        LOGGER.info("Student with id: {} updated successfully", id);
        return studentMapper.toResponse(updatedStudent);
    }

    public StudentResponse createStudent(UserRequest userRequest) {
        LOGGER.info("Creating new student with email: {}", userRequest.login());

        if (userRepository.findByLogin(userRequest.login()).isPresent()) {
            LOGGER.error("Student with login: {} already exists", userRequest.login());
            throw new AlreadyExistsException("Student with login [" + userRequest.login() + "] already exists");
        }


        Student student = studentMapper.toEntity(userRequest);
        student.setPassword(passwordEncoder.encode(userRequest.password()));

        Role studentRole = roleRepository.findByRole(UserRole.STUDENT)
                .orElseThrow(() -> new NotFoundException("Role 'STUDENT' not found"));
        student.getRoles().add(studentRole);

        Student savedStudent = studentRepository.save(student);

        LOGGER.info("Student with id: {} created successfully", savedStudent.getId());
        return studentMapper.toResponse(savedStudent);
    }

    public List<StudentResponse> getAllStudents() {
        LOGGER.info("Fetching all students");
        List<Student> students = studentRepository.findAllByArchivedFalse();
        return students.stream()
                .map(studentMapper::toResponse)
                .toList();
    }
    public List<StudentResponse> getAllStudents(Long classId, String name) {
        LOGGER.info("Fetching all students with classId: {} and name: {}", classId, name);

        List<Student> students;

        if (classId != null && name != null && !name.isEmpty()) {
            students = studentRepository.findByClassId(classId).stream()
                    .filter(student -> (student.getFirstName().toLowerCase().contains(name.toLowerCase())
                            || student.getLastName().toLowerCase().contains(name.toLowerCase()))&& !student.isArchived())
                    .toList();
        } else if (classId != null) {
            students = studentRepository.findByClassId(classId);
        } else if (name != null && !name.isEmpty()) {
            students = studentRepository.searchByName(name);
        } else {
            students = studentRepository.findAllByArchivedFalse();
        }

        return students.stream()
                .map(studentMapper::toResponse)
                .toList();
    }


    public List<StudentResponse> searchStudents(String keyword) {
        LOGGER.info("Searching students by keyword: {}", keyword);
        List<Student> students = studentRepository.searchByKeyword(keyword);
        return students.stream()
                .map(studentMapper::toResponse)
                .toList();
    }
    public List<StudentResponse> getAllArchived(){
        LOGGER.info("Fetching all archived students");
        List<Student> students = studentRepository.findAllByArchivedTrue();
        return students.stream()
                .map(studentMapper::toResponse)
                .toList();
    }

    public void uploadStudentImage(Long studentId, MultipartFile file) {
        fileService.uploadUserImage(studentId,file);
    }
}
