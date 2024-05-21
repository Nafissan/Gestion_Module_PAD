package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.CategorieLait;

@Repository
public interface CategorieLaitRepository extends JpaRepository<CategorieLait, Long> {
	List<CategorieLait> findAll();
}
