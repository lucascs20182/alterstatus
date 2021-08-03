package org.serratec.alterstatusapi.service;

import java.io.IOException;
import java.lang.reflect.Field;
import java.net.URI;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.transaction.Transactional;

import org.serratec.alterstatusapi.dto.UsuarioDTORequest;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.mapper.UsuarioMapper;
import org.serratec.alterstatusapi.model.Cargo;
import org.serratec.alterstatusapi.model.Squad;
import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.repository.CargoRepository;
import org.serratec.alterstatusapi.repository.SquadRepository;
import org.serratec.alterstatusapi.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class UsuarioServiceImpl implements UsuarioService {

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

	@Override
	public List<Usuario> obterTodos() {
		return clienteRepository.findAll();
	}

	@Override
	public List<Usuario> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception {
		Pageable page = null;
		List<Usuario> listUsuario = null;
		List<Usuario> listUsuarioComPaginacao = null;
		List<Usuario> listUsuarioVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listUsuarioComPaginacao = clienteRepository.findAll(page).getContent();

				for (Usuario lUsuario : listUsuarioComPaginacao) {
					listUsuarioVO.add(lUsuario);
				}

			} else {
				listUsuario = clienteRepository.findAll();

				for (Usuario lUsuario : listUsuario) {
					listUsuarioVO.add(lUsuario);
				}
			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de Usuarios ::" + e.getMessage());
		}

		return listUsuarioVO;
	}

	@Override
	public Usuario obterPorId(Long id) throws ResourceNotFoundException {
		Optional<Usuario> cliente = clienteRepository.findById(id);
		if (cliente.isEmpty()) {
			throw new ResourceNotFoundException("Não existe cliente com esse Id.");
		}

		return cliente.get();
	}

	@Override
	public List<Usuario> obterPorUsername(String username) {
		List<Usuario> usuario = clienteRepository.findByUsernameContainingIgnoreCase(username);
		if (usuario.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado nenhum usuário com o username: " + username);

		}
		return usuario;
	}

	@Override
	public Usuario obterImagem(Usuario usuario, Boolean isAvatarDefault) {

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

	@Override
	public Usuario cadastrarArquivo(UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException {
		Usuario entity = clienteMapper.toEntity(dto);

		entity.setDataCadastro(LocalDate.now());

		if (dto.getStatus() == null) {

			entity.setStatus("Disponível");

		}

		entity.setSenha(bCrypt.encode(dto.getSenha()));

		entity = clienteRepository.save(entity);
		entity.setId_usuario(entity.getId());

		imagemService.cadastrar(entity, multipartFile);

		return clienteRepository.save(obterImagem(entity, false));
	}

	@Override
	public Usuario cadastrar(UsuarioDTORequest dto) throws ResourceNotFoundException {
		Usuario entity = clienteMapper.toEntity(dto);

		entity.setDataCadastro(LocalDate.now());

		if (dto.getStatus() == null) {

			entity.setStatus("Disponível");

		}

		entity.setSenha(bCrypt.encode(dto.getSenha()));
		entity.setId_usuario(entity.getId());

		entity = clienteRepository.save(entity);

		return clienteRepository.save(obterImagem(entity, true));
	}
	
	@Override
	public Usuario atualizarArquivo(Long id, UsuarioDTORequest dto, MultipartFile multipartFile) throws ResourceNotFoundException, IOException {
		Usuario entity = this.obterPorId(id);

		for (Usuario cliente : this.obterTodos()) {
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

		imagemService.removerImagem(entity.getId());

		imagemService.cadastrar(entity, multipartFile);

		return clienteRepository.save(obterImagem(entity, false));
	}

	@Override
	public Usuario atualizar(Long id, UsuarioDTORequest dto) throws ResourceNotFoundException {
		Usuario entity = this.obterPorId(id);

		for (Usuario cliente : this.obterTodos()) {
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

		return clienteRepository.save(entity);
	}

	@Override
	public void deletar(Long id) throws ResourceNotFoundException {
		this.obterPorId(id); // verifica se o usuário existe antes de deletar

		imagemService.removerImagem(id);

		clienteRepository.deleteById(id);
	}
	
	@Transactional
	@Override
	public void removerCargo(Long idUsuario) throws ResourceNotFoundException {
		Usuario usuario = this.obterPorId(idUsuario); // verifica se o usuário existe antes de deletar

		usuario.setCargo(null);

		clienteRepository.save(usuario);
	}

	@Override
	public Usuario relacionarUsuarioComSquad(Long usuario_id, Long squad_id) {
		Usuario usuario = clienteRepository.findById(usuario_id).get();
		Squad squad = repositorioSquad.findById(squad_id).get();
		usuario.setId_squad(squad_id);
		usuario.setSquad(squad);

		return clienteRepository.save(usuario);
	}

	@Override
	public Usuario relacionarUsuarioComCargo(Long usuario_id, Long cargo_id) {
		Usuario usuario = clienteRepository.findById(usuario_id).get();
		Cargo cargo = repositorioCargo.findById(cargo_id).get();
		usuario.setId_cargo(cargo_id);
		usuario.setCargo(cargo);

		return clienteRepository.save(usuario);
	}

	@Override
	public ResponseEntity<Optional<Usuario>> atualizarEspecifico(Long id, Map<Object, Object> campos) {
		Optional<Usuario> UsuarioAtualizado = clienteRepository.findById(id);
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