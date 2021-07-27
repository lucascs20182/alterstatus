package org.serratec.alterstatusapi.service;

import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URI;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.serratec.alterstatusapi.dto.UsuarioDTORequest;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.mapper.UsuarioMapper;
import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.repository.CargoRepository;
import org.serratec.alterstatusapi.repository.SquadRepository;
import org.serratec.alterstatusapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public interface UsuarioService {

	public List<Usuario> getAll();
	public Usuario getById(Long id) throws ResourceNotFoundException;
	public List<Usuario> obterPorUsername(String username);
	public Usuario getImagem(Usuario usuario, Boolean isAvatarDefault);
	public Usuario createFile(UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException;
	public Usuario create(UsuarioDTORequest dto) throws ResourceNotFoundException;
	public Usuario update(Long id, UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException;
	public void delete(Long id) throws ResourceNotFoundException;
	public Usuario relacionarUsuarioComSquad(Long usuario_id, Long squad_id);
	public Usuario relacionarUsuarioComCargo(Long usuario_id, Long cargo_id);
	public @ResponseBody ResponseEntity<Optional<Usuario>> atualizarEspecifico(@PathVariable Long id,
			@RequestBody Map<Object, Object> campos);


}