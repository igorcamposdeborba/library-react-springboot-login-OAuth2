package com.igorborba.controllers;

import java.net.URI;
import java.util.List;
import javax.validation.Valid;
import java.io.File;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.igorborba.services.exporter.ExporterService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.igorborba.dto.BookDTO;
import com.igorborba.services.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@RestController
@RequestMapping(value = "/book") // rota
public class BookController {
	private static final String ID = "/{id}";
    
	@Autowired
    private BookService bookService;

    @Autowired
    private ExporterService exporterService;

    @GetMapping(value = {"/", ""}, produces = "application/json")
    public ResponseEntity<List<BookDTO>> findAll(){

        List<BookDTO> bookList = bookService.findAll();

        return ResponseEntity.ok().body(bookList);
    }
	@GetMapping (value = {"/paged"}) // aceitar com ou sem barra / a requisição
	public ResponseEntity<Page<BookDTO>> findAll(Pageable pageable){
		// Buscar paginação no service
		Page <BookDTO> page = bookService.findAllPaged(pageable);
		
		// Retornar resposta paginada
		return ResponseEntity.ok().body(page);
	}

    @GetMapping(value = ID, produces = "application/json")
    public ResponseEntity<BookDTO> findById(@PathVariable Long id){
        BookDTO userDTO = bookService.findById(id);

        return ResponseEntity.ok().body(userDTO);
    }

    
    @PostMapping(value = "/single", produces = "application/json") // produces especifica o formato de saída para o Swagger
    public ResponseEntity<BookDTO> insert(@Valid @RequestBody BookDTO bookDTO){
        // Inserir pelo service no banco de dados
        BookDTO newBook = bookService.insert(bookDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newBook.getId()).toUri();

        return ResponseEntity.created(uri).build(); // retornar status created 201 com uri do objeto criado
    }

    @PutMapping(value = ID, produces = "application/json")
    public ResponseEntity<BookDTO> update(@PathVariable @Valid String id, @Valid @RequestBody BookDTO bookDTO){
        // Inserir pelo service no banco de dados
        BookDTO updatedBook = bookService.update(id, bookDTO);

        return ResponseEntity.ok().body(updatedBook); // retornar o usuário atualizado
    }
    
    @DeleteMapping (value = ID, produces = "application/json") // id no path da url
    public ResponseEntity<Void> delete(@PathVariable @Valid Long id){
        bookService.deleteById(id);

        return ResponseEntity.noContent().build(); // retornar status created 201 com uri do objeto criado
    }

    // exportar csv
    @GetMapping("/export")
    public ResponseEntity<FileSystemResource> exportBooksToCSV() {
        String filePath = "books.csv";

        exporterService.generateCSV(filePath);

        // Criar o arquivo como recurso
        File file = new File(filePath);
        FileSystemResource fileSystemResource = new FileSystemResource(file);

        // Retornar o arquivo CSV como um anexo no Response
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .body(fileSystemResource);
    }
}