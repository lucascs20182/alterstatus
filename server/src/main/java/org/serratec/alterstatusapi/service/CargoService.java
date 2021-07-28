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

public interface CargoService {

	List<Cargo> obterTodos();
	ResponseEntity<Optional<Cargo>> obterPorId(Long id);
	ResponseEntity<List<Cargo>> obterPorNome(String nome);
	ResponseEntity<Cargo> adicionar(Cargo cargo);
	ResponseEntity<Optional<Cargo>> atualizar(Long id, Cargo cargo);
	ResponseEntity<?> deletar(Long id);

}
