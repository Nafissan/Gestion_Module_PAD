package sn.pad.pe.colonie.services;

import java.util.List;

import sn.pad.pe.colonie.dto.ColonDTO;

public interface ColonService {
    public List<ColonDTO> getColons();
    ColonDTO saveColon(ColonDTO colonDTO);


}
