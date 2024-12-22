package com.igorborba.dto.login;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

public class RoleDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	@NotBlank (message = "O nível de acesso é obrigatório")
	private String authority;

	public RoleDTO(Long id, String authority) {
		this.id = id;
		this.authority = authority;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
}
