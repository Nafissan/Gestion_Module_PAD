package sn.pad.pe.pelerinage.services;

import sn.pad.pe.pelerinage.dto.*;
import java.util.List;

public interface DossierPelerinageService {
    public List<DossierPelerinageDTO> getDossierPelerinages();

	public DossierPelerinageDTO getDossierPelerinageByAnnee(String annee);

	public DossierPelerinageDTO createDossierPelerinage(DossierPelerinageDTO DossierPelerinageDTO);
    List<DossierPelerinageDTO> getDossiersPelerinagesFerme();

	public DossierPelerinageDTO getDossierPelerinageByEtat();
	public boolean updateDossierPelerinage(DossierPelerinageDTO DossierPelerinageDTO);

	public     boolean deleteDossierPelerinage(DossierPelerinageDTO DossierPelerinageDTO);

}
