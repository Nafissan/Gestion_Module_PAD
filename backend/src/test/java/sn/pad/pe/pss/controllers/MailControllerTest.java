package sn.pad.pe.pss.controllers;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import sn.pad.pe.pss.dto.MailDTO;
import sn.pad.pe.pss.services.MailService;

@ExtendWith(MockitoExtension.class)
class MailControllerTest {

	private MockMvc mockMvc;

	@Mock
	private MailService mailService;

	@InjectMocks
	private MailController mailController;
	
	private static MailDTO mail;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(mailController)
				.build();
		mail = new MailDTO();
		mail.setContenu("Contenu du message");
		mail.setDestinataires(Arrays.asList("serignemalick.gaye@gmail.com"));
		mail.setLien("http://localhost:4200/");
		mail.setObjet("Objet du message");
		mail.setPieceJointe("http://localhost:4200/uploads/IMG-504101410.png");
	}

	@Test
	void testSend() throws Exception {
//	    try (MockedStatic<MessageManager> mockedStatic = Mockito.mockStatic(MessageManager.class)) { 
//		      mockedStatic
//		        .when(() -> MessageManager.sendMail(mail))
//		        .thenReturn(1);
//		    }
//			mockMvc.perform(post("/send-mail/agents").contentType(MediaType.APPLICATION_JSON).content(asJsonString(mail)))
//			.andExpect(status().isOk());
	}


	public static String asJsonString(final Object obj) {
		try {
			return new ObjectMapper().writeValueAsString(obj);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
