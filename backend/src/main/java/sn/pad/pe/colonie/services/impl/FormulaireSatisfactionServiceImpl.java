package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.repositories.FormulaireSatisfactionRepository;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;
import sn.pad.pe.colonie.services.ReponseService;

@Service
public class FormulaireSatisfactionServiceImpl implements FormulaireSatisfactionService {

    @Autowired
    private FormulaireSatisfactionRepository formulaireSatisfactionRepository;


    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ReponseService reponseService;


    @Override
    public List<FormulaireSatisfactionDTO> getAllFormulaires() {
        List<FormulaireSatisfaction> formulaires = formulaireSatisfactionRepository.findAll();
        return formulaires.stream()
                .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionDTO.class))
                .collect(Collectors.toList());
    }

    
    
    @Override
    @Transactional
    public boolean deleteFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
        Optional<FormulaireSatisfaction> formulaireOptional = formulaireSatisfactionRepository.findById(formulaireDTO.getId());

        if (formulaireOptional.isPresent()) {
            FormulaireSatisfaction formulaire = formulaireOptional.get();
            System.out.println("Formulaire trouvé : " + formulaire);
            
            // Supprimer les réponses associées
            reponseService.deleteReponsesByFormulaireId(formulaire.getId());
            
            // Supprimer le formulaire
            formulaireSatisfactionRepository.delete(formulaire);
            System.out.println("Formulaire supprimé : " + formulaire);
            
            return true;
        } else {
            System.out.println("Formulaire non trouvé pour l'ID : " + formulaireDTO.getId());
        }

        return false;
    }
   @Override
    @Transactional
    public FormulaireSatisfactionDTO saveFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
        FormulaireSatisfaction formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfaction.class);
        FormulaireSatisfaction savedFormulaire = formulaireSatisfactionRepository.save(formulaire);

        return modelMapper.map(savedFormulaire, FormulaireSatisfactionDTO.class);
    }
    
    
    
    
    


}
