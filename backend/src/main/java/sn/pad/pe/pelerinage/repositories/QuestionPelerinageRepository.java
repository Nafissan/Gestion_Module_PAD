package sn.pad.pe.pelerinage.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pelerinage.bo.QuestionPelerinage;
@Repository

public interface QuestionPelerinageRepository extends JpaRepository<QuestionPelerinage, Long> {


}
