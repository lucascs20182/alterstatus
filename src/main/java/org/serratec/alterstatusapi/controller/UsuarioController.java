package org.serratec.alterstatusapi.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.serratec.alterstatusapi.dto.UsuarioDTORequest;
import org.serratec.alterstatusapi.dto.UsuarioDTOResponse;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.mapper.UsuarioMapper;
import org.serratec.alterstatusapi.model.Imagem;
import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.service.ImagemService;
import org.serratec.alterstatusapi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@CrossOrigin("*")
@RequestMapping("/usuario")
public class UsuarioController {

	@Autowired
	UsuarioService servicoUsuario;

	@Autowired
	ImagemService servicoImagem;

	@Autowired
	UsuarioMapper mapper;

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping
	public ResponseEntity<List<UsuarioDTOResponse>> getAll() {
		List<UsuarioDTOResponse> listaUsuariosResponse = new ArrayList<UsuarioDTOResponse>();

		for (Usuario usuario : servicoUsuario.getAll()) {
			listaUsuariosResponse.add(mapper.toDto(usuario));
		}

		return new ResponseEntity<List<UsuarioDTOResponse>>(listaUsuariosResponse, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/{id}")
	public ResponseEntity<UsuarioDTOResponse> getById(@PathVariable Long id) throws ResourceNotFoundException {
		UsuarioDTOResponse usuarioResponse = mapper.toDto(servicoUsuario.getById(id));

		return new ResponseEntity<UsuarioDTOResponse>(usuarioResponse, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/encontrar/{username}")
	public ResponseEntity<List<UsuarioDTOResponse>> obterPorUsername(
			@PathVariable(value = "username") String username) {
		List<UsuarioDTOResponse> listaUsuariosResponse = new ArrayList<UsuarioDTOResponse>();

		for (Usuario usuario : servicoUsuario.obterPorUsername(username)) {
			listaUsuariosResponse.add(mapper.toDto(usuario));
		}

		return new ResponseEntity<List<UsuarioDTOResponse>>(listaUsuariosResponse, HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("{usuarioId}/avatar")
	public ResponseEntity<byte[]> getImagem(@PathVariable Long usuarioId) {
		Imagem imagem = servicoImagem.getImagem(usuarioId);

		HttpHeaders header = new HttpHeaders();
		header.add("content-length", String.valueOf(imagem.getData().length));
		header.add("content-type", imagem.getMimeType());

		return new ResponseEntity<>(imagem.getData(), header, HttpStatus.OK);
	}

	@PostMapping("/signup")
	public ResponseEntity<String> create(@RequestParam MultipartFile file, @RequestPart UsuarioDTORequest usuario)
			throws ResourceNotFoundException, IOException {

		servicoUsuario.create(usuario, file);

		return new ResponseEntity<String>("Usuário cadastrado com sucesso", HttpStatus.CREATED);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/{usuario_id}/squad/{squad_id}")
	public Usuario relacionarUsuarioComSquad(@PathVariable Long usuario_id, @PathVariable Long squad_id) {
		return servicoUsuario.relacionarUsuarioComSquad(usuario_id, squad_id);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/{usuario_id}/cargo/{cargo_id}")
	public Usuario relacionarUsuarioComCargo(@PathVariable Long usuario_id, @PathVariable Long cargo_id) {
		return servicoUsuario.relacionarUsuarioComCargo(usuario_id, cargo_id);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/{id}")
	public ResponseEntity<String> update(@RequestParam MultipartFile file, @PathVariable Long id,
			@RequestPart UsuarioDTORequest usuario) throws ResourceNotFoundException, IOException {
		servicoUsuario.update(id, usuario, file);

		return new ResponseEntity<String>("Usuário editado com sucesso", HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> delete(@PathVariable Long id) throws ResourceNotFoundException {
		servicoUsuario.delete(id);

		return new ResponseEntity<String>("Usuário deletado com sucesso", HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PatchMapping("/{id}")
	public ResponseEntity<Optional<Usuario>> atualizarEspecifico(@PathVariable Long id,
			@RequestBody Map<Object, Object> fields) {
		return servicoUsuario.atualizarEspecifico(id, fields);
	}
}