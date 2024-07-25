package sn.pad.pe.pelerinage.bo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class FormulaireSatisfactionPelerinage implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "CODE_DOSSIER_PELERINAGE", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private DossierPelerinage dossierPelerinage;

    private Date dateCreation;

    @OneToMany(mappedBy = "formulaire", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonManagedReference(value = "formulaire-reponses")
    private List<ReponsePelerinage> reponses = new ArrayList<>();

    private String commentaire;
    private String matricule;
    private String nom;
    private String prenom;
    public static long getSerialversionuid() {
        return serialVersionUID;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public DossierPelerinage getDossierPelerinage() {
        return dossierPelerinage;
    }
    public void setDossierPelerinage(DossierPelerinage dossierPelerinage) {
        this.dossierPelerinage = dossierPelerinage;
    }
    public Date getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }
    public List<ReponsePelerinage> getReponses() {
        return reponses;
    }
    public void setReponses(List<ReponsePelerinage> reponses) {
        this.reponses = reponses;
    }
    public String getCommentaire() {
        return commentaire;
    }
    public void setCommentaire(String commentaire) {
        this.commentaire = commentaire;
    }
    public String getMatricule() {
        return matricule;
    }
    public void setMatricule(String matricule) {
        this.matricule = matricule;
    }
    public String getNom() {
        return nom;
    }
    public void setNom(String nom) {
        this.nom = nom;
    }
    public String getPrenom() {
        return prenom;
    }
    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

}
