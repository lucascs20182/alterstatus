package org.serratec.alterstatusapi.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.serratec.alterstatusapi.exception.ResourceNotFoundException;
import org.serratec.alterstatusapi.model.Imagem;
import org.serratec.alterstatusapi.model.Usuario;
import org.serratec.alterstatusapi.repository.ImagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

public interface ImagemService {

	@Transactional
	public Imagem create(Usuario produtoEntity, MultipartFile multipartFile) throws IOException;
	@Transactional
	public Imagem getImagem(Long id);
	@Transactional
	public Imagem removeImagem(Long id);
}
