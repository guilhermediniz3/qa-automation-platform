package com.tester.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;

import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.tester.entity.User;
import com.tester.exception.EmailDeliveryUnavailableException;
import com.tester.repository.UserRepository;

@Service
public class PasswordResetService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final ObjectProvider<JavaMailSender> mailSenderProvider;
	private final SecureRandom secureRandom = new SecureRandom();

	@Value("${app.password-reset.frontend-url}")
	private String frontendUrl;

	@Value("${app.mail.from}")
	private String from;

	@Value("${spring.mail.host:}")
	private String mailHost;

	public PasswordResetService(UserRepository userRepository, PasswordEncoder passwordEncoder,
			ObjectProvider<JavaMailSender> mailSenderProvider) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.mailSenderProvider = mailSenderProvider;
	}

	@Transactional
	public void requestReset(String email) {
		User user = userRepository.findByEmail(email).orElse(null);
		if (user == null) {
			return;
		}

		JavaMailSender mailSender = mailSenderProvider.getIfAvailable();
		if (mailSender == null || mailHost.isBlank()) {
			throw new EmailDeliveryUnavailableException();
		}

		String rawToken = generateToken();
		user.setPasswordResetTokenHash(hash(rawToken));
		user.setPasswordResetExpiresAt(Instant.now().plus(1, ChronoUnit.HOURS));
		userRepository.save(user);

		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom(from);
		message.setTo(user.getEmail());
		message.setSubject("Redefinição de senha | ManagerQA");
		message.setText("Olá, " + user.getName() + ",\n\nUse o link abaixo para redefinir sua senha. Ele expira em 1 hora:\n"
				+ frontendUrl + "/redefinir-senha?token=" + rawToken
				+ "\n\nSe você não solicitou a redefinição, ignore este e-mail.");
		mailSender.send(message);
	}

	@Transactional
	public void resetPassword(String rawToken, String newPassword) {
		User user = userRepository.findByPasswordResetTokenHashAndPasswordResetExpiresAtAfter(hash(rawToken), Instant.now())
				.orElseThrow(() -> new IllegalArgumentException("O link de redefinição é inválido ou expirou."));

		user.setPassword(passwordEncoder.encode(newPassword));
		user.setPasswordResetTokenHash(null);
		user.setPasswordResetExpiresAt(null);
		userRepository.save(user);
	}

	private String generateToken() {
		byte[] bytes = new byte[32];
		secureRandom.nextBytes(bytes);
		return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
	}

	private String hash(String value) {
		try {
			byte[] hash = MessageDigest.getInstance("SHA-256").digest(value.getBytes(StandardCharsets.UTF_8));
			return Base64.getEncoder().encodeToString(hash);
		} catch (NoSuchAlgorithmException exception) {
			throw new IllegalStateException("SHA-256 não está disponível.", exception);
		}
	}
}
