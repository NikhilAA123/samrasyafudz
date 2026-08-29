package in.samrasyafudz.orderservice.exception;

public class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String productName, int available) {
        super(productName + " has only " + available + " left in stock.");
    }
}