package sn.pad.pe.dotation.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Stock;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {

	Optional<Stock> findStockByAnneeAndType(String annee, String type);

	Optional<Stock> findStockByCode(String code);

	Optional<Stock> findStockByAnnee(String annee);

	Optional<Stock> findStockByActive(boolean activite);
}
