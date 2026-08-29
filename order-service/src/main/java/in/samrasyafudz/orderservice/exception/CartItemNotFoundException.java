package in.samrasyafudz.orderservice.exception;

public class CartItemNotFoundException extends RuntimeException {
    public CartItemNotFoundException() {
        super("Cart item not found.");
    }
}