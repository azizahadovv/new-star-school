package com.nss.repository;

import com.nss.entity.Admin;
import com.nss.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByLogin(String login);

    @Query("SELECT s FROM Admin s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Admin> searchByName(String name);

    Optional<Admin> findByIdAndArchivedFalse(Long id);

    List<Admin> findAllByArchivedFalse();

    List<Admin> findAllByArchivedTrue();
}
