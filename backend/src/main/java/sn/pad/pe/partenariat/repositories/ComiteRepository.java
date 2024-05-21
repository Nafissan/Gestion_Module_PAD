
package sn.pad.pe.partenariat.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Comite;

public interface ComiteRepository extends JpaRepository<Comite, Long> {

	Comite findComiteById(Long id);

	Optional<Comite> findComiteByLibelle(String libelle);

	// Optional<Comite> findTopByOrderByIdDesc();
	Optional<Comite> findTopByOrderByIdDesc();
}