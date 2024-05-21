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

class PlanningDirection{
   val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object PlanningDirection{
       val enregistrer = exec(http("Enregitrer un planning Direction")
            .post("/planningdirections")
            .body(
                StringBody(
                    """{
                    "code":"P-U0022",
                    "description":"Description2",
                    "etat":"SAISI",
                    "niveau":1,
                    "etape":1,
                    "matricule":"620332",
                    "prenom":"",
                    "nom":"",
                    "fonction":"",
                    "codeDirection":"UO002",
                    "nomDirection":"",
                    "descriptionDirection":"",
                    "dossierConge":
                       {"id":1,
                        "code":"DC-2020-129",
                        "annee":"2020",
                        "description":"Desc",
                        "etat":"SAISI",
                        "matricule":"",
                        "prenom":"",
                        "nom":"",
                        "fonction":"Fonction",
                        "codeDirection":"UO015",
                        "nomDirection":"",
                        "descriptionDirection":"DCH"
                        }
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("planningDirection_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log))
            .exec( session => {
                val planningEnregistre:String = session.attributes.get("planningDirection_enregistre").get.asInstanceOf[String]
                val nom:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(planningEnregistre.split(","))
                session.set("planningEnregistre", planningEnregistre)
            })
        
        val liste = exec(http("Liste des plannings direction")
            .get("/planningdirections")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'un planning direction")
            .put("/planningdirections")
            .body(
                StringBody(
                    "${planningEnregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un planning direction")
            .delete("/planningdirections")
            .body(
                StringBody(
                    "${planningEnregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        )

        val rechercherParIdentifiant = exec(http("Recherche d'un planning direction par son identifiant")
            .get("/planningdirections/${id}")
            .check(status.is(200))
        )

        val liste100 = exec(http("Liste des plannings direction - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/planningdirections")
            .check(status.is(200))
        ).pause(2 milliseconds)
    } 

    val crud = scenario("CRUD PLANNINGDIRECTION").exec(PlanningDirection.enregistrer, PlanningDirection.liste, PlanningDirection.rechercherParIdentifiant, PlanningDirection.modifier, PlanningDirection.supprimer)
    val charges = scenario("Tests de charges pour la ressource /planningdirections").exec(PlanningDirection.liste100)
}