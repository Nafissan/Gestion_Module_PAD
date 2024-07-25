package sn.pad.pe.pelerinage.services;

import java.util.List;

import sn.pad.pe.pelerinage.bo.ReponsePelerinage;
import sn.pad.pe.pelerinage.dto.FormulaireSatisfactionPelerinageDTO;
import sn.pad.pe.pelerinage.dto.ReponsePelerinageDTO;

public interface ReponsePelerinageService {
 List<ReponsePelerinageDTO> getReponsesByFormulaireId(FormulaireSatisfactionPelerinageDTO formulaireId); // Nouvelle méthode

    public ReponsePelerinageDTO saveReponse(ReponsePelerinageDTO reponses);

    public void deleteReponse(ReponsePelerinage formulaireId);
    public ReponsePelerinageDTO updateReponses(ReponsePelerinageDTO reponses);

    public List<ReponsePelerinageDTO> getReponses();

}
