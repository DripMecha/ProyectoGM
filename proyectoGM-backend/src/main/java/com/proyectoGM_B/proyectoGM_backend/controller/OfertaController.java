package com.proyectoGM_B.proyectoGM_backend.controller;

import com.proyectoGM_B.proyectoGM_backend.dto.OfertaDTO;
import com.proyectoGM_B.proyectoGM_backend.entity.Producto;
import com.proyectoGM_B.proyectoGM_backend.repository.ProductoRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@RestController
@RequestMapping("/api/ofertas")
public class OfertaController {

    private final ProductoRepository productoRepository;

    public OfertaController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<OfertaDTO> listarOfertas() {

        List<Producto> productos = productoRepository.buscarProductosEnOferta();

        return productos.stream().map(producto -> {

            BigDecimal descuento = producto.getPrecioLista()
                    .subtract(producto.getPrecioVenta())
                    .multiply(BigDecimal.valueOf(100))
                    .divide(producto.getPrecioLista(), 2, RoundingMode.HALF_UP);

            return new OfertaDTO(
                    producto.getIdProducto(),
                    producto.getSku(),
                    producto.getNombre(),
                    producto.getPrecioLista(),
                    producto.getPrecioVenta(),
                    descuento
            );

        }).toList();
    }
}