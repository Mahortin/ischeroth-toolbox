package com.example.ischeroth_rest.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "names")
public class Name {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "species_group")
    private String species_group;
    @Column(name = "culture_group")
    private String culture_group;
    @Column(name = "gender")
    private String gender;

    public Name() {
    }

    public Name(String name, String species_group, String culture_group, String gender) {
        this.name = name;
        this.species_group = species_group;
        this.culture_group = culture_group;
        this.gender = gender;
    }

    // Getter & Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpeciesGroup() {
        return species_group;
    }

    public void setSpeciesGroup(String species_group) {
        this.species_group = species_group;
    }

    public String getCultureGroup() {
        return culture_group;
    }

    public void setCultureGroup(String culture_group) {
        this.culture_group = culture_group;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

}
