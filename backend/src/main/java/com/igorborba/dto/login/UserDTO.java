package com.igorborba.dto.login;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import com.igorborba.entities.login.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank(message = "Nome é obrigatório") // NotBlank valida espaços em branco e null
	private String firstName;
	private String lastName;
	@Email (message = "Digite um e-mail válido")
	private String email;
	@Size(min = 6, message = "A senha deve ter pelo menos 6 caracteres")
	private String password;
	
	private Set<RoleDTO> roles = new HashSet<RoleDTO>();
	
	public UserDTO() {}

	public UserDTO(Long id, String firstName, String lastName, String email, String password, Set<RoleDTO> roles) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.roles = roles;
	}
	
	public UserDTO(User userEntity) {
		this.id = userEntity.getId();
		this.firstName = userEntity.getFirstName();
		this.lastName = userEntity.getLastName();
		this.email = userEntity.getEmail();
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getPassword() {
		return password;
	}

	public String getEmail() {
		return email;
	}
	
}
