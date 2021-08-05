package org.serratec.alterstatusapi.service;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.model.Cargo;
import org.springframework.http.ResponseEntity;

public interface CargoService {

	List<Cargo> obterTodos();

	ResponseEntity<List<Cargo>> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception;

	ResponseEntity<Optional<Cargo>> obterPorId(Long id);

	ResponseEntity<List<Cargo>> obterPorNome(String nome);

	ResponseEntity<Cargo> adicionar(Cargo cargo);

	ResponseEntity<Optional<Cargo>> atualizar(Long id, Cargo cargo);

	ResponseEntity<?> deletar(Long id);

}
