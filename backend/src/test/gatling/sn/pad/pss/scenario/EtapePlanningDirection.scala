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

class EtapePlanningDirection {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object EtapePlanningDirection {
        val enregistrer = exec(http("Enregitrer une etapePlanningDirection")
            .post("/etapeplannings")
            .body(
                StringBody(
                    """{
                            "description": "",
                            "date": "2020-11-26T16:10:48.000+0000",
                            "etat": "SAISI",
                            "matricule": "607117",
                            "prenom": "Mary Nde",
                            "nom": "Sene",
                            "fonction": "Directeur",
                            "structure": "Direction du Digital",
                            "planningDirection": {
                                "id": 1,
                                "code": "P-U002",
                                "description": "Description",
                                "etat": "SAISI",
                                "niveau": 1,
                                "etape": 1,
                                "matricule": "600332",
                                "prenom": "",
                                "nom": "",
                                "fonction": "",
                                "codeDirection": "UO002",
                                "nomDirection": "",
                                "descriptionDirection": "",
                                "dossierConge": {
                                    "id": 1,
                                    "code": "DC-2020-129",
                                    "annee": "2020",
                                    "description": "Desc",
                                    "etat": "SAISI",
                                    "matricule": "",
                                    "prenom": "",
                                    "nom": "",
                                    "fonction": "Fonction",
                                    "codeDirection": "UO015",
                                    "nomDirection": "",
                                    "descriptionDirection": "DCH"
                                    }
                            }
                                                }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("etapeplanning_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val etapeplanningEnregistrer:String = session.attributes.get("etapeplanning_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(etapeplanningEnregistrer.split(","))
                session.set("etapeplanningEnregistrer", etapeplanningEnregistrer)
            })

        val lister = exec(http("Liste etapePlanningDirections")
            .get("/etapeplannings")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier une etapePlanningDirection")
            .put("/etapeplannings")
            .body(
                StringBody(
                   "${etapeplanning_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer une etapePlanningDirection")
            .delete("/etapeplannings")
            .body(
                StringBody(
                    "${etapeplanning_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Rechercher une etapePlanningDirection par son identifiant")
            .get("/etapeplannings/${id}")
            .check(status.is(200))
        )
        
        val lister100Fois = exec(http("Liste etapePlanningDirection - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/etapeplannings")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD ETAPEPLANNINGDIRECTION").exec(EtapePlanningDirection.enregistrer, EtapePlanningDirection.lister, EtapePlanningDirection.rechercherParIdentifiant, EtapePlanningDirection.modifier, EtapePlanningDirection.supprimer)
    val charges = scenario("Tests de charges pour la ressource /etapeplannings").exec(EtapePlanningDirection.lister100Fois)

}