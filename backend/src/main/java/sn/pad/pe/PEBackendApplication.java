package sn.pad.pe;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.configurations.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
@EnableScheduling
public class PEBackendApplication extends SpringBootServletInitializer {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		  modelMapper.addMappings(new PropertyMap<DossierColonie, DossierColonieDTO>() {
            @Override
            protected void configure() {
                map().setNoteMinistereBytes(source.getNoteMinistere());
                map().setDemandeProspectionBytes(source.getDemandeProspection());
                map().setNoteInformationBytes(source.getNoteInformation());
                map().setNoteInstructionBytes(source.getNoteInstruction());
                map().setRapportMissionBytes(source.getRapportMission());
            }
        });

		return modelMapper;
	}

	@Override
	public SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(PEBackendApplication.class);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public static void main(String[] args) {
		SpringApplication.run(PEBackendApplication.class, args);
	}

}
