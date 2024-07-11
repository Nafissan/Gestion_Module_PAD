package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.ColonDTO;
import sn.pad.pe.colonie.dto.ColonStatisticsDTO;

public interface ColonService {
    public List<ColonDTO> getColons();
    ColonDTO saveColon(ColonDTO colonDTO);
    List<ColonDTO> getColonsByAnnee(String annee);
    ColonStatisticsDTO getColonStatisticsByAnnee(String annee);
    public List<ColonDTO> getColonsByDossierEtat();

}
