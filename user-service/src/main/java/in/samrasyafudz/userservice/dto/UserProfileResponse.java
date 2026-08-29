package in.samrasyafudz.userservice.dto;

import java.time.LocalDateTime;

public class UserProfileResponse {

    private Long id;
    private String phone;
    private String fullName;
    private String email;
    private String role;
    private LocalDateTime createdAt;

    public UserProfileResponse(Long id, String phone, String fullName, String email,
                               String role, LocalDateTime createdAt) {
        this.id = id;
        this.phone = phone;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getPhone() {
        return phone;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}