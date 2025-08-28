package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Attribute;
import com.example.demo.repository.AttributeRepository;

@RestController
@RequestMapping("/api/attributes")
//for angular
//@CrossOrigin(origins = "http://localhost:4200")
//for vue
@CrossOrigin(origins = "http://localhost:5173")
public class AttributeController {
    private final AttributeRepository repo;

    public AttributeController(AttributeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Attribute> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Attribute get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Attribute save(@RequestBody Attribute attribute) {
        return repo.save(attribute);
    }
}
