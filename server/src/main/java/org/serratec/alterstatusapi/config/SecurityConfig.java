package org.serratec.alterstatusapi.config;

import org.serratec.alterstatusapi.security.AuthService;
import org.serratec.alterstatusapi.security.JWTAuthenticationFilter;
import org.serratec.alterstatusapi.security.JWTAuthorizationFilter;
import org.serratec.alterstatusapi.security.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	AuthService service;

	@Autowired
	JWTUtil jwtUtil;

	private static final String[] AUTH_WHITLIST = { "/swagger-ui/**", "/v3/api-docs/**" };

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().configurationSource(request -> new CorsConfiguration().applyPermitDefaultValues());

		http.csrf().disable();

		http.authorizeRequests()

				.antMatchers(AUTH_WHITLIST).permitAll()

				.antMatchers(HttpMethod.POST, "/usuario").permitAll()

				.antMatchers(HttpMethod.POST, "/login").permitAll()

				.antMatchers(HttpMethod.GET, "/usuario/**/avatar").permitAll()

				.anyRequest().authenticated();

		http.addFilterBefore(new JWTAuthenticationFilter(authenticationManager(), jwtUtil),
				UsernamePasswordAuthenticationFilter.class);

		http.addFilterBefore(new JWTAuthorizationFilter(), UsernamePasswordAuthenticationFilter.class);

		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(service).passwordEncoder(bCryptPasswordEncoder());
	}

}
