package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Dotation;
import sn.pad.pe.dotation.bo.SuiviDotation;

@Repository
public interface SuiviDotationRepository extends JpaRepository<SuiviDotation, Long> {

	List<SuiviDotation> findSuiviDotationByDotation(Dotation dotation);

	List<SuiviDotation> findSuiviDotationsByAnneeAndMois(int annee, String mois);

	List<SuiviDotation> findSuiviDotationsByDotationAndAnneeAndMois(Dotation dotation, int annee, String mois);

	List<SuiviDotation> findByDotationId(Long idDotation);
}
