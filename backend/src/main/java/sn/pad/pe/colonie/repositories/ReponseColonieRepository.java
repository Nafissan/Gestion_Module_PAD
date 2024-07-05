package sn.pad.pe.colonie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.colonie.bo.Reponse;

@Repository
public interface ReponseColonieRepository extends JpaRepository<Reponse, Long> {

}

