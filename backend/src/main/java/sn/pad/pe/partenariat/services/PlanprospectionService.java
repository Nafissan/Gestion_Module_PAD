
package sn.pad.pe.partenariat.services;

import java.util.List;

import sn.pad.pe.partenariat.dto.PlanprospectionDTO;

public interface PlanprospectionService {

	public List<PlanprospectionDTO> getPlanprospection();

	public PlanprospectionDTO getPlanprospectionById(Long codePlanprospection);

	public PlanprospectionDTO create(PlanprospectionDTO PlanprospectionDTO);

	public boolean update(PlanprospectionDTO PlanprospectionDTO);

	public boolean delete(PlanprospectionDTO PlanprospectionDTO);
}
