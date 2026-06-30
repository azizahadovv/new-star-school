package com.nss.service;

import com.nss.entity.Admin;
import com.nss.entity.Role;
import com.nss.entity.User;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotFoundException;
import com.nss.model.mapper.AdminMapper;
import com.nss.model.request.UserRequest;
import com.nss.model.response.AdminResponse;
import com.nss.repository.AdminRepository;
import com.nss.repository.RoleRepository;
import com.nss.repository.UserRepository;
import com.nss.utility.UserRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class AdminService {
    private final AdminRepository adminRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final AdminMapper adminMapper;
    private final PasswordEncoder passwordEncoder;
    private final FileService fileService;
    private static final Logger LOGGER = LoggerFactory.getLogger(AdminService.class);


    public AdminService(AdminRepository adminRepository, RoleRepository roleRepository, UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
        this.adminRepository = adminRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
        this.adminMapper = AdminMapper.INSTANCE;
    }

    public AdminResponse createAdmin(UserRequest userRequest) {
        LOGGER.info("Creating new Admin with email: {}", userRequest.login());

        if (userRepository.findByLogin(userRequest.login()).isPresent()) {
            LOGGER.error("User with login: {} already exists", userRequest.login());
            throw new AlreadyExistsException("User with login [" + userRequest.login() + "] already exists");
        }

        Admin admin = adminMapper.toEntity(userRequest);
        admin.setPassword(passwordEncoder.encode(userRequest.password()));

        Role adminRole = roleRepository.findByRole(UserRole.ADMIN)
                .orElseThrow(() -> new NotFoundException("Role 'ADMIN' not found"));
        admin.getRoles().add(adminRole);

        Admin savedAdmin = adminRepository.save(admin);

        LOGGER.info("Admin with id: {} created successfully", savedAdmin.getId());
        return adminMapper.toResponse(savedAdmin);
    }
    public AdminResponse findById(Long adminId) {
        LOGGER.info("Fetching Admin with id: {}", adminId);

        User user = userRepository.findById(adminId)
                .orElseThrow(() -> new NotFoundException("Admin with id [" + adminId + "] not found"));

        if (user.getRoles().stream().noneMatch(role -> role.getRole().equals(UserRole.ADMIN))) {
            throw new NotFoundException("User with id [" + adminId + "] is not an admin");
        }

        if (user.isArchived()) {
            throw new NotFoundException("Admin with id [" + adminId + "] is archived");
        }

        LOGGER.info("Fetched Admin with id: {}", adminId);
        return adminMapper.toResponse( user);
    }

    public List<AdminResponse> findAll() {
        LOGGER.info("Fetching all admins");

        List<User> admins = userRepository.findAllByRole(UserRole.ADMIN);

        LOGGER.info("Fetched {} admins", admins.size());
        return admins.stream()
                .map(adminMapper::toResponse)
                .toList();
    }
    public List<AdminResponse> getArchived() {
        LOGGER.info("Fetching all archived admins");

        List<User> admins = userRepository.findAllArchivedByRole(UserRole.ADMIN);

        LOGGER.info("Fetched {} archived admins.", admins.size());
        return admins.stream()
                .map(adminMapper::toResponse)
                .toList();
    }


    public AdminResponse updateAdmin(Long userId, UserRequest userRequest) {
        LOGGER.info("Updating user with id: {} who has the ADMIN role", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User with id [" + userId + "] not found"));

        if (user.getRoles().stream().noneMatch(role -> role.getRole().equals(UserRole.ADMIN))) {
            throw new NotFoundException("User with id [" + userId + "] does not have the ADMIN role.");
        }

        if (user.isArchived()) {
            throw new NotFoundException("User with id [" + userId + "] is archived and cannot be updated.");
        }

        adminMapper.updateEntityFromRequest(userRequest, user);

        if (userRequest.password() != null && !userRequest.password().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userRequest.password()));
        }

        User updatedUser = userRepository.save(user);

        LOGGER.info("User with id: {} updated successfully", updatedUser.getId());
        return adminMapper.toResponse(updatedUser);
    }



    public void deleteAdmin(Long userId) {
        LOGGER.info("Archiving user with id: {} who has the ADMIN role", userId);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User with id [" + userId + "] not found"));

        if (user.getRoles().stream().noneMatch(role -> role.getRole().equals(UserRole.ADMIN))) {
            throw new NotFoundException("User with id [" + userId + "] does not have the ADMIN role.");
        }

        if (!user.isArchived()) {
            user.setArchived(true);
            userRepository.save(user);
            LOGGER.info("User with id: {} archived successfully", userId);
        } else {
            LOGGER.warn("User with id: {} is already archived", userId);
        }
    }


    public void uploadAdminImage(Long adminId, MultipartFile file) {
        fileService.uploadUserImage(adminId,file);
    }



}
