import React, { Component } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080/book"; // endpoint do Spring Boot
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ0NzIzMjIsInVzZXJfbmFtZSI6ImJvYkBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6WyJST0xFX09QRVJBVE9SIiwiUk9MRV9BRE1JTiJdLCJqdGkiOiJhNjUxODNjMi1iY2FmLTQwNmEtYTdjZC0wOWM5NGUzMDc2ZDkiLCJjbGllbnRfaWQiOiJhcHAiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiXX0.EBlmIghHO_SPBsR7zvE9FH760fmy2y4bUGy7cEwOAPM";

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    // Authorization: `Bearer ${token}`,
    Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
  },
});

const initialState = {
  book: {
    author: "",
    surname: "",
    title: "",
    publisher: "",
    edition: null,
    year: null,
  },
  list: [],
};

export default class HomeCrud extends Component {
  state = { ...initialState };

  componentDidMount() {
    api.get("/").then((response) => {
      this.setState({ list: response.data });
    });
  }

  clear() {
    this.setState({ book: initialState.book });
  }

  save() {
    const book = this.state.book;
    const method = book.id ? "put" : "post";
    const url = book.id ? `/${book.id}` : "/single";
  
    // Realiza a requisição para adicionar ou editar o livro
    api[method](url, book).then((response) => {
      // Após salvar, recarregar os livros da API
      api.get("/").then((response) => {
        // Atualiza o estado com a lista atualizada
        this.setState({ book: initialState.book, list: response.data });
      });
    });
  }

  getUpdatedList(book, add = true) {
    const list = this.state.list.filter((b) => b.id !== book.id);
    if (add) list.unshift(book);
    return list;
  }

  updateField(event) {
    const book = { ...this.state.book };
    book[event.target.name] = event.target.value;
    this.setState({ book });
  }

  load(book) {
    this.setState({ book });
  }

  remove(book) {
    api.delete(`/${book.id}`).then(() => {
      const list = this.getUpdatedList(book, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <div className="table-responsive">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Nome do autor</th>
              <th>Sobrenome</th>
              <th>Editora</th>
              <th>Edição</th>
              <th>Ano</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
      </div>
    );
  }

  renderRows() {
    return this.state.list.map((book) => (
      <tr key={book.id || `book-${book.title}-${book.author}`}> 
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.surname}</td>
        <td>{book.publisher}</td>
        <td>{book.edition}</td>
        <td>{book.year}</td>
        <td>
          <button
            className="btn btn-warning ms-2"
            onClick={() => this.load(book)}
          >
            <i className="fa fa-pencil"></i>
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => this.remove(book)}
          >
            <i className="fa fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  }

  exportBooks = async () => {
    try {
      const response = await api.get("/export", {
        responseType: "blob", // Necessário para lidar com o download do arquivo
      });

      // Criar um link para o download do arquivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "books.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao exportar livros:", error);
      alert("Erro ao exportar livros.");
    }
  };

  renderExport() {
    return (
      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-outline-secondary" onClick={this.exportBooks}> Exportar Livros </button>
      </div>
    );
  };

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Título do livro</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={this.state.book.title || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Digite o título do livro"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Nome do autor</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={this.state.book.author || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Nome do autor"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Sobrenome</label>
              <input
                type="text"
                className="form-control"
                name="surname"
                value={this.state.book.surname || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Sobrenome"
              />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                className="form-control"
                name="publisher"
                value={this.state.book.publisher || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Editora"
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="form-group">
              <label>Edição</label>
              <input
                type="number"
                className="form-control"
                name="edition"
                value={this.state.book.edition || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Edição"
              />
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="form-group">
              <label>Ano</label>
              <input
                type="number"
                className="form-control"
                name="year"
                value={this.state.book.year || ""}
                onChange={(e) => this.updateField(e)}
                placeholder="Ano"
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-secondary" onClick={() => this.clear()}>
              Cancelar
            </button>
            <button
              className="btn btn-primary ms-3"
              onClick={() => this.save()}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        {this.renderExport()}
        <h1>Cadastro de Livros</h1>
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}