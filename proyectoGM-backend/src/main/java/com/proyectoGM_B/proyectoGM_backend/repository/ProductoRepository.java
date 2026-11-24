package com.proyectoGM_B.proyectoGM_backend.repository;

import com.proyectoGM_B.proyectoGM_backend.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {

    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    @Query("""
        SELECT p FROM Producto p
        WHERE p.activo = true
        AND p.precioLista IS NOT NULL
        AND p.precioLista > 0
        AND p.precioVenta <= p.precioLista * 0.95
    """)
    List<Producto> buscarProductosEnOferta();
}