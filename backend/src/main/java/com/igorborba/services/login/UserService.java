package com.igorborba.services.login;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.igorborba.entities.login.User;
import com.igorborba.repositories.login.UserRepository;

@Service // annotation registra que essa classe faz parte do sistema automatizado do spring. Spring gerencia a injeção de dependência
public class UserService implements UserDetailsService { // UserDetailService é do login do OAuth2

	@Autowired // permite injetar uma instância do UserRepository
	private UserRepository userRepository;
	
	// retornar usuário buscando no banco de dados pelo e-mail
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(username);
		
		if (Objects.isNull(user)) {
			throw new UsernameNotFoundException("E-mail nao encontrado");
		}
		return user;
	} 

}
