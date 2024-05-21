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

class PlanningAbsence {

    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object PlanningAbsence {
        val enregistrer = exec(http("Enregitrer d'un nouveau planning absence")
            .post("/planningabsences")
            .body( 
                StringBody(
                    """{
                            "id": 122,
                            "code": null,
                            "dateCreation": "2020-11-25T08:43:56.000+0000",
                            "etat": "VALIDE",
                            "description": "PL-DD",
                            "annee": 2020,
                            "dossierAbsence": {
                                "id": 1,
                                "code": "DA-1999",
                                "description": null,
                                "annee": 1999,
                                "matricule": "607117",
                                "prenom": "Mary Nde",
                                "nom": "Sene",
                                "fonction": "Ingenieur",
                                "codeDirection": "UO002",
                                "uniteOrganisationnelle": {
                                    "id": 2,
                                    "code": "UO002",
                                    "nom": "DD",
                                    "description": "Direction du Digital",
                                    "createdAt": "2020-11-30T15:42:34.000+0000",
                                    "updatedAt": "2020-11-30T15:42:34.000+0000",
                                    "niveauHierarchique": {
                                        "id": 1,
                                        "libelle": "Direction",
                                        "position": 1,
                                        "createdAt": "2020-04-01T10:50:28.000+0000",
                                        "updatedAt": "2020-04-01T10:50:28.000+0000"
                                    },
                                    "uniteSuperieure": {
                                        "id": 1,
                                        "code": "UO001",
                                        "nom": "DG",
                                        "description": "Direction GÃ©nÃ©rale",
                                        "createdAt": "2020-11-30T15:42:34.000+0000",
                                        "updatedAt": "2020-11-30T15:42:34.000+0000",
                                        "niveauHierarchique": {
                                            "id": 5,
                                            "libelle": "Direction GÃ©nÃ©rale",
                                            "position": 0,
                                            "createdAt": "2020-04-01T10:50:28.000+0000",
                                            "updatedAt": "2020-04-01T10:50:28.000+0000"
                                        },
                                        "uniteSuperieure": null
                                    }
                                },
                                "nomDirection": null,
                                "descriptionDirection": "Planning absence"
                            },
                            "uniteOrganisationnelle": {
                                "id": 2,
                                "code": "UO002",
                                "nom": "DD",
                                "description": "Direction du Digital",
                                "createdAt": "2020-11-30T15:42:34.000+0000",
                                "updatedAt": "2020-11-30T15:42:34.000+0000",
                                "niveauHierarchique": {
                                    "id": 1,
                                    "libelle": "Direction",
                                    "position": 1,
                                    "createdAt": "2020-04-01T10:50:28.000+0000",
                                    "updatedAt": "2020-04-01T10:50:28.000+0000"
                                },
                                "uniteSuperieure": {
                                    "id": 1,
                                    "code": "UO001",
                                    "nom": "DG",
                                    "description": "Direction GÃ©nÃ©rale",
                                    "createdAt": "2020-11-30T15:42:34.000+0000",
                                    "updatedAt": "2020-11-30T15:42:34.000+0000",
                                    "niveauHierarchique": {
                                        "id": 5,
                                        "libelle": "Direction GÃ©nÃ©rale",
                                        "position": 0,
                                        "createdAt": "2020-04-01T10:50:28.000+0000",
                                        "updatedAt": "2020-04-01T10:50:28.000+0000"
                                    },
                                    "uniteSuperieure": null
                                }
                            }
                        }""".stripMargin
                    
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("planningabsences_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des planning absences")
            .get("/planningabsences")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un planning absences")
            .put("/planningabsences")
            .body(
                StringBody(
                   "${planningabsences_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        val rechercherParIdentifiant = exec(http("Recherche d'un planning absences par son id")
            .get("/planningabsences/${id}")
            .check(status.is(200))
        )
        val supprimer = exec(http("Supprimer un planning absence")
            .delete("/planningabsences")
            .body(
                StringBody(
                    "${planningabsences_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

  
        
        val liste100 = exec(http("Liste des planning d'absence - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/planningabsences")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD PLANNING ABSENCE").exec(PlanningAbsence.enregistrer, PlanningAbsence.liste, PlanningAbsence.rechercherParIdentifiant, PlanningAbsence.modifier, PlanningAbsence.supprimer)
    val charges = scenario("Tests de charges pour la ressource Planning Absence").exec(PlanningAbsence.liste100)

}
