package sn.pad.pe.dotation.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Dotation;

@Repository
public interface DotationRepository extends JpaRepository<Dotation, Long> {
	List<Dotation> findAll();

	Optional<Dotation> findDotationByCode(String code);

	@Query("select d from Dotation d where (d.nbreAttribution < d.typeDotation.nbreMois) and (d.nbreAttribution >= 1) and  (EXTRACT(DAY FROM  d.createdAt) BETWEEN  :startDate AND :endDate)")
	List<Dotation> findDotationsEncours(@Param("startDate")int startDate,@Param("endDate")int endDate);
	
	List<Dotation> findByBeneficiaireMatricule(String matricule);
}
