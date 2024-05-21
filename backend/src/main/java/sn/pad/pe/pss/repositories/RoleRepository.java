package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Compte;
import sn.pad.pe.pss.bo.Role;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findRoleByNomRoleLike(String name);

	List<Role> findRolesByComptes(Compte comptes);
}
