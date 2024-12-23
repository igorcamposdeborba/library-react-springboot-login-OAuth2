package com.igorborba.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer // Esta classe representa o servidor de Autorização do OAuth2 para acesso a recursos/páginas
public class ResourceServerConfig extends ResourceServerConfigurerAdapter {

	@Autowired
	private Environment environment; // ambiente de execução da aplicação para acessar H2

	@Autowired
	private JwtTokenStore tokenStore;

	// Rotas (path da URL):
	private static final String[] ROUTES = {"/oauth/**", "/oauth/token", "/oauth/signup", "/signup**", "/signin**", "/h2-console/**",
											"/book**", "/books/**", "/actuator/**"};

	// Verifica o token JWT
	@Override
	public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
		resources.tokenStore(tokenStore).stateless(false); // decodifica token e verifica se token é válido
	}

	// Autorização de rotas
	@Override
	public void configure(HttpSecurity http) throws Exception {
		// liberar rota (url) do H2
		if(Arrays.asList(environment.getActiveProfiles()).contains("test")) {
			http.headers().frameOptions().disable();
		}

		http.cors() // Cors configurado na classe CorsConfig
				.and()
				.authorizeRequests()
				.antMatchers(ROUTES).permitAll() // Permitir acesso as rotas
				.antMatchers(HttpMethod.GET).hasAnyRole("OPERATOR", "ADMIN")
				.anyRequest().hasAnyRole("ADMIN"); // se usuário acessar qualquer outra rota, ele tem que estar logado
	}
}
