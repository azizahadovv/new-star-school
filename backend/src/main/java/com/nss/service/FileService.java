package com.nss.service;

import com.nss.entity.Staff;
import com.nss.entity.User;
import com.nss.entity.file.FileEntity;
import com.nss.error.NotAllowedException;
import com.nss.error.NotFoundException;
import com.nss.repository.FileRepository;
import com.nss.repository.StaffRepository;
import com.nss.repository.UserRepository;
import com.nss.utility.Utility;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class FileService {

    private final FileRepository fileRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(FileService.class);
    private final StaffRepository staffRepository;

    public FileService(FileRepository fileRepository, UserRepository userRepository, StaffRepository staffRepository) {
        this.fileRepository = fileRepository;
        this.userRepository = userRepository;
        this.staffRepository = staffRepository;
    }

    public Long storeFile(MultipartFile file) {
        logger.info("Storing file: {}", file.getOriginalFilename());

        if (file.getSize() > 2 * 1024 * 1024) { // Check if file size is greater than 2 MB
            logger.error("File size exceeds 2 MB: {}", file.getOriginalFilename());
            throw new NotAllowedException("File size exceeds 2 MB");
        }

        FileEntity fileEntity = new FileEntity();
        fileEntity.setFileName(file.getOriginalFilename());
        fileEntity.setFileType(file.getContentType());
        try {
            fileEntity.setData(file.getBytes());
            logger.info("File data set for: {}", file.getOriginalFilename());
        } catch (IOException e) {
            logger.error("Error reading file bytes for {}: {}", file.getOriginalFilename(), e.getMessage());
            throw new RuntimeException("Failed to store file: " + file.getOriginalFilename(), e);
        }

        FileEntity savedFile = fileRepository.save(fileEntity);
        logger.info("File stored successfully with id: {}", savedFile.getId());
        return savedFile.getId();
    }

    public Optional<FileEntity> getFile(Long fileId) {
        logger.info("Fetching file with id: {}", fileId);
        Optional<FileEntity> fileEntity = fileRepository.findById(fileId);
        if (fileEntity.isPresent()) {
            logger.info("File found with id: {}", fileId);
        } else {
            logger.warn("File not found with id: {}", fileId);
        }
        return fileEntity;
    }

    public void uploadUserImage(Long userId, MultipartFile file) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NotFoundException("User not found with id " + userId));

        if (user.getImageUrl() != null && !user.getImageUrl().isEmpty()) {
            Long fileId = extractFileId(user.getImageUrl());
            if (fileId != null) {
                fileRepository.deleteById(fileId);
            }
        }
        Long fileId = storeFile(file);
        String fileUrl = Utility.IMAGE_URL + fileId;

        user.setImageUrl(fileUrl);
        userRepository.save(user);

        logger.info("Image uploaded successfully for user with id: {}", userId);
    }
    public Long uploadStaffImage(Long staffId, MultipartFile file) {
        logger.info("Uploading image for staff with id {}", staffId);
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new NotFoundException("Staff not found with id " + staffId));

        if (staff.getImageUrl() != null && !staff.getImageUrl().isEmpty()) {
            Long fileId = extractFileId(staff.getImageUrl());
            if (fileId != null) {
                fileRepository.deleteById(fileId);
            }
        }

        Long fileId = storeFile(file);
        String fileUrl = Utility.IMAGE_URL + fileId;


        staff.setImageUrl(fileUrl);
        staffRepository.save(staff);

        logger.info("Image uploaded successfully for staff with id: {}", staffId);
        return fileId;
    }
    private Long extractFileId(String url) {
        String regex = "https://nss\\.ix\\.tc/api/v1/files/([^/]+)";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(url);

        if (matcher.find()) {
            String fileIdStr = matcher.group(1);
            try {
                return Long.parseLong(fileIdStr);
            } catch (NumberFormatException e) {
                logger.warn("The extracted fileId is not a valid long: {}", fileIdStr);
                return null;
            }
        } else {
            logger.warn("No fileId found in the URL.");
            return null;
        }
    }


}
