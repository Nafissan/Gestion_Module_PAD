package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Conge;
import sn.pad.pe.pss.bo.HistoriqueConge;

/**
 * 
 * @author mamadouseydou.diallo
 *
 */
public interface HistoriqueCongeRepository extends JpaRepository<HistoriqueConge, Long> {

	List<HistoriqueConge> findHistoriqueCongesByConge(Conge conge);

}
