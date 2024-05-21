package sn.pad.pe.dotation.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import sn.pad.pe.dotation.bo.Stock;
import sn.pad.pe.dotation.bo.SuiviStock;

@Repository
public interface SuiviStockRepository extends JpaRepository<SuiviStock, Long> {

	List<SuiviStock> findSuiviStockByStock(Stock stock);

	@Query("SELECT s FROM SuiviStock s where s.stock.id like :x  GROUP BY s.categorieLait")
	List<SuiviStock> findSuiviStockByStockAndCategorieLait(@Param("x") Long stock);
}
