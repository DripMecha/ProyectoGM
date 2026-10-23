package com.proyectoGM_B.proyectoGM_backend.confi;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class PasswordConfigTest {

    @Test
    void debeGenerarYVerificarHashBCrypt() {

        PasswordEncoder encoder =
                new PasswordConfig().passwordEncoder();

        String password = "ClaveTemporal123!";
        String hash = encoder.encode(password);

        assertNotEquals(password, hash);
        assertTrue(encoder.matches(password, hash));
        assertFalse(encoder.matches("ClaveIncorrecta", hash));

        System.out.println("BCrypt funciona correctamente");
        System.out.println("HASH_BCRYPT=" + hash);
    }
}