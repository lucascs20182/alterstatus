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


public interface SquadService {
	
	 List<Squad> obterTodos();
	 ResponseEntity<List<Squad>> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception;
	 ResponseEntity<Optional<Squad>> obterPorId(Long id);
	 ResponseEntity<List<Squad>> obterPorNome(String nome);
	 ResponseEntity<Squad> adicionar(Squad Squad);
	 ResponseEntity<Optional<Squad>> atualizar(Long id, Squad squad);
	 ResponseEntity<?> deletar(Long id);


}
