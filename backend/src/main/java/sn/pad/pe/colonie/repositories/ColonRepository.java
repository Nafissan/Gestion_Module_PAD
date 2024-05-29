package sn.pad.pe.colonie.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.Colon;

public interface ColonRepository extends JpaRepository<Colon, Long>{
    Optional<Colon> findByMatriculeParent(String matricule);
}
