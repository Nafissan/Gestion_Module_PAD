package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.PointFocal;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

@Repository
public interface PointFocalRepository extends JpaRepository<PointFocal, Long> {
	PointFocal findPointFocalById(Long id);

	Optional<PointFocal> findTopByOrderByIdDesc();

	Optional<PointFocal> findByUniteAndAgent(UniteOrganisationnelle unite, Agent agent);

	List<PointFocal> findByActive(boolean b);
}
