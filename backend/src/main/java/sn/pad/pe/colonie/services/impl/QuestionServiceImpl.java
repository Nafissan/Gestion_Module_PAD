package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Question;
import sn.pad.pe.colonie.dto.QuestionDTO;
import sn.pad.pe.colonie.repositories.QuestionRepository;
import sn.pad.pe.colonie.services.QuestionService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public QuestionDTO saveQuestion(QuestionDTO questionDto) {
        Question questionSaved = modelMapper.map(questionDto, Question.class);
        return modelMapper.map(questionRepository.save(questionSaved), QuestionDTO.class);
    }

    @Override
    public QuestionDTO getQuestionById(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            return modelMapper.map(question.get(), QuestionDTO.class);
        } else {
            throw new ResourceNotFoundException("Question not found with id: " + id);
        }
    }

    @Override
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(question -> modelMapper.map(question, QuestionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean updateQuestion(QuestionDTO questionDto) {
        Optional<Question> questionToUpdate = questionRepository.findById(questionDto.getId());
        if (questionToUpdate.isPresent()) {
            questionRepository.save(modelMapper.map(questionDto, Question.class));
            return true;
        } else {
            throw new ResourceNotFoundException("Question not found with id: " + questionDto.getId());
        }
    }

    @Override
    public boolean deleteQuestion(Long id) {
        Optional<Question> question = questionRepository.findById(id);
        if (question.isPresent()) {
            questionRepository.deleteById(id);
            return true;
        } else {
            throw new ResourceNotFoundException("Question not found with id: " + id);
        }
    }
}
