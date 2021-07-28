package org.serratec.alterstatusapi.service;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Squad;
import org.serratec.alterstatusapi.repository.SquadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class SquadServiceImpl implements SquadService {

	@Autowired
	private SquadRepository repositorioSquad;

    @Override
	public List<Squad> obterTodos() {
		return repositorioSquad.findAll();
	}

    @Override
	public ResponseEntity<Optional<Squad>> obterPorId(Long id) {
		Optional<Squad> Squad = repositorioSquad.findById(id);

		if (Squad.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado nenhuma Squad!");

		}
		return new ResponseEntity<>(Squad, HttpStatus.OK);
	}

    @Override
	public ResponseEntity<List<Squad>> obterPorNome(String nome) {
		List<Squad> Squad = repositorioSquad.findByNomeContainingIgnoreCase(nome);

		if (Squad.isEmpty()) {
			throw new ResourceNotFoundException("Não foi localizado o nome do Squad!");

		}
		return new ResponseEntity<>(Squad, HttpStatus.OK);
	}

    @Override
	public ResponseEntity<Squad> adicionar(Squad Squad) {
		Squad.setId(null);

		var novoSquad = repositorioSquad.save(Squad);
		return new ResponseEntity<>(novoSquad, HttpStatus.CREATED);

	}

    @Override
	public ResponseEntity<Optional<Squad>> atualizar(Long id, Squad squad) {
		squad.setId(id);

		var SquadAtualizado = repositorioSquad.findById(id);

		if (SquadAtualizado.isEmpty()) {

			throw new ResourceNotFoundException("Squad não encontrado por id");
		}

		this.repositorioSquad.save(squad);

		return new ResponseEntity<>(SquadAtualizado, HttpStatus.OK);
	}

    @Override
	public ResponseEntity<?> deletar(Long id) {
		var existe = repositorioSquad.findById(id);

		if (existe.isEmpty()) {
			throw new ResourceNotFoundException("Não existe categoria para o id informado: " + id);
		}

		this.repositorioSquad.deleteById(id);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}