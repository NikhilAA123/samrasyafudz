package in.samrasyafudz.orderservice.security;

public record AuthenticatedUser(Long userId, String phone, String role) {
}