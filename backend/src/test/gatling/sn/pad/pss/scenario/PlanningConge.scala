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

class PlanningConge {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object PlanningConge {
        val enregistrer = exec(http("Enregitrer un PlanningConge")
            .post("/planningconges")
            .body(
                StringBody(
                    """{
                            "code":"PL-2021-1159",
                            "dateCreation":"2020-11-30T15:42:34.000+0000",
                            "etat":"SASI","description":"Desc",
                            "planningDirection":{
                                "id":1,
                                "code":"P-U002",
                                "description":"Description",
                                "etat":"SAISI","niveau":1,
                                "etape":1,
                                "matricule":"600332",
                                "prenom":"",
                                "nom":"",
                                "fonction":"",
                                "codeDirection":"UO002",
                                "nomDirection":"",
                                "descriptionDirection":"",
                                "dossierConge":{
                                    "id":1,
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
                                    },
                                "uniteOrganisationnelle":{
                                    "id":2,
                                    "code":"UO002",
                                    "nom":"DD",
                                    "description":"Direction du Digital",
                                    "createdAt":"2020-11-30T15:42:34.000+0000",
                                    "updatedAt":"2020-11-30T15:42:34.000+0000",
                                    "niveauHierarchique":{
                                        "id":1,
                                        "libelle":"Direction",
                                        "position":1,
                                        "createdAt":"2020-04-01T10:50:28.000+0000",
                                        "updatedAt":"2020-04-01T10:50:28.000+0000"
                                    },
                                    "uniteSuperieure":{
                                        "id":1,
                                        "code":"UO001",
                                        "nom":"DG",
                                        "description":"Direction GÃ©nÃ©rale",
                                        "createdAt":"2020-11-30T15:42:34.000+0000",
                                        "updatedAt":"2020-11-30T15:42:34.000+0000",
                                        "niveauHierarchique":{
                                            "id":5,"libelle":"Direction GÃ©nÃ©rale",
                                            "position":0,
                                            "createdAt":"2020-04-01T10:50:28.000+0000",
                                            "updatedAt":"2020-04-01T10:50:28.000+0000"
                                        },
                                        "uniteSuperieure":null
                                    }
                                }
                        }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("planningConge_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val planningCongeEnregistrer:String = session.attributes.get("planningConge_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(planningCongeEnregistrer.split(","))
                session.set("planningCongeEnregistrer", planningCongeEnregistrer)
            })

        val lister = exec(http("Liste PlanningConge")
            .get("/planningconges")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un PlanningConge")
            .put("/planningconges")
            .body(
                StringBody(
                   "${planningConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un PlanningConge")
            .delete("/planningconges")
            .body(
                StringBody(
                    "${planningConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Rechercher un PlanningConge par son identifiant")
            .get("/planningconges/${id}")
            .check(status.is(200))
        )
        
        val lister100Fois = exec(http("Liste PlanningConge - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/planningconges")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD PLANNINGCONGE").exec(PlanningConge.enregistrer, PlanningConge.lister, PlanningConge.rechercherParIdentifiant, PlanningConge.modifier, PlanningConge.supprimer)
    val charges = scenario("Tests de charges pour la ressource /planningconges").exec(PlanningConge.lister100Fois)

}