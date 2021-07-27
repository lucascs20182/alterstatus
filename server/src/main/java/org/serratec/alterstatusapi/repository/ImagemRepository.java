package org.serratec.alterstatusapi.repository;

import org.serratec.alterstatusapi.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {

	Imagem findByUsuarioId(Long id);
}