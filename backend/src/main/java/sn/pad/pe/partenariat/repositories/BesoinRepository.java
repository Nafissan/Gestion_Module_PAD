
package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Besoin;

public interface BesoinRepository extends JpaRepository<Besoin, Long> {

	Besoin findBesoinById(Long id);

	List<Besoin> findBesoinByPlanprospectionId(long id);

	Optional<Besoin> findTopByOrderByIdDesc();
}