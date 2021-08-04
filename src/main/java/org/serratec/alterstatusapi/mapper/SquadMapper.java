package org.serratec.alterstatusapi.mapper;

import org.serratec.alterstatusapi.dto.SquadDTO;
import org.serratec.alterstatusapi.model.Squad;
import org.springframework.stereotype.Component;

@Component
public class SquadMapper {

	public SquadDTO toDto(Squad entity) {
		SquadDTO dto = new SquadDTO();

		dto.setId(entity.getId());
		dto.setNome(entity.getNome());
		
		return dto;
	}

}
