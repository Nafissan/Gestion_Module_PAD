package sn.pad.pe.pelerinage.services.impl;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.configurations.exception.ParticipantColonieException;
import sn.pad.pe.configurations.sms.SmsService;
import sn.pad.pe.dotation.bo.Notification;
import sn.pad.pe.dotation.repositories.NotificationRepository;
import sn.pad.pe.pelerinage.bo.DossierPelerinage;
import sn.pad.pe.pelerinage.bo.Pelerin;
import sn.pad.pe.pelerinage.bo.Substitut;
import sn.pad.pe.pelerinage.dto.DossierPelerinageDTO;
import sn.pad.pe.pelerinage.dto.PelerinDTO;
import sn.pad.pe.pelerinage.dto.PelerinStatsDTO;
import sn.pad.pe.pelerinage.dto.SubstitutDTO;
import sn.pad.pe.pelerinage.repositories.PelerinRepository;
import sn.pad.pe.pelerinage.services.DossierPelerinageService;
import sn.pad.pe.pelerinage.services.PelerinService;
import sn.pad.pe.pelerinage.services.SubstitutService;
import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.dto.AgentDTO;
import sn.pad.pe.pss.services.AgentService;

@Service

public class PelerinServiceImpl implements PelerinService {

    @Autowired
    private PelerinRepository pelerinRepository;

    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private ModelMapper modelMapper;
    
    @Autowired
    private DossierPelerinageService dossierPelerinageService;
    
    @Autowired
    private AgentService agentService;
    @Autowired
    private SubstitutService substitutService;
    @Override
    public PelerinDTO savePelerin(PelerinDTO pelerinDTO) {
        convertBase64FieldsToBytes(pelerinDTO);

        DossierPelerinage dossier = modelMapper.map(dossierPelerinageService.getDossierPelerinageByEtat(), DossierPelerinage.class);
        pelerinDTO.setDossierPelerinage(dossier);
        Pelerin pelerin = modelMapper.map(pelerinDTO, Pelerin.class);
        Pelerin savedPelerin = pelerinRepository.save(pelerin);

        return modelMapper.map(savedPelerin, PelerinDTO.class);
    }

    @Override
    public List<PelerinDTO> getAllPelerins() {
        List<Pelerin> liste = pelerinRepository.findAll();
        if (liste == null || liste.isEmpty()) {
            System.out.println("No pelerins found in the database.");
            return new ArrayList<>();
        }
        try {
            return liste.stream()
                .map(pelerin -> {
                    PelerinDTO dto = mapToDto(pelerin);
                    convertBytesFieldsToBase64(dto);
                    return dto;
                })
                .collect(Collectors.toList());
        } catch (Exception e) {
            System.out.print("Error retrieving Pelerins: " + e.getMessage());
            throw new RuntimeException("Failed to retrieve Pelerins", e);
        }
    }

    @Override
    public List<PelerinDTO> getPelerinsByDossierEtat() {
        DossierPelerinageDTO dossierPelerinage = dossierPelerinageService.getDossierPelerinageByEtat(); 
        if (dossierPelerinage != null) {
            return getPelerinsByDossier(modelMapper.map(dossierPelerinage, DossierPelerinage.class));
        }
        return new ArrayList<>();
    }

    @Override
    public List<PelerinDTO> getPelerinsByDossier(DossierPelerinage dossierId) {
        List<Pelerin> pelerins = pelerinRepository.findByDossierPelerinage(dossierId);
        
        return pelerins.stream()
                           .map(pelerin -> {
                                PelerinDTO dto = mapToDto(pelerin);
                                convertBytesFieldsToBase64(dto);
                                return dto;
                            })
                            .collect(Collectors.toList());
    }

    @Override
    public boolean deletePelerin(PelerinDTO pelerinDTO) {
        Optional<Pelerin> pelerin = pelerinRepository.findById(pelerinDTO.getId());
        if (pelerin.isPresent()) {
            pelerinRepository.delete(pelerin.get());
            return true;
        }
        return false;
    }

    @Override
    public void deleteAllPelerins() {
        try {            
            pelerinRepository.deleteAll();
            
            System.out.println("Tous les pelerins avec le statut 'A VALIDER' ou 'REJETER' ont été supprimés avec succès.");
        } catch (Exception e) {
            System.err.println("Erreur lors de la suppression des pelerins : " + e.getMessage());
        }
    }

