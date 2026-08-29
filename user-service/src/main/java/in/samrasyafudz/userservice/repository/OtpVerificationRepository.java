package in.samrasyafudz.userservice.repository;

import in.samrasyafudz.userservice.entity.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OtpVerificationRepository extends JpaRepository<OtpVerification, Long> {
    Optional<OtpVerification> findTopByPhoneAndConsumedFalseOrderByCreatedAtDesc(String phone);

    long countByPhoneAndCreatedAtAfter(String phone, LocalDateTime since);
}