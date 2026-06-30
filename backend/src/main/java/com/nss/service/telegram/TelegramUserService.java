package com.nss.service.telegram;

import com.nss.entity.TelegramUser;
import com.nss.model.telegram.TelegramUserRequest;
import com.nss.model.telegram.TelegramUserResponse;
import com.nss.repository.TelegramUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TelegramUserService {

    private final TelegramUserRepository telegramUserRepository;

    @Autowired
    public TelegramUserService(TelegramUserRepository telegramUserRepository) {
        this.telegramUserRepository = telegramUserRepository;
    }

    public TelegramUserResponse saveUser(TelegramUserRequest userRequest) {
        return telegramUserRepository.findById(userRequest.telegramId())
                .map(existingUser -> updateUserFields(existingUser, userRequest)) // If user exists, update
                .map(telegramUserRepository::save) // Save the updated user
                .map(this::toResponse) // Convert to response
                .orElseGet(() -> { // If user doesn't exist, create a new one
                    TelegramUser newUser = toEntity(userRequest);
                    return toResponse(telegramUserRepository.save(newUser));
                });
    }

    public Optional<TelegramUserResponse> findUserById(Long id) {
        return telegramUserRepository.findById(id)
                .map(this::toResponse);
    }

    public TelegramUserResponse updateUser(Long id, TelegramUserRequest userRequest) {
        return telegramUserRepository.findById(id)
                .map(existingUser -> updateUserFields(existingUser, userRequest))
                .map(telegramUserRepository::save)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }

    public void deleteUserById(Long id) {
        telegramUserRepository.deleteById(id);
    }

    private TelegramUser updateUserFields(TelegramUser user, TelegramUserRequest userRequest) {
        user.setBot(userRequest.isBot());
        user.setFirstName(userRequest.firstName());
        user.setLastName(userRequest.lastName());
        user.setUsername(userRequest.username());
        user.setLanguageCode(userRequest.languageCode());
        user.setPremium(userRequest.isPremium());
        user.setPhoneNumber(userRequest.phoneNumber());
        return user;
    }

    private TelegramUser toEntity(TelegramUserRequest userRequest) {
        TelegramUser telegramUser = new TelegramUser();
        telegramUser.setTelegramId(userRequest.telegramId());
        return updateUserFields(telegramUser, userRequest);
    }

    private TelegramUserResponse toResponse(TelegramUser telegramUser) {
        return new TelegramUserResponse(
                telegramUser.getTelegramId(),
                telegramUser.isBot(),
                telegramUser.getFirstName(),
                telegramUser.getLastName(),
                telegramUser.getUsername(),
                telegramUser.getLanguageCode(),
                telegramUser.isPremium(),
                telegramUser.getPhoneNumber()
        );
    }
}
