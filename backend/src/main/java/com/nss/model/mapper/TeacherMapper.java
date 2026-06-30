package com.nss.model.mapper;

import com.nss.entity.Role;
import com.nss.entity.Teacher;
import com.nss.model.request.UserRequest;
import com.nss.model.response.TeacherResponse;
import com.nss.utility.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

import java.util.Set;
import java.util.stream.Collectors;

// IGNORE: qisman yangilashda request'dagi null maydonlar mavjud qiymatni qayta yozmaydi (parol saqlanadi).
@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface TeacherMapper {
    TeacherMapper INSTANCE = Mappers.getMapper(TeacherMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    Teacher toEntity(UserRequest request);

    @Mapping(target = "subject", source = "subjects")
    @Mapping(target = "roles", source = "roles")
    TeacherResponse toResponse(Teacher teacher);

    default Set<UserRole> mapRoles(Set<Role> roles) {
        return roles.stream().map(Role::getRole).collect(Collectors.toSet());
    }
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "roles", ignore = true)
    void updateEntityFromRequest(UserRequest request, @MappingTarget Teacher teacher);
}
