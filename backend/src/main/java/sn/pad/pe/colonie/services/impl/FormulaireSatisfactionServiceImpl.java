package sn.pad.pe.colonie.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import sn.pad.pe.colonie.bo.DossierColonie;
import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Reponse;
import sn.pad.pe.colonie.dto.DossierColonieDTO;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.dto.ReponseDTO;
import sn.pad.pe.colonie.repositories.FormulaireSatisfactionRepository;
import sn.pad.pe.colonie.services.DossierColonieService;
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
   @Autowired
    private DossierColonieService dossierColonieService;

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
            
            List<ReponseDTO> liste = reponseService.getReponses();
            for (ReponseDTO reponse : liste) {
                if (reponse.getFormulaire().getId().equals(formulaire.getId())) {
                    Reponse reponse2 = modelMapper.map(reponse, Reponse.class);
                    reponseService.deleteReponse(reponse2);
                    System.out.println("Réponse supprimée : " + reponse);
                }
            }
            
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
        DossierColonie dossierColonie = modelMapper.map(dossierColonieService.getDossierColonieByEtat(), DossierColonie.class) ;
        formulaireDTO.setCodeDossier(dossierColonie);
        FormulaireSatisfaction formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfaction.class);
        FormulaireSatisfaction savedFormulaire = formulaireSatisfactionRepository.save(formulaire);

        return modelMapper.map(savedFormulaire, FormulaireSatisfactionDTO.class);
    }

 @Override
    public FormulaireSatisfactionDTO getFormulaireByDossierEtat() {
        DossierColonieDTO dossier = dossierColonieService.getDossierColonieByEtat();
        if (dossier != null) {
            Optional<FormulaireSatisfaction> formulaire = formulaireSatisfactionRepository.findByCodeDossier(modelMapper.map(dossier, DossierColonie.class));
            if (formulaire.isPresent()) {
                return modelMapper.map(formulaire.get(), FormulaireSatisfactionDTO.class);
            }
        }
        return null;
    }

@Override
public FormulaireSatisfactionDTO updateFormulaire(FormulaireSatisfactionDTO formulaireDTO) {
    FormulaireSatisfaction formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfaction.class);
    FormulaireSatisfaction savedFormulaire = formulaireSatisfactionRepository.save(formulaire);

    return modelMapper.map(savedFormulaire, FormulaireSatisfactionDTO.class);
}
    
@Override
public List<FormulaireSatisfactionDTO> getFormulairesByAnnee(String annee) {
    if (annee != null && !annee.isEmpty()) {
        DossierColonieDTO dossier = dossierColonieService.getDossierColonieByAnnee(annee);
        if (dossier != null) {
            List<FormulaireSatisfaction> formulaires = new ArrayList<>();
            formulaires.add(formulaireSatisfactionRepository.findByCodeDossier(modelMapper.map(dossier, DossierColonie.class)).get());
            return formulaires.stream()
                    .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionDTO.class))
                    .collect(Collectors.toList());
        }
    } 
    return getAllFormulaires();

}

}
