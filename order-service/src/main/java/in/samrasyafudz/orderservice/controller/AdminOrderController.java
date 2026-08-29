package in.samrasyafudz.orderservice.controller;

import in.samrasyafudz.orderservice.dto.OrderResponse;
import in.samrasyafudz.orderservice.dto.UpdateOrderStatusRequest;
import in.samrasyafudz.orderservice.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PutMapping("/{orderId}/status")
    public OrderResponse updateStatus(@PathVariable Long orderId,
                                      @Valid @RequestBody UpdateOrderStatusRequest request) {
        return orderService.updateStatus(orderId, request.getStatus());
    }
}