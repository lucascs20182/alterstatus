package org.serratec.alterstatusapi.dto;

public class UsuarioDTORequest {

	private String username;

	private String senha;

	private String nome;

	private String status;

	private Long id_usuario;

	private Long id_squad;

	private Long id_cargo;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getId_usuario() {
		return id_usuario;
	}

	public void setId_usuario(Long id_usuario) {
		this.id_usuario = id_usuario;
	}

	public Long getId_squad() {
		return id_squad;
	}

	public void setId_squad(Long id_squad) {
		this.id_squad = id_squad;
	}

	public Long getId_cargo() {
		return id_cargo;
	}

	public void setId_cargo(Long id_cargo) {
		this.id_cargo = id_cargo;
	}

}
