package sn.pad.pe.configurations.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.authorizeRequests().antMatchers("/templates/**", "/login/**", "/agents/**", "/comptes/**",
				"/swagger-ui.html/**", "/uniteOrganisationnelles/**", "/attestations/**", "/etapeAttestations/**",
				"/v2/api-docs", "/configuration/**", "/swagger*/**", "/webjars/**", "/register/**", "/ressources/**",
				"/dossierconges/**", "/planningconges/**", "/conges/**", "/etapeplannings/**",
				"/historiqueplannings/**", "/absences/**", "/etapeabsences/**", "/privileges/**", "/roles/**",
				"/interims/**", "/fonctions/**", "/niveauxHierarchiques/**", "/etapeInterims/**",
				"/historiqueconges/**", "/motifs/**", "/planningdirections/**", "/uploadFile/**", "/downloadFile/**",
				"/dossierabsences/**", "/uploadMultipleFiles/**", "/planningabsences/**", "/dossierInterims/**",
				"/send-mail/**", "/send-mail-attachment/**", "/fileMetaData/**", "/processusvalidations/**",
				"/etapevalidations/**", "/continent", "/continents/**", "/pays/**", "/typesPartenariat/**",
				"/villes/**", "/zones/**", "/partenaires/**", "/conventions/**", "/typesDotation/**", "/stocks/**",
				"/suivi-stocks/**", "/typesDotation/**", "/dotations/**", "/colons", "/dossiersColonies/**","/formulairesSatisfaction/**","/questions",
				"/participantsColonie/**", "/conjoints/**", "/enfants/**","/rapportsProspection/**","/reponses/**",
				"/suivi-dotations/**", "/activites/**", "/evenements/**", "/fournisseurs/**", "/marques/**",
				"/planprospection/**", "/prospects/**", "/suivis/**", "/participants/**", "/etats/**",
				"/entreprises/**", "/details/**", "/comite/**", "/pointFocal/**", "/besoins/**", "/suiviplan/**",
				"/domaines/**", "/comite/**", "/categorielaits/**", "/sousstocks/**", "/filePv/**",
				"/suiviprospects/**", "/membrefamille/**", "/agents_assures", "/notifications/**")

				.permitAll();

		// http.authorizeRequests().antMatchers("/appUsers/**","/appRoles/**").hasAuthority("ADMIN");
		http.authorizeRequests().anyRequest().authenticated();
		http.addFilter(new JWTAuthenticationFilter(authenticationManager()));
		http.addFilterBefore(new JWTAuthorizationFiler(), UsernamePasswordAuthenticationFilter.class);
	}

}
