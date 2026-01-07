package com.example.demo.repository;
import com.example.demo.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    // Use underscore to traverse the entity relation
    List<Cart> findByUser_Username(String username);

    void deleteByUser_Username(String username);
    
    Optional<Cart> findByIdAndUser_Username(Long id, String username);

}
