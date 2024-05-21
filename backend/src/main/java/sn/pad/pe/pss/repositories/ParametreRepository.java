package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Parametres;

public interface ParametreRepository extends JpaRepository<Parametres, Integer> {

	public List<Parametres> findParametresByCode(String mc);

}
