package com.proyectoGM_B.proyectoGM_backend.service;

import com.proyectoGM_B.proyectoGM_backend.model.Usuario;
import com.proyectoGM_B.proyectoGM_backend.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    // CREATE: registrar un usuario
    public Usuario crear(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new IllegalArgumentException(
                    "El correo ya está registrado");
        }

        validarUsuario(usuario);

        usuario.setPassword(
                passwordEncoder.encode(usuario.getPassword()));

        if (usuario.getRol() == null ||
                usuario.getRol().isBlank()) {
            usuario.setRol("usuario");
        }

        if (!usuario.getRol().equals("usuario") &&
                !usuario.getRol().equals("admin")) {
            throw new IllegalArgumentException("Rol no válido");
        }

        usuario.setActivo(true);

        return usuarioRepository.save(usuario);
    }

    // READ: listar todos los usuarios
    public List<Usuario> listar() {
        return usuarioRepository.findAll();
    }

    // READ: buscar usuarios por nombre, correo o rol
    public List<Usuario> buscarUsuarios(String texto, String rol) {

        if (texto != null && texto.isBlank()) {
            texto = null;
        }

        if (rol != null && rol.isBlank()) {
            rol = null;
        }

        if (rol != null
                && !rol.equals("admin")
                && !rol.equals("usuario")) {
            throw new IllegalArgumentException("Rol no válido");
        }

        return usuarioRepository.buscarUsuarios(texto, rol);
    }

    // READ: buscar un usuario por ID
    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Usuario no encontrado"));
    }

    // UPDATE: actualizar un usuario
    public Usuario actualizar(Long id, Usuario datos) {
        Usuario usuario = buscarPorId(id);

        if (datos.getNombre() == null || datos.getNombre().isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }

        if (datos.getEmail() == null || datos.getEmail().isBlank()) {
            throw new IllegalArgumentException("El correo es obligatorio");
        }

        if (usuarioRepository.existsByEmail(datos.getEmail())
                && !usuario.getEmail().equalsIgnoreCase(
                        datos.getEmail())) {
            throw new IllegalArgumentException(
                    "El correo ya está registrado");
        }

        usuario.setNombre(datos.getNombre());
        usuario.setEmail(datos.getEmail());

        if (datos.getPassword() != null &&
                !datos.getPassword().isBlank()) {
            usuario.setPassword(
                    passwordEncoder.encode(datos.getPassword()));
        }

        if (datos.getRol() != null &&
                !datos.getRol().isBlank()) {
            if (!datos.getRol().equals("usuario") &&
                    !datos.getRol().equals("admin")) {
                throw new IllegalArgumentException(
                        "Rol no válido");
            }
            usuario.setRol(datos.getRol());
        }

        if (datos.getActivo() != null) {
            usuario.setActivo(datos.getActivo());
        }

        return usuarioRepository.save(usuario);
    }

    // DELETE: eliminar un usuario
    public void eliminar(Long id) {
        Usuario usuario = buscarPorId(id);
        usuarioRepository.delete(usuario);
    }

    private void validarUsuario(Usuario usuario) {
        if (usuario.getNombre() == null ||
                usuario.getNombre().isBlank()) {
            throw new IllegalArgumentException(
                    "El nombre es obligatorio");
        }

        if (usuario.getEmail() == null ||
                usuario.getEmail().isBlank()) {
            throw new IllegalArgumentException(
                    "El correo es obligatorio");
        }

        if (usuario.getPassword() == null ||
                usuario.getPassword().isBlank()) {
            throw new IllegalArgumentException(
                    "La contraseña es obligatoria");
        }
    }
}