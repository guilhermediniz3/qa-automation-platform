package com.tester.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import com.tester.dto.ForgotPasswordRequestDTO;
import com.tester.dto.LoginRequestDTO;
import com.tester.dto.RegisterRequestDTO;
import com.tester.dto.ResetPasswordRequestDTO;
import com.tester.dto.ResponseDTO;
import com.tester.entity.User;
import com.tester.infra.security.TokenService;
import com.tester.repository.UserRepository;
import com.tester.service.PasswordResetService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private final PasswordEncoder passwordEncoder;
	private final TokenService tokenService;
	private final UserRepository repository;
	private final PasswordResetService passwordResetService;

	@Autowired
	public AuthController(UserRepository repository, PasswordEncoder passwordEncoder, TokenService tokenService, PasswordResetService passwordResetService) {
		this.repository = repository;
		this.passwordEncoder = passwordEncoder;
		this.tokenService = tokenService;
		this.passwordResetService = passwordResetService;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDTO body) {
	    User user = this.repository.findByEmail(body.email()).orElse(null);

	    if (user != null && user.isActive() && passwordEncoder.matches(body.password(), user.getPassword())) {
	        String token = this.tokenService.generationToken(user);
	        return ResponseEntity.ok(new ResponseDTO(user.getName(), token));
	    }

	    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
	}
	@PostMapping("/register")
	public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO body) {
		Optional<User> user = this.repository.findByEmail(body.email());

		if (user.isEmpty()) {
			User newUser = new User();
			newUser.setPassword(passwordEncoder.encode(body.password()));
			newUser.setEmail(body.email());
			newUser.setName(body.name());
			newUser.setActive(true);
			newUser.setActivatedAt(java.time.Instant.now());
			newUser.setActivationExpirationProcessed(false);
			this.repository.save(newUser);

			String token = this.tokenService.generationToken(newUser);
			return ResponseEntity.ok(new ResponseDTO(newUser.getName(), token));
		}
		return ResponseEntity.badRequest().build();
	}

	@PostMapping("/forgot-password")
	public ResponseEntity<Void> forgotPassword(@Valid @RequestBody ForgotPasswordRequestDTO body) {
		passwordResetService.requestReset(body.email());
		return ResponseEntity.noContent().build();
	}

	@PostMapping("/reset-password")
	public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequestDTO body) {
		passwordResetService.resetPassword(body.token(), body.password());
		return ResponseEntity.noContent().build();
	}
	
	
}
