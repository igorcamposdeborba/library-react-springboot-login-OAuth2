package com.igorborba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*",allowedHeaders = "*",exposedHeaders = "*")
public class Library {

	public static void main(String[] args) {
		SpringApplication.run(Library.class, args);
	}

}
