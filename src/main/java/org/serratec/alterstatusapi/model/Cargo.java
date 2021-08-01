package org.serratec.alterstatusapi.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "cargo")
@SequenceGenerator(name = "generator_cargo", sequenceName = "sequence_cargo", initialValue = 1, allocationSize = 1)

public class Cargo {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_cargo")
	private Long id;

	@Column(nullable = false, length = 30)
	private String nome;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "cargo")
	private List<Usuario> usuario;

	@JsonIgnore
	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "squad_id", referencedColumnName = "id")
	private Squad squad;

	private Long id_cargo;

	// ----------------------

	public Cargo(Long id, String nome, Squad squad, List<Usuario> usuario, Long id_cargo) {
		this.id = id;
		this.nome = nome;
		this.squad = squad;
		this.usuario = usuario;
		this.id_cargo = id_cargo;
	}

	public Cargo() {
	}

	// ------------------------

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

	public List<Usuario> getUsuario() {
		return usuario;
	}

	public void setUsuario(List<Usuario> usuario) {
		this.usuario = usuario;
	}

	public Squad getSquad() {
		return squad;
	}

	public void setSquad(Squad squad) {
		this.squad = squad;
	}

	public Long getId_cargo() {
		return id_cargo;
	}

	public void setId_cargo(Long id_cargo) {
		this.id_cargo = id_cargo;
	}

}
