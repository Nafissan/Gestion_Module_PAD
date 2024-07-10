package sn.pad.pe.colonie.repositories;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.ParticipantColonie;

public interface ParticipantColonieRepository extends JpaRepository<ParticipantColonie, Long>{
 Optional<ParticipantColonie> findByNomEnfantAndPrenomEnfantAndDateNaissanceAndMatriculeParent(
        String nomEnfant, String prenomEnfant, Date dateNaissance, String matriculeParent);
}

