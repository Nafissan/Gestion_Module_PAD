package sn.pad.pe.partenariat.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Domaine;

public interface DomaineRepository extends JpaRepository<Domaine, Long> {

	Domaine findDomaineById(Long id);

	Optional<Domaine> findDomaineByType(String type);

	Optional<Domaine> findTopByOrderByIdDesc();

}