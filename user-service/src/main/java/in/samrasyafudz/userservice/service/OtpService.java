package in.samrasyafudz.userservice.service;

import in.samrasyafudz.userservice.entity.OtpVerification;
import in.samrasyafudz.userservice.exception.InvalidOtpException;
import in.samrasyafudz.userservice.exception.TooManyOtpRequestsException;
import in.samrasyafudz.userservice.repository.OtpVerificationRepository;
import in.samrasyafudz.userservice.sms.SmsSender;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;

@Service
public class OtpService {

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int MAX_REQUESTS_PER_WINDOW = 3;
    private static final int RATE_LIMIT_WINDOW_MINUTES = 10;

    private final OtpVerificationRepository otpRepository;
    private final SmsSender smsSender;

    @Value("${otp.expiry-minutes:5}")
    private int otpExpiryMinutes;

    public OtpService(OtpVerificationRepository otpRepository, SmsSender smsSender) {
        this.otpRepository = otpRepository;
        this.smsSender = smsSender;
    }

    @Transactional
    public void sendOtp(String phone) {
        LocalDateTime windowStart = LocalDateTime.now().minusMinutes(RATE_LIMIT_WINDOW_MINUTES);
        long recentRequests = otpRepository.countByPhoneAndCreatedAtAfter(phone, windowStart);

        if (recentRequests >= MAX_REQUESTS_PER_WINDOW) {
            throw new TooManyOtpRequestsException();
        }

        String otpCode = generateSixDigitOtp();

        OtpVerification otp = new OtpVerification();
        otp.setPhone(phone);
        otp.setOtpCode(otpCode);
        otp.setExpiresAt(LocalDateTime.now().plusMinutes(otpExpiryMinutes));
        otpRepository.save(otp);

        smsSender.sendOtp(phone, otpCode);
    }

    @Transactional
    public void verifyOtp(String phone, String submittedOtp) {
        OtpVerification otp = otpRepository
                .findTopByPhoneAndConsumedFalseOrderByCreatedAtDesc(phone)
                .orElseThrow(InvalidOtpException::new);

        boolean expired = otp.getExpiresAt().isBefore(LocalDateTime.now());
        boolean mismatched = !otp.getOtpCode().equals(submittedOtp);

        if (expired || mismatched) {
            throw new InvalidOtpException();
        }

        otp.setConsumed(true);
        otpRepository.save(otp);
    }

    private String generateSixDigitOtp() {
        int otp = 100000 + RANDOM.nextInt(900000);
        return String.valueOf(otp);
    }
}