package com.igorborba.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igorborba.entities.Book;

public interface BookRepository extends JpaRepository<Book, Long> {

}
