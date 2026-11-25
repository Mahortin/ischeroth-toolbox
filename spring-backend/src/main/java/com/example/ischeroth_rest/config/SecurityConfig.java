package com.example.ischeroth_rest.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

  private static final String[] REFERENCE_DATA_ROUTES = {
    "/api/attributes", "/api/attributes/{id}",
    "/api/skills", "/api/skills/{id}",
    "/api/names", "/api/names/{id}"
  };

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .cors(Customizer.withDefaults())
      .authorizeHttpRequests(auth -> auth
        .requestMatchers(HttpMethod.GET, REFERENCE_DATA_ROUTES).permitAll()
        .requestMatchers(HttpMethod.HEAD, REFERENCE_DATA_ROUTES).permitAll()
        .requestMatchers("/api/**").denyAll()
        .anyRequest().permitAll()
      );
    return http.build();
  }
}
