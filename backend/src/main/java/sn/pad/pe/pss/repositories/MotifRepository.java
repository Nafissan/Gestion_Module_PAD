package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pss.bo.Motif;

@Repository
public interface MotifRepository extends JpaRepository<Motif, Long> {

}
