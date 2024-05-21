package sn.pad.pe.configurations.exception;

import org.springframework.web.bind.annotation.ResponseStatus;

//@ResponseStatus(value = HttpStatus.NOT_FOUND)
//public class ResourceNotFoundException extends Exception{
//
//    private static final long serialVersionUID = 1L;
//
//    public ResourceNotFoundException(String message){
//        super(message);
//    }
//    
//    public ResourceNotFoundException(String message, Throwable throwable) {
//        super(message, throwable);
//    }
//}
@ResponseStatus
public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
		super(message);
	}

	public ResourceNotFoundException(String message, Throwable throwable) {
		super(message, throwable);
	}
}