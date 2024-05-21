package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Enfant;

@Repository
public interface EnfantRepository extends JpaRepository<Enfant, Long> {
	List<Enfant> findAll();
}
