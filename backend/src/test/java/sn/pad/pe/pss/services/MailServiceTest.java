package sn.pad.pe.pss.services;

import java.util.Arrays;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import sn.pad.pe.pss.dto.MailDTO;
import sn.pad.pe.pss.services.impl.MailServiceImpl;

@DisplayName("Test Service MailDTO")
@ExtendWith(MockitoExtension.class)
@TestMethodOrder(OrderAnnotation.class)
class MailServiceTest {
	@Mock
	private ParametreService parametreService;
	@InjectMocks
	private MailServiceImpl mailServiceImpl;

	private static MailDTO mailDto;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		mailDto = new MailDTO();
		mailDto.setObjet("OUVERTURE DOSSIER CONGE");
		mailDto.setContenu("Le dossier conge est ouvert. Veuillez ajouter vos plannings congés");
		mailDto.setDestinataires(Arrays.asList("cheikhibra.samb@portdakar.sn", "serignemalick.gaye@portdakar.sn"));
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@Order(1)
	@DisplayName("Send mail")
	@Test
	final void testEnvoiMail() {
//		try (MockedStatic<MessageManager> mockedStatic = Mockito.mockStatic(MessageManager.class)) {
//			mockedStatic.when(() -> MessageManager.sendMail(mailDto)).thenReturn(201);
//
//			Assertions.assertEquals(201, MessageManager.sendMail(mailDto));
//
//			mockedStatic.verify(Mockito.times(1), () -> MessageManager.sendMail(mailDto));
//		}
	}

}
