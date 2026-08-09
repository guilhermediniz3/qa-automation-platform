package com.tester.exception;

public class EmailDeliveryUnavailableException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public EmailDeliveryUnavailableException() {
		super("O envio de e-mail ainda não está configurado.");
	}
}
