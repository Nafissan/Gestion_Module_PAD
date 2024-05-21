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

class Attestation {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Attestation {
        val enregistrer = exec(http("Enregitrer les informations d'une attestation")
            .post("/attestations")
            .body(
                StringBody(
                    """{"dateSaisie":"2020-11-24T14:01:13.000+0000","commentaire":"Demande attestation urgente",
                    "etat":null,"createdAt":"2020-11-24T14:01:13.000+0000","updatedAt":"2020-11-24T14:01:13.000+0000",
                    "agent":{"id":10,"matricule":"676101","nom":"Dia","prenom":"Issa",
                    "dateNaissance":"1995-12-31T13:43:13.000+0000","lieuNaissance":null,"adresse":null,
                    "matrimoniale":"Kane","photo":null,"sexe":"m","email":"dia@portdakar.sn","telephone":"768543201",
                    "dateEngagement":"2020-09-01T05:21:00.000+0000","datePriseService":"2020-09-23T07:00:00.000+0000",
                    "estChef":false,"createdAt":"2020-11-30T15:42:34.000+0000","updatedAt":"2020-11-30T15:42:34.000+0000",
                    "fonction":null,"uniteOrganisationnelle":null},
                    "uniteOrganisationnelle":{"id":10,"code":"UO010","nom":"SSIGDST",
                    "description":"Service SystÃ¨me Information de Gestion des Domaines Standards",
                    "createdAt":null,"updatedAt":null,"niveauHierarchique":{"id":3,"libelle":"Service",
                    "position":3,"createdAt":"2020-04-01T10:50:28.000+0000",
                    "updatedAt":"2020-04-01T10:50:28.000+0000"},
                    "uniteSuperieure":null},
                    "fileMetaData":null}"""
                    .stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("attestation_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
          

        val liste = exec(http("Liste des attestations")
            .get("/attestations")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'une attestation")
            .put("/attestations")
            .body(
                StringBody(
                   "${attestation_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer une attestation")
            .delete("/attestations")
            .body(
                StringBody(
                    "${attestation_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche d'une attestation par son identifiant")
            .get("/attestations/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des attestations - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/attestations")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD ATTESTATION").exec(Attestation.enregistrer, Attestation.liste, Attestation.rechercherParIdentifiant, Attestation.modifier, Attestation.supprimer)
    val charges = scenario("Tests de charges pour la ressource Attestation").exec(Attestation.liste100)

}