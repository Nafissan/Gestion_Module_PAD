package sn.pad.pe.colonie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import sn.pad.pe.colonie.bo.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
