package in.samrasyafudz.userservice.controller;

import in.samrasyafudz.userservice.dto.AuthResponse;
import in.samrasyafudz.userservice.dto.FirebaseLoginRequest;
import in.samrasyafudz.userservice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class FirebaseController {

    private final AuthService authService;

    public FirebaseController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/firebase-login")
    public ResponseEntity<AuthResponse> firebaseLogin(@Valid @RequestBody FirebaseLoginRequest request) {
        return ResponseEntity.ok(authService.loginWithFirebase(request.getIdToken()));
    }
}
