package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Question;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.dto.QuestionDTO;
import sn.pad.pe.colonie.repositories.FormulaireSatisfactionRepository;
import sn.pad.pe.colonie.repositories.QuestionRepository;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FormulaireSatisfactionServiceImpl implements FormulaireSatisfactionService {

    @Autowired
    private FormulaireSatisfactionRepository formulaireSatisfactionRepository;

   @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public List<FormulaireSatisfactionDTO> getAllFormulaires() {
        List<FormulaireSatisfaction> formulaires = formulaireSatisfactionRepository.findAll();
        return formulaires.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private FormulaireSatisfactionDTO convertToDto(FormulaireSatisfaction formulaire) {
        FormulaireSatisfactionDTO dto = modelMapper.map(formulaire, FormulaireSatisfactionDTO.class);
        dto.setReponses(formulaire.getReponses().entrySet().stream()
                .collect(Collectors.toMap(
                        entry -> modelMapper.map(entry.getKey(), QuestionDTO.class),
                        Map.Entry::getValue
                )));
        return dto;
    }
    @Override
    public boolean deleteFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
        Optional<FormulaireSatisfaction> formulaire = formulaireSatisfactionRepository.findById(formulaireDTO.getId());
        if(formulaire.isPresent()){
            formulaireSatisfactionRepository.delete(formulaire.get());
            return true;
        }
        return false;
    }

    @Override
    @Transactional
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
        FormulaireSatisfaction formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfaction.class);
        Map<Question, String> reponses = new HashMap<>();
        for (Map.Entry<Question, String> entry : formulaire.getReponses().entrySet()) {
            Question question = entry.getKey();
            if (question.getId() == null) {
                question = questionRepository.save(question);
            }
            reponses.put(question, entry.getValue());
        }
        formulaire.setReponses(reponses);

        FormulaireSatisfaction savedFormulaire = formulaireSatisfactionRepository.save(formulaire);
        return modelMapper.map(savedFormulaire, FormulaireSatisfactionDTO.class);
    }


}
