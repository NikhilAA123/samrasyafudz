package in.samrasyafudz.userservice.sms;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClient;

public class Msg91SmsSender implements SmsSender {

    private final RestClient restClient;
    private final String authKey;
    private final String templateId;

    public Msg91SmsSender(@Value("${msg91.auth-key}") String authKey,
                          @Value("${msg91.template-id}") String templateId) {
        this.authKey = authKey;
        this.templateId = templateId;
        this.restClient = RestClient.builder().baseUrl("https://control.msg91.com").build();
    }

    @Override
    public void sendOtp(String phone, String otpCode) {
        restClient.post()
                .uri("/api/v5/otp?otp={otp}&mobile=91{phone}&template_id={templateId}",
                        otpCode, phone, templateId)
                .header("authkey", authKey)
                .retrieve()
                .toBodilessEntity();
    }
}