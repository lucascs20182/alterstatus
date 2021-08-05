package org.serratec.alterstatusapi.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonAutoDetect
@Entity
@Table(name = "Squad")
@SequenceGenerator(name = "generator_squad", sequenceName = "sequence_squad", initialValue = 1, allocationSize = 1)

public class Squad {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator_squad")
	private Long id;

	@Column(nullable = false, length = 30, unique = true)
	private String nome;

	@JsonIgnoreProperties({ "hibernateEagerInitializer", "handler" })
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "squad")
	private List<Usuario> usuarios;

	@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "squad_id", referencedColumnName = "id")
	private List<Cargo> cargos;

	private Long id_squad;

	// --------------------------------------

	public Squad(Long id, String nome, List<Cargo> cargos, List<Usuario> usuarios, Long id_squad) {
		this.id = id;
		this.nome = nome;
		this.usuarios = usuarios;
		this.cargos = cargos;
		this.id_squad = id_squad;
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

	public void setCargos(Cargo cargo) {
		this.cargos.add(cargo);
	}

	public Long getId_squad() {
		return id_squad;
	}

	public void setId_squad(Long id_squad) {
		this.id_squad = id_squad;
	}

}
