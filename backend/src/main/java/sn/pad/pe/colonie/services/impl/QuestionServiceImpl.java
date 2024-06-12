package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.dto.QuestionDTO;
import sn.pad.pe.colonie.repositories.QuestionRepository;
import sn.pad.pe.colonie.services.QuestionService;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ModelMapper modelMapper;

   

    @Override
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(question -> modelMapper.map(question, QuestionDTO.class))
                .collect(Collectors.toList());
    }

   
}
