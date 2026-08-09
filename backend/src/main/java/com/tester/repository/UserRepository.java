package com.tester.repository;

import java.util.Optional;
import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tester.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	  Optional<User> findByEmail(String email);
	  Optional<User> findByPasswordResetTokenHashAndPasswordResetExpiresAtAfter(String tokenHash, Instant expiresAt);
	  List<User> findByActiveTrueAndActivationExpirationProcessedFalseAndActivatedAtBefore(Instant activatedAt);

}
