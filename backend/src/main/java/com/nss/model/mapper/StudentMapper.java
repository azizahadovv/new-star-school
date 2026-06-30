package com.nss.model.mapper;

import com.nss.model.request.UserRequest;
import com.nss.model.response.StudentResponse;
import com.nss.entity.Student;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

// IGNORE: qisman yangilashda request'dagi null maydonlar mavjud qiymatni qayta yozmaydi (parol saqlanadi).
@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface StudentMapper {

    StudentMapper INSTANCE = Mappers.getMapper(StudentMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "schoolClass", ignore = true)
    Student toEntity(UserRequest request);

    @Mapping(target = "grade", source = "schoolClass.name")
    StudentResponse toResponse(Student student);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "schoolClass", ignore = true)
    void updateEntityFromRequest(UserRequest request, @MappingTarget Student student);
}
