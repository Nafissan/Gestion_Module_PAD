package sn.pad.pe.colonie.bo;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyJoinColumn;
import javax.persistence.OneToOne;
@Entity
public class FormulaireSatisfaction implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne    
    @JoinColumn(name = "CODE_DOSSIER_COLONIE", referencedColumnName = "id", nullable = false)
    private DossierColonie codeDossier;

    private Date dateCreation;

    @ElementCollection
    @CollectionTable(name = "reponses", joinColumns = @JoinColumn(name = "formulaire_id"))
    @MapKeyJoinColumn(name = "question_id")
    @Column(name = "reponse")
    private Map<Question, String> reponses = new HashMap<>();

    private String commentaire;
    //agent qui cree le formulaire
    private String matricule;
    private String nom;
    private String prenom;
    // Constructor, getters and setters
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

    public Map<Question, String> getReponses() {
        return reponses;
    }

    public void setReponses(Map<Question, String> reponses) {
        this.reponses = reponses;
    }

    public void ajouterReponse(Question question, String reponse) {
        this.reponses.put(question, reponse);
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
