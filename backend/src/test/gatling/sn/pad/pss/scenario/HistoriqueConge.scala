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

class HistoriqueConge {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object HistoriqueConge {
        val enregistrer = exec(http("Enregitrer un HistoriqueConge")
            .post("/historiqueconges")
            .body(
                StringBody(
                    """{
                            "id": 1,
                            "description": "",
                            "date": "2020-11-26T16:06:49.000+0000",
                            "etat": "VALIDE",
                            "matricule": "607117",
                            "prenom": "Mary Nde",
                            "nom": "Sene",
                            "fonction": "Maintenancier",
                            "structure": "Direction du Digital",
                            "conge": {
                            "id": 1,
                            "code": "C-60054-21582",
                            "annee": "2020",
                            "mois": "octobre",
                            "dureePrevisionnelle": 0,
                            "dureeEffective": 0,
                            "dateDepart": "2020-11-30T15:42:34.000+0000",
                            "dateRetourPrevisionnelle": "2020-11-30T15:42:34.000+0000",
                            "dateRetourEffectif": "2020-11-30T15:42:34.000+0000",
                            "dateSaisie": "2020-11-30T15:42:34.000+0000",
                            "etat": "SAISI",
                            "niveau": 1,
                            "etape": 1,
                            "description": "Desc",
                            "codeDecision": "",
                            "dureeRestante": 2,
                            "solde": 1000000,
                            "planningConge": {
                            "id": 1,
                            "code": "PL-2019-5899",
                            "dateCreation": "2020-11-30T15:42:34.000+0000",
                            "etat": "SASI",
                            "description": "Desc",
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
                            },
                            "uniteOrganisationnelle": null
                            },
                            "agent": {
                                "id": 3,
                                "matricule": "604858",
                                "nom": "Ndiaye",
                                "prenom": "Samba Gueye",
                                "dateNaissance": "1995-12-31T13:43:13.000+0000",
                                "lieuNaissance": null,
                                "adresse": null,
                                "matrimoniale": "MariÃ©",
                                "photo": null,
                                "sexe": "m",
                                "email": "samba@portdakar.sn",
                                "telephone": "772979863",
                                "dateEngagement": "2020-09-01T05:21:00.000+0000",
                                "datePriseService": "2020-09-23T07:00:00.000+0000",
                                "estChef": false,
                                "createdAt": "2020-11-30T15:42:34.000+0000",
                                "updatedAt": "2020-11-30T15:42:34.000+0000",
                                "fonction": null,
                                "uniteOrganisationnelle": null
                            }
                            }
                        }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("historiqueConge_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val historiqueCongeEnregistrer:String = session.attributes.get("historiqueConge_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(historiqueCongeEnregistrer.split(","))
                session.set("historiqueCongeEnregistrer", historiqueCongeEnregistrer)
            })

        val lister = exec(http("Liste HistoriqueConge")
            .get("/historiqueconges")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un HistoriqueConge")
            .put("/historiqueconges")
            .body(
                StringBody(
                   "${historiqueConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un HistoriqueConge")
            .delete("/historiqueconges")
            .body(
                StringBody(
                    "${historiqueConge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Rechercher un HistoriqueConge par son identifiant")
            .get("/historiqueconges/${id}")
            .check(status.is(200))
        )
        
        val lister100Fois = exec(http("Liste HistoriqueConge - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/historiqueconges")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD HISTORIQUECONGE").exec(HistoriqueConge.enregistrer, HistoriqueConge.lister, HistoriqueConge.rechercherParIdentifiant, HistoriqueConge.modifier, HistoriqueConge.supprimer)
    val charges = scenario("Tests de charges pour la ressource /historiqueconges").exec(HistoriqueConge.lister100Fois)

}