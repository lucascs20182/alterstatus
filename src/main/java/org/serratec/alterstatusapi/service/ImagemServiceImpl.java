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

@Service
public class ImagemServiceImpl implements ImagemService {

	@Autowired
	ImagemRepository repositoryImagem;

	@Transactional
	@Override
	public Imagem create(Usuario produtoEntity, MultipartFile multipartFile) throws IOException {
		Imagem imageProduto = new Imagem();
		imageProduto.setUsuario(produtoEntity);
		imageProduto.setData(multipartFile.getBytes());
		imageProduto.setMimeType(multipartFile.getContentType());
		imageProduto.setNome(produtoEntity.getNome().replace(" ", "-") + "-img");
		return repositoryImagem.save(imageProduto);
	}

	// verificar se os findbyusuarioid podem estourar erro na auth
	@Transactional
	@Override
	public Imagem getImagem(Long id) {
		Imagem image = repositoryImagem.findByUsuarioId(id);

		if (image == null) {
			throw new ResourceNotFoundException("Não foi localizado nenhum avatar para este username.");

		}

		return image;
	}

	@Transactional
	@Override
	public Imagem removeImagem(Long id) {
		Imagem image = repositoryImagem.findByUsuarioId(id);
		repositoryImagem.delete(repositoryImagem.findByUsuarioId(id));
		return image;
	}
}
