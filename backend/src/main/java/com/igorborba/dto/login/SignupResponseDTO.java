package com.igorborba.dto.login;

import java.io.Serializable;

public class SignupResponseDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
    private String message;
    private String email;

    public SignupResponseDTO(String message, String email) {
        this.message = message;
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
