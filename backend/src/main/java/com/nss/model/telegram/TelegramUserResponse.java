package com.nss.model.telegram;

public record TelegramUserResponse(
        Long telegramId,
    boolean isBot,
    String firstName,
    String lastName,  // Optional
    String username,  // Optional
    String languageCode,  // Optional
    boolean isPremium,  // Optional
    String phoneNumber  // Optional
) {}
