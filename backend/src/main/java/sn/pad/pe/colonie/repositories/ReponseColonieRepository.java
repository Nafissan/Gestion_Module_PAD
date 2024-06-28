package sn.pad.pe.colonie.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.colonie.bo.Reponse;

@Repository
public interface ReponseColonieRepository extends JpaRepository<Reponse, Long> {
    List<Reponse> findByFormulaireId(Long formulaireId);

    void deleteByFormulaireId(Long formulaireId);
}

