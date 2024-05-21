package sn.pad.pe.pss.services.helpers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.StringTokenizer;

public interface GenerationCode {

	public String fichierAttestation();

	public String get();

	public String uniteOrganisationnelle();

	public static String generator(String prefixe, int max) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String code = sdf.format(new Date());
		return prefixe + code;
	}

	public static String generer(String prefixe, int max, String lastRecordCode) {

		String sequenceInitial = "000000000000000000000000000000000";

		String code = sequenceInitial;

		if (lastRecordCode == null) {
			code = sequenceInitial + "1";
		} else {
			StringTokenizer codeToken = new StringTokenizer(lastRecordCode,
					"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ:.,/!?\\-_");

			while (codeToken.hasMoreTokens()) {
				code += codeToken.nextToken();
			}
			long position = Long.valueOf(code).longValue() + 1;
			code = sequenceInitial + Long.toString(position);

		}
		return prefixe + code.substring(code.length() - (max - prefixe.length()));
	}

}
