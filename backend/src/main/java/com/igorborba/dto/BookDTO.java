package com.igorborba.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;
import com.igorborba.entities.Book;

public class BookDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	public String author;	
	public String surname;
	@NotBlank (message = "Campo requerido")
	public String title;
	public String publisher;
	public Integer edition;
	public Integer year;
	
	public BookDTO() {
	}

	public BookDTO(Long id, String author, String surname, String title, String publisher, Integer edition, Integer year) {
		super();
		this.id = id;
		this.author = author;
		this.surname = surname;
		this.title = title;
		this.publisher = publisher;
		this.edition = edition;
		this.year = year;
	}

	public BookDTO(Book book) {
		id = book.getId();
		author = book.getAuthor();
		surname = book.getSurname();
		title = book.getTitle();
		publisher = book.getPublisher();
		edition = book.getEdition();
		year = book.getYear();
	}

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
