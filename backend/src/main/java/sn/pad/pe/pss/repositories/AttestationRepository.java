package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Attestation;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

public interface AttestationRepository extends JpaRepository<Attestation, Long> {
	Attestation findAttestationById(Long id);

	List<Attestation> findAttestationsByUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle);

	List<Attestation> findAttestationsByAgent(Agent agent);

	List<Attestation> findAttestationsByEtat(String etat);

	List<Attestation> findAttestationsByEtatNotLike(String etat);

}
