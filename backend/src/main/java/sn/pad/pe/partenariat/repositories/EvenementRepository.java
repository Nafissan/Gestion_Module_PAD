package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.Evenement;

@Repository
public interface EvenementRepository extends JpaRepository<Evenement, Long> {

	Optional<Evenement> findEvenementByCode(String code);

	List<Evenement> findAll();

	Optional<Evenement> findTopByOrderByIdDesc();
}
