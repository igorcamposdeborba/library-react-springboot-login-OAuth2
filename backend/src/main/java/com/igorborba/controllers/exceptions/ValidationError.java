package com.igorborba.controllers.exceptions;

import java.util.ArrayList;
import java.util.List;

public class ValidationError extends StandardError {
	private static final long serialVersionUID = 1L;
	
	private List<FieldMessage> errorMessageCustomized = new ArrayList<>();

	public List<FieldMessage> getErrorMessageCustomized(){
		return errorMessageCustomized;
	}
	
	public void addErrorMessageCustomized(String fieldName, String message){
		this.errorMessageCustomized.add(new FieldMessage(fieldName, message));
	}
}
