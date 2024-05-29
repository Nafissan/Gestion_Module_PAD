package sn.pad.pe.colonie.dto;

public class QuestionDTO {
   
    private Long id;

    private String texte;

    // Constructor, getters and setters
    public QuestionDTO() {}

    public QuestionDTO(String texte) {
        this.texte = texte;
    }

    public Long getId() {
        return id;
    }

    public String getTexte() {
        return texte;
    }

    public void setTexte(String texte) {
        this.texte = texte;
    }
}