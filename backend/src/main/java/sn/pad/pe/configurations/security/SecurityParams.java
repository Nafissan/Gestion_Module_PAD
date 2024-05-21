package sn.pad.pe.configurations.security;

public interface SecurityParams {
	public static final String JWT_HEADER_NAME = "Authorization";
	public static final String SECRET = "PAD_SECRET_APP_a78g#2u69r@8452rf8y*ty5qs's85";
	public static final long EXPIRATION = 12 * 3600L * 1000; // 60 secondes
//    public static final long EXPIRATION=12*3600*1000; // 12 heures
	public static final String HEADER_PREFIX = "Bearer ";
}
