package org.serratec.alterstatusapi.service;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.model.Squad;
import org.springframework.http.ResponseEntity;

public interface SquadService {

	List<Squad> obterTodos();

	ResponseEntity<List<Squad>> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception;

	ResponseEntity<Optional<Squad>> obterPorId(Long id);

	ResponseEntity<List<Squad>> obterPorNome(String nome);

	ResponseEntity<Squad> adicionar(Squad Squad);

	ResponseEntity<Optional<Squad>> atualizar(Long id, Squad squad);

	ResponseEntity<?> deletar(Long id);

}
