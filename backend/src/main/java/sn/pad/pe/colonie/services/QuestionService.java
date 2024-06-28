package sn.pad.pe.colonie.services;
import java.util.List;

import sn.pad.pe.colonie.bo.Question;
import sn.pad.pe.colonie.dto.QuestionDTO;

public interface QuestionService {
    
    public Question getQuestion(Long id);
    public List<QuestionDTO> getAllQuestions();
    
}
