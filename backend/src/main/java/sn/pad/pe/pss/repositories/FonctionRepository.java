package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

public interface FonctionRepository extends JpaRepository<Fonction, Long> {

	public List<Fonction> findFonctionByNom(String nom);

	public List<Fonction> findFonctionByUniteOrganisationnelle(List<UniteOrganisationnelle> uniteOrganisationnelle);

}
