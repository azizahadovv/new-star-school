package com.nss.service;

import com.nss.entity.*;
import com.nss.error.NotAllowedException;
import com.nss.error.NotFoundException;
import com.nss.model.request.TimetableRequest;
import com.nss.model.response.ClassTimetableResponse;
import com.nss.model.response.TimetableDayResponse;
import com.nss.model.response.TimetableResponse;
import com.nss.model.response.TimetableScheduleResponse;
import com.nss.repository.*;
import com.nss.utility.Utility;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TimetableService {

    private static final Logger LOGGER = LogManager.getLogger(TimetableService.class);

    private final TimetableRepository timetableRepository;
    private final TermRepository termRepository;
    private final SchoolClassRepository schoolClassRepository;
    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final StudentRepository studentRepository;
    private final Utility utility;
    private final SchoolTimeRepository schoolTimeRepository;

    public TimetableService(TimetableRepository timetableRepository, TermRepository termRepository,
                            SchoolClassRepository schoolClassRepository, TeacherRepository teacherRepository, SubjectRepository subjectRepository, StudentRepository studentRepository, Utility utility, SchoolTimeRepository schoolTimeRepository) {
        this.timetableRepository = timetableRepository;
        this.termRepository = termRepository;
        this.schoolClassRepository = schoolClassRepository;
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.studentRepository = studentRepository;
        this.utility = utility;
        this.schoolTimeRepository = schoolTimeRepository;
    }

    public TimetableResponse createTimetable(TimetableRequest timetableRequest) {
        LOGGER.info("Creating a new timetable");

        Term term = termRepository.findById(timetableRequest.termId())
                .orElseThrow(() -> new NotFoundException("Term not found with id " + timetableRequest.termId()));
        SchoolClass schoolClass = schoolClassRepository.findById(timetableRequest.classId())
                .orElseThrow(() -> new NotFoundException("Class not found with id " + timetableRequest.classId()));
        Teacher teacher = teacherRepository.findById(timetableRequest.teacherId())
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + timetableRequest.teacherId()));
        Subject subject = subjectRepository.findById(timetableRequest.subjectId())
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + timetableRequest.subjectId()));

        SchoolTime schoolTime = schoolTimeRepository.findById(timetableRequest.schoolTimeId())
                .orElseThrow(() -> new NotFoundException("SchoolTime not found with id " + timetableRequest.schoolTimeId()));
        if (teacher.getSubjects()
                .stream()
                .noneMatch(s -> s.getId().equals(subject.getId()))) {
            throw new NotAllowedException(
                    "Teacher with id " + teacher.getId() + " is not assigned to subject with id " + subject.getId());
        }


        if (!isTeacherAvailable(teacher, timetableRequest.dayOfWeek(), schoolTime.getStartTime(), schoolTime.getEndTime())) {
            throw new IllegalArgumentException("Teacher with id " + teacher.getId() + " is not available at the specified time.");
        }
        if (timetableExists(term, schoolClass, timetableRequest.dayOfWeek(), schoolTime)) {
            throw new IllegalArgumentException("A timetable already exists for the specified parameters.");
        }

        Timetable timetable = new Timetable();
        timetable.setTerm(term);
        timetable.setSchoolClass(schoolClass);
        timetable.setTeacher(teacher);
        timetable.setSubject(subject);
        timetable.setDayOfWeek(timetableRequest.dayOfWeek());
        timetable.setSchoolTime(schoolTime);

        Timetable savedTimetable = timetableRepository.save(timetable);
        LOGGER.info("Timetable created with id {}", savedTimetable.getId());
        return toResponse(savedTimetable);
    }

    public TimetableResponse updateTimetable(Long id, TimetableRequest timetableRequest) {
        LOGGER.info("Updating timetable with id {}", id);
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Timetable not found with id " + id));

        Term term = termRepository.findById(timetableRequest.termId())
                .orElseThrow(() -> new NotFoundException("Term not found with id " + timetableRequest.termId()));
        SchoolClass schoolClass = schoolClassRepository.findById(timetableRequest.classId())
                .orElseThrow(() -> new NotFoundException("Class not found with id " + timetableRequest.classId()));
        Teacher teacher = teacherRepository.findById(timetableRequest.teacherId())
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + timetableRequest.teacherId()));
        Subject subject = subjectRepository.findById(timetableRequest.subjectId())
                .orElseThrow(() -> new NotFoundException("Subject not found with id " + timetableRequest.subjectId()));

        SchoolTime schoolTime = schoolTimeRepository.findById(timetableRequest.schoolTimeId())
                .orElseThrow(() -> new NotFoundException("SchoolTime not found with id " + timetableRequest.schoolTimeId()));

        if (teacher.getSubjects()
                .stream()
                .noneMatch(s -> s.getId().equals(subject.getId()))) {
            throw new NotAllowedException(
                    "Teacher with id " + teacher.getId() + " is not assigned to subject with id " + subject.getId());
        }
        if (!isTeacherAvailable(teacher, timetableRequest.dayOfWeek(), schoolTime.getStartTime(), schoolTime.getEndTime())) {
            throw new IllegalArgumentException("Teacher with id " + teacher.getId() + " is not available at the specified time.");
        }

        if (timetableExists(term, schoolClass, timetableRequest.dayOfWeek(), schoolTime)) {
            throw new IllegalArgumentException("A timetable already exists for the specified parameters.");
        }
        timetable.setTerm(term);
        timetable.setSchoolClass(schoolClass);
        timetable.setTeacher(teacher);
        timetable.setSubject(subject);
        timetable.setDayOfWeek(timetableRequest.dayOfWeek());
        timetable.setSchoolTime(schoolTime);

        Timetable updatedTimetable = timetableRepository.save(timetable);
        LOGGER.info("Timetable updated with id {}", updatedTimetable.getId());
        return toResponse(updatedTimetable);
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


    public TimetableResponse getTimetable(Long id) {
        LOGGER.info("Fetching timetable with id {}", id);
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Timetable not found with id " + id));
        return toResponse(timetable);
    }

    public List<TimetableResponse> getAllTimetables() {
        LOGGER.info("Fetching all timetables");
        return timetableRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }
    public List<TimetableDayResponse> getTimetablesByClassId(Long classId) {
        LOGGER.info("Fetching timetables for class with id {}", classId);
        List<Timetable> timetables = timetableRepository.findBySchoolClassId(classId);

        Map<DayOfWeek, List<TimetableScheduleResponse>> mergedTimetables = utility.convertToScheduleResponses( timetables);

        return mergedTimetables.entrySet().stream()
                .map(entry -> new TimetableDayResponse(entry.getKey().toString(), entry.getValue()))
                .collect(Collectors.toList());
    }

    public List<TimetableDayResponse> getStudentTimetable(Long studentId) {
        LOGGER.info("Fetching timetable for student with id {}", studentId);
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new NotFoundException("Student not found with id " + studentId));

        List<Timetable> timetables = timetableRepository.findBySchoolClassId(student.getSchoolClass().getId());

        Map<DayOfWeek, List<TimetableScheduleResponse>> mergedTimetables = utility.convertToScheduleResponses(timetables);

        return mergedTimetables.entrySet().stream()
                .map(entry -> new TimetableDayResponse(entry.getKey().toString(), entry.getValue()))
                .toList();
    }
    public List<TimetableDayResponse> getTeacherTimetable(Long teacherId) {
        LOGGER.info("Fetching timetable for teacher with id {}", teacherId);
        Teacher teacher = teacherRepository.findById(teacherId)
                .orElseThrow(() -> new NotFoundException("Teacher not found with id " + teacherId));

        List<Timetable> timetables = timetableRepository.findByTeacherId(teacher.getId());

        Map<DayOfWeek, List<TimetableScheduleResponse>> mergedTimetables = utility.convertToScheduleResponses(timetables);

        return mergedTimetables.entrySet().stream()
                .map(entry -> new TimetableDayResponse(entry.getKey().toString(), entry.getValue()))
                .collect(Collectors.toList());
    }
    public List<TimetableDayResponse> getFilteredTimetables(Long termId, Long classId, Long teacherId, Long subjectId, Long studentId) {
        LOGGER.info("Fetching filtered timetables based on provided parameters.");

        List<Timetable> timetables = timetableRepository.findFilteredTimetables(termId, classId, teacherId, subjectId, studentId);

        Map<DayOfWeek, List<TimetableScheduleResponse>> mergedTimetables = utility.convertToScheduleResponses(timetables);

        return mergedTimetables.entrySet().stream()
                .map(entry -> new TimetableDayResponse(entry.getKey().toString(), entry.getValue()))
                .collect(Collectors.toList());
    }
    public List<ClassTimetableResponse> getAllClassesTimetables() {
        LOGGER.info("Fetching timetables for all classes");

        List<SchoolClass> allClasses = schoolClassRepository.findAll();


        return allClasses.stream()
                .map(schoolClass -> {
                    List<Timetable> timetables = timetableRepository.findBySchoolClassId(schoolClass.getId());
                    Map<DayOfWeek, List<TimetableScheduleResponse>> mergedTimetables = utility.convertToScheduleResponses(timetables);

                    List<TimetableDayResponse> dayTimetableResponses = List.of(
                            new TimetableDayResponse(DayOfWeek.MONDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.MONDAY, List.of())),
                            new TimetableDayResponse(DayOfWeek.TUESDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.TUESDAY, List.of())),
                            new TimetableDayResponse(DayOfWeek.WEDNESDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.WEDNESDAY, List.of())),
                            new TimetableDayResponse(DayOfWeek.THURSDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.THURSDAY, List.of())),
                            new TimetableDayResponse(DayOfWeek.FRIDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.FRIDAY, List.of())),
                            new TimetableDayResponse(DayOfWeek.SATURDAY.toString(), mergedTimetables.getOrDefault(DayOfWeek.SATURDAY, List.of()))
                    );

                    return new ClassTimetableResponse(schoolClass.getId(), schoolClass.getName(), dayTimetableResponses);
                })
                .toList();
    }



    public void deleteTimetable(Long id) {
        LOGGER.info("Deleting timetable with id {}", id);
        Timetable timetable = timetableRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Timetable not found with id " + id));
        timetableRepository.delete(timetable);
        LOGGER.info("Timetable deleted with id {}", id);
    }

    public TimetableResponse toResponse(Timetable timetable) {
        String subjectName = timetable.getSubject().getName();
        String teacherName = timetable.getTeacher().getFirstName() + " " + timetable.getTeacher().getLastName();
        return new TimetableResponse(
                timetable.getId(),
                timetable.getTerm().getId(),
                timetable.getSchoolClass().getId(),
                timetable.getTeacher().getId(),
                teacherName,
                subjectName,
                timetable.getDayOfWeek(),
                timetable.getSchoolTime().getStartTime(),
                timetable.getSchoolTime().getEndTime(),
                timetable.getSchoolTime().getNumber()
        );
    }
    private boolean timetableExists(Term term, SchoolClass schoolClass, DayOfWeek dayOfWeek, SchoolTime schoolTime) {
        return  timetableRepository.findByTermAndSchoolClassAndDayOfWeekAndSchoolTime(
                term, schoolClass, dayOfWeek, schoolTime).isPresent();
    }

}
