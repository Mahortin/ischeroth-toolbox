package com.example.demo.model;

import com.example.demo.converter.StringArrayConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "value")
    private Integer value;
    @Column(name = "increased")
    private Boolean increased;
    @Column(name = "skill_group")
    private String group;
    @Column(name = "divisor")
    private Integer divisor;
    @Column(name = "attributes")
    @Convert(converter = StringArrayConverter.class)
    private String[] attributes;

    public Skill() {}

    public Skill(String name, Integer value, Boolean increased, String group, Integer divisor, String[] attributes) {
        // public Skill(String name, Integer value, Boolean increased, String group, String groupKey, Integer divisor) {
        this.name = name;
        this.value = value;
        this.divisor = divisor;
        // this.attributes = attributes;
        this.increased = increased;
        this.group = group;
    }

    // Getter & Setter
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getValue() { return value; }
    public void setValue(Integer value) { this.value = value; }

    public Boolean getIncreased() { return increased; }
    public void setIncreased(Boolean increased) { this.increased = increased; }

    public String getGroup() { return group; }
    public void setGroup(String group) { this.group = group; }

    public Integer getDivisor() { return divisor; }
    public void setDivisor(Integer divisor) { this.divisor = divisor; }

    public String[] getAttributes() { return attributes; }
    public void setAttributes(String[] attributes) { this.attributes = attributes; }
}