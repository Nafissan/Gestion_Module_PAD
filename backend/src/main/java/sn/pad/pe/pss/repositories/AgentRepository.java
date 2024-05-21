package sn.pad.pe.pss.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import sn.pad.pe.pss.bo.Agent;
import sn.pad.pe.pss.bo.Fonction;
import sn.pad.pe.pss.bo.UniteOrganisationnelle;

public interface AgentRepository extends JpaRepository<Agent, Long> {

	public Agent findAgentByMatricule(String matricule);

	@Query("Select a from Agent a left join Compte c on a.id=c.agent.id where c.agent.id is null")
	public List<Agent> getAgentsWithoutCompte();

	public List<Agent> findByUniteOrganisationnelle(UniteOrganisationnelle uniteOrganisationnelle);

	@Query("Select distinct(a) from Agent a left join Conge c on a.id=c.agent.id where ((c.agent.id is null or c.annee !=?2) or a.profil != 'terrestre') and a.uniteOrganisationnelle.id =?1")
	public List<Agent> findAgentsWithoutConge(long id, String annee);

	@Query("Select a from Agent a left join Conge c on a.id=c.agent.id where c.agent.id is not null and a.uniteOrganisationnelle.id=?1")
	public List<Agent> findAgentsWithConge(long id);

	public List<Agent> findAgentByUniteOrganisationnelleAndEstChef(UniteOrganisationnelle UniteOrganisationnelle,
			boolean estChef);

	public List<Agent> findByFonction(Fonction fonction);

	public Optional<Agent> findAgentByEmail(String email);

	@Query("Select a from Agent a where a.uniteOrganisationnelle.code=?1 and a.estChef=true")
	public Agent findAgentResponsableDCH(String codeUniteOrganisationnelle);

	@Query("Select distinct (a) from MembreFamille m join Agent a on a.id=m.agent.id")
	public List<Agent> getAgentsAssures();
}
