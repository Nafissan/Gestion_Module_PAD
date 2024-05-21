package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Conjoint;

@Repository
public interface ConjointRepository extends JpaRepository<Conjoint, Long> {
	List<Conjoint> findAll();
}
