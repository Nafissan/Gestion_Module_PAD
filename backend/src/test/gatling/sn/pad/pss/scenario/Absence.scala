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

class Absence {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Absence {
        val enregistrer = exec(http("Enregistrer les informations d'une absence")
            .post("/absences")
            .body(
                StringBody(
                    """{
                    
							"dateDepart": "2021-01-05T00:00:00.000+0000",
							"dateRetourPrevisionnelle": "2021-01-08T00:00:00.000+0000",
							"dateRetourEffectif": null,
							"dateSaisie": "2021-01-05T12:56:08.000+0000",
							"etat": "TRANSMIS",
							"mois": "janvier",
							"annee": 2021,
							"commentaire": "rr",
							"dureeRestante": 0,
							"createdAt": "2021-01-05T12:56:21.000+0000",
							"updatedAt": "2021-01-05T12:57:04.000+0000",
							"niveau": 0,
							"etape": "Direction du Digital",
							"etape_validation": 5,
							"agent": {
							"id": 2,
							"matricule": "609588",
							"nom": "Diouf",
							"prenom": "Ndeye Magatte",
							"dateNaissance": "1995-12-31T13:43:13.000+0000",
							"lieuNaissance": null,
							"adresse": null,
							"matrimoniale": "MariÃ©(e)",
							"photo": null,
							"sexe": "f",
							"email": "ndeye@portdakar.sn",
							"telephone": "768543201",
							"dateEngagement": null,
							"datePriseService": null,
							"estChef": false,
							"createdAt": null,
							"updatedAt": null,
							"fonction": null,
							"uniteOrganisationnelle": null
							},
							"uniteOrganisationnelle": {
							"id": 2,
							"code": "UO002",
							"nom": "DD",
							"description": "Direction du Digital",
							"createdAt": null,
							"updatedAt": null,
							"niveauHierarchique": {
							"id": 1,
							"libelle": "Direction",
							"position": 1,
							"createdAt": "2020-04-01T10:50:28.000+0000",
							"updatedAt": "2020-04-01T10:50:28.000+0000"
							},
							"uniteSuperieure": null
							},
							"planningAbsence": {
							"id": 4,
							"code": "FA-DD-2021",
							"dateCreation": "2021-01-05T12:56:20.000+0000",
							"etat": null,
							"description": "Feuille D'absence 2021- DD",
							"annee": 0,
							"dossierAbsence": null,
							"uniteOrganisationnelle": null
							},
							"motif": {
							"id": 1,
							"description": "Mariage du travailleur",
							"jours": 3
							}
							}""".stripMargin
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("absence_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des absences")
            .get("/absences")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'une absence")
            .put("/absences")
            .body(
                StringBody(
                   "${absence_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer une absence")
            .delete("/absences")
            .body(
                StringBody(
                    "${absence_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche d'une absence par son identifiant")
            .get("/absences/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des absences - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/absences")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD ABSENCE").exec(Absence.enregistrer, Absence.liste, Absence.rechercherParIdentifiant, Absence.modifier, Absence.supprimer)
    val charges = scenario("Tests de charges pour la ressource /absences").exec(Absence.liste100)

}