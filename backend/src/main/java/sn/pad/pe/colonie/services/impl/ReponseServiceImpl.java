package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.FormulaireSatisfaction;
import sn.pad.pe.colonie.bo.Reponse;
import sn.pad.pe.colonie.dto.ReponseDTO;
import sn.pad.pe.colonie.repositories.ReponseColonieRepository;
import sn.pad.pe.colonie.services.ReponseService;
@Service
public class ReponseServiceImpl implements ReponseService{
    @Autowired
    private ModelMapper mapper;
     @Autowired
    private ReponseColonieRepository reponseRepository;

     @Override
    public List<Reponse> saveReponses(List<Reponse> reponses) {
        return reponseRepository.saveAll(reponses);
    }
    @Override
    public void deleteReponsesByFormulaireId(Long formulaireId) {
        reponseRepository.deleteByFormulaireId(formulaireId);
    }
     @Override
    public List<ReponseDTO> getReponsesByFormulaireId(FormulaireSatisfaction formulaireId) {
        List<Reponse> reponses = reponseRepository.findByFormulaireId(formulaireId.getId());
        return reponses.stream()
                .map(reponse->
                    mapper.map(reponse, ReponseDTO.class)
                )
                .collect(Collectors.toList());
    }

}
