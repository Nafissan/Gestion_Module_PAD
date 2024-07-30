package sn.pad.pe.colonie.dto;

public class QuestionDTO {
   
    private Long id;

    private String texte;
    private String type;

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

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}