package sn.pad.pe.pss.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sn.pad.pe.pss.bo.Privilege;
import sn.pad.pe.pss.bo.Role;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
public interface PrivilegeRepository extends JpaRepository<Privilege, String> {

	Privilege findPrivilegeByNomLike(String name);

	List<Privilege> findPrivilegesByRoles(Role role);
}
