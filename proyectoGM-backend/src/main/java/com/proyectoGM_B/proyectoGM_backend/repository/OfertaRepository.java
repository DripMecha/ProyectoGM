
package com.proyectoGM_B.proyectoGM_backend.repository;

import com.proyectoGM_B.proyectoGM_backend.entity.Oferta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OfertaRepository extends JpaRepository<Oferta, Long> {

    List<Oferta> findByActivoTrue();

    List<Oferta> findByActivoTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqual(
            LocalDateTime inicio,
            LocalDateTime fin
    );

    List<Oferta> findByProducto_IdProducto(Long idProducto);

    Optional<Oferta> findTopByProducto_IdProductoAndActivoTrueAndFechaInicioLessThanEqualAndFechaFinGreaterThanEqualOrderByFechaInicioDesc(
            Long idProducto,
            LocalDateTime inicio,
            LocalDateTime fin
    );
}
