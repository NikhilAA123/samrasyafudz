package in.samrasyafudz.userservice.dto;

public class AuthResponse {

    private final String token;
    private final Long userId;
    private final String phone;
    private final String fullName;
    private final String role;
    private final boolean newUser;

    public AuthResponse(String token, Long userId, String phone, String fullName, String role, boolean newUser) {
        this.token = token;
        this.userId = userId;
        this.phone = phone;
        this.fullName = fullName;
        this.role = role;
        this.newUser = newUser;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getPhone() {
        return phone;
    }

    public String getFullName() {
        return fullName;
    }

    public String getRole() {
        return role;
    }

    public boolean isNewUser() {
        return newUser;
    }
}
