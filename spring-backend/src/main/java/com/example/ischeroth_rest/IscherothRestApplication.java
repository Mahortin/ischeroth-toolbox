package com.example.ischeroth_rest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.ischeroth_rest"})
public class IscherothRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(IscherothRestApplication.class, args);
	}

}
