package sn.pad.pe.colonie.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.RapportProspection;

public interface RapportProspectionRepository extends JpaRepository<RapportProspection, Long>{
    Optional<RapportProspection> findByCodeDossier(String code);

}
