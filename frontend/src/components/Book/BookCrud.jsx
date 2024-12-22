import React, { Component } from "react";
import Main from "../Template/Main/Main";
import Logo from "../Logo";
import Nav from "../Template/Nav/Nav";
import Footer from "../Template/Footer/Footer";
import axios from "axios";
import './styles.css';

const baseUrl = "https://hapi-books.p.rapidapi.com/month/2024/12"; // endpoint da api de livros de terceiros
const initialState = {
    list: [] // cópia do banco de dados de livros para eu manipular localmente porque eu tenho um limite de requisições por dia na api
}
const backupInitialState = { list: [ 
        {
          "book_id": "58283080",
          "position": "1",
          "name": "Hook, Line, and Sinker (Bellinger Sisters, #2)",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627068858i/58283080.jpg",
          "rating": 4.12,
          "url": "https://www.goodreads.com/book/show/58283080-hook-line-and-sinker"
        },
        {
          "book_id": "58438583",
          "position": "2",
          "name": "One Italian Summer",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626799802i/58438583.jpg",
          "rating": 3.73,
          "url": "https://www.goodreads.com/book/show/58438583-one-italian-summer"
        },
        {
          "book_id": "58371432",
          "position": "3",
          "name": "The Book of Cold Cases",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1624553583i/58371432.jpg",
          "rating": 3.91,
          "url": "https://www.goodreads.com/book/show/58371432-the-book-of-cold-cases"
        },
        {
          "book_id": "58064046",
          "position": "4",
          "name": "Gallant",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1635862579i/58064046.jpg",
          "rating": 3.9,
          "url": "https://www.goodreads.com/book/show/58064046-gallant"
        },
        {
          "book_id": "57815107",
          "position": "5",
          "name": "The War of Two Queens (Blood and Ash, #4)",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1635174962i/57815107.jpg",
          "rating": 4.05,
          "url": "https://www.goodreads.com/book/show/57815107-the-war-of-two-queens"
        },
        {
          "book_id": "57693416",
          "position": "6",
          "name": "The Golden Couple",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1633973719i/57693416.jpg",
          "rating": 4.04,
          "url": "https://www.goodreads.com/book/show/57693416-the-golden-couple"
        },
        {
          "book_id": "55004093",
          "position": "7",
          "name": "The Cartographers",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1634915484i/55004093.jpg",
          "rating": 3.74,
          "url": "https://www.goodreads.com/book/show/55004093-the-cartographers"
        },
        {
          "book_id": "58490567",
          "position": "8",
          "name": "The Diamond Eye",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1641777418i/58490567.jpg",
          "rating": 4.35,
          "url": "https://www.goodreads.com/book/show/58490567-the-diamond-eye"
        },
        {
          "book_id": "57693427",
          "position": "9",
          "name": "The Night Shift",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1639384101i/57693427.jpg",
          "rating": 4.03,
          "url": "https://www.goodreads.com/book/show/57693427-the-night-shift"
        },
        {
          "book_id": "57007401",
          "position": "10",
          "name": "Dating Dr. Dil (If Shakespeare was an Auntie #1)",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1642405300i/57007401.jpg",
          "rating": 3.82,
          "url": "https://www.goodreads.com/book/show/57007401-dating-dr-dil"
        },
        {
          "book_id": "58265135",
          "position": "11",
          "name": "The Unsinkable Greta James",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1627483702i/58265135.jpg",
          "rating": 3.97,
          "url": "https://www.goodreads.com/book/show/58265135-the-unsinkable-greta-james"
        },
        {
          "book_id": "58536005",
          "position": "12",
          "name": "The Club",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1644230879i/58536005.jpg",
          "rating": 3.44,
          "url": "https://www.goodreads.com/book/show/58536005-the-club"
        },
        {
          "book_id": "56978089",
          "position": "13",
          "name": "A Magic Steeped in Poison (The Book of Tea, #1)",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1620317227i/56978089.jpg",
          "rating": 3.99,
          "url": "https://www.goodreads.com/book/show/56978089-a-magic-steeped-in-poison"
        },
        {
          "book_id": "58505877",
          "position": "14",
          "name": "Run Rose Run",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1628699768i/58505877.jpg",
          "rating": 4,
          "url": "https://www.goodreads.com/book/show/58505877-run-rose-run"
        },
        {
          "book_id": "57899793",
          "position": "15",
          "name": "All My Rage",
          "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1629908086i/57899793.jpg",
          "rating": 4.62,
          "url": "https://www.goodreads.com/book/show/57899793-all-my-rage"
        }
      ] // cópia do banco de dados de livros para eu manipular localmente porque eu tenho um limite de requisições por dia na api
}
  
// atributos do objeto
const headerProps = {
    icon: "book",
    title: "Livros",
    subtitle: "Livros mais populares segundo a API Hapi Books."

}

// Classe porque preciso de estado com ciclo de vida para alterar o crud
export default class BookCrud extends Component {

    state = { ... initialState } // criar state inicial 
    
    

    // Após carregada a página (ciclo de vida da renderização)
    componentDidMount(){
        axios.get(baseUrl, {
            headers:  {
              'X-RapidAPI-Key': 'ea1ce79bc6msh57f760c66c03a0fp1c0516jsndc9f9860d845',
              'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
            }
        }).then(response => { // requisição para resgatar dados do banco de dados da api de livros
            this.setState({ list: response.data });
        }).catch((error) => {
          this.setState({ list: backupInitialState.list }) // se eu for bloqueado porque atingi o limite de 20 requisições por dia e 100 por mês, busque o resultado json salvo anteriormente
        });
    }

    // Ler linhas
    renderRows(){
        return this.state.list.map((list) => {
            return (
              <div className="col" key={list.book_id}>
                <a href={list.url} target="_blank">
                    <img src={list.cover} alt={list.name} className="reduceImage"/>
                </a> 
              </div>
            )
        })
    }

    render(){
        return (
            <div className="page">
                <div className="logoBox">
                    <Logo />
                </div>
                <Nav />

                <Main {...headerProps}>
                    {this.renderRows()}
                </Main>

                <Footer />
            </div>
        )
    }

}
