package sn.pad.pe.partenariat.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.partenariat.bo.TypePartenariat;

/**
 * 
 * @author aliounebada.ndoye
 *
 */
@Repository
public interface TypePartenariatRepository extends JpaRepository<TypePartenariat, Long> {
	Optional<TypePartenariat> findTypePartenariatByCode(String code);

	List<TypePartenariat> findAll();

	Optional<TypePartenariat> findTopByOrderByIdDesc();
}
