package com.proyectoGM_B.proyectoGM_backend.controller;

import org.springframework.web.bind.annotation.RequestParam;
import com.proyectoGM_B.proyectoGM_backend.entity.Producto;
import com.proyectoGM_B.proyectoGM_backend.repository.ProductoRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    private final ProductoRepository productoRepository;

    public ProductoController(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerProductoPorId(
            @PathVariable Long id) {

        return productoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public List<Producto> buscarProductos(
            @RequestParam String nombre) {

        return productoRepository.findByNombreContainingIgnoreCase(nombre);
    }

    @PostMapping
    public ResponseEntity<Producto> registrarProducto(
            @RequestBody Producto producto) {

        Producto nuevoProducto = productoRepository.save(producto);

        return ResponseEntity.status(201).body(nuevoProducto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            @PathVariable Long id,
            @RequestBody Producto datosActualizados) {

        return productoRepository.findById(id)
                .map(producto -> {
                    producto.setIdCategoria(datosActualizados.getIdCategoria());
                    producto.setIdMarca(datosActualizados.getIdMarca());
                    producto.setSku(datosActualizados.getSku());
                    producto.setNombre(datosActualizados.getNombre());
                    producto.setDescripcion(datosActualizados.getDescripcion());
                    producto.setPrecioVenta(datosActualizados.getPrecioVenta());
                    producto.setPrecioLista(datosActualizados.getPrecioLista());
                    producto.setActivo(datosActualizados.getActivo());

                    Producto productoGuardado = productoRepository.save(producto);

                    return ResponseEntity.ok(productoGuardado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {

        if (!productoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        productoRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
