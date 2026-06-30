package com.nss.service;

import com.nss.entity.*;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotFoundException;
import com.nss.model.mapper.TeacherMapper;
import com.nss.model.request.UserRequest;
import com.nss.model.response.SchoolClassResponse;
import com.nss.model.response.SubjectResponse;
import com.nss.model.response.TeacherResponse;
import com.nss.model.response.TeacherSubjectResponse;
import com.nss.repository.*;
import com.nss.utility.UserRole;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;


@Service
public class TeacherService {
    private static final Logger LOGGER = LogManager.getLogger(TeacherService.class);
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final TimetableRepository timetableRepository;
    private final RoleRepository roleRepository;
    private final TeacherMapper teacherMapper = TeacherMapper.INSTANCE;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;
    private final SchoolTimeRepository schoolTimeRepository;
    private final UserRepository userRepository;

    public TeacherService(TeacherRepository teacherRepository, SubjectRepository subjectRepository, TimetableRepository timetableRepository, RoleRepository roleRepository, FileService fileService, PasswordEncoder passwordEncoder, SchoolTimeRepository schoolTimeRepository, UserRepository userRepository) {
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.timetableRepository = timetableRepository;
        this.roleRepository = roleRepository;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
        this.schoolTimeRepository = schoolTimeRepository;
        this.userRepository = userRepository;
    }

    public List<TeacherResponse> getAllTeachers() {
        LOGGER.info("Fetching all teachers");
        return teacherRepository.findAllByArchivedFalse().stream()
                .map(teacherMapper::toResponse)
                .toList();
    }

    public TeacherResponse getTeacherById(Long id) {
        LOGGER.info("Fetching teacher with id {}", id);
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + id));
        checkIfTeacherArchived(teacher);
        return teacherMapper.toResponse(teacher);
    }
    public TeacherSubjectResponse getTeacherSubjects(Long id) {
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + id));

        checkIfTeacherArchived(teacher);

        List<SubjectResponse> subjects = teacher.getSubjects()
                .stream()
                .map(subject -> new SubjectResponse(subject.getId(), subject.getName()))
                .toList();
        return new TeacherSubjectResponse(subjects);
    }

    @Transactional
    public Long createTeacher(UserRequest request, Long subjectId, UserRole role) {
        LOGGER.info("Creating new teacher with login {}", request.login());
        if (userRepository.findByLogin(request.login()).isPresent()) {
            throw new AlreadyExistsException("User already exists with login " + request.login());
        }

        Teacher teacher = teacherMapper.toEntity(request);
        teacher.setPassword(passwordEncoder.encode(request.password()));
        Role teacherRole = roleRepository.findByRole(role)
                .orElseThrow(() -> new NotFoundException("Role '" + role.name() + "' not found"));
        teacher.getRoles().add(teacherRole);

        if (subjectId != null) {
            Subject subject = subjectRepository.findById(subjectId)
                    .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));
            teacher.getSubjects().add(subject);
        }

        return teacherRepository.save(teacher).getId();
    }
    @Transactional
    public void addRoleToTeacher(Long teacherId, List<UserRole> roles) {
        LOGGER.info("Adding roles {} to teacher with id {}", roles, teacherId);

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        checkIfTeacherArchived(teacher);

        roles.stream()
                .map(role -> roleRepository.findByRole(role)
                        .orElseThrow(() -> new NotFoundException("Role '" + role.name() + "' not found"))
                )
                .forEach(role -> {
                    if (teacher.getRoles().contains(role)) {
                        throw new AlreadyExistsException("Teacher already has the role '" + role.getRole().name() + "'");
                    }
                    teacher.getRoles().add(role);
                });

        teacherRepository.save(teacher);
    }


    @Transactional
    public void removeRoleFromTeacher(Long teacherId, List<UserRole> roles) {
        LOGGER.info("Removing roles {} from teacher with id {}", roles, teacherId);

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        checkIfTeacherArchived(teacher);

        roles.stream()
                .map(role -> roleRepository.findByRole(role)
                        .orElseThrow(() -> new NotFoundException("Role '" + role.name() + "' not found"))
                )
                .forEach(roleEntity -> {
                    if (!teacher.getRoles().contains(roleEntity)) {
                        throw new NotFoundException("Teacher does not have the role '" + roleEntity.getRole().name() + "'");
                    }
                    teacher.getRoles().remove(roleEntity);
                });

        teacherRepository.save(teacher);
    }
    @Transactional
    public void assignRolesToTeacher(Long teacherId, List<UserRole> roles) {
        LOGGER.info("Assigning roles {} to teacher with id {}", roles, teacherId);

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        checkIfTeacherArchived(teacher);

        teacher.getRoles().clear();

        List<Role> roleEntities = roles.stream()
                .map(role -> roleRepository.findByRole(role)
                        .orElseThrow(() -> new NotFoundException("Role '" + role.name() + "' not found"))
                )
                .toList();

        teacher.getRoles().addAll(roleEntities);

        teacherRepository.save(teacher);

        LOGGER.info("Roles {} assigned to teacher with id {}", roles, teacherId);
    }


    @Transactional
    public void addSubjectToTeacher(Long teacherId, Long subjectId) {
        LOGGER.info("Adding subject with id {} to teacher with id {}", subjectId, teacherId);
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        checkIfTeacherArchived(teacher);

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));

        if (teacher.getSubjects().contains(subject)) {
            throw new AlreadyExistsException("Teacher already has the subject with id " + subjectId);
        }

        teacher.getSubjects().add(subject);
        teacherRepository.save(teacher);
    }
    @Transactional
    public void removeSubjectFromTeacher(Long teacherId, Long subjectId) {
        LOGGER.info("Removing subject with id {} from teacher with id {}", subjectId, teacherId);
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        checkIfTeacherArchived(teacher);

        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + subjectId));

        if (!teacher.getSubjects().contains(subject)) {
            throw new NotFoundException("Teacher does not have the subject with id " + subjectId);
        }

        teacher.getSubjects().remove(subject);
        teacherRepository.save(teacher);
    }

    public void updateTeacher(Long id, UserRequest request) {
        LOGGER.info("Updating teacher with id {}", id);
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + id));

        checkIfTeacherArchived(teacher);

        teacherMapper.updateEntityFromRequest(request, teacher);
        // Parol faqat berilgan bo'lsa yangilanadi (aks holda mavjud parol saqlanadi)
        if (request.password() != null && !request.password().isBlank()) {
            teacher.setPassword(passwordEncoder.encode(request.password()));
        }

        teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        LOGGER.info("Deleting teacher with id {}", id);
        Teacher teacher = teacherRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + id));
        checkIfTeacherArchived(teacher);
        teacher.setArchived(true);
        teacherRepository.save(teacher);
    }
    public List<TeacherResponse> findTeachersBySubjectId(Long subjectId) {
        LOGGER.info("Fetching teachers by subject id {}", subjectId);
        List<Teacher> teachers = teacherRepository.findTeachersBySubjectId(subjectId);
        return teachers.stream()
                .map(teacherMapper::toResponse)
                .toList();
    }
    public List<TeacherResponse> findAvailableTeachers(DayOfWeek dayOfWeek, Long schoolTimeId , Long subjectId) {

        SchoolTime schoolTime = schoolTimeRepository.findById(schoolTimeId)
                .orElseThrow(() -> new NotFoundException("School time not found with id " + schoolTimeId));
        LocalTime startTime = schoolTime.getStartTime();
        LocalTime endTime = schoolTime.getEndTime();
        LOGGER.info("Fetching available teachers for day {} between {} and {}, filtered by subject id {}", dayOfWeek, startTime, endTime, subjectId);

        List<Teacher> allTeachers;

        if (subjectId != null) {
            LOGGER.info("Filtering teachers by subject id {}", subjectId);
            allTeachers = teacherRepository.findTeachersBySubjectId(subjectId);
        } else {
            allTeachers = teacherRepository.findAllByArchivedFalse();
        }

        List<Teacher> availableTeachers = allTeachers.stream()
                .filter(teacher -> isTeacherAvailable(teacher, dayOfWeek, startTime, endTime))
                .toList();

        return availableTeachers.stream()
                .map(teacherMapper::toResponse)
                .toList();
    }
    public List<SchoolClassResponse> findTeachingClasses(Long teacherId) {
        LOGGER.info("Fetching teaching classes for teacher with id {}", teacherId);

        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        List<SchoolClass> teachingClasses = timetableRepository.findByTeacherId(teacher.getId()).stream()
                .map(Timetable::getSchoolClass)
                .distinct()
                .toList();

        return teachingClasses.stream()
                .map(schoolClass -> new SchoolClassResponse(
                        schoolClass.getId(),
                        schoolClass.getName(),
                        schoolClass.getGrade(),
                        schoolClass.getGroupLetter(),
                        schoolClass.getStudents().size(),
                        schoolClass.getActive()
                ))
                .toList();
    }
    private boolean isTeacherAvailable(Teacher teacher, DayOfWeek dayOfWeek, LocalTime startTime, LocalTime endTime) {
        List<Timetable> timetables = timetableRepository.findByTeacherIdAndDayOfWeek(teacher.getId(), dayOfWeek);

        for (Timetable timetable : timetables) {
            if (timetable.getSchoolTime().getStartTime().isBefore(endTime) && timetable.getSchoolTime().getEndTime().isAfter(startTime)) {
                return false;
            }
        }
        return true;
    }

    public List<TeacherResponse> searchTeachers(Long subjectId, String name) {
        LOGGER.info("Searching teachers by subject id {} and name {}", subjectId, name);

        List<Teacher> teachers;

        if (subjectId != null && name != null && !name.isEmpty()) {
            teachers = teacherRepository.findTeachersBySubjectIdAndName(subjectId, name);
        } else if (subjectId != null) {
            teachers = teacherRepository.findTeachersBySubjectId(subjectId);
        } else if (name != null && !name.isEmpty()) {
            teachers = teacherRepository.findTeachersByName(name);
        } else {
            teachers = teacherRepository.findAll();
        }

        return teachers.stream()
                .map(teacherMapper::toResponse)
                .toList();
    }

    public void uploadTeacherImage(Long teacherId, MultipartFile file) {
        fileService.uploadUserImage(teacherId,file);
    }
    public List<TeacherResponse> getAllArchived() {
        LOGGER.info("Fetching all archived teachers");
        List<Teacher> teachers = teacherRepository.findAllByArchivedTrue();
        return teachers.stream()
                .map(teacherMapper::toResponse)
                .toList();
    }

    private void checkIfTeacherArchived(Teacher teacher) {
        if (teacher.isArchived()) {
            throw new NotFoundException("Teacher with id ["+teacher.getId()+"] is archived");
        }
    }
}
