package sn.pad.pe.partenariat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Entreprise;

public interface EntrepriseRepository extends JpaRepository<Entreprise, Long> {
	List<Entreprise> findEntrepriseByCode(String code);

	List<Entreprise> findAll();

}
