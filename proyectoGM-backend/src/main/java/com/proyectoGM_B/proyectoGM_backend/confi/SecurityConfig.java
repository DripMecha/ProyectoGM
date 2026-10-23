package com.proyectoGM_B.proyectoGM_backend.confi;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/productos", "/api/productos/**")
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/prueba",
                    "/api/productos",
                    "/api/productos/**"
                ).permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form.permitAll());

        return http.build();
    }
}
