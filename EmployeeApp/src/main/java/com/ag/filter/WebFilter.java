package com.ag.filter;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class WebFilter extends OncePerRequestFilter {

	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String path = request.getRequestURI().toLowerCase();
		if (!path.startsWith("/") && !path.startsWith("/api") && !path.startsWith("/static")
				&& !path.startsWith("/manifest.json") && !path.startsWith("/favicon.ico")
				&& !path.startsWith("/robots.txt") && !path.startsWith("/xml") && !path.startsWith("/json")
				&& !path.startsWith("/jpg") && !path.startsWith("/jpeg") && !path.startsWith("/gif")
				&& !path.startsWith("/png"))
		{request.getRequestDispatcher("/index.html").forward(request, response);}

		
		filterChain.doFilter(request, response);
	}
		
	}
