package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Skill;
import com.example.demo.repository.SkillRepository;

@RestController
@RequestMapping("/api/skills")
//for angular
//@CrossOrigin(origins = "http://localhost:4200")
//for vue
@CrossOrigin(origins = "http://localhost:5173")
public class SkillController {
    private final SkillRepository repo;

    public SkillController(SkillRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Skill> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Skill get(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Skill save(@RequestBody Skill skill) {
        return repo.save(skill);
    }
}
