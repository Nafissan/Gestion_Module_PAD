package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.partenariat.bo.Prospect;

public interface ProspectRepository extends JpaRepository<Prospect, Long> {
	List<Prospect> findProspectByStatut(int codeStatut);

	List<Prospect> findAll();

	Optional<Prospect> findTopByOrderByIdDesc();

}
