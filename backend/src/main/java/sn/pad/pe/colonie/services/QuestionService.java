package sn.pad.pe.colonie.services;
import java.util.List;

import sn.pad.pe.colonie.dto.QuestionDTO;

public interface QuestionService {
    public QuestionDTO saveQuestion(QuestionDTO question);

    public QuestionDTO getQuestionById(Long id);

    public List<QuestionDTO> getAllQuestions();
    public boolean updateQuestion(QuestionDTO questionDto);

    public boolean deleteQuestion(Long id);
}
