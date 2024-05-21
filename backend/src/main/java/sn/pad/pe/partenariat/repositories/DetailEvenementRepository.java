package sn.pad.pe.partenariat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.DetailEvenement;

public interface DetailEvenementRepository extends JpaRepository<DetailEvenement, Long> {
	List<DetailEvenement> findDetailEvenementByCode(Long code);

	List<DetailEvenement> findAll();

}
