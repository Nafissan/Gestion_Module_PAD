package sn.pad.pe.colonie.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.repositories.FormulaireSatisfactionRepository;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FormulaireSatisfactionServiceImpl implements FormulaireSatisfactionService {

    @Autowired
    private FormulaireSatisfactionRepository formulaireSatisfactionRepository;

 

    @Autowired
    private ModelMapper modelMapper;

   
    @Override
    public FormulaireSatisfactionDTO getFormulaireById(Long id) {
        FormulaireSatisfaction formulaire = formulaireSatisfactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FormulaireSatisfaction not found with id: " + id));
        return modelMapper.map(formulaire, FormulaireSatisfactionDTO.class);
    }

    @Override
    public List<FormulaireSatisfactionDTO> getAllFormulaires() {
        return formulaireSatisfactionRepository.findAll().stream()
                .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteFormulaire(Long id) {
        FormulaireSatisfaction formulaire = formulaireSatisfactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("FormulaireSatisfaction not found with id: " + id));
        formulaireSatisfactionRepository.delete(formulaire);
    }

    @Override
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
        FormulaireSatisfaction formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfaction.class);
        FormulaireSatisfaction savedFormulaire = formulaireSatisfactionRepository.save(formulaire);        
        return modelMapper.map(savedFormulaire, FormulaireSatisfactionDTO.class);
    }


    @Override
    public FormulaireSatisfactionDTO getFormulaireByCodeDossier(String code) {
        FormulaireSatisfaction formulaire = formulaireSatisfactionRepository.findByCodeDossier(code);
        if (formulaire != null) {
            return modelMapper.map(formulaire, FormulaireSatisfactionDTO.class);
        } else {
            throw new ResourceNotFoundException("Formulaire not found with code dossier: " + code);
        }
    }
}
