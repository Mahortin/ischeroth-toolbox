package com.example.ischeroth_rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ischeroth_rest.model.Attribute;

public interface AttributeRepository extends JpaRepository<Attribute, Long> {}