package com.proyectoGM_B.proyectoGM_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PruebaController {

    @GetMapping("/api/prueba")
    public String prueba() {
        return "API Genuine Motors funcionando correctamente";
    }
}
