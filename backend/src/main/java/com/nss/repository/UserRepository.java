package com.nss.repository;

import com.nss.entity.User;
import com.nss.utility.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByLogin(String username);
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.role = :role")
    List<User> findAllByRole(UserRole role);

    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.role = :role AND u.archived = true")
    List<User> findAllArchivedByRole(UserRole role);

}
