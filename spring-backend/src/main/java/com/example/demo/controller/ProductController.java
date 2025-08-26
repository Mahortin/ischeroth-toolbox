package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Product;
import com.example.demo.repository.ProductRepository;

@RestController
@RequestMapping("/api/products")
//for angular
//@CrossOrigin(origins = "http://localhost:4200")
//for vue
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {
    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Product save(@RequestBody Product product) {
        return repo.save(product);
    }
}
