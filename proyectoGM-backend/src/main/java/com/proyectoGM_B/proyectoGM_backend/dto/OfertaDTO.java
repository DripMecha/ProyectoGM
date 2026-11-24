package com.proyectoGM_B.proyectoGM_backend.dto;

import java.math.BigDecimal;

public class OfertaDTO {

    private Long idProducto;
    private String sku;
    private String nombre;
    private BigDecimal precioLista;
    private BigDecimal precioVenta;
    private BigDecimal porcentajeDescuento;

    public OfertaDTO(Long idProducto, String sku, String nombre,
            BigDecimal precioLista, BigDecimal precioVenta,
            BigDecimal porcentajeDescuento) {
        this.idProducto = idProducto;
        this.sku = sku;
        this.nombre = nombre;
        this.precioLista = precioLista;
        this.precioVenta = precioVenta;
        this.porcentajeDescuento = porcentajeDescuento;
    }

    public Long getIdProducto() {
        return idProducto;
    }

    public String getSku() {
        return sku;
    }

    public String getNombre() {
        return nombre;
    }

    public BigDecimal getPrecioLista() {
        return precioLista;
    }

    public BigDecimal getPrecioVenta() {
        return precioVenta;
    }

    public BigDecimal getPorcentajeDescuento() {
        return porcentajeDescuento;
    }
}