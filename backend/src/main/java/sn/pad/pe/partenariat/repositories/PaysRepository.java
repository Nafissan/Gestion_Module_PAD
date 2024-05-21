package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Pays;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
public interface PaysRepository extends JpaRepository<Pays, Long> {
	Optional<Pays> findPaysByCode(String code);

	List<Pays> findAll();
}
