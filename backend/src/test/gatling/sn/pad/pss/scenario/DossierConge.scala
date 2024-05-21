package sn.pad.pss.scenario

import java.util.concurrent.atomic.AtomicLong
import io.gatling.commons.validation.Validation
import io.gatling.core.Predef._
import io.gatling.core.structure._
import io.gatling.http.Predef._
import io.gatling.http.protocol._
import io.gatling.http.response.Response
import io.gatling.core.session.Session
import scala.concurrent.duration._
import com.fasterxml.jackson.databind.{ObjectMapper, SerializationFeature}

class DossierConge{
   val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

     object DossierConge {
        val enregistrerDossier = exec(http("Enregitrer un dossier conge")
            .post("/dossierconges")
            .body(
                StringBody(
                    """{
                        "annee": "2020",
                        "code": "DC-2020-5455",
                        "code_direction": "UO015", 
                        "created_at": "2020-11-30T14:42:34.000+0000", 
                        "description": "Desc",
                        "description_direction": "DCH",
                        "etat": "OUVERT", 
                        "fonction": "Fonction",
                        "matricule": "Mat1", 
                        "nom":"THIAW", 
                        "nom_direction": "Direction1",
                        "prenom":"Adama", 
                        "updated_at": "2020-08-30T23:00:00.000+0000"
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("dossierConge_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            

        val listeDossier = exec(http("Liste des dossiers conge")
            .get("/dossierconges")
            .check(status.is(200))
        )

        val modifierDossier = exec(http("Modifier un dossier conge")
            .put("/dossierconges")
            .body(
                StringBody(
                   "${dossierConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimerDossier = exec(http("Supprimer un dossier conge")
            .delete("/dossierconges")
            .body(
                StringBody(
                    "${dossierConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        )

        val dossierParIdentifiant = exec(http("Recherche d'un dossier conge par son identifiant")
            .get("/dossierconges/{id}")
            .check(status.is(200))
        ) 

        val liste100 = exec(http("Liste des dossiers conge - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/dossierconges")
            .check(status.is(200))
        ).pause(2 milliseconds)

    }

    val crud = scenario("CRUD DOSSIERCONGE").exec(DossierConge.enregistrerDossier, DossierConge.listeDossier,DossierConge.dossierParIdentifiant,DossierConge.modifierDossier,DossierConge.supprimerDossier)
    val charges = scenario("Test de charges pour la ressource DossierConge").exec(DossierConge.liste100)

}