package com.nss.repository;

import com.nss.entity.Role;
import com.nss.utility.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRole(UserRole role);

}
