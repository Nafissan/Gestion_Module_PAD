package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.EtapeAbsence;

/**
 * 
 * @author abdou.diop
 *
 */
public interface EtapeAbsenceRepository extends JpaRepository<EtapeAbsence, Long> {

	EtapeAbsence findEtapeAbsencetById(Long id);
}
