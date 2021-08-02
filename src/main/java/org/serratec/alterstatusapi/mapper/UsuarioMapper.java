package org.serratec.alterstatusapi.mapper;

import org.serratec.alterstatusapi.dto.UsuarioDTORequest;
import org.serratec.alterstatusapi.dto.UsuarioDTOResponse;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.repository.SquadRepository;
import org.serratec.alterstatusapi.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UsuarioMapper {

	@Autowired
	UsuarioService service;
	
	@Autowired
	private SquadRepository repositorioSquad;

	public Usuario toEntity(UsuarioDTORequest dto) throws ResourceNotFoundException {
		Usuario entity = new Usuario();

		for (Usuario cliente : service.obterTodos()) {

			if (cliente.getUsername().equals(dto.getUsername())) {
				throw new ResourceNotFoundException("Uma conta já foi cadastrada utilizando este username.");
			}
		}

		entity.setUsername(dto.getUsername());
		entity.setSenha(dto.getSenha());
		entity.setNome(dto.getNome());
		entity.setStatus(dto.getStatus());
		entity.setId_usuario(dto.getId_usuario());
		entity.setId_cargo(dto.getId_cargo());
		entity.setId_squad(dto.getId_squad());

		return entity;
	}

	public UsuarioDTOResponse toDto(Usuario entity) {
		UsuarioDTOResponse dto = new UsuarioDTOResponse();
		
		if(entity.getId_cargo() != null) {
			String nomeCargo = repositorioSquad.getById(entity.getId_cargo()).getNome();
			
			dto.setNomeCargo(nomeCargo);
		}

		dto.setId(entity.getId());
		dto.setUsername(entity.getUsername());
		dto.setNome(entity.getNome());
		dto.setDataCadastro(entity.getDataCadastro());
		dto.setUrl(entity.getUrlImagem());
		dto.setStatus(entity.getStatus());
		dto.setIdSquad(entity.getId_squad());
		
		return dto;
	}
}
