package sn.pad.pe.pss.services.helpers.impl;

import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sn.pad.pe.pss.dto.UniteOrganisationnelleDTO;
import sn.pad.pe.pss.services.UniteOrganisationnelleService;
import sn.pad.pe.pss.services.helpers.GenerationCode;

@Service
public class GenerationCodeImpl implements GenerationCode {

	@Autowired
	private UniteOrganisationnelleService uniteOrganisationnelleService;

	private static String getCode(String prefixe) {
		ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
		StringTokenizer dateSale = new StringTokenizer(now.toString(),
				"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.,/!?\\-_");
		String dateUTC = prefixe;
		while (dateSale.hasMoreTokens()) {
			dateUTC += dateSale.nextToken();
		}
		return (dateUTC + "000").substring(0, 20);
	}

	@Override
	public String fichierAttestation() {
		return getCode("AT-");
	}

	@Override
	public String get() {
		return getCode("");
	}

	@Override
	public String uniteOrganisationnelle() {
//		long size = 1L + uniteOrganisationnelleService.getUniteOrganisationnelles().size();
		UniteOrganisationnelleDTO lastRecord = uniteOrganisationnelleService.findTopByOrderByIdDesc();
		String lastRecordNum = lastRecord.getCode().substring(2, 5);
		long size = Long.valueOf(lastRecordNum) + 1;
		return "UO"
				+ (size > 99 ? Long.toString(size) : size > 9 ? "0" + Long.toString(size) : "00" + Long.toString(size));
	}
}
