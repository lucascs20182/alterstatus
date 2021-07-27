package org.serratec.alterstatusapi.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "Usuario")
public class Usuario {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, length = 60)
	private String nome;

	@Column(unique = true, nullable = false, length = 30)
	private String username;

	@Column(nullable = false, length = 60)
	private String senha;

	@Column(nullable = false)
	private String status;

	private LocalDate dataCadastro;

	private String urlImagem;

	@JsonIgnore
	@OneToOne(mappedBy = "usuario")
	private Imagem imagem;

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cargo_id", referencedColumnName = "id")
	private Cargo cargo;

	@JsonIgnore
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "squad_id", referencedColumnName = "id")
	private Squad squad;
	
	private Long id_usuario;
	
	private Long id_cargo;
	
	private Long id_squad;

	public Usuario(Long id, String nome, String username, String senha, String status, LocalDate dataCadastro,
			String urlImagem, Imagem imagem, Cargo cargo, Squad squad, Long id_usuario, Long id_squad, Long id_cargo) {
		this.id = id;
		this.nome = nome;
		this.username = username;
		this.senha = senha;
		this.dataCadastro = dataCadastro;
		this.urlImagem = urlImagem;
		this.imagem = imagem;
		this.cargo = cargo;
		this.squad = squad;
		this.status = status;
		this.id_usuario = id_usuario;
		this.id_cargo = id_cargo;
		this.id_squad = id_squad;
	}

	public Usuario() {

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

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

	public LocalDate getDataCadastro() {
		return dataCadastro;
	}

	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}

	public Imagem getImagem() {
		return imagem;
	}

	public void setImagem(Imagem imagem) {
		this.imagem = imagem;
	}

	public String getUrlImagem() {
		return urlImagem;
	}

	public void setUrlImagem(String urlImagem) {
		this.urlImagem = urlImagem;
	}

	public void relacionarComCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public void relacionarComSquad(Squad squad) {
		this.squad = squad;
	}

	public Cargo getCargo() {
		return cargo;
	}

	public void setCargo(Cargo cargo) {
		this.cargo = cargo;
	}

	public Squad getSquad() {
		return squad;
	}

	public void setSquad(Squad squad) {
		this.squad = squad;
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

	public Long getId_cargo() {
		return id_cargo;
	}

	public void setId_cargo(Long id_cargo) {
		this.id_cargo = id_cargo;
	}

	public Long getId_squad() {
		return id_squad;
	}

	public void setId_squad(Long id_squad) {
		this.id_squad = id_squad;
	}
	
	

}
