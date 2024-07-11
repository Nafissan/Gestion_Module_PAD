package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Reponse;
import sn.pad.pe.colonie.dto.FormulaireSatisfactionDTO;
import sn.pad.pe.colonie.dto.ReponseDTO;
import sn.pad.pe.colonie.repositories.ReponseColonieRepository;
import sn.pad.pe.colonie.services.FormulaireSatisfactionService;
import sn.pad.pe.colonie.services.ReponseService;
@Service
public class ReponseServiceImpl implements ReponseService{
    @Autowired
    private ModelMapper mapper;
    @Autowired
    private FormulaireSatisfactionService formulaireSatisfactionService;
     @Autowired
    private ReponseColonieRepository reponseRepository;
    @Override
    public ReponseDTO saveReponse(ReponseDTO reponseDTO) {
        Reponse reponse = mapper.map(reponseDTO, Reponse.class);

        FormulaireSatisfaction formulaire = reponse.getFormulaire();

        formulaire.getReponses().add(reponse);
        formulaireSatisfactionService.updateFormulaire(mapper.map(formulaire, FormulaireSatisfactionDTO.class));
        Reponse savedReponse = reponseRepository.save(reponse);

        return mapper.map(savedReponse, ReponseDTO.class);
    }


    @Override
    public void deleteReponse(Reponse formulaireId) {
        reponseRepository.delete(formulaireId);
    }

    @Override
    public List<ReponseDTO> getReponsesByFormulaireId(Long formulaireId) {
        List<Reponse> reponses = reponseRepository.findByFormulaire(formulaireId);
        return reponses.stream()
                .map(reponse -> mapper.map(reponse, ReponseDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public List<ReponseDTO> getReponses() {
        List<Reponse> reponses = reponseRepository.findAll(); 
        System.out.print("Contenu "+reponses.isEmpty());
        return reponses.stream()
                               .map(reponse -> mapper.map(reponse, ReponseDTO.class))
                               .collect(Collectors.toList());
    }
    @Override
    public ReponseDTO updateReponses(ReponseDTO reponseDTO) {
        List<Reponse> allReponses = reponseRepository.findAll();

        for (Reponse existingReponse : allReponses) {
            if (existingReponse.getFormulaire().getId().equals(reponseDTO.getFormulaire().getId()) &&
                existingReponse.getQuestion().getId().equals(reponseDTO.getQuestion().getId())) {
                
                existingReponse.setReponse(reponseDTO.getReponse());

                Reponse savedReponse = reponseRepository.save(existingReponse);

                return mapper.map(savedReponse, ReponseDTO.class);
            }
        }

        throw new RuntimeException("La réponse avec le formulaire et la question spécifiés n'a pas été trouvée.");
    }
}
