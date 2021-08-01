package org.serratec.alterstatusapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.exception.ResourceBadRequestException;
import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Squad;
import org.serratec.alterstatusapi.repository.SquadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SquadServiceImpl implements SquadService {

	@Autowired
	private SquadRepository repositorioSquad;

	@Override
	public List<Squad> obterTodos() {
		return repositorioSquad.findAll();
	}

	@Override
	public ResponseEntity<List<Squad>> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception {
		Pageable page = null;
		List<Squad> listSquad = null;
		List<Squad> listSquadComPaginacao = null;
		List<Squad> listSquadVO = new ArrayList<>();

		try {
			if (null != pagina && null != qtdRegistros) {

				page = PageRequest.of(pagina, qtdRegistros);
				listSquadComPaginacao = repositorioSquad.findAll(page).getContent();

				for (Squad lSquad : listSquadComPaginacao) {
					listSquadVO.add(lSquad);
				}

			} else {
				listSquad = repositorioSquad.findAll();

				for (Squad lSquad : listSquad) {
					listSquadVO.add(lSquad);
				}
			}
		} catch (Exception e) {
			throw new Exception("Não foi possível recuperar a lista de Squads ::" + e.getMessage());
		}

		HttpHeaders headers = new HttpHeaders();

		return new ResponseEntity<>(listSquadVO, headers, HttpStatus.OK);
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
	public ResponseEntity<Squad> adicionar(Squad squad) {
		squad.setId(null);
		Squad novoSquad = repositorioSquad.save(squad);

		return new ResponseEntity<>(novoSquad, HttpStatus.CREATED);

	}

	@Override
	public ResponseEntity<Optional<Squad>> atualizar(Long id, Squad squad) {
		squad.setId(id);

		Optional<Squad> SquadAtualizado = repositorioSquad.findById(id);

		if (SquadAtualizado.isEmpty()) {

			throw new ResourceNotFoundException("Squad não encontrado por id");
		}

		this.repositorioSquad.save(squad);

		return new ResponseEntity<>(SquadAtualizado, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> deletar(Long id) {
		Optional<Squad> existe = repositorioSquad.findById(id);

		if (existe.isEmpty()) {
			throw new ResourceNotFoundException("Não existe categoria para o id informado: " + id);
		}

		if (existe.get().getUsuarios().isEmpty()) {

			this.repositorioSquad.deleteById(id);

		} else {
			throw new ResourceBadRequestException("O squad não pôde ser deletado, pois ainda há usuários nele");
		}

		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
