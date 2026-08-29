package in.samrasyafudz.orderservice.exception;

public class ProductNotAvailableException extends RuntimeException {
    public ProductNotAvailableException(Long productId) {
        super("Product or variant not available: " + productId);
    }
}