package sn.pad.pe.colonie.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.colonie.bo.Colon;
import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.repositories.ColonRepository;
import sn.pad.pe.colonie.services.ColonService;
import sn.pad.pe.configurations.exception.ResourceNotFoundException;

@Service
public class ColonServiceImpl implements ColonService {

    @Autowired
    private ColonRepository colonRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<ColonDTO> getColons() {
        return colonRepository.findAll().stream()
                .map(colon -> modelMapper.map(colon, ColonDTO.class))
                .collect(Collectors.toList());
    }
    @Override
    public ColonDTO saveColon(ColonDTO colonDTO) {
        Colon colon = modelMapper.map(colonDTO, Colon.class);
        return modelMapper.map(colonRepository.save(colon), ColonDTO.class);
    }
    @Override
    public ColonDTO getColonByMatriculeParent(String matricule) {
        Optional<Colon> colon = colonRepository.findByMatriculeParent(matricule);
        if(colon.isPresent()) return modelMapper.map(colon, ColonDTO.class);
        else throw  new ResourceNotFoundException("Colon not found with matriculeParent: " + matricule);
    }

    @Override
    public ColonDTO getColonByCodeDossier(String code) {
        Optional<Colon> colon = colonRepository.findByCodeDossier(code);
        if(colon.isPresent()) return modelMapper.map(colon, ColonDTO.class);
        else throw  new ResourceNotFoundException("Colon not found with codeDossier: " + code);
    }

    @Override
    public boolean update(ColonDTO colonDTO) {
        Optional<Colon> colonOptional = colonRepository.findById(colonDTO.getId());
        if (colonOptional.isPresent()) {
            Colon colon = modelMapper.map(colonDTO, Colon.class);
            colonRepository.save(colon);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public ColonDTO getColonById(Long id) {
        Optional<Colon> colon = colonRepository.findById(id);
        if(colon.isPresent()) return modelMapper.map(colon, ColonDTO.class);
        else throw new ResourceNotFoundException("Colon not found with id: " + id);
        
    }
    @Override
    public boolean deleteColonById(Long id) {
        if (colonRepository.existsById(id)) {
            colonRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
