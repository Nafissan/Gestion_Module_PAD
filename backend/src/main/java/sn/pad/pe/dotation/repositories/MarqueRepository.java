package sn.pad.pe.dotation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Marque;

@Repository
public interface MarqueRepository extends JpaRepository<Marque, Long> {

}
