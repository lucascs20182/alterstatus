package org.serratec.alterstatusapi.service;

import java.io.IOException;

import javax.transaction.Transactional;

import org.serratec.alterstatusapi.model.Imagem;
import org.serratec.alterstatusapi.model.Usuario;
import org.springframework.web.multipart.MultipartFile;

public interface ImagemService {

	@Transactional
	public Imagem cadastrar(Usuario produtoEntity, MultipartFile multipartFile) throws IOException;

	@Transactional
	public Imagem obterImagem(Long id);

	@Transactional
	public void removerImagem(Long id);
}
