package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public ReponseDTO saveReponse(ReponseDTO reponseDTO) {
    Reponse reponse = mapper.map(reponseDTO, Reponse.class);

    Reponse savedReponse = reponseRepository.save(reponse); 

    return mapper.map(savedReponse, ReponseDTO.class); 
}


    @Override
    public void deleteReponsesByFormulaireId(Long formulaireId) {
        reponseRepository.deleteByFormulaire_Id(formulaireId);
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
    public ReponseDTO updateReponses(ReponseDTO reponseDTOs) {
        Reponse reponse = mapper.map(reponseDTOs, Reponse.class);

        Reponse savedReponse = reponseRepository.save(reponse); 
    
        return mapper.map(savedReponse, ReponseDTO.class); 
    }
}
