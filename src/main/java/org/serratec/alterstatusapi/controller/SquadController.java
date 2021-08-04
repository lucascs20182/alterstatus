package org.serratec.alterstatusapi.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.dto.SquadDTO;
import org.serratec.alterstatusapi.mapper.SquadMapper;
import org.serratec.alterstatusapi.model.Squad;
import org.serratec.alterstatusapi.service.SquadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/squad")
public class SquadController {

	@Autowired
	SquadService servicoSquad;
	
	@Autowired
	SquadMapper squadMapper;

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping
	public ResponseEntity<List<SquadDTO>> obterTodos() {
			List<SquadDTO> listaSquad = new ArrayList<SquadDTO>();

			for (Squad squad : servicoSquad.obterTodos()) {
				listaSquad.add(squadMapper.toDto(squad));
			}

			return new ResponseEntity<List<SquadDTO>>(listaSquad, HttpStatus.OK);
		}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/pagina/{pagina}/qtde/{qtdRegistros}")
	public ResponseEntity<List<Squad>> obterPaginado(@PathVariable("pagina") Integer pagina,
			@PathVariable("qtdRegistros") Integer qtdRegistros) throws Exception {

		return servicoSquad.obterPaginado(pagina, qtdRegistros);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Squad>> obterPorId(@PathVariable(value = "id") Long id) {
		return servicoSquad.obterPorId(id);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/nome/{nome}")
	public ResponseEntity<List<Squad>> obterPorNome(@PathVariable(value = "nome") String nome) {
		return servicoSquad.obterPorNome(nome);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping
	public ResponseEntity<Squad> adicionar(@RequestBody Squad squad) {
		return servicoSquad.adicionar(squad);
	}

	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping
	public ResponseEntity<?> deletar(@RequestBody Squad squad) {
		return servicoSquad.deletar(squad.getId_squad());
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping
	public ResponseEntity<Optional<Squad>> atualizar(@RequestBody Squad squad) {
		return servicoSquad.atualizar(squad.getId_squad(), squad);
	}

}
