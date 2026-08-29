package in.samrasyafudz.userservice.dto;

import jakarta.validation.constraints.Pattern;

public class SendOtpRequest {

    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String phone;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}