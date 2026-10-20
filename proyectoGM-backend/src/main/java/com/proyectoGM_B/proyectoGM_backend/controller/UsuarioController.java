package com.proyectoGM_B.proyectoGM_backend.controller;

import com.proyectoGM_B.proyectoGM_backend.model.Usuario;
import com.proyectoGM_B.proyectoGM_backend.service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:4200")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // CREATE
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody Usuario usuario) {
        try {
            Usuario creado = usuarioService.crear(usuario);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(respuestaUsuario(creado));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", e.getMessage()));
        }
    }

    // READ: listar
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> listar() {
        List<Map<String, Object>> usuarios =
                usuarioService.listar()
                        .stream()
                        .map(this::respuestaUsuario)
                        .toList();

        return ResponseEntity.ok(usuarios);
    }

    // READ: búsqueda dinámica por texto y rol
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarUsuarios(
            @RequestParam(required = false) String texto,
            @RequestParam(required = false) String rol) {
        try {
            List<Map<String, Object>> usuarios =
                    usuarioService.buscarUsuarios(texto, rol)
                            .stream()
                            .map(this::respuestaUsuario)
                            .toList();

            return ResponseEntity.ok(usuarios);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", e.getMessage()));
        }
    }

    // READ: buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(
                    respuestaUsuario(
                            usuarioService.buscarPorId(id)));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", e.getMessage()));
        }
    }

    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizar(
            @PathVariable Long id,
            @RequestBody Usuario datos) {
        try {
            Usuario actualizado =
                    usuarioService.actualizar(id, datos);

            return ResponseEntity.ok(
                    respuestaUsuario(actualizado));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensaje", e.getMessage()));
        }
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        try {
            usuarioService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("mensaje", e.getMessage()));
        }
    }

    // Respuesta pública sin contraseña ni hash
    private Map<String, Object> respuestaUsuario(Usuario usuario) {
        return Map.of(
                "id", usuario.getId(),
                "nombre", usuario.getNombre(),
                "email", usuario.getEmail(),
                "rol", usuario.getRol(),
                "activo", usuario.getActivo()
        );
    }
}