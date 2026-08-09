package com.tester.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tester.repository.UserRepository;

@Service
public class UserActivationService {

	private final UserRepository userRepository;

	public UserActivationService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Scheduled(initialDelay = 0, fixedDelayString = "${app.user-activation.expiration-check-ms:60000}")
	@Transactional
	public void deactivateExpiredAccounts() {
		Instant limit = Instant.now().minus(7, ChronoUnit.DAYS);
		userRepository.findByActiveTrueAndActivationExpirationProcessedFalseAndActivatedAtBefore(limit)
				.forEach(user -> {
					user.setActive(false);
					user.setActivationExpirationProcessed(true);
				});
	}
}
