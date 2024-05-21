package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Activite;

public interface ActiviteRepository extends JpaRepository<Activite, Long> {
	Optional<Activite> findActiviteByCode(String code);

	List<Activite> findAll();
}
