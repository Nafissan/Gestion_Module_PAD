package sn.pad.pe.pelerinage.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
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
    }

    @Override
    public ReponsePelerinageDTO updateReponses(ReponsePelerinageDTO reponseDTO) {
        Optional<ReponsePelerinage> existingReponseOpt = reponseRepository.findAll().stream()
                .filter(existingReponse -> existingReponse.getFormulaire().getId().equals(reponseDTO.getFormulaire().getId())
                        && existingReponse.getQuestion().getId().equals(reponseDTO.getQuestion().getId()))
                .findFirst();

        if (existingReponseOpt.isPresent()) {
            ReponsePelerinage existingReponse = existingReponseOpt.get();
            existingReponse.setReponse(reponseDTO.getReponse());

            ReponsePelerinage savedReponse = reponseRepository.save(existingReponse);

            return mapper.map(savedReponse, ReponsePelerinageDTO.class);
        } else {
            throw new RuntimeException("La réponse avec le formulaire et la question spécifiés n'a pas été trouvée.");
        }
    }

}