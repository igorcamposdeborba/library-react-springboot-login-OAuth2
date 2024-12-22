package com.igorborba.services.exporter;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.igorborba.dto.BookDTO;
import com.igorborba.services.BookService;

@Service
public class ExporterService {

    @Autowired
    private BookService bookService;

    public void generateCSV(String filepath) {
        List<BookDTO> books = bookService.findAll();

        // Configurar o formato do CSV com tratamento de caracteres especiais
        CSVFormat csvFormat = CSVFormat.DEFAULT
                .builder()
                .setHeader("ID", "Autor", "Sobrenome", "Titulo", "Editora", "Edicao", "Ano")
                .setQuoteMode(org.apache.commons.csv.QuoteMode.ALL)
                .build();

        try (FileWriter writer = new FileWriter(filepath);
             CSVPrinter csvPrinter = new CSVPrinter(writer, csvFormat)) {

            // Escrever as linhas com os dados dos livros
            for (BookDTO book : books) {
                csvPrinter.printRecord(
                        book.getId(),
                        book.getAuthor(),
                        book.getSurname(),
                        book.getTitle(),
                        book.getPublisher(),
                        String.valueOf(book.getEdition()),
                        Objects.nonNull(book.getYear()) ? book.getYear().toString() : ""
                );
            }

        } catch (IOException e) {
            throw new RuntimeException("Erro ao gerar o arquivo CSV", e);
        }
    }
}
