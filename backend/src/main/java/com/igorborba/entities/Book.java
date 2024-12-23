package com.igorborba.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.igorborba.dto.BookDTO;

import java.util.Locale;

@Entity
@Table(name = "tb_book")
public class Book {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long id;
	public String author;	
	public String surname;
	public String title;
	public String publisher;
	public Integer edition;
	public Integer year;
	
	public Book(Long id, String author, String surname, String title, String publisher, Integer edition, Integer year) {
		super();
		this.id = id;
		this.author = author;
		this.surname = surname.toUpperCase(Locale.ROOT);
		this.title = title;
		this.publisher = publisher;
		this.edition = edition;
		this.year = year;
	}

	public Book(BookDTO book) {
		id = book.getId();
		author = book.getAuthor();
		surname = book.getSurname().toUpperCase(Locale.ROOT);
		title = book.getTitle();
		publisher = book.getPublisher();
		edition = book.getEdition();
		year = book.getYear();
	}
	
	public Book() {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public Integer getEdition() {
		return edition;
	}

	public void setEdition(Integer edition) {
		this.edition = edition;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}
	
}
