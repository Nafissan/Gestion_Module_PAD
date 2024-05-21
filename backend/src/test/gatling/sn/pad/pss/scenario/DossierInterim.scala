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

class DossierInterim {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object DossierInterim {
        val enregistrer = exec(http("Enregitrer les informations d'un dossierInterim")
            .post("/dossierInterims")
            .body(
                StringBody(
                    """{
                        "code": "DI_2022",
                        "annee": 2022,
                        "description": "Int",
                        "matricule": "607117",
                        "prenom": "Ousseynou",
                        "nom": "Drame",
                        "fonction": "Ingenieur",
                        "structure": "DCH",
                        "uniteOrganisationnelle": {"id": 2}
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("dossierInterim_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des dossierInterims")
            .get("/dossierInterims")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier les informations d'un dossierInterims")
            .put("/dossierInterims")
            .body(
                StringBody(
                   "${dossierInterim_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer un dossierInterims")
            .delete("/dossierInterims")
            .body(
                StringBody(
                    "${dossierInterim_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche un dossierInterims par son identifiant")
            .get("/dossierInterims/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des dossierInterims - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/dossierInterims")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD DossierInterim").exec(DossierInterim.enregistrer, DossierInterim.liste, DossierInterim.rechercherParIdentifiant, DossierInterim.modifier, DossierInterim.supprimer)
    val charges = scenario("Tests de charges pour la ressource DossierInterim").exec(DossierInterim.liste100)

}