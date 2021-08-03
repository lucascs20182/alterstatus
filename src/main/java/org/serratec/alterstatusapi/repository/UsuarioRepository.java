package org.serratec.alterstatusapi.repository;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.serratec.alterstatusapi.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	@Transactional
	Usuario findByUsername(String username);

	@Transactional
	List<Usuario> findByUsernameContainingIgnoreCase(String username);

	Optional<Usuario> findById(Long id);

}
