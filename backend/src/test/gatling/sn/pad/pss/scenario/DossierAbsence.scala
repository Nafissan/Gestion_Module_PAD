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

class DossierAbsence {

    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object DossierAbsence {
        val enregistrer = exec(http("Enregitrer d'un nouveau dossier absence")
            .post("/dossierabsences")
            .body( 
                StringBody(
                    """{
                            "id": 12,
                            "code": "DA-1999",
                            "description": null,
                            "annee": 1999,
                            "matricule": "607117",
                            "prenom": "Mary Nde",
                            "nom": "Sene",
                            "fonction": "Ingenieur",
                            "codeDirection": "UO002",
                            "uniteOrganisationnelle": {"id" : "2"}
                        }""".stripMargin
                    
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("dossierabsences_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des dossiers absences")
            .get("/dossierabsences")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un dossier absences")
            .put("/dossierabsences")
            .body(
                StringBody(
                   "${dossierabsences_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        val rechercherParIdentifiant = exec(http("Recherche d'un dossier absences par son id")
            .get("/dossierabsences/${id}")
            .check(status.is(200))
        )
        val supprimer = exec(http("Supprimer un dossier absence")
            .delete("/dossierabsences")
            .body(
                StringBody(
                    "${dossierabsences_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

  
        
        val liste100 = exec(http("Liste des dossierS d'absence - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/dossierabsences")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD DOSSIER ABSENCE").exec(DossierAbsence.enregistrer, DossierAbsence.liste, DossierAbsence.rechercherParIdentifiant, DossierAbsence.modifier, DossierAbsence.supprimer)
    val charges = scenario("Tests de charges pour la ressource  Dossier Absence").exec(DossierAbsence.liste100)

}