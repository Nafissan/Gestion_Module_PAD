package sn.pad.pe.colonie.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;

public interface FormulaireSatisfactionRepository extends JpaRepository<FormulaireSatisfaction, Long> {

    Optional<FormulaireSatisfaction> findByCodeDossier(Long id);

}