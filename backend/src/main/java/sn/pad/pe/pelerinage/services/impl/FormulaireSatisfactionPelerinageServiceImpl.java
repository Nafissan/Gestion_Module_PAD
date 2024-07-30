package sn.pad.pe.pelerinage.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import sn.pad.pe.pelerinage.bo.ReponsePelerinage;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.dto.ReponsePelerinageDTO;
import sn.pad.pe.pelerinage.repositories.FormulaireSatisfactionPelerinageRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
import sn.pad.pe.pelerinage.services.FormulaireSatisfactionPelerinageService;
import sn.pad.pe.pelerinage.services.ReponsePelerinageService;
@Service
public class FormulaireSatisfactionPelerinageServiceImpl implements FormulaireSatisfactionPelerinageService {


    @Autowired
    private FormulaireSatisfactionPelerinageRepository formulaireSatisfactionPelerinageRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ReponsePelerinageService reponsePelerinageService;

    @Autowired
    private DossierPelerinageService dossierPelerinageService;

    @Override
    public List<FormulaireSatisfactionPelerinageDTO> getAllFormulaires() {
        List<FormulaireSatisfactionPelerinage> formulaires = formulaireSatisfactionPelerinageRepository.findAll();
        return formulaires.stream()
                .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionPelerinageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public boolean deleteFormulaire(FormulaireSatisfactionPelerinageDTO formulaireDTO) {
        Optional<FormulaireSatisfactionPelerinage> formulaireOptional = formulaireSatisfactionPelerinageRepository.findById(formulaireDTO.getId());

        if (formulaireOptional.isPresent()) {
            FormulaireSatisfactionPelerinage formulaire = formulaireOptional.get();
            System.out.println("Formulaire trouvé : " + formulaire);

            List<ReponsePelerinageDTO> liste = reponsePelerinageService.getReponsesByFormulaireId(modelMapper.map(formulaireOptional.get(), FormulaireSatisfactionPelerinageDTO.class));
            for (ReponsePelerinageDTO reponse : liste) {
                    ReponsePelerinage reponse2 = modelMapper.map(reponse, ReponsePelerinage.class);
                    reponsePelerinageService.deleteReponse(reponse2);
                    System.out.println("Réponse supprimée : " + reponse);
            }

            formulaireSatisfactionPelerinageRepository.delete(formulaire);
            System.out.println("Formulaire supprimé : " + formulaire);

            return true;
        } else {
            System.out.println("Formulaire non trouvé pour l'ID: " + formulaireDTO.getId());
        }

        return false;
    }

    @Override
    @Transactional
    public FormulaireSatisfactionPelerinageDTO saveFormulaire(FormulaireSatisfactionPelerinageDTO formulaireDTO) {
        DossierPelerinage dossierPelerinage = modelMapper.map(dossierPelerinageService.getDossierPelerinageByEtat(), DossierPelerinage.class);
        formulaireDTO.setDossierPelerinage(dossierPelerinage);
        FormulaireSatisfactionPelerinage formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfactionPelerinage.class);
        FormulaireSatisfactionPelerinage savedFormulaire = formulaireSatisfactionPelerinageRepository.save(formulaire);

        return modelMapper.map(savedFormulaire, FormulaireSatisfactionPelerinageDTO.class);
    }

    @Override
    public List<FormulaireSatisfactionPelerinageDTO> getFormulairesByDossierEtat() {
        DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByEtat();
        if (dossier != null) {
            List<FormulaireSatisfactionPelerinage> formulaires = formulaireSatisfactionPelerinageRepository.findByDossierPelerinage(modelMapper.map(dossier, DossierPelerinage.class));
            return formulaires.stream()
                    .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionPelerinageDTO.class))
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public FormulaireSatisfactionPelerinageDTO updateFormulaire(FormulaireSatisfactionPelerinageDTO formulaireDTO) {
        FormulaireSatisfactionPelerinage formulaire = modelMapper.map(formulaireDTO, FormulaireSatisfactionPelerinage.class);
        FormulaireSatisfactionPelerinage savedFormulaire = formulaireSatisfactionPelerinageRepository.save(formulaire);

        return modelMapper.map(savedFormulaire, FormulaireSatisfactionPelerinageDTO.class);
    }

    @Override
    public List<FormulaireSatisfactionPelerinageDTO> getFormulairesByAnnee(String annee) {
        if (annee != null && !annee.isEmpty()) {
            DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByAnnee(annee);
            if (dossier != null) {
                List<FormulaireSatisfactionPelerinage> formulaires = formulaireSatisfactionPelerinageRepository.findByDossierPelerinage(modelMapper.map(dossier, DossierPelerinage.class));
                return formulaires.stream()
                        .map(formulaire -> modelMapper.map(formulaire, FormulaireSatisfactionPelerinageDTO.class))
                        .collect(Collectors.toList());
            }
        }
        return getAllFormulaires();
    }
    
}

