package in.samrasyafudz.userservice.service;

import in.samrasyafudz.userservice.dto.UpdateProfileRequest;
import in.samrasyafudz.userservice.dto.UserProfileResponse;
import in.samrasyafudz.userservice.entity.User;
import in.samrasyafudz.userservice.exception.EmailAlreadyInUseException;
import in.samrasyafudz.userservice.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return toResponse(user);
    }

    @Transactional
    public UserProfileResponse updateProfile(Long userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }

        if (request.getEmail() != null && !request.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(request.getEmail())) {
                throw new EmailAlreadyInUseException();
            }
            user.setEmail(request.getEmail());
        }

        return toResponse(userRepository.save(user));
    }

    private UserProfileResponse toResponse(User user) {
        return new UserProfileResponse(
                user.getId(), user.getPhone(), user.getFullName(), user.getEmail(),
                user.getRole().name(), user.getCreatedAt()
        );
    }
}