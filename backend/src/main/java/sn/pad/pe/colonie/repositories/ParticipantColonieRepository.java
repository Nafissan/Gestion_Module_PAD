package sn.pad.pe.colonie.repositories;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.bo.ParticipantColonie;
import sn.pad.pe.pss.bo.Agent;

public interface ParticipantColonieRepository extends JpaRepository<ParticipantColonie, Long>{
 Optional<ParticipantColonie> findByNomEnfantAndPrenomEnfantAndDateNaissanceAndAgentParentAndStatus(
        String nomEnfant, String prenomEnfant, Date dateNaissance, Agent agent,String status);
        List<ParticipantColonie> findByStatusIn(List<String> statuses);
        List<ParticipantColonie> findByCodeDossier(DossierColonie dossier);
        List<ParticipantColonie> findByStatus(String status);
        List<ParticipantColonie> findByCodeDossierAndStatus(DossierColonie codeDossier, String status);

}

