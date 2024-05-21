package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.Convention;

@Repository
public interface ConventionRepository extends JpaRepository<Convention, Long> {
	List<Convention> findConventionByStatut(int codeStatut);

	List<Convention> findAll();

	Optional<Convention> findTopByOrderByIdDesc();
}