    @Override
    public List<PelerinDTO> getPelerinsApte() {
        DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByEtat();
        if (dossier != null) {
            List<Pelerin> pelerins = pelerinRepository.findByDossierPelerinageAndStatus(modelMapper.map(dossier, DossierPelerinage.class),"VALIDER");
            return pelerins.stream()
                    .map(pelerin -> {
                        PelerinDTO dto = mapToDto(pelerin);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public List<PelerinDTO> getPelerinsByAnnee(String annee) {
        DossierPelerinageDTO dossier = dossierPelerinageService.getDossierPelerinageByAnnee(annee);
        if (dossier != null) {
            List<Pelerin> pelerins = pelerinRepository.findByDossierPelerinageAndStatus(modelMapper.map(dossier, DossierPelerinage.class), "VALIDER");
            return pelerins.stream()
                    .map(pelerin -> {
                        PelerinDTO dto = mapToDto(pelerin);
                        convertBytesFieldsToBase64(dto);
                        return dto;
                    })
                    .collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public PelerinStatsDTO getPelerinStatisticsByAnnee(String annee) {
        List<PelerinDTO> pelerins;
        if (annee != null && !annee.isEmpty()) {
            pelerins = getPelerinsByAnnee(annee);
        } else {
            pelerins = getAllPelerins();
        }

        PelerinStatsDTO statistics = new PelerinStatsDTO();
        statistics.setTotalPelerins((long) pelerins.size());

        long age40to50Count = pelerins.stream()
            .filter(pelerin -> {
                int age = calculateAge(pelerin.getAgent().getDateNaissance());
                return age >= 40 && age < 50;
            })
            .count();
        statistics.setAge40to50(age40to50Count);

        long age50to60Count = pelerins.stream()
            .filter(pelerin -> {
                int age = calculateAge(pelerin.getAgent().getDateNaissance());
                return age >= 50 && age < 60;
            })
            .count();
        statistics.setAge50to60(age50to60Count);

        long age60to70Count = pelerins.stream()
            .filter(pelerin -> {
                int age = calculateAge(pelerin.getAgent().getDateNaissance());
                return age >= 60 && age < 70;
            })
            .count();
        statistics.setAge60to70(age60to70Count);

        statistics.setMaleCount(pelerins.stream().filter(pelerin -> "masculin".equalsIgnoreCase(pelerin.getAgent().getSexe().toString())).count());
        statistics.setFemaleCount(pelerins.stream().filter(pelerin -> "feminin".equalsIgnoreCase(pelerin.getAgent().getSexe().toString())).count());

        return statistics;
    }

    private int calculateAge(Date birthDate) {
        if (birthDate == null) {
            return 0; // ou gérer le cas différemment selon les besoins
        }
        LocalDate localBirthDate = birthDate.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Period.between(localBirthDate, LocalDate.now()).getYears();
    }
@Override
public boolean updatePelerin(PelerinDTO updatedPelerin) {
    Optional<Pelerin> pelerinOptional = pelerinRepository.findById(updatedPelerin.getId());
    if (pelerinOptional.isPresent()) {
        if ("NON APTE".equalsIgnoreCase(updatedPelerin.getStatus()) && updatedPelerin.getType().equals("triage")) {
            SubstitutDTO substitut = substitutService.generateSubstitutDTO(updatedPelerin.getAgent().getSexe());            
            Substitut substitut2 = pelerinOptional.get().getSubstitut(); 
            pelerinRepository.delete(pelerinOptional.get());
            Pelerin newPelerin = new Pelerin();
            modelMapper.map(substitut2, newPelerin);
            newPelerin.setStatus("A VERIFIER");
            newPelerin.setSubstitut(modelMapper.map(substitut,Substitut.class));
            pelerinRepository.save(newPelerin);

            return true;
        } else {
            convertBase64FieldsToBytes(updatedPelerin);

            Optional<Pelerin> existingPelerin = pelerinRepository.findByAgent(updatedPelerin.getAgent());

            if (existingPelerin.isPresent() && !existingPelerin.get().getId().equals(updatedPelerin.getId())) {
                throw new ParticipantColonieException("Le pèlerin existe déjà ");
            }

            Pelerin pelerin = pelerinOptional.get();
            modelMapper.map(updatedPelerin, pelerin);
            pelerinRepository.save(pelerin);

            return true;
        }
    } else {
        return false;
    }
}


    private PelerinDTO mapToDto(Pelerin pelerin) {
        return modelMapper.map(pelerin, PelerinDTO.class);
    }

    private void convertBytesFieldsToBase64(PelerinDTO pelerinDTO) {
        if (pelerinDTO.getDocumentBytes() != null) {
            pelerinDTO.setDocument(Base64.getEncoder().encodeToString(pelerinDTO.getDocumentBytes()));
        }
        if (pelerinDTO.getFicheMedicalBytes() != null) {
            pelerinDTO.setFicheMedical(Base64.getEncoder().encodeToString(pelerinDTO.getFicheMedicalBytes()));
        }
        if (pelerinDTO.getPassportBytes() != null) {
            pelerinDTO.setPassport(Base64.getEncoder().encodeToString(pelerinDTO.getPassportBytes()));
        }
    }
@Override
    public boolean sendMessages() {
        Notification notificationColonie= notificationRepository.findByModule("PELERINAGE");
        
        if (notificationColonie.isActive()) {
            DossierPelerinageDTO dossierPelerinageDTO= dossierPelerinageService.getDossierPelerinageByEtat();
            List<Pelerin> pelerins = pelerinRepository.findByDossierPelerinageAndStatus(modelMapper.map(dossierPelerinageDTO, DossierPelerinage.class),"APTE");
            for (Pelerin d : pelerins) {
                AgentDTO agent = agentService.getAgentByMatricule(d.getAgent().getMatricule()) ;

                // Send sms
                String sms = "Bonjour " + agent.getPrenom() + " " + agent.getNom()
                        + ".Vous etes selectionne pour participer au pelerinage de l'annee"+dossierPelerinageDTO.getAnnee()+". Vous recevrez les instructions concernant le pelerinage ulterieurement!";

             SmsService.send(agent.getMatricule(),"776844623", sms);
            }
            return true;
        }
        return false;
    }
    private void convertBase64FieldsToBytes(PelerinDTO pelerinDTO) {
        if (pelerinDTO.getDocument() != null) {
            pelerinDTO.setFicheMedicalBytes(Base64.getDecoder().decode(pelerinDTO.getDocument()));
        }
        if (pelerinDTO.getFicheMedical() != null) {
            pelerinDTO.setFicheMedicalBytes(Base64.getDecoder().decode(pelerinDTO.getFicheMedical()));
        }
        if (pelerinDTO.getPassport() != null) {
            pelerinDTO.setPassportBytes(Base64.getDecoder().decode(pelerinDTO.getPassport()));
        }
    }

    @Override
    public void assignAgentsToPelerinage(AgentDTO lAgent) {
    String lieuPelerinage = dossierPelerinageService.getDossierPelerinageByEtat().getLieuPelerinage();

    List<AgentDTO> agentsHomme = agentService.getAgentsBySexe("m");
    List<AgentDTO> agentsFemme = agentService.getAgentsBySexe("f");

    int nombreAgentsHomme = lieuPelerinage.equalsIgnoreCase("Mecque") ? 5 : 2;
    int nombreAgentsFemme = lieuPelerinage.equalsIgnoreCase("Mecque") ? 3 : 1;

    List<AgentDTO> agentsHommeSelectionnes = selectRandomAgents(agentsHomme, nombreAgentsHomme);
    List<AgentDTO> agentsFemmeSelectionnes = selectRandomAgents(agentsFemme, nombreAgentsFemme);

    List<Pelerin> pelerins = createPelerins(agentsHommeSelectionnes, agentsFemmeSelectionnes,lAgent);
    pelerinRepository.saveAll(pelerins);
}

private List<AgentDTO> selectRandomAgents(List<AgentDTO> agents, int numberOfAgents) {
    if (agents.size() <= numberOfAgents) {
        return agents;
    }
    Collections.shuffle(agents);
    return agents.stream().limit(numberOfAgents).collect(Collectors.toList());
}

private List<Pelerin> createPelerins(List<AgentDTO> agentsHomme, List<AgentDTO> agentsFemme,AgentDTO lAgent) {
    List<Pelerin> pelerins = new ArrayList<>();
    pelerins.addAll(agentsHomme.stream().map(agent -> {
        Pelerin pelerin = new Pelerin();
        pelerin.setAgent(modelMapper.map(agent, Agent.class));
        pelerin.setStatus("A VERIFIER"); 
        pelerin.setMatriculeAgent(lAgent.getMatricule());
        pelerin.setNomAgent(lAgent.getNom());
        pelerin.setPrenomAgent(lAgent.getPrenom());
        pelerin.setType("triage");
        return pelerin;
    }).collect(Collectors.toList()));

    pelerins.addAll(agentsFemme.stream().map(agent -> {
        Pelerin pelerin = new Pelerin();
        pelerin.setAgent(modelMapper.map(agent, Agent.class));
        pelerin.setStatus("A VERIFIER"); 
        pelerin.setMatriculeAgent(lAgent.getMatricule());
        pelerin.setNomAgent(lAgent.getNom());
        pelerin.setPrenomAgent(lAgent.getPrenom());
        return pelerin;
    }).collect(Collectors.toList()));

    return pelerins;
}

@Override
public void assignedSubstitutToPelerins(SubstitutDTO substitutDTO,PelerinDTO pelerinDTO) {
    Pelerin pelerin = modelMapper.map(pelerinDTO, Pelerin.class);
    pelerin.setSubstitut(modelMapper.map(substitutDTO, Substitut.class));
    if(pelerinRepository.existsById(pelerin.getId())){
        pelerinRepository.save(pelerin);
    }
    throw new ParticipantColonieException("Le pèlerin n'existe pas ");
}
}