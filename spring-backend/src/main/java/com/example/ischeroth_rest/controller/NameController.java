package com.example.ischeroth_rest.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ischeroth_rest.model.Name;
import com.example.ischeroth_rest.repository.NameRepository;

@RestController
@RequestMapping("/api/names")
//for angular
//@CrossOrigin(origins = "http://localhost:4200")
//for vue
@CrossOrigin(origins = {"http://localhost:5173", "https://makofu.de"})
public class NameController {
    private final NameRepository repo;

    public NameController(NameRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Name> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Name get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Name save(@RequestBody Name name) {
        return repo.save(name);
    }
}
