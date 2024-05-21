package sn.pad.pe.partenariat.dto;

import java.util.Date;

public class PaysDTO {

	private long id;
	private String nom;
	private String nomOfficiel;
	private String code;
	private String code31;
	private String image;
	private double latitude;
	private double longitude;
	private double zoom;
	private boolean active;
	private ContinentDTO continent;
	private ZoneDTO zone;
	private Date createdAt;
	private Date updatedAt;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getNomOfficiel() {
		return nomOfficiel;
	}

	public void setNomOfficiel(String nomOfficiel) {
		this.nomOfficiel = nomOfficiel;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCode31() {
		return code31;
	}

	public void setCode31(String code31) {
		this.code31 = code31;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getZoom() {
		return zoom;
	}

	public void setZoom(double zoom) {
		this.zoom = zoom;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public ContinentDTO getContinent() {
		return continent;
	}

	public void setContinent(ContinentDTO continent) {
		this.continent = continent;
	}

	public ZoneDTO getZone() {
		return zone;
	}

	public void setZone(ZoneDTO zone) {
		this.zone = zone;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

}
