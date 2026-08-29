package in.samrasyafudz.userservice.sms;

public interface SmsSender {
    void sendOtp(String phone, String otpCode);
}
