package in.samrasyafudz.userservice.exception;

public class InvalidOtpException extends RuntimeException {
    public InvalidOtpException() {
        super("Incorrect or expired code. Please try again.");
    }
}
