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
public class UsuarioService {

	@Autowired
	UsuarioRepository clienteRepository;

	@Autowired
	SquadRepository repositorioSquad;

	@Autowired
	CargoRepository repositorioCargo;

	@Autowired
	UsuarioMapper clienteMapper;

	@Autowired
	BCryptPasswordEncoder bCrypt;

	@Autowired
	ImagemService imagemService;

	public List<Usuario> getAll() {
		return clienteRepository.findAll();
	}

	public Usuario getById(Long id) throws ResourceNotFoundException {
		Optional<Usuario> cliente = clienteRepository.findById(id);
		if (cliente.isEmpty()) {
			throw new ResourceNotFoundException("Não existe cliente com esse Id.");
		}

		return cliente.get();
	}

	public List<Usuario> obterPorUsername(String username) {
		List<Usuario> usuario = clienteRepository.findByUsernameContainingIgnoreCase(username);
		if (usuario.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado nenhum usuário com o username: " + username);

		}
		return usuario;
	}

	public Usuario getImagem(Usuario usuario, Boolean isAvatarDefault) {

		if (isAvatarDefault) {
			usuario.setUrlImagem(
					"https://github.com/lucascs20182/static-default-avatar/blob/main/picture.png?raw=true");

			return usuario;
		}

		URI uri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/usuario/{usuarioId}/avatar")
				.buildAndExpand(usuario.getId()).toUri();

		usuario.setUrlImagem(uri.toString());

		return usuario;
	}

	public Usuario create(UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException {
		Usuario entity = clienteMapper.toEntity(dto);

		entity.setDataCadastro(LocalDate.now());

		if (dto.getStatus() == null) {

			entity.setStatus("Disponível");

		}

		entity.setSenha(bCrypt.encode(dto.getSenha()));

		entity = clienteRepository.save(entity);

		if (multipartFile.isEmpty()) {
			return clienteRepository.save(getImagem(entity, true));
		}

		imagemService.create(entity, multipartFile);

		return clienteRepository.save(getImagem(entity, false));
	}
	
	public Usuario create(UsuarioDTORequest dto) throws ResourceNotFoundException {
		Usuario entity = clienteMapper.toEntity(dto);

		entity.setDataCadastro(LocalDate.now());

		if (dto.getStatus() == null) {

			entity.setStatus("Disponível");

		}

		entity.setSenha(bCrypt.encode(dto.getSenha()));

		entity = clienteRepository.save(entity);

		return clienteRepository.save(getImagem(entity, true));
	}

	public Usuario update(Long id, UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException {
		Usuario entity = this.getById(id);

		for (Usuario cliente : this.getAll()) {
			if (cliente.getUsername().equals(dto.getUsername())) {
				throw new ResourceNotFoundException("Uma conta já foi cadastrada utilizando este username.");
			}
		}

		if (dto.getUsername() != null) {
			entity.setUsername(dto.getUsername());
		}

		if (dto.getSenha() != null) {
			entity.setSenha(bCrypt.encode(dto.getSenha()));
		}

		if (dto.getNome() != null) {
			entity.setNome(dto.getNome());
		}

		if (dto.getStatus() != null) {
			entity.setStatus(dto.getStatus());
		}

		imagemService.removeImagem(entity.getId());

		imagemService.create(entity, multipartFile);

		return clienteRepository.save(getImagem(entity, false));
	}

	public void delete(Long id) throws ResourceNotFoundException {
		this.getById(id); // verifica se o usuário existe antes de deletar

		imagemService.removeImagem(id);

		clienteRepository.deleteById(id);
	}

	public Usuario relacionarUsuarioComSquad(Long usuario_id, Long squad_id) {
		var usuario = clienteRepository.findById(usuario_id).get();
		var squad = repositorioSquad.findById(squad_id).get();

		usuario.relacionarComSquad(squad);

		return clienteRepository.save(usuario);
	}

	public Usuario relacionarUsuarioComCargo(Long usuario_id, Long cargo_id) {
		var usuario = clienteRepository.findById(usuario_id).get();
		var cargo = repositorioCargo.findById(cargo_id).get();

		usuario.relacionarComCargo(cargo);

		return clienteRepository.save(usuario);
	}

	public @ResponseBody ResponseEntity<Optional<Usuario>> atualizarEspecifico(@PathVariable Long id,
			@RequestBody Map<Object, Object> campos) {
		var UsuarioAtualizado = clienteRepository.findById(id);
		// Map key is field name, v is value
		campos.forEach((chave, valor) -> {
			// use reflection to get field k on manager and set it to value k
			Field campo = ReflectionUtils.findField(Usuario.class, (String) chave);
			campo.setAccessible(true);
			ReflectionUtils.setField(campo, UsuarioAtualizado.get(), valor);
		});

		if (UsuarioAtualizado.isEmpty()) {

			throw new ResourceNotFoundException("Cargo não encontrado por id");
		}

		this.clienteRepository.save(UsuarioAtualizado.get());

		return new ResponseEntity<>(UsuarioAtualizado, HttpStatus.OK);
	}

}