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

class Conge {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Conge {
        val enregistrer = exec(http("Enregitrer un Conge")
            .post("/conges")
            .body(
                StringBody(
                    """{
                            "code": "C-60054-215822",
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
                        }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("conge_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val congeEnregistrer:String = session.attributes.get("conge_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(congeEnregistrer.split(","))
                session.set("congeEnregistrer", congeEnregistrer)
            })

        val lister = exec(http("Liste Conge")
            .get("/conges")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un Conge")
            .put("/conges")
            .body(
                StringBody(
                   "${conge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un Conge")
            .delete("/conges")
            .body(
                StringBody(
                    "${conge_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Rechercher un Conge par son identifiant")
            .get("/conges/${id}")
            .check(status.is(200))
        )
        
        val lister100Fois = exec(http("Liste Conge - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/conges")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD CONGE").exec(Conge.enregistrer, Conge.lister, Conge.rechercherParIdentifiant, Conge.modifier, Conge.supprimer)
    val charges = scenario("Tests de charges pour la ressource /conges").exec(Conge.lister100Fois)

}