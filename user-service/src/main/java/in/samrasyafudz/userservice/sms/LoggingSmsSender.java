package in.samrasyafudz.userservice.sms;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * Local-dev stand-in for a real SMS provider (Twilio, MSG91, Fast2SMS, etc).
 * Logs the OTP instead of sending a real text so you can test the full flow
 * without an SMS account. Replace this bean with a real provider implementation
 * of SmsSender before deploying — swap happens here only, nothing else changes.
 */
@Component
public class LoggingSmsSender implements SmsSender {

    private static final Logger log = LoggerFactory.getLogger(LoggingSmsSender.class);

    @Override
    public void sendOtp(String phone, String otpCode) {
        log.info("[MOCK SMS] OTP for +91{}: {}", phone, otpCode);
    }
}
