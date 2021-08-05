package org.serratec.alterstatusapi.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.serratec.alterstatusapi.dto.UsuarioDTORequest;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface UsuarioService {

	List<Usuario> obterTodos();

	List<Usuario> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception;

	Usuario obterPorId(Long id) throws ResourceNotFoundException;

	List<Usuario> obterPorUsername(String username);

	Usuario obterImagem(Usuario usuario, Boolean isAvatarDefault);

	Usuario cadastrarArquivo(UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException;

	Usuario cadastrar(UsuarioDTORequest dto) throws ResourceNotFoundException;

	Usuario atualizarArquivo(Long id, UsuarioDTORequest dto, MultipartFile multipartFile)
			throws ResourceNotFoundException, IOException;

	Usuario atualizar(Long id, UsuarioDTORequest dto) throws ResourceNotFoundException, IOException;

	void deletar(Long id) throws ResourceNotFoundException;

	void removerCargo(Long idUsuario) throws ResourceNotFoundException;

	Usuario relacionarUsuarioComSquad(Long usuario_id, Long squad_id);

	Usuario relacionarUsuarioComCargo(Long usuario_id, Long cargo_id);

	@ResponseBody
	ResponseEntity<Optional<Usuario>> atualizarEspecifico(@PathVariable Long id,
			@RequestBody Map<Object, Object> campos);

}