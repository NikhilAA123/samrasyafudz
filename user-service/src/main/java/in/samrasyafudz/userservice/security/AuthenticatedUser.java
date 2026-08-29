package in.samrasyafudz.userservice.security;

public record AuthenticatedUser(Long userId, String phone, String role) {
}