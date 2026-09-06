package in.samrasyafudz.userservice.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import in.samrasyafudz.commonsecurity.JwtService;
import in.samrasyafudz.userservice.dto.AuthResponse;
import in.samrasyafudz.userservice.entity.Role;
import in.samrasyafudz.userservice.entity.User;
import in.samrasyafudz.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final OtpService otpService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public AuthService(OtpService otpService, UserRepository userRepository, JwtService jwtService) {
        this.otpService = otpService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    public void sendOtp(String phone) {
        otpService.sendOtp(phone);
    }

    @Transactional
    public AuthResponse verifyOtpAndLogin(String phone, String otp) {
        otpService.verifyOtp(phone, otp);

        boolean isNewUser = !userRepository.existsByPhone(phone);

        User user = userRepository.findByPhone(phone)
                .orElseGet(() -> createNewCustomer(phone));

        String token = jwtService.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        return new AuthResponse(
                token, user.getId(), user.getPhone(), user.getFullName(), user.getRole().name(), isNewUser
        );
    }

    private User createNewCustomer(String phone) {
        User user = new User();
        user.setPhone(phone);
        user.setRole(Role.CUSTOMER);
        return userRepository.save(user);
    }

    public AuthResponse loginWithFirebase(String idToken) {
        FirebaseToken decoded;
        try {
            decoded = FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (FirebaseAuthException e) {
            throw new IllegalArgumentException("Invalid Firebase ID token");
        }
        String phoneNumber = decoded.getClaims().get("phone_number").toString();
        String phone = phoneNumber.replace("+91", "");
        boolean isNewUser = !userRepository.existsByPhone(phone);

        User user = userRepository.findByPhone(phone)
                .orElseGet(() -> createNewCustomer(phone));

        String token = jwtService.generateToken(user.getId(), user.getPhone(), user.getRole().name());

        return new AuthResponse(
                token, user.getId(), user.getPhone(), user.getFullName(), user.getRole().name(), isNewUser
        );
    }
}