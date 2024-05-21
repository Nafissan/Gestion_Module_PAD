package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.Continent;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Repository
public interface ContinentRepository extends JpaRepository<Continent, Long> {
	Optional<Continent> findContinentByCode(String code);

	List<Continent> findAll();
}
