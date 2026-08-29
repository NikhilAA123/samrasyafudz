package in.samrasyafudz.userservice.exception;

public class EmailAlreadyInUseException extends RuntimeException {
    public EmailAlreadyInUseException() {
        super("This email is already linked to another account.");
    }
}