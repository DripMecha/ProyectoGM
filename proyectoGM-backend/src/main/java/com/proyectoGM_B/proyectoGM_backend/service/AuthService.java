package com.proyectoGM_B.proyectoGM_backend.service;
import com.proyectoGM_B.proyectoGM_backend.model.Usuario;
import com.proyectoGM_B.proyectoGM_backend.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Usuario login(String email, String password) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Correo o contraseña incorrectos"));

        if (usuario.getActivo() == null || !usuario.getActivo()) {
            throw new IllegalArgumentException("La cuenta está desactivada");
        }

        if (!passwordEncoder.matches(password, usuario.getPassword())) {
            throw new IllegalArgumentException("Correo o contraseña incorrectos");
        }

        return usuario;
    }
}