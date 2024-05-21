package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.TypeDotation;

@Repository
public interface TypeDotationRepository extends JpaRepository<TypeDotation, Long> {
	List<TypeDotation> findAll();
}
