
package com.proyectoGM_B.proyectoGM_backend.repository;

import com.proyectoGM_B.proyectoGM_backend.entity.DetalleCarrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DetalleCarritoRepository
        extends JpaRepository<DetalleCarrito, Long> {

    List<DetalleCarrito> findByCarrito_IdCarrito(Long idCarrito);

    Optional<DetalleCarrito>
    findByCarrito_IdCarritoAndProducto_IdProducto(
            Long idCarrito,
            Long idProducto
    );

    Optional<DetalleCarrito>
    findByIdDetalleAndCarrito_IdCarrito(
            Long idDetalle,
            Long idCarrito
    );
}
