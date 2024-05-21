package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.SuiviProspect;

public interface SuiviProspectRepository extends JpaRepository<SuiviProspect, Long> {

	List<SuiviProspect> findAll();

	Optional<SuiviProspect> findTopByOrderByIdDesc();

	List<SuiviProspect> findByProspectIdOrderByDateDesc(long id);

}
