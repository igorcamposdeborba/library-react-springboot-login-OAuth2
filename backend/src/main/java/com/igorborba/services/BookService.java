package com.igorborba.services;

import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import com.igorborba.controllers.exceptions.exceptionDTO.ResourceNotFoundException;
import org.hibernate.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.igorborba.dto.BookDTO;
import com.igorborba.entities.Book;
import com.igorborba.repositories.BookRepository;
import com.igorborba.utils.Constants;

@Service
public class BookService {

	@Autowired
	private BookRepository bookRepository;
	
	@Transactional(readOnly = true) // ReadOnly true não trava o banco (boa prática em operações de leitura)
	public Page<BookDTO> findAllPaged(Pageable pageable){
		
		// consultar banco de dados para User
		Page<Book> list = bookRepository.findAll(pageable);
		
		// Converter User em DTO
		List<BookDTO> listDTO = list.stream().map((Book book) -> new BookDTO(book)).collect(Collectors.toList());
		
		// Converter DTO em Page
		Page<BookDTO> page = new PageImpl<BookDTO>(listDTO);
		
		// retornar paginado o Page
		return page;
	}
	
	@Transactional() // Transação sempre executa esta operação no banco de dados se for 100% de sucesso.
	public List<BookDTO> findAll(){
        List<Book> bookList = bookRepository.findAll(Sort.by("title")); // buscar no banco de dados e ordenar por nome

		// converter a lista de classe para DTO
        return bookList.stream().filter(Objects::nonNull).map((Book book) -> new BookDTO(book)).collect(Collectors.toList());
    }
	
	@Transactional()
    public BookDTO findById(Long id) {
        // Buscar no banco de dados
        Optional<Book> bookDTO = bookRepository.findById(id);

        // Exception de validação
        Book entity = bookDTO.orElseThrow(() -> new ObjectNotFoundException(Constants.NOT_FOUND_BOOK, id.toString()));

        return new BookDTO(entity); // retornar somente dados permitidos (mapeados) pelo DTO
    }
	
	@Transactional
	public BookDTO insert(BookDTO dto) {
		Book entity = new Book();
		entity.setTitle(dto.getTitle());
		entity.setAuthor(dto.getAuthor());
		entity.setSurname(dto.getSurname().toUpperCase(Locale.ROOT));
		entity.setEdition(dto.getEdition());
		entity.setPublisher(dto.getPublisher());
		entity.setYear(dto.getYear());
		entity = bookRepository.save(entity);
		return new BookDTO(entity);
	}
	
	@Transactional
    public BookDTO update(String idInput, BookDTO bookDTO) {
        // Converter String para Integer id
        Long id = Long.parseLong(idInput);

        Optional<Book> bookDatabase = Optional.ofNullable(bookRepository.findById(id)
                                                    .orElseThrow(() -> new ObjectNotFoundException(
                                                    						Constants.NOT_FOUND_BOOK, String.valueOf(bookDTO.getId()))));

        // Validar se o id passado é o mesmo que está no banco de dados para evitar que o usuário altere o id
        if (bookDatabase.get().getId().equals(id)) {
            bookDTO.setId(id);
        }

        Book entity = new Book(bookDTO); // Mapear DTO para classe

        bookRepository.save(entity); // Salvar no banco de dados

        return new BookDTO(entity); // Retornar para a requisição o Book atualizado
    }

	@Transactional
	public void deleteById(Long id) {
		// Validar com exception se id não for encontrado
		if (!bookRepository.existsById(id)) {
			throw new ResourceNotFoundException(Constants.NOT_FOUND_BOOK + id);
		}

		// Deletar no banco de dados
		bookRepository.deleteById(id);
	}

}
