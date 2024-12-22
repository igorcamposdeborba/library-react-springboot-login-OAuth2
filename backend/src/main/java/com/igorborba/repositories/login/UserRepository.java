package com.igorborba.repositories.login;

import org.springframework.data.jpa.repository.JpaRepository;

import com.igorborba.entities.login.User;

public interface UserRepository extends JpaRepository<User, Long> { // JpaRepository recebe a classe que estou me referindo e ao id para que eu possa usar os métodos desse classe JpaRepository, que tem métodos que padronizam o nome do método para o acesso ao banco de dados, feitos pela ORM/mapeamento objeto-relacional (Hibernate). ORM traduz a tabela do banco de dados em objeto do Java.

	User findByEmail(String email);
}
