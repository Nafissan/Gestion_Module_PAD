package sn.pad.pe.partenariat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
	List<Participant> findParticipantByStatut(int codeStatut);

	List<Participant> findAll();

}
