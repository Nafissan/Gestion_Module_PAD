package sn.pad.pe.partenariat.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.PlanProspection;

public interface PlanprospectionRepository extends JpaRepository<PlanProspection, Long> {

	PlanProspection findPlanprospectionById(Long id);

	Optional<PlanProspection> findPlanprospectionByLibelle(String libelle);

	Optional<PlanProspection> findTopByOrderByIdDesc();
}
