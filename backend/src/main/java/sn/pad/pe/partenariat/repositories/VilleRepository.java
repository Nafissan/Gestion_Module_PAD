package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Ville;

public interface VilleRepository extends JpaRepository<Ville, Long> {
	Optional<Ville> findVilleByCode(String code);

	List<Ville> findAll();
}
