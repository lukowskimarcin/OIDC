package com.example.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/v1")
public class TestController {

    @GetMapping("/testCustomer")
    public String testCustomer() {
        return "{\"data\":  \"testCustomer\"}";
    }

    @GetMapping("/testAdmin")
    public String testAdmin() {
        return "{\"data\":  \"testAdmin\"}";
    }

}
