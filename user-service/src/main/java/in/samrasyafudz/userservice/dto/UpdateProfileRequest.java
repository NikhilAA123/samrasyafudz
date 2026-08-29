package in.samrasyafudz.userservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class UpdateProfileRequest {

    @Size(min = 1, max = 100, message = "Name must be between 1 and 100 characters")
    private String fullName;

    @Email(message = "Enter a valid email address")
    private String email;

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}