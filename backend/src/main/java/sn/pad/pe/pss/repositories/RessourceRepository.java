package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Ressource;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface RessourceRepository extends JpaRepository<Ressource, String> {

	Ressource findRessourceByNameLike(String name);

}
