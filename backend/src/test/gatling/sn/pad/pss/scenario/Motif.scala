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

class Motif {

    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object Motif {
        val enregistrer = exec(http("Enregitrer d'un nouveau motif")
            .post("/motifs")
            .body( 
                StringBody(
                    """{
                            "id": 112,
                            "description": "Mariage du travailleur 2",
                            "jours": 3
                        }""".stripMargin
                    
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("motif_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des motifs")
            .get("/motifs")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier un motif")
            .put("/motifs")
            .body(
                StringBody(
                   "${motif_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        val rechercherParIdentifiant = exec(http("Recherche d'un motif par son id")
            .get("/motifs/${id}")
            .check(status.is(200))
        )
        val supprimer = exec(http("Supprimer un motif")
            .delete("/motifs")
            .body(
                StringBody(
                    "${motif_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

  
        
        val liste100 = exec(http("Liste des motifs - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/motifs")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD MOTIF").exec(Motif.enregistrer, Motif.liste, Motif.rechercherParIdentifiant, Motif.modifier, Motif.supprimer)
    val charges = scenario("Tests de charges pour la ressource  motif").exec(Motif.liste100)

}