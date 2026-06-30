package com.nss.service;

import com.nss.entity.Staff;
import com.nss.error.AlreadyExistsException;
import com.nss.error.NotFoundException;
import com.nss.model.request.StaffRequest;
import com.nss.model.response.StaffResponse;
import com.nss.repository.StaffRepository;
import com.nss.utility.Profession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class StaffService {

    private static final Logger LOGGER = LogManager.getLogger(StaffService.class);

    private final StaffRepository staffRepository;
    private final FileService fileService;

    public StaffService(final StaffRepository staffRepository,
                        final FileService fileService) {
        this.staffRepository = staffRepository;
        this.fileService = fileService;
    }

    public List<StaffResponse> getAllStaff() {
        LOGGER.info("Fetching all staff members");
        return staffRepository.findAll().stream()
                .map(this::mapToResponse)
                .toList();
    }

    public StaffResponse getStaffById(Long id) {
        LOGGER.info("Fetching staff member with id {}", id);
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Staff not found with id: " + id));
        return mapToResponse(staff);

    }

    public StaffResponse createStaff(StaffRequest staffRequest) {
        LOGGER.info("Creating new staff member with name {}", staffRequest.firstName());

        if (staffRepository.existsByFirstNameAndLastNameAndBirthDate(
                staffRequest.firstName(), staffRequest.lastName(), staffRequest.birthDate())) {
            throw new AlreadyExistsException(
                    "Staff member already exists with the same first name [" +staffRequest.firstName()+
                            "], last name [" +staffRequest.lastName()+
                            "] and birth date ["+staffRequest.birthDate()+"]."
            );
        }

        Staff staff = mapToEntity(staffRequest);
        Staff createdStaff = staffRepository.save(staff);
        return mapToResponse(createdStaff);
    }

    public StaffResponse updateStaff(Long id, StaffRequest staffRequest) {
        LOGGER.info("Updating staff member with id {}", id);
        if (staffRepository.existsByFirstNameAndLastNameAndBirthDate(
                staffRequest.firstName(), staffRequest.lastName(), staffRequest.birthDate())) {
            throw new AlreadyExistsException(
                    "Staff member already exists with the same first name [" +staffRequest.firstName()+
                            "], last name [" +staffRequest.lastName()+
                            "] and birth date ["+staffRequest.birthDate()+"]."
            );
        }
        Staff staffDetails = mapToEntity(staffRequest);
        Staff staff = staffRepository.findById(id)
                .orElseThrow(
                        () -> new NotFoundException("Staff not found with id: " + id)
                );
        staff.setFirstName(staffDetails.getFirstName());
        staff.setLastName(staffDetails.getLastName());
        staff.setMiddleName(staffDetails.getMiddleName());
        staff.setBirthDate(staffDetails.getBirthDate());
        staff.setProfession(staffDetails.getProfession());
        staff.setPhoneNumber(staffDetails.getPhoneNumber());
        Staff updatedStaff = staffRepository.save(staff);
        return mapToResponse(updatedStaff);
    }

    public void deleteStaff(Long id) {
        LOGGER.info("Deleting staff member with id {}", id);
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Staff not found with id: " + id));
        staffRepository.delete(staff);
    }
    public Long uploadStaffImage(Long staffId, MultipartFile image) {
        LOGGER.info("Uploading image for staff member with id {}", staffId);
        return fileService.uploadStaffImage(staffId, image);
    }

    public List<StaffResponse> searchStaff(String name) {
        LOGGER.info("Searching staff members by name {}", name);
        List<Staff> staffList;

        if (name != null && !name.isEmpty()) {
            staffList = staffRepository.findStaffByName(name);
        } else {
            staffList = staffRepository.findAll();
        }

        return staffList.stream()
                .map(this::mapToResponse)
                .toList();
    }

    private Staff mapToEntity(StaffRequest staffRequest) {
        Staff staff = new Staff();
        staff.setFirstName(staffRequest.firstName());
        staff.setLastName(staffRequest.lastName());
        staff.setMiddleName(staffRequest.middleName());
        staff.setBirthDate(staffRequest.birthDate());
        staff.setProfession(Profession.valueOf(staffRequest.profession().toUpperCase()));
        staff.setPhoneNumber(staffRequest.phoneNumber());
        return staff;
    }

    private StaffResponse mapToResponse(Staff staff) {
        return new StaffResponse(
                staff.getId(),
                staff.getFirstName(),
                staff.getLastName(),
                staff.getMiddleName(),
                staff.getBirthDate(),
                staff.getProfession().toString(),
                staff.getPhoneNumber(),
                staff.getImageUrl()
        );
    }
}
