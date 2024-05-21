package sn.pad.pe.pss.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sn.pad.pe.pss.bo.NiveauHierarchique;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

public interface UniteOrganisationnelleRepository extends JpaRepository<UniteOrganisationnelle, Long> {

	@Query("Select u from UniteOrganisationnelle u where u.uniteSuperieure = ?1")
	public List<UniteOrganisationnelle> findUniteOrganisationnelleInferieure(
			UniteOrganisationnelle uniteOrganisationnelle);

	public boolean existsByNiveauHierarchique(NiveauHierarchique niveauHierarchique);

	Optional<UniteOrganisationnelle> findUniteOrganisationnelleByCode(String code);
	
	Optional<UniteOrganisationnelle> findTopByOrderByIdDesc();
}
