package com.example.ischeroth_rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ischeroth_rest.model.Name;

public interface NameRepository extends JpaRepository<Name, Long> {}