package com.nss.model.mapper;

import com.nss.entity.Subject;
import com.nss.model.request.SubjectRequest;
import com.nss.model.response.SubjectResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SubjectMapper {
    SubjectMapper INSTANCE = Mappers.getMapper(SubjectMapper.class);

    @Mapping(target = "id", ignore = true)
    Subject toEntity(SubjectRequest request);

    SubjectResponse toResponse(Subject subject);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(SubjectRequest request, @MappingTarget Subject subject);
}
