package org.serratec.alterstatusapi.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Cargo;
import org.serratec.alterstatusapi.repository.CargoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
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
	public ResponseEntity<List<Cargo>> obterPaginado(Integer pagina, Integer qtdRegistros) throws Exception {
	        Pageable page = null;
	        List<Cargo> listCargo = null;
	        List<Cargo> listCargoComPaginacao = null;
	        List<Cargo> listCargoFinal = new ArrayList<>();

	        try {
	            if (null != pagina && null != qtdRegistros) {

	                page = PageRequest.of(pagina, qtdRegistros);
	                listCargoComPaginacao = repositorioCargo.findAll(page).getContent();

	                for (Cargo lCargo : listCargoComPaginacao) {
	                    listCargoFinal.add(lCargo);
	                }

	            } else {
	                listCargo = repositorioCargo.findAll();

	                for (Cargo lCargo : listCargo) {
	                    listCargoFinal.add(lCargo);
	                }
	            }
	        } catch (Exception e) {
	            throw new Exception("Não foi possível recuperar a lista de Cargos ::" + e.getMessage());
	        }

	        HttpHeaders headers = new HttpHeaders();
	        
	        return new ResponseEntity<List<Cargo>>(listCargoFinal, headers, HttpStatus.OK);
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

		Cargo novoCargo = repositorioCargo.save(cargo);
		return new ResponseEntity<>(novoCargo, HttpStatus.CREATED);

	}

	@Override
	public ResponseEntity<Optional<Cargo>> atualizar(@PathVariable("id") Long id, @RequestBody Cargo cargo) {
		cargo.setId(id);

		Optional<Cargo> CargoAtualizado = repositorioCargo.findById(id);

		if (CargoAtualizado.isEmpty()) {

			throw new ResourceNotFoundException("Cargo não encontrado por id");
		}

		this.repositorioCargo.save(cargo);

		return new ResponseEntity<>(CargoAtualizado, HttpStatus.OK);
	}

	@Override
	public ResponseEntity<?> deletar(@PathVariable("id") Long id) {
		Optional<Cargo> existe = repositorioCargo.findById(id);

		if (existe.isEmpty()) {
			throw new ResourceNotFoundException("Não existe cargo para o id informado: " + id);
		}

		this.repositorioCargo.deleteById(id);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}
}
