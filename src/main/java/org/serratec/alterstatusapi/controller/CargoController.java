package org.serratec.alterstatusapi.controller;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.model.Cargo;
import org.serratec.alterstatusapi.model.Squad;
import org.serratec.alterstatusapi.service.CargoService;
import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/api/cargo")
public class CargoController {

	@Autowired
	CargoService servicoCargo;

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping
	public List<Cargo> obterTodos() {
		return servicoCargo.obterTodos();
	}
	
	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/pagina/{pagina}/qtde/{qtdRegistros}")
    public ResponseEntity<List<Cargo>> obterPaginado(
            @PathVariable("pagina") Integer pagina,
            @PathVariable("qtdRegistros") Integer qtdRegistros)
            throws Exception {

		return servicoCargo.obterPaginado(pagina, qtdRegistros);
    }

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/{id}")
	public ResponseEntity<Optional<Cargo>> obterPorId(@PathVariable(value = "id") Long id) {
		return servicoCargo.obterPorId(id);
	}

	@SecurityRequirement(name = "bearerAuth")
	@GetMapping("/nome/{nome}")
	public ResponseEntity<List<Cargo>> obterPorNome(@PathVariable(value = "nome") String nome) {
		return servicoCargo.obterPorNome(nome);
	}

	@SecurityRequirement(name = "bearerAuth")
	@PostMapping
	public ResponseEntity<Cargo> adicionar(@RequestBody Cargo cargo) {
		return servicoCargo.adicionar(cargo);
	}

	@SecurityRequirement(name = "bearerAuth")
	@DeleteMapping
	public ResponseEntity<?> deletar(@RequestBody Cargo cargo) {
		return servicoCargo.deletar(cargo.getId_cargo());
	}

	@SecurityRequirement(name = "bearerAuth")
	@PutMapping
	public ResponseEntity<Optional<Cargo>> atualizar(@RequestBody Cargo cargo) {
		return servicoCargo.atualizar(cargo.getId_cargo(), cargo);
	}

}
