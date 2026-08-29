package in.samrasyafudz.orderservice.exception;

public class AddressNotAccessibleException extends RuntimeException {
    public AddressNotAccessibleException(Long addressId) {
        super("Address not found or does not belong to you: " + addressId);
    }
}