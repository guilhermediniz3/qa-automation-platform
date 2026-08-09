
package com.tester.entity;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_user", schema = "people")

public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;

	@NotNull(message = "O e-mail é obrigatório")
	@Email(message = "O e-mail deve ser válido")
	private String email;

	@NotEmpty(message = "A senha é obrigatória")
	private String password;

	private boolean active; 

	private Instant activatedAt;

	private boolean activationExpirationProcessed;

	private String passwordResetTokenHash;

	private Instant passwordResetExpiresAt;

	
	public User() {
	}

	public User(String name, String email, String password, boolean active) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.active = active; 
	}

	// Getters e Setters
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public Instant getActivatedAt() {
		return activatedAt;
	}

	public void setActivatedAt(Instant activatedAt) {
		this.activatedAt = activatedAt;
	}

	public boolean isActivationExpirationProcessed() {
		return activationExpirationProcessed;
	}

	public void setActivationExpirationProcessed(boolean activationExpirationProcessed) {
		this.activationExpirationProcessed = activationExpirationProcessed;
	}

	public String getPasswordResetTokenHash() {
		return passwordResetTokenHash;
	}

	public void setPasswordResetTokenHash(String passwordResetTokenHash) {
		this.passwordResetTokenHash = passwordResetTokenHash;
	}

	public Instant getPasswordResetExpiresAt() {
		return passwordResetExpiresAt;
	}

	public void setPasswordResetExpiresAt(Instant passwordResetExpiresAt) {
		this.passwordResetExpiresAt = passwordResetExpiresAt;
	}


}
