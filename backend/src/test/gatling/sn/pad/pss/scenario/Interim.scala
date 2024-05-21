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

class Interim {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Interim {
        val enregistrer = exec(http("Enregitrer les informations d'un interim")
            .post("/interims")
            .body(
                StringBody(
                    """{
"dateSaisie": null,
"dateDepart": null,
"dateRetour": null,
"dateRetourEffective": null,
"commentaire": "Interim ",
"etat": "1",
"annee": 2020,
"niveau": 2,
"createdAt": null,
"updatedAt": null,
"agentDepart": {
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
"dateEngagement": "2020-09-01T05:21:00.000+0000",
"datePriseService": "2020-09-23T07:00:00.000+0000",
"estChef": false,
"createdAt": "2021-01-06T08:06:40.000+0000",
"updatedAt": "2021-01-06T08:06:40.000+0000",
"fonction": null,
"uniteOrganisationnelle": null
},
"agentArrive": {
"id": 1,
"matricule": "608017",
"nom": "BaldÃ©",
"prenom": "Mamadou Mbendy",
"dateNaissance": "2020-08-20T00:00:00.000+0000",
"lieuNaissance": null,
"adresse": null,
"matrimoniale": "CÃ©libataire",
"photo": "dgdsgdfgdf",
"sexe": "m",
"email": "balde@portdakar.sn",
"telephone": "773012470",
"dateEngagement": "2020-08-31T00:00:00.000+0000",
"datePriseService": "2020-08-11T00:00:00.000+0000",
"estChef": false,
"createdAt": "2021-01-06T08:06:40.000+0000",
"updatedAt": "2020-08-31T00:00:00.000+0000",
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
"dossierInterim": {
"id": 1,
"code": "DI_2020",
"annee": 2020,
"description": "Int",
"matricule": "607117",
"prenom": "Ousseynou",
"nom": "DramÃ©",
"fonction": "Ingenieur",
"structure": "DCH",
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
}
},
"fileMetaData": null
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("interim_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des interims")
            .get("/interims")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'un interim")
            .put("/interims")
            .body(
                StringBody(
                   "${interim_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un interim")
            .delete("/interims")
            .body(
                StringBody(
                    "${interim_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche un interim par son identifiant")
            .get("/interims/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des interim - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/interims")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD INTERIM").exec(Interim.enregistrer, Interim.liste, Interim.rechercherParIdentifiant, Interim.modifier, Interim.supprimer)
    val charges = scenario("Tests de charges pour la ressource Interim").exec(Interim.liste100)

}