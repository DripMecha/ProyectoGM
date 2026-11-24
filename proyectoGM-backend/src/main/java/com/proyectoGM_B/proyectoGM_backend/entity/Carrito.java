
package com.proyectoGM_B.proyectoGM_backend.entity;

import com.proyectoGM_B.proyectoGM_backend.model.Usuario;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "carrito")
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrito")
    private Long idCarrito;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id",
                nullable = false)
    private Usuario usuario;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = false, length = 20)
    private String estado = "ACTIVO";

    public Carrito() {
    }

    @PrePersist
    public void antesDeGuardar() {
        if (fechaCreacion == null) {
            fechaCreacion = LocalDateTime.now();
        }
        if (estado == null) {
            estado = "ACTIVO";
        }
    }

    public Long getIdCarrito() {
        return idCarrito;
    }

    public void setIdCarrito(Long idCarrito) {
        this.idCarrito = idCarrito;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}
