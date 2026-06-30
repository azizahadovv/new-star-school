package com.nss.model.mapper;

import com.nss.entity.Admin;
import com.nss.entity.User;
import com.nss.model.request.UserRequest;
import com.nss.model.response.AdminResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.mapstruct.factory.Mappers;

// nullValuePropertyMappingStrategy = IGNORE: qisman yangilashda (update) request'dagi
// null maydonlar mavjud qiymatni QAYTA YOZMAYDI — parol va boshqa maydonlar saqlanadi.
@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AdminMapper {

    AdminMapper INSTANCE = Mappers.getMapper(AdminMapper.class);


    Admin toEntity(UserRequest request);

    AdminResponse toResponse(Admin admin);
    AdminResponse toResponse(User user);

    void updateEntityFromRequest(UserRequest request, @MappingTarget Admin admin);
    void updateEntityFromRequest(UserRequest request, @MappingTarget User user);
}
