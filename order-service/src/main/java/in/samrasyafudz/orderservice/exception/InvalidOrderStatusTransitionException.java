package in.samrasyafudz.orderservice.exception;

import in.samrasyafudz.orderservice.entity.OrderStatus;

public class InvalidOrderStatusTransitionException extends RuntimeException {
    public InvalidOrderStatusTransitionException(OrderStatus from, OrderStatus to) {
        super("Cannot move order from " + from + " to " + to);
    }
}