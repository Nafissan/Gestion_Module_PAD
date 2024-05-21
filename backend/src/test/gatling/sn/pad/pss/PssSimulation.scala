package sn.pad.pss

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._
import sn.pad.pss.scenario._

class PssSimulation extends Simulation {
    val httpProtocol = http
        .baseUrl("http://localhost:9080/pss-backend")
        .inferHtmlResources(BlackList(""".*\.css""", """.*\.js""", """.*\.ico"""), WhiteList())
        .acceptHeader("text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8")
        .acceptEncodingHeader("gzip, deflate")
        .acceptLanguageHeader("it-IT,it;q=0.8,en-US;q=0.5,en;q=0.3")
        .userAgentHeader("Mozilla/5.0 (Windows NT 10.0; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0")
        
    val scenariosFileMetaData = new FileMetaData()

    //   
    val scenariosAgent = new Agent()
    //
    val scenariosUniteOrganisationnelle = new UniteOrganisationnelle()
    //
    val scenariosFonction = new Fonction()
    
    //
    val scenariosPlanningAbsence = new PlanningAbsence()    
    //
    val scenariosDossierAbsence = new DossierAbsence()
    //
    val scenariosMotif = new Motif()
    //  
    val scenariosAttestation = new Attestation()
    val scenariosEtapeAttestation = new EtapeAttestation()
    //
    val scenariosEtapePlanningDirection = new EtapePlanningDirection()
    val scenariosPlanningConge = new PlanningConge()
    val scenariosConge = new Conge()     
    val scenariosHistoriqueConge = new HistoriqueConge()  
    val scenarioDossierConge = new DossierConge()
    //
    val scenariosNiveauHierarchique = new NiveauHierarchique()
    //
    val scenariosCompte = new Compte()
    val scenariosRole = new Role()
    val scenariosRessource = new Ressource()
    val scenariosPrivilege = new Privilege()
    //
    val scenariosAbsence = new Absence()
    //val scenariosEtapeAbsence = new EtapeAbsence()
    val scenariosEtapeAbsence = new EtapeAbsence()
       //
     val scenariosInterim = new Interim()
        //
     val scenariosDossierInterim = new DossierInterim()
        //
     val scenariosEtapeInterim = new EtapeInterim()
     //
     val scenariosPlanningDirection = new PlanningDirection()
    setUp(
    // Test perf pour Agent
        scenariosAgent.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosAgent.charges.inject(rampUsers(100) during (10 seconds)),


        /** Test perf for file meta data**/ 
        scenariosFileMetaData.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosFileMetaData.charges.inject(rampUsers(100) during (10 seconds)),
      
      // Test perf for EtapePlanningDirection
       scenariosEtapePlanningDirection.crud.inject(rampUsers(1) during (1 seconds)),
       scenariosEtapePlanningDirection.charges.inject(rampUsers(100) during (10 seconds)),


        // Test perf pour UniteOrganisationnelle
        scenariosUniteOrganisationnelle.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosUniteOrganisationnelle.charges.inject(rampUsers(100) during (10 seconds)),
        
       //Test perf pour Fonction
        scenariosFonction.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosFonction.charges.inject(rampUsers(100) during (10 seconds)),         
        
        
        //Test perf pour DossierAbsence
        scenariosDossierAbsence.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosDossierAbsence.charges.inject(rampUsers(100) during (10 seconds)),        
        
        
        //Test perf pour PlanningAbsence
        scenariosPlanningAbsence.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosPlanningAbsence.charges.inject(rampUsers(100) during (10 seconds)), 
         
        
        // Test perf pour Motifs
        scenariosMotif.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosMotif.charges.inject(rampUsers(100) during (10 seconds)),       
        
        

        // Test perf pour compte
        scenariosCompte.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosCompte.charges.inject(rampUsers(100) during (20 seconds)),

        // Test perf pour role
        scenariosRole.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosRole.charges.inject(rampUsers(100) during (100 seconds)),

        // Test perf pour ressource
        scenariosRessource.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosRessource.charges.inject(rampUsers(100) during (100 seconds)),

        // Test perf pour privilege
        scenariosPrivilege.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosPrivilege.charges.inject(rampUsers(100) during (100 seconds)),

        // Test performance pour Attestation
        scenariosAttestation.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosAttestation.charges.inject(rampUsers(100) during (10 seconds)),

        // Test perf pour EtapeAttestation
        scenariosEtapeAttestation.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosEtapeAttestation.charges.inject(rampUsers(100) during (10 seconds)),

       // Test perf pour PlanningConge
       scenariosPlanningConge.crud.inject(rampUsers(20) during (5 seconds)),
       scenariosPlanningConge.charges.inject(rampUsers(100) during (10 seconds)), 

       // Test perf pour Conge
       scenariosConge.crud.inject(rampUsers(20) during (5 seconds)),
       scenariosConge.charges.inject(rampUsers(100) during (10 seconds)),
       
      // Test perf pour HistoriqueConge
        scenariosHistoriqueConge.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosHistoriqueConge.charges.inject(rampUsers(100) during (10 seconds)),

       //Test perf pour DossierConge
       scenarioDossierConge.crud.inject(rampUsers(1) during (5 seconds)),
       scenarioDossierConge.charges.inject(rampUsers(100) during (10 seconds)),
    
 	    // Test perf pour Absence
        scenariosAbsence.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosAbsence.charges.inject(rampUsers(100) during (10 seconds)),   
      // Test perf pour EtapeAbsence
        scenariosEtapeAbsence.crud.inject(rampUsers(1) during (1 seconds)),
        scenariosEtapeAbsence.charges.inject(rampUsers(100) during (10 seconds)),
        // Test perf pour DossierInterim
        scenariosDossierInterim.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosDossierInterim.charges.inject(rampUsers(100) during (10 seconds)),
        // Test perf pour Interim
        scenariosInterim.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosInterim.charges.inject(rampUsers(100) during (10 seconds)), 
        // Test perf pour EtapeInterim
        scenariosEtapeInterim.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosEtapeInterim.charges.inject(rampUsers(100) during (10 seconds)),
        
        // Test perf pour NiveauHierarchique
        scenariosNiveauHierarchique.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosNiveauHierarchique.charges.inject(rampUsers(100) during (10 seconds)),

        //Test perf pour PlanningDirection
        scenariosPlanningDirection.crud.inject(rampUsers(20) during (5 seconds)),
        scenariosPlanningDirection.charges.inject(rampUsers(100) during (10 seconds))
  ).protocols(httpProtocol)
}