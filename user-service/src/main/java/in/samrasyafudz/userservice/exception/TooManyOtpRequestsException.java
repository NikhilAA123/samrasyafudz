package in.samrasyafudz.userservice.exception;

public class TooManyOtpRequestsException extends RuntimeException {
    public TooManyOtpRequestsException() {
        super("Too many OTP requests. Please wait a minute before trying again.");
    }
}
