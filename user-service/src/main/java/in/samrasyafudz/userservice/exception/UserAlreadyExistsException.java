package in.samrasyafudz.userservice.exception;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String email) {
        super("An account already exists with email: " + email);
    }
}