package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.Zone;

@Repository
public interface ZoneRepository extends JpaRepository<Zone, Long> {
	Optional<Zone> findZoneByCode(String code);

	List<Zone> findAll();

	Optional<Zone> findTopByOrderByIdDesc();
}
