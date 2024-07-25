package sn.pad.pe.pelerinage.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ResourceNotFoundException;
import sn.pad.pe.pelerinage.bo.QuestionPelerinage;
import sn.pad.pe.pelerinage.dto.QuestionPelerinageDTO;
import sn.pad.pe.pelerinage.repositories.QuestionPelerinageRepository;
import sn.pad.pe.pelerinage.services.QuestionPelerinageService;
@Service

public class QuestionPelerinageServiceImpl implements QuestionPelerinageService {
  @Autowired
    private QuestionPelerinageRepository questionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
     public QuestionPelerinage getQuestionPelerinage(Long id) {
        QuestionPelerinage question= questionRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        return question;
    }

    @Override
    public List<QuestionPelerinageDTO> getAllQuestionPelerinages() {
        return questionRepository.findAll().stream()
                .map(question -> modelMapper.map(question, QuestionPelerinageDTO.class))
                .collect(Collectors.toList());
    }
}
