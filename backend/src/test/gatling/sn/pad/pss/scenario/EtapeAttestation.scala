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

class EtapeAttestation {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object EtapeAttestation {
        val enregistrer = exec(http("Enregitrer les informations d'une etapeAttestation")
            .post("/etapeAttestations")
            .body(
                StringBody(
                    """{
                        "commentaire":null,
                        "date":"2021-01-05T11:49:12.000+0000","action":null,
                    "titre":null,
                    "fonction":"Ingenieur Ã©tude et dÃ©veloppement",
                    "structure":null,
                    "matricule":"607112",
                    "prenom":"Binta",
                    "telephone":"773012470",
                    "nom":"Drame",
                    "etat":null,
                    "attestation":{"id":1,
                    "dateSaisie":"2021-01-05T11:29:01.000+0000",
                    "commentaire":"fff",
                    "etat":"VALIDE",
                    "createdAt":null,
                    "updatedAt":"2021-01-05T11:49:12.000+0000",
                    "agent":{"id":11,
                    "matricule":"607102",
                    "nom":"Samb",
                    "prenom":"Mass",
                    "dateNaissance":"2020-08-20T00:00:00.000+0000",
                    "lieuNaissance":null,
                    "adresse":null,
                    "matrimoniale":"CÃ©libataire",
                    "photo":"dgdsgdfgdf",
                    "sexe":"m",
                    "email":"mass.samb@portdakar.sn",
                    "telephone":"773012470",
                    "dateEngagement":"2020-08-31T00:00:00.000+0000",
                    "datePriseService":"2020-08-11T00:00:00.000+0000",
                    "estChef":true,
                    "createdAt":"2020-11-30T15:42:34.000+0000",
                    "updatedAt":"2020-08-31T00:00:00.000+0000",
                    "fonction":null,
                    "uniteOrganisationnelle":null},
                    "uniteOrganisationnelle":{"id":10,
                    "code":"UO005",
                    "nom":"DSIG",
                    "description":"Division SystÃ¨me Informations de Gestion",
                    "createdAt":null,
                    "updatedAt":null,
                    "niveauHierarchique":{"id":2,"libelle":"Division","position":2,
                    "createdAt":"2020-04-01T10:50:28.000+0000",
                    "updatedAt":"2020-04-01T10:50:28.000+0000"},
                    "uniteSuperieure":null},
                    "fileMetaData":null},
                    "createdAt":"2021-01-05T11:49:12.000+0000",
                    "updatedAt":"2021-01-05T11:49:12.000+0000"}"""
                    
                    .stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("etapeAttestation_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
          

        val liste = exec(http("Liste des etapeAttestations")
            .get("/etapeAttestations")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'une etapeAttestation")
            .put("/etapeAttestations")
            .body(
                StringBody(
                   "${etapeAttestation_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer une etapeAttestation")
            .delete("/etapeAttestations")
            .body(
                StringBody(
                    "${etapeAttestation_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche d'une etapeAttestation par son identifiant")
            .get("/etapeAttestations/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des etapeAttestations - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/etapeAttestations")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD ETAPE_ATTESTAION").exec(EtapeAttestation.enregistrer, EtapeAttestation.liste, EtapeAttestation.rechercherParIdentifiant, EtapeAttestation.modifier, EtapeAttestation.supprimer)
    val charges = scenario("Tests de charges pour la ressource EtapeAttestation").exec(EtapeAttestation.liste100)

}