package sn.pad.pe.pelerinage.services;

import java.util.List;

import sn.pad.pe.pelerinage.bo.QuestionPelerinage;
import sn.pad.pe.pelerinage.dto.QuestionPelerinageDTO;

public interface QuestionPelerinageService {
  public QuestionPelerinage getQuestionPelerinage(Long id);
    public List<QuestionPelerinageDTO> getAllQuestionPelerinages();
}
