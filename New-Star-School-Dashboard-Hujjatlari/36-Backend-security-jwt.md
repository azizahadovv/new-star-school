# 36 — Backend: Security va JWT

Spring Security + JWT asosida autentifikatsiya va avtorizatsiya. Bu bo'lim dizayndagi **eng jiddiy xavfsizlik muammosini** (parol ochiq matnda) ham hal qiladi.

---

## 1. 🔴 Kritik: Parol xavfsizligi

Dizaynda profil sahifalarida parol **ochiq matnda** ko'rsatilgan (`1431201`, `saidakbar1401`). Bu jiddiy xavf. To'g'ri yondashuv:

| ❌ Noto'g'ri (dizaynda) | ✅ To'g'ri (implementatsiyada) |
|------------------------|-------------------------------|
| Parol bazada ochiq saqlanadi | Parol **bcrypt hash** holatida saqlanadi |
| Parol profilda ko'rsatiladi | Parol **hech qachon** qaytarilmaydi/ko'rsatilmaydi |
| — | Faqat "Parolni o'zgartirish" funksiyasi |

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(12);   // 12 — kuch darajasi
}
```

- Yaratishda: `passwordEncoder.encode(rawPassword)` → bazaga hash yoziladi.
- Tekshirishda: `passwordEncoder.matches(raw, hash)`.
- DTO'larda `passwordHash` **hech qachon** bo'lmaydi.

---

## 2. JWT xizmati — `JwtService`

```java
@Service
public class JwtService {

    @Value("${app.jwt.secret}")        private String secret;
    @Value("${app.jwt.expiration-ms}") private long expirationMs;

    private SecretKey key() {
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public String generate(User user) {
        Instant now = Instant.now();
        return Jwts.builder()
            .subject(user.getLogin())
            .claim("role", user.getRole().name())
            .claim("uid", user.getId())
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusMillis(expirationMs)))
            .signWith(key())
            .compact();
    }

    public String extractLogin(String token) {
        return parse(token).getPayload().getSubject();
    }

    public boolean isValid(String token) {
        try { parse(token); return true; }
        catch (JwtException | IllegalArgumentException e) { return false; }
    }

    private Jws<Claims> parse(String token) {
        return Jwts.parser().verifyWith(key()).build().parseSignedClaims(token);
    }
}
```

---

## 3. JWT filtri — `JwtAuthFilter`

Har so'rovda tokenni tekshiradi va kontekstga foydalanuvchini joylaydi:

```java
@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest req, HttpServletResponse res,
                                    FilterChain chain) throws ServletException, IOException {
        String header = req.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            if (jwtService.isValid(token)) {
                String login = jwtService.extractLogin(token);
                UserDetails ud = userDetailsService.loadUserByUsername(login);
                var auth = new UsernamePasswordAuthenticationToken(ud, null, ud.getAuthorities());
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }
        }
        chain.doFilter(req, res);
    }
}
```

---

## 4. UserDetailsService

```java
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String login) {
        User user = userRepository.findByLogin(login)
            .orElseThrow(() -> new UsernameNotFoundException("Foydalanuvchi topilmadi"));
        return org.springframework.security.core.userdetails.User.builder()
            .username(user.getLogin())
            .password(user.getPasswordHash())
            .authorities(new SimpleGrantedAuthority(user.getRole().name()))
            .disabled(!user.isActive())
            .build();
    }
}
```

---

## 5. Security konfiguratsiyasi — `SecurityConfig`

```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity            // @PreAuthorize uchun
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/login", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration cfg) throws Exception {
        return cfg.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}
```

---

## 6. Auth controller va service

```java
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest req) {
        return authService.login(req);
    }

    @GetMapping("/me")
    public UserDto me(@AuthenticationPrincipal UserDetails principal) {
        return authService.me(principal.getUsername());
    }
}
```

```java
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.login(), req.password()));

        User user = userRepository.findByLogin(req.login()).orElseThrow();
        String token = jwtService.generate(user);

        return new AuthResponse(token, new UserDto(
            user.getId(), user.getFullName(), user.getRole().name(), user.getPhotoUrl()));
    }
}
```

```java
// DTO'lar
public record LoginRequest(@NotBlank String login, @NotBlank String password) {}

public record AuthResponse(String token, UserDto user) {}

public record UserDto(Long id, String fullName, String role, String photoUrl) {}
```

> Diqqat: `AuthResponse` da **parol yo'q** — faqat token + minimal foydalanuvchi ma'lumoti.

---

## 7. Rolga asoslangan ruxsat (RBAC) — qisqa qoidalar

| Endpoint guruhi | Ruxsat (annotatsiya) |
|-----------------|----------------------|
| Fanlar (yozish) | `@PreAuthorize("hasRole('ADMIN')")` |
| Sinflar/o'quvchilar (yozish) | `hasAnyRole('ADMIN','ZAVUCH')` |
| O'qituvchilar/o'quvchilar (ko'rish) | `hasAnyRole('ADMIN','DIRECTOR','ZAVUCH')` |
| Xodimlar | `hasRole('DIRECTOR')` |
| O'z baholari/davomati | service'da `uid` bilan tekshiriladi |

> Spring `ROLE_` prefiksini avtomatik qo'shadi: `hasRole('ADMIN')` ↔ `ROLE_ADMIN`.

---

## 8. Qo'shimcha xavfsizlik tavsiyalari

1. **HTTPS majburiy** (production) — token shifrlanmagan kanalda yuborilmasin.
2. **JWT muddati qisqa** (24 soat) + **refresh token** (kelajak).
3. **Rate limiting** — login endpointiga (brute-force himoyasi).
4. **Audit log** — muhim amallar (yaratish/o'chirish) yoziladi.
5. **Maxfiy kalitlar** — `.env`/secret manager'da (kodda emas).
6. **Parol siyosati** — minimal uzunlik, murakkablik.
7. **Login generatsiyasi** — yangi foydalanuvchiga avto-parol → birinchi kirishda o'zgartirish.

---

⬅️ [35 — REST API](35-Backend-rest-api.md) · ➡️ [37 — PostgreSQL model](37-PostgreSQL-model.md)
