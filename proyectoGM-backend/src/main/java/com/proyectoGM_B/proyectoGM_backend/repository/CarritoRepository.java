
package com.proyectoGM_B.proyectoGM_backend.repository;

import com.proyectoGM_B.proyectoGM_backend.entity.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    Optional<Carrito> findFirstByUsuario_IdAndEstadoOrderByFechaCreacionDesc(
            Long idUsuario,
            String estado
    );
}
