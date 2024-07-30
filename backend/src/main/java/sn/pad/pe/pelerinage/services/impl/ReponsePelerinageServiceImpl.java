package sn.pad.pe.pelerinage.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pelerinage.bo.FormulaireSatisfactionPelerinage;
import sn.pad.pe.pelerinage.bo.ReponsePelerinage;
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.dto.ReponsePelerinageDTO;
import sn.pad.pe.pelerinage.repositories.ReponsePelerinageRepository;
import sn.pad.pe.pelerinage.services.FormulaireSatisfactionPelerinageService;
import sn.pad.pe.pelerinage.services.ReponsePelerinageService;

@Service
public class ReponsePelerinageServiceImpl implements ReponsePelerinageService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private FormulaireSatisfactionPelerinageService formulaireSatisfactionPelerinageService;

    @Autowired
    private ReponsePelerinageRepository reponseRepository;

    @Override
    public ReponsePelerinageDTO saveReponse(ReponsePelerinageDTO reponseDTO) {
        ReponsePelerinage reponse = mapper.map(reponseDTO, ReponsePelerinage.class);

        FormulaireSatisfactionPelerinage formulaire = reponse.getFormulaire();

        formulaire.getReponses().add(reponse);
        formulaireSatisfactionPelerinageService.updateFormulaire(mapper.map(formulaire, FormulaireSatisfactionPelerinageDTO.class));

        ReponsePelerinage savedReponse = reponseRepository.save(reponse);

        return mapper.map(savedReponse, ReponsePelerinageDTO.class);
    }

    @Override
    public void deleteReponse(ReponsePelerinage reponse) {
        reponseRepository.delete(reponse);
    }

    @Override
    public List<ReponsePelerinageDTO> getReponsesByFormulaireId(FormulaireSatisfactionPelerinageDTO formulaireId) {
        List<ReponsePelerinage> reponses = reponseRepository.findByFormulaire(mapper.map(formulaireId, FormulaireSatisfactionPelerinage.class));
        return reponses.stream()
                .map(reponse -> mapper.map(reponse, ReponsePelerinageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<ReponsePelerinageDTO> getReponses() {
        List<ReponsePelerinage> reponses = reponseRepository.findAll();
        System.out.println("Contenu : " + reponses.isEmpty());
        return reponses.stream()
                .map(reponse -> mapper.map(reponse, ReponsePelerinageDTO.class))
                .collect(Collectors.toList());
    }    private static final Logger logger = LoggerFactory.getLogger(ReponsePelerinageServiceImpl.class);

    @Override
    public ReponsePelerinageDTO updateReponses(ReponsePelerinageDTO reponseDTO) {
        logger.info("Début de la méthode updateReponses avec reponseDTO: {}", reponseDTO);
    
        List<ReponsePelerinage> allReponses = reponseRepository.findAll();
    
        for (ReponsePelerinage existingReponse : allReponses) {
            if (existingReponse.getFormulaire().getId().equals(reponseDTO.getFormulaire().getId()) &&
                existingReponse.getQuestion().getId().equals(reponseDTO.getQuestion().getId())) {
                
            logger.info("Mise à jour de la réponse existante: {}", existingReponse);
            existingReponse.setReponse(reponseDTO.getReponse());
    
            ReponsePelerinage savedReponse = reponseRepository.save(existingReponse);
            logger.info("Réponse mise à jour sauvegardée: {}", savedReponse);
    
            return mapper.map(savedReponse, ReponsePelerinageDTO.class);
            }
        }
    
        logger.error("La réponse avec le formulaire et la question spécifiés n'a pas été trouvée.");
        throw new RuntimeException("La réponse avec le formulaire et la question spécifiés n'a pas été trouvée.");
    }

}