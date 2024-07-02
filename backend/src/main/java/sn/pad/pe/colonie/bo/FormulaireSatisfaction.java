package sn.pad.pe.colonie.bo;

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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
public class FormulaireSatisfaction implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne    
    @JoinColumn(name = "CODE_DOSSIER_COLONIE", referencedColumnName = "id", nullable = false)
    @JsonBackReference 
    private DossierColonie codeDossier;

    private Date dateCreation;

    @OneToMany(mappedBy = "formulaire", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "formulaire-reponses")
    private List<Reponse> reponses = new ArrayList<>();

    private String commentaire;
    private String matricule;
    private String nom;
    private String prenom;
    public Long getId() {
        return id;
    }

    public DossierColonie getCodeDossier() {
        return codeDossier;
    }

    public void setCodeDossier(DossierColonie codeDossier) {
        this.codeDossier = codeDossier;
    }

    public Date getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Date dateCreation) {
        this.dateCreation = dateCreation;
    }

    public List<Reponse> getReponses() {
        return reponses;
    }

    public void setReponses(List<Reponse> reponses) {
        this.reponses = reponses;
    }
    public void setId(Long id) {
        this.id = id;
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
