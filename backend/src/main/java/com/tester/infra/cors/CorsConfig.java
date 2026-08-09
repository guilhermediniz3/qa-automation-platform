package com.tester.infra.cors;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

	private static final List<String> ALLOWED_ORIGINS = List.of(
			"https://manager-frontend-1-0-0.onrender.com",
			"http://localhost:5173",
			"http://127.0.0.1:5173"
	);

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(ALLOWED_ORIGINS);
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
		configuration.setAllowedHeaders(List.of("*"));
		configuration.setAllowCredentials(true);
		configuration.setMaxAge(3600L);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	  @Override
	    public void addCorsMappings(CorsRegistry registry) {
	        registry.addMapping("/**") // Permite todas as rotas
	                .allowedOrigins(ALLOWED_ORIGINS.toArray(String[]::new))
	                .allowedMethods("GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS") // Métodos permitidos
	                .allowedHeaders("*") // Cabeçalhos permitidos
	                .allowCredentials(true) // Permite cookies (se necessário)
	                .maxAge(3600); // Cache de preflight OPTIONS por 1 hora
	        
	    }
}
