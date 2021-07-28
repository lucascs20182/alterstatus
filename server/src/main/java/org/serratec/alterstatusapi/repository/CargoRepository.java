package org.serratec.alterstatusapi.repository;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.model.Cargo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CargoRepository extends JpaRepository<Cargo, Long> {

	Optional<Cargo> findById(Long id);

	List<Cargo> findByNomeContainingIgnoreCase(String nome);

}
