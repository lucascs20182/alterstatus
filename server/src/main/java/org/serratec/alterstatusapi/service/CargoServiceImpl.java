package org.serratec.alterstatusapi.service;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Cargo;
import org.serratec.alterstatusapi.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class CargoServiceImpl implements CargoService {

	@Autowired
	private CargoRepository repositorioCargo;

	@Override
	public List<Cargo> obterTodos() {
		return repositorioCargo.findAll();
	}

	@Override
	public ResponseEntity<Optional<Cargo>> obterPorId(@PathVariable("id") Long id) {
		Optional<Cargo> Cargo = repositorioCargo.findById(id);

		if (Cargo.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado nenhum Cargo com o id: " + id);
		}

		return new ResponseEntity<>(Cargo, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<List<Cargo>> obterPorNome(String nome) {
		List<Cargo> Cargo = repositorioCargo.findByNomeContainingIgnoreCase(nome);

		if (Cargo.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado o nome do Cargo!");

		}
		return new ResponseEntity<>(Cargo, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Cargo> adicionar(@RequestBody Cargo cargo) {
		cargo.setId(null);

		var novoCargo = repositorioCargo.save(cargo);
		return new ResponseEntity<>(novoCargo, HttpStatus.CREATED);

	}

	@Override
	public ResponseEntity<Optional<Cargo>> atualizar(@PathVariable("id") Long id, @RequestBody Cargo cargo) {
		cargo.setId(id);

		var CargoAtualizado = repositorioCargo.findById(id);

		if (CargoAtualizado.isEmpty()) {

			throw new ResourceNotFoundException("Cargo não encontrado por id");
		}

		this.repositorioCargo.save(cargo);

		return new ResponseEntity<>(CargoAtualizado, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> deletar(@PathVariable("id") Long id) {
		var existe = repositorioCargo.findById(id);

		if (existe.isEmpty()) {
			throw new ResourceNotFoundException("Não existe cargo para o id informado: " + id);
		}

		this.repositorioCargo.deleteById(id);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
