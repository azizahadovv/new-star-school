# 35 — Backend: REST API

REST endpointlar, DTO'lar, controller/service namunalari va to'liq endpoint jadvali.

---

## 1. API umumiy qoidalari

- **Bazaviy yo'l:** `/api`
- **Format:** JSON
- **Autentifikatsiya:** `Authorization: Bearer <JWT>` (login'dan tashqari)
- **Sahifalash:** `?page=0&size=10&search=...&...`
- **Status kodlar:** 200 (ok), 201 (yaratildi), 204 (o'chirildi), 400 (validatsiya), 401 (auth yo'q), 403 (ruxsat yo'q), 404 (topilmadi)

---

## 2. DTO namunalari (Student)

```java
// Javob DTO — parol YO'Q
public record StudentDto(
    Long id,
    String firstName, String lastName, String middleName, String fullName,
    LocalDate birthDate, String gender, String nationality,
    String country, String region, String district, String address,
    String phone, String parentPhone,
    Integer grade, String group, String login, String photoUrl
) {}

// Yaratish DTO
public record CreateStudentDto(
    @NotBlank String firstName,
    @NotBlank String lastName,
    String middleName,
    @NotNull LocalDate birthDate,
    @NotNull Gender gender,
    String nationality, String country, String region, String district, String address,
    @Pattern(regexp = "\\+998\\d{9}") String phone,
    @Pattern(regexp = "\\+998\\d{9}") String parentPhone,
    @NotNull Long classId,
    @NotBlank String login,
    @NotBlank @Size(min = 6) String password   // service'da hash qilinadi
) {}
```

---

## 3. Mapper (MapStruct)

```java
@Mapper(componentModel = "spring")
public interface StudentMapper {

    @Mapping(target = "fullName", expression = "java(s.getFullName())")
    @Mapping(target = "grade",    source = "schoolClass.grade")
    @Mapping(target = "group",    source = "schoolClass.groupName")
    @Mapping(target = "login",    source = "user.login")
    @Mapping(target = "photoUrl", source = "user.photoUrl")
    StudentDto toDto(Student s);
}
```

---

## 4. Repository (qidiruv + filtr)

```java
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("""
        SELECT s FROM Student s
        WHERE (:search IS NULL OR
               LOWER(CONCAT(s.lastName,' ',s.firstName)) LIKE LOWER(CONCAT('%',:search,'%')))
          AND (:grade IS NULL OR s.schoolClass.grade = :grade)
        """)
    Page<Student> search(@Param("search") String search,
                         @Param("grade") Integer grade,
                         Pageable pageable);
}
```

---

## 5. Service (biznes-logika)

```java
@Service
@RequiredArgsConstructor
@Transactional
public class StudentService {

    private final StudentRepository repo;
    private final StudentMapper mapper;
    private final PasswordEncoder passwordEncoder;
    private final SchoolClassRepository classRepo;

    @Transactional(readOnly = true)
    public PageResponse<StudentDto> list(String search, Integer grade, Pageable pageable) {
        Page<StudentDto> page = repo.search(blankToNull(search), grade, pageable).map(mapper::toDto);
        return PageResponse.of(page);
    }

    @Transactional(readOnly = true)
    public StudentDto get(Long id) {
        return repo.findById(id).map(mapper::toDto)
            .orElseThrow(() -> new EntityNotFoundException("O'quvchi topilmadi: " + id));
    }

    public StudentDto create(CreateStudentDto dto) {
        SchoolClass sc = classRepo.findById(dto.classId())
            .orElseThrow(() -> new EntityNotFoundException("Sinf topilmadi"));

        User user = new User();
        user.setLogin(dto.login());
        user.setPasswordHash(passwordEncoder.encode(dto.password())); // HASH
        user.setRole(Role.ROLE_STUDENT);
        user.setFirstName(dto.firstName());
        user.setLastName(dto.lastName());

        Student s = new Student();
        s.setUser(user);
        s.setFirstName(dto.firstName());
        s.setLastName(dto.lastName());
        s.setMiddleName(dto.middleName());
        s.setBirthDate(dto.birthDate());
        s.setGender(dto.gender());
        s.setNationality(dto.nationality());
        s.setCountry(dto.country());
        s.setRegion(dto.region());
        s.setDistrict(dto.district());
        s.setAddress(dto.address());
        s.setPhone(dto.phone());
        s.setParentPhone(dto.parentPhone());
        s.setSchoolClass(sc);

        return mapper.toDto(repo.save(s));
    }

    public void delete(Long id) {
        if (!repo.existsById(id)) throw new EntityNotFoundException("O'quvchi topilmadi");
        repo.deleteById(id);
    }

    private String blankToNull(String s) { return (s == null || s.isBlank()) ? null : s; }
}
```

---

## 6. Controller

```java
@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService service;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR','ZAVUCH')")
    public PageResponse<StudentDto> list(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Integer grade,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return service.list(search, grade, PageRequest.of(page, size, Sort.by("lastName")));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','DIRECTOR','ZAVUCH')")
    public StudentDto get(@PathVariable Long id) {
        return service.get(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','ZAVUCH')")
    @ResponseStatus(HttpStatus.CREATED)
    public StudentDto create(@Valid @RequestBody CreateStudentDto dto) {
        return service.create(dto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ZAVUCH')")
    public StudentDto update(@PathVariable Long id, @Valid @RequestBody UpdateStudentDto dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','ZAVUCH')")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
```

---

## 7. To'liq endpoint jadvali

### Auth
| Metod | Yo'l | Ruxsat | Tavsif |
|-------|------|--------|--------|
| POST | `/api/auth/login` | hammaga | Kirish → JWT |
| GET | `/api/auth/me` | kirgan | Joriy foydalanuvchi |

### O'quvchilar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/students?search=&grade=&page=&size=` | Admin, Direktor, Zavuch |
| GET | `/api/students/{id}` | Admin, Direktor, Zavuch |
| POST | `/api/students` | Admin, Zavuch |
| PUT | `/api/students/{id}` | Admin, Zavuch |
| DELETE | `/api/students/{id}` | Admin, Zavuch |

### O'qituvchilar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/teachers?search=&subjectId=&page=&size=` | Admin, Direktor, Zavuch |
| GET | `/api/teachers/{id}` | Admin, Direktor, Zavuch |
| POST/PUT/DELETE | `/api/teachers/**` | Admin, Zavuch |

### Xodimlar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET/POST/PUT/DELETE | `/api/staff/**` | Direktor |

### Sinflar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/classes` | Admin, Zavuch, O'qituvchi |
| GET | `/api/classes/{id}` | Admin, Zavuch, O'qituvchi |
| POST/PUT/DELETE | `/api/classes/**` | Admin, Zavuch |
| POST | `/api/classes/{id}/subjects` (fan+o'qituvchi biriktirish) | Admin, Zavuch |

### Fanlar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET/POST/PUT/DELETE | `/api/subjects/**` | Admin |

### Dars jadvali
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/lessons?classId=&quarter=&week=` | Admin, Zavuch, O'quvchi(o'ziniki) |
| POST/PUT/DELETE | `/api/lessons/**` | Admin, Zavuch |

### Baholar
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/grades?studentId=&subjectId=&quarter=` | O'quvchi(o'ziniki), Admin |
| POST | `/api/grades` | O'qituvchi (kelajak) |

### Davomat
| Metod | Yo'l | Ruxsat |
|-------|------|--------|
| GET | `/api/attendance?studentId=&subjectId=&teacherId=&quarter=` | O'quvchi(o'ziniki) |
| POST | `/api/attendance` | O'qituvchi (kelajak) |

---

## 8. Misol so'rov/javob

**So'rov:**
```http
GET /api/students?search=kamol&grade=9&page=0&size=10
Authorization: Bearer eyJhbGci...
```

**Javob (200):**
```json
{
  "content": [
    {
      "id": 12, "fullName": "Kamolov Xasan Akmal o'g'li",
      "grade": 9, "group": "B",
      "phone": "+998907744141", "parentPhone": "+998907744141",
      "login": "kamolov9b", "photoUrl": "/uploads/12.jpg"
    }
  ],
  "page": 0, "size": 10, "totalElements": 1, "totalPages": 1
}
```

---

⬅️ [34 — Entity modellar](34-Backend-entity-modellar.md) · ➡️ [36 — Security & JWT](36-Backend-security-jwt.md)
