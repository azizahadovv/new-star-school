package com.nss.model.mapper;

import com.nss.entity.SchoolClass;
import com.nss.entity.Student;
import com.nss.model.request.SchoolClassRequest;
import com.nss.model.response.ClassStudentResponse;
import com.nss.model.response.SchoolClassResponse;
import com.nss.model.response.StudentResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface SchoolClassMapper {

    SchoolClassMapper INSTANCE = Mappers.getMapper(SchoolClassMapper.class);

    StudentMapper STUDENT_MAPPER = Mappers.getMapper(StudentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "students", ignore = true)
    SchoolClass toEntity(SchoolClassRequest request);

    // Filter archived students and count only the active ones
    @Mapping(target = "size", expression = "java((int) schoolClass.getStudents().stream().filter(student -> !student.isArchived()).count())")
    SchoolClassResponse toResponse(SchoolClass schoolClass);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "students", ignore = true)
    void updateEntityFromRequest(SchoolClassRequest request, @MappingTarget SchoolClass schoolClass);

    // Filter archived students when converting to ClassStudentResponse
    @Mapping(target = "size", expression = "java((int) schoolClass.getStudents().stream().filter(student -> !student.isArchived()).count())")
    @Mapping(target = "students", expression = "java(toResponseList(schoolClass.getStudents()))")
    ClassStudentResponse toClassStudentResponse(SchoolClass schoolClass);

    // Filter archived students and convert to response list
    default List<StudentResponse> toResponseList(Set<Student> students) {
        return students.stream()
                .filter(student -> !student.isArchived()) // Only include non-archived students
                .sorted(Comparator.comparing(Student::getLastName)
                        .thenComparing(Student::getFirstName)) // Sort by last name, then first name
                .map(STUDENT_MAPPER::toResponse)
                .collect(Collectors.toList());
    }
}
