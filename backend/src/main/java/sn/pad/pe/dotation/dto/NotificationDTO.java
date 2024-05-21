package sn.pad.pe.dotation.dto;

public class NotificationDTO {
    private long id;
    private boolean active;
    private String module;
    private String libelle;
    
    
    
    //private NotificationDTO notification;



    /**
     * @return the id
     */
    public long getId() {
        return id;
    }



    /**
     * @param id the id to set
     */
    public void setId(long id) {
        this.id = id;
    }



    /**
     * @return the active
     */
    public boolean isActive() {
        return active;
    }



    public NotificationDTO() {
        super();
        // TODO Auto-generated constructor stub
    }



    /**
     * @param active the active to set
     */
    public void setActive(boolean active) {
        this.active = active;
    }



    /**
     * @return the module
     */
    public String getModule() {
        return module;
    }



    /**
     * @param module the module to set
     */
    public void setModule(String module) {
        this.module = module;
    }



    public String getLibelle() {
        return libelle;
    }



    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

}
