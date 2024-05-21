package sn.pad.pe.pss.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import sn.pad.pe.pss.bo.Compte;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
public interface CompteRepository extends JpaRepository<Compte, Long> {
	Compte findCompteByUsername(String username);

	@Query("select c from Compte c where c.agent.id like :x")
	Optional<Compte> findCompteByAgent(@Param("x") Long id);
}
