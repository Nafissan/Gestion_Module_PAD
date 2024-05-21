package sn.pad.pe.pss.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import sn.pad.pe.pss.bo.FileMetaData;

@Repository
public interface FileMetaDataRepository extends JpaRepository<FileMetaData, Long> {
	@Query(value = "SELECT sum(size) FROM FileMetaData")
	public Long findAllOccurrenceSize();
}
