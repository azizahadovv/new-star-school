package com.nss.utility;

import com.nss.entity.*;
import com.nss.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalTime;
import java.util.List;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadInitialData(RoleRepository roleRepository,
                                             SubjectRepository subjectRepository,
                                             TermRepository termRepository,
                                             AdminRepository adminRepository,
                                             SchoolTimeRepository schoolTimeRepository,
                                             PasswordEncoder passwordEncoder) {
        return args -> {
            // Load roles
            List<UserRole> roles = List.of(UserRole.ADMIN, UserRole.DIRECTOR, UserRole.DEPUTY_DIRECTOR, UserRole.STUDENT, UserRole.TEACHER);
            roles.forEach(role -> {
                if (roleRepository.findByRole(role).isEmpty()) {
                    roleRepository.save(new Role(role));
                }
            });

            // Load subjects
            List<String> subjects = List.of(
                    "Ona tili", "Adabiyot", "Rus tili", "Ingliz tili", "Nemis tili", "Fransuz tili",
                    "Tarix", "Jahon tarixi", "Huquq", "Milliy istiqlol g‘oyasi", "Ma’naviyat asoslari",
                    "Matematika", "Algebra", "Geometriya", "Informatika", "Fizika", "Astronomiya",
                    "Kimyo", "Biologiya", "Geografiya", "Ekologiya", "Jismoniy tarbiya",
                    "Chizmachilik", "Musiqa", "Tasviriy san’at", "Texnologiya"
            );
            subjects.forEach(subjectName -> {
                if (!subjectRepository.existsByName(subjectName)) {
                    Subject subject = new Subject();
                    subject.setName(subjectName);
                    subjectRepository.save(subject);
                }
            });

            // Load terms for 2024
            for (int i = 1; i <= 4; i++) {
                String termName = "2024/2025 " + i + "-chorak";
                int finalI = i;
                if (termRepository.findAll().stream().noneMatch(term -> term.getYear().equals(2024) && term.getTerm().equals(finalI))) {
                    Term term = new Term();
                    term.setName(termName);
                    term.setYear(2024);
                    term.setTerm(i);
                    termRepository.save(term);
                }
            }

            // Create initial SchoolTimes using setters
            if (schoolTimeRepository.findAll().isEmpty()) {
                SchoolTime schoolTime1 = new SchoolTime();
                schoolTime1.setNumber(1);
                schoolTime1.setStartTime(LocalTime.of(8, 0));
                schoolTime1.setEndTime(LocalTime.of(8, 45));
                schoolTimeRepository.save(schoolTime1);

                SchoolTime schoolTime2 = new SchoolTime();
                schoolTime2.setNumber(2);
                schoolTime2.setStartTime(LocalTime.of(9, 0));
                schoolTime2.setEndTime(LocalTime.of(9, 45));
                schoolTimeRepository.save(schoolTime2);

                SchoolTime schoolTime3 = new SchoolTime();
                schoolTime3.setNumber(3);
                schoolTime3.setStartTime(LocalTime.of(10, 0));
                schoolTime3.setEndTime(LocalTime.of(10, 45));
                schoolTimeRepository.save(schoolTime3);

                SchoolTime schoolTime4 = new SchoolTime();
                schoolTime4.setNumber(4);
                schoolTime4.setStartTime(LocalTime.of(11, 0));
                schoolTime4.setEndTime(LocalTime.of(11, 45));
                schoolTimeRepository.save(schoolTime4);

                SchoolTime schoolTime5 = new SchoolTime();
                schoolTime5.setNumber(5);
                schoolTime5.setStartTime(LocalTime.of(12, 0));
                schoolTime5.setEndTime(LocalTime.of(12, 45));
                schoolTimeRepository.save(schoolTime5);

                SchoolTime schoolTime6 = new SchoolTime();
                schoolTime6.setNumber(6);
                schoolTime6.setStartTime(LocalTime.of(13, 0));
                schoolTime6.setEndTime(LocalTime.of(13, 45));
                schoolTimeRepository.save(schoolTime6);

                System.out.println("Initial SchoolTime data loaded.");
            } else {
                System.out.println("SchoolTime data already exists.");
            }

            // Create default admin user
            String defaultAdminLogin = "admin";
            if (!adminRepository.existsByLogin(defaultAdminLogin)) {
                Admin defaultAdmin = new Admin();
                defaultAdmin.setLogin(defaultAdminLogin);
                defaultAdmin.setPassword(passwordEncoder.encode("nss_admin")); // Default password
                Role adminRole = roleRepository.findByRole(UserRole.ADMIN)
                        .orElseThrow(() -> new RuntimeException("Role 'ADMIN' not found"));
                defaultAdmin.getRoles().add(adminRole);
                adminRepository.save(defaultAdmin);
                System.out.println("Default admin user created with login: " + defaultAdminLogin);
            } else {
                System.out.println("Default admin user already exists");
            }
        };
    }
}
