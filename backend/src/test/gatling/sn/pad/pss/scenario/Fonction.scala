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

class Fonction {

    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Fonction {
        val enregistrer = exec(http("Enregitrer une nouvelle fonction")
            .post("/fonctions")
            .body( 
                StringBody(
                    """{
                            "id": "221",
                            "nom": "Ingenieur 2",
                            "createdAt": "2020-08-19T23:00:00.000+0000",
                            "updatedAt": "2020-08-19T23:00:00.000+0000",
                            "uniteOrganisationnelle": [
                                {"id" : "1"},
                                {"id" : "3"}
                            ]
                           
                    }""".stripMargin
                    
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("fonction_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des fonctions")
            .get("/fonctions")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier une fonction")
            .put("/fonctions")
            .body(
                StringBody(
                   "${fonction_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        val rechercherParIdentifiant = exec(http("Recherche d'une fonction par son id")
            .get("/fonctions/${id}")
            .check(status.is(200))
        )
        val supprimer = exec(http("Supprimer une fonction")
            .delete("/fonctions")
            .body(
                StringBody(
                    "${fonction_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

  
        
        val liste100 = exec(http("Liste des fonctions - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/fonctions")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD FONCTION").exec(Fonction.enregistrer, Fonction.liste, Fonction.rechercherParIdentifiant, Fonction.modifier, Fonction.supprimer)
    val charges = scenario("Tests de charges pour la ressource  Fonction").exec(Fonction.liste100)

}