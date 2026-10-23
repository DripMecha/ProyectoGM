package com.proyectoGM_B.proyectoGM_backend.controller;
import com.proyectoGM_B.proyectoGM_backend.model.Usuario;
import com.proyectoGM_B.proyectoGM_backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")

public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Usuario usuario = authService.login(
                    request.email(),
                    request.password()
            );

            LoginResponse response = new LoginResponse(
                    usuario.getId(),
                    usuario.getNombre(),
                    usuario.getEmail(),
                    usuario.getRol()
            );

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }

    public record LoginRequest(String email, String password) {}

    public record LoginResponse(
            Long id,
            String nombre,
            String email,
            String rol
    ) {}

    public record ErrorResponse(String mensaje) {}
}