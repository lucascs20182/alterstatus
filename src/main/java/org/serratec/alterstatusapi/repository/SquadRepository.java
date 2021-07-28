package org.serratec.alterstatusapi.repository;

import java.util.List;
import java.util.Optional;

import org.serratec.alterstatusapi.model.Squad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SquadRepository extends JpaRepository<Squad, Long> {

	Optional<Squad> findById(Long id);

	List<Squad> findByNomeContainingIgnoreCase(String nome);
}