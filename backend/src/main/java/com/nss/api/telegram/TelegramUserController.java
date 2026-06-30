package com.nss.api.telegram;

import com.nss.model.telegram.TelegramUserRequest;
import com.nss.model.telegram.TelegramUserResponse;
import com.nss.service.telegram.TelegramUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/telegram-users")
public class TelegramUserController {

    private final TelegramUserService telegramUserService;

    @Autowired
    public TelegramUserController(TelegramUserService telegramUserService) {
        this.telegramUserService = telegramUserService;
    }

    @PostMapping
    public ResponseEntity<TelegramUserResponse> createOrUpdateUser(@RequestBody TelegramUserRequest userRequest) {
        TelegramUserResponse userResponse = telegramUserService.saveUser(userRequest);
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TelegramUserResponse> getUserById(@PathVariable Long id) {
        Optional<TelegramUserResponse> userResponse = telegramUserService.findUserById(id);
        return userResponse.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TelegramUserResponse> updateUser(
            @PathVariable Long id, @RequestBody TelegramUserRequest userRequest) {
        TelegramUserResponse updatedUser = telegramUserService.updateUser(id, userRequest);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        telegramUserService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }
}
