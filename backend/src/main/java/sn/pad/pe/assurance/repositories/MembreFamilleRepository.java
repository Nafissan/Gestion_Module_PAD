package sn.pad.pe.assurance.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.assurance.bo.MembreFamille;

public interface MembreFamilleRepository extends JpaRepository<MembreFamille, Long> {

	MembreFamille findMembreFamilleById(Long id);

	List<MembreFamille> findAll();

	Optional<MembreFamille> findTopByOrderByIdDesc();

	List<MembreFamille> findByAgentId(long id);

}
