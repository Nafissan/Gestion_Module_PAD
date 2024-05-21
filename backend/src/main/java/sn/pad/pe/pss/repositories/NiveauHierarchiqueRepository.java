package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.NiveauHierarchique;

public interface NiveauHierarchiqueRepository extends JpaRepository<NiveauHierarchique, Long> {

	public NiveauHierarchique findByPosition(int position);
}
