package com.proyectoGM_B.proyectoGM_backend.repository;

import com.proyectoGM_B.proyectoGM_backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    boolean existsByEmail(String email);
    
    @Query("""
    SELECT u FROM Usuario u
    WHERE (
        :texto IS NULL
        OR LOWER(u.nombre) LIKE LOWER(CONCAT('%', :texto, '%'))
        OR LOWER(u.email) LIKE LOWER(CONCAT('%', :texto, '%'))
    )
    AND (:rol IS NULL OR u.rol = :rol)
    ORDER BY u.nombre ASC
    """)
    List<Usuario> buscarUsuarios(
            @Param("texto") String texto,
            @Param("rol") String rol
    );
}