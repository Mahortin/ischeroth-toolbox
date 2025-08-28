package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "attributes")
public class Attribute {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
     @Column(name = "short_name")
    private String shortName;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private Integer value;
    @Column(name = "increased")
    private Boolean increased;

    public Attribute() {}

    public Attribute(String shortName, String name, Integer value, Boolean increased) {
        this.shortName = shortName;
        this.name = name;
        this.value = value;
        this.increased = increased;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }

    public Boolean getIncreased() { return increased; }
    public void setIncreased(Boolean increased) { this.increased = increased; }
}