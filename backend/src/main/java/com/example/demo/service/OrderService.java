package com.example.demo.service;

import com.example.demo.entity.Cart;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.OrderRequest;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    // --------------------------------------------------------
    // PLACE ORDER
    // --------------------------------------------------------
    @Transactional
    public String placeOrder(OrderRequest orderRequest) {

        String username = orderRequest.getUserName();
        System.out.println("Placing order for username: '" + username + "'");

        // 1️⃣ Fetch user (case-insensitive)
        User user = userRepository.findByUsername(username)
                .orElseGet(() -> {
                    System.out.println("User not found for username: '" + username + "'");
                    return null;
                });

        if (user == null) {
            return "User not found! Please login first.";
        }

        System.out.println("User found: " + user.getUsername());

        // 2️⃣ Fetch cart items
        List<Cart> cartItems = cartRepository.findByUser_Username(user.getUsername());
        System.out.println("Cart items count: " + cartItems.size());

        if (cartItems.isEmpty()) {
            return "Cart is empty!";
        }

        // 3️⃣ Create new order
        Order order = new Order();
        order.setUserName(user.getUsername());
        order.setDeliveryDate(new java.sql.Date(orderRequest.getDeliveryDate().getTime()));
        order.setDeliverySlot(orderRequest.getDeliverySlot());
        order.setStatus("Pending");

        // 4️⃣ Convert cart items to order items
        List<OrderItem> orderItemList = new ArrayList<>();
        double totalPrice = 0.0;

        for (Cart cart : cartItems) {
            Product product = productRepository.findById(cart.getProductId()).orElse(null);

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(cart.getQuantity());
            item.setFinalPrice(cart.getTotalPrice());
            
            // 🎯 CRITICAL NEW LINE: Transfer customMessage from Cart to OrderItem
            item.setCustomMessage(cart.getCustomMessage()); 
            // -------------------------------------------------------------------

            // Convert options to JSON string
           // Remove quotes around selectedSingle and selectedToppings so JSON stays valid
            String optionsJson = "{"
                    + "\"single\":" + (cart.getSelectedSingle() != null ? cart.getSelectedSingle() : "{}") + ","
                    + "\"toppings\":" + (cart.getSelectedToppings() != null ? cart.getSelectedToppings() : "[]")
                    + "}";
            item.setSelectedOptions(optionsJson);

            orderItemList.add(item);

            totalPrice += cart.getTotalPrice();
        }

        order.setTotalPrice(totalPrice);
        order.setItems(orderItemList);

        // 5️⃣ Save order
        orderRepository.save(order);
        System.out.println("Order saved: " + order);

        // 6️⃣ Clear cart
        cartRepository.deleteByUser_Username(user.getUsername());

        return "Order placed successfully!";
    }
    // --------------------------------------------------------
    // ADMIN: GET ALL ORDERS
    // --------------------------------------------------------
    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        
        // 🎯 CRITICAL NEW BLOCK: Force load OrderItems to prevent LazyInitializationException 🎯
        // This ensures the OrderItems (including the customMessage) are loaded from the DB
        // before the data is returned and serialized by the controller.
        for (Order order : orders) {
            if (order.getItems() != null) {
                order.getItems().size(); // Forces the initialization of the collection
            }
        }
        // -------------------------------------------------------------------
        
        return orders;
    }

    // --------------------------------------------------------
    // GET ORDER BY ID
    // --------------------------------------------------------
    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).orElse(null);
    }

    // --------------------------------------------------------
    // GET USER ORDERS
    // --------------------------------------------------------
    public List<Order> getOrdersByUser(String username) {
    	
        return orderRepository.findByUserNameIgnoreCase(username);
    }

    // --------------------------------------------------------
    // ADMIN: UPDATE ORDER STATUS
    // --------------------------------------------------------
    public String updateStatus(Integer id, String newStatus) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) return "Order not found!";

        order.setStatus(newStatus);
        orderRepository.save(order);

        return "Order status updated!";
    }

    // --------------------------------------------------------
    // ADMIN: SEND TRACKING MESSAGE
    // --------------------------------------------------------
    public String updateTrackingMessage(Integer id, String message) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order == null) return "Order not found!";

        order.setTrackingMessage(message);
        orderRepository.save(order);

        return "Tracking message updated!";
    }
}