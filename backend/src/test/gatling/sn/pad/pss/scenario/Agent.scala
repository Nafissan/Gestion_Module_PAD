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

class Agent {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Agent {
        val enregistrer = exec(http("Enregitrer les informations d'un agent")
            .post("/agents")
            .body(
                StringBody(
                    """{
                            "matricule": "R36262",
                            "nom": "Fall",
                            "prenom": "Atoumane",
                            "dateNaissance": "2020-08-19T23:00:00.000+0000",
                            "lieuNaissance": "Dakar",
                            "adresse": "114 ZDC",
                            "matrimoniale": "Célibataire",
                            "photo": "IMG-05282142828550.png",
                            "sexe": "m",
                            "email": "atoumane.fall@portdakar.sn",
                            "telephone": "773012470",
                            "dateEngagement": "2020-08-30T23:00:00.000+0000",
                            "datePriseService": "2020-08-10T23:00:00.000+0000",
                            "estChef": false,
                            "createdAt": "2020-11-30T14:42:34.000+0000",
                            "updatedAt": "2020-08-30T23:00:00.000+0000",
                            "fonction": {"id" : "1"},
                            "uniteOrganisationnelle": {"id" : "2"}
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("agent_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des agents")
            .get("/agents")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'un agent")
            .put("/agents")
            .body(
                StringBody(
                   "${agent_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un agent")
            .delete("/agents")
            .body(
                StringBody(
                    "${agent_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche d'un agent par son identifiant")
            .get("/agents/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des agent - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/agents")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD AGENT").exec(Agent.enregistrer, Agent.liste, Agent.rechercherParIdentifiant, Agent.modifier, Agent.supprimer)
    val charges = scenario("Tests de charges pour la ressource Agent").exec(Agent.liste100)

}