package org.serratec.alterstatusapi.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonAutoDetect
@Entity
@Table(name = "Squad")
@SequenceGenerator(name = "generator_squad", sequenceName = "sequence_squad", initialValue = 1, allocationSize = 1)

public class Squad {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_squad")
	private Long id;

	@Column(nullable = false, length = 30)
	private String nome;

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "squad")
	private List<Usuario> usuarios;

	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "squad")
	private List<Cargo> cargos;

	// --------------------------------------

	public Squad(Long id, String nome, List<Cargo> cargos, List<Usuario> usuarios) {
		this.id = id;
		this.nome = nome;
		this.usuarios = usuarios;
		this.cargos = cargos;
	}

	public Squad() {

	}

	// ------------------------------------

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

	public List<Usuario> getUsuarios() {
		return usuarios;
	}

	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}

	public List<Cargo> getCargos() {
		return cargos;
	}

	public void setCargos(List<Cargo> cargos) {
		this.cargos = cargos;
	}

}
