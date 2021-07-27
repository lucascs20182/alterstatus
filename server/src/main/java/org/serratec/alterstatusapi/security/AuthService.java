package org.serratec.alterstatusapi.security;

import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.repository.UsuarioRepository;
import org.serratec.alterstatusapi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

	@Autowired
	UsuarioRepository repository;

	@Autowired
	UsuarioService service;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Usuario client = repository.findByUsername(username);
//		UsuarioDTOAuthentication client = service.getByUsername(username);

		if (client == null) {
			throw new UsernameNotFoundException("Usuario não existe");
		}

		return new UserSS(client.getId(), client.getUsername(), client.getSenha());
	}

}