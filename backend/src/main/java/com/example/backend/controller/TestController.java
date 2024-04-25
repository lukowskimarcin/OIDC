package com.example.backend.controller;

import java.text.MessageFormat;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.jwt.CustomJwt;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping(path = "/api/v1")
public class TestController {

    /**
     * By default if the supplied role does not start with 'ROLE_' it will be added
     * 
     * @see https://docs.spring.io/spring-security/site/docs/4.2.x/reference/html/el-access.html
     * @return
     */

    @PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
    @GetMapping("/testCustomer")
    public String testCustomer() {
        // var jwt = (CustomJwt) SecurityContextHolder.getContext().getAuthentication();
        return "{\"data\":  \"testCustomer\"}";
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @GetMapping("/testAdmin")
    public String testAdmin() {
        return "{\"data\":  \"testAdmin\"}";
    }

}
