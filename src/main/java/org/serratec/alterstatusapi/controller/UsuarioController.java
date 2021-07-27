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

	@PostMapping
	public ResponseEntity<String> create(@RequestParam(required=false) MultipartFile file, @RequestPart UsuarioDTORequest usuario)
			throws ResourceNotFoundException, IOException {

		if(file==null) {
			servicoUsuario.create(usuario);
			return new ResponseEntity<String>("Usuário cadastrado com sucesso", HttpStatus.CREATED);
		}
		
			servicoUsuario.createFile(usuario, file);
			 
		return new ResponseEntity<String>("Usuário cadastrado com sucesso", HttpStatus.CREATED);
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/squad")
	public Usuario cadastrarUsuarioNoSquad(@RequestBody Usuario usuario) {
		return servicoUsuario.relacionarUsuarioComSquad(usuario.getId_usuario(), usuario.getId_squad());
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/squad")
	public Usuario relacionarUsuarioComSquad(@RequestBody Usuario usuario) {
		return servicoUsuario.relacionarUsuarioComSquad(usuario.getId_usuario(), usuario.getId_squad());
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@PostMapping("/cargo")
	public Usuario cadastrarUsuarioNoCargo(@RequestBody Usuario usuario) {
		return servicoUsuario.relacionarUsuarioComCargo(usuario.getId_usuario(), usuario.getId_cargo());
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping("/cargo")
	public Usuario relacionarUsuarioComCargo(@RequestBody Usuario usuario) {
		return servicoUsuario.relacionarUsuarioComCargo(usuario.getId_usuario(), usuario.getId_cargo());
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping
	public ResponseEntity<String> update(@RequestParam MultipartFile file,
			@RequestPart UsuarioDTORequest usuario) throws ResourceNotFoundException, IOException {
		servicoUsuario.update(usuario.getId_usuario(), usuario, file);

		return new ResponseEntity<String>("Usuário editado com sucesso", HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping
	public ResponseEntity<String> delete(@RequestBody UsuarioDTORequest usuario) throws ResourceNotFoundException {
		servicoUsuario.delete(usuario.getId_usuario());

		return new ResponseEntity<String>("Usuário deletado com sucesso", HttpStatus.OK);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PatchMapping("/{id}")
	public ResponseEntity<Optional<Usuario>> atualizarEspecifico(@PathVariable("id")Long id,
			@RequestBody Map<Object, Object> fields) {
		Map<Object,Object> campos = fields;
		for(Object campo: campos.entrySet()) {
			 System.out.println(campo.equals("status")); 
		 }
			
		return servicoUsuario.atualizarEspecifico(id, fields);
	}
}
