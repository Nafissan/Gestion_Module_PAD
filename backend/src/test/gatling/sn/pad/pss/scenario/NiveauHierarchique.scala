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

class NiveauHierarchique{
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object NiveauHierarchique{
        val creerNiveau = exec(http("Enregistrement d'un niveau hierarchique")
            .post("/niveauxHierarchiques")
            .body(
                StringBody(
                    """{
                        "libelle":"Direction1",
                        "position":6,
                        "createdAt":"2020-04-01T08:50:28.000+0000",
                        "updatedAt":"2020-04-01T08:50:28.000+0000"
                    }""".stripMargin
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("niveau_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log))

        val listeNiveau = exec(http("Liste des niveaux hierarchiques")
            .get("/niveauxHierarchiques")
            .check(status.is(200))
        )

        val modifierNiveau = exec(http("Modifier un niveau hierarchique")
            .put("/niveauxHierarchiques")
            .body(
                StringBody(
                   "${niveau_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimerNiveau =  exec(http("Supprimer un niveau hierarchique")
            .delete("/niveauxHierarchiques")
            .body(
                StringBody(
                    "${niveau_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        )

        val niveauParIdentifiant = exec(http("Recherche d'un niveau hierarchique par son identifiant")
            .get("/niveauxHierarchiques/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des niveaux hierarchiques - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/niveauxHierarchiques")
            .check(status.is(200))
        ).pause(2 milliseconds)

    }

    val crud = scenario("CRUD NIVEAUHIERARCHIQUE").exec(NiveauHierarchique.creerNiveau, NiveauHierarchique.listeNiveau,NiveauHierarchique.niveauParIdentifiant,NiveauHierarchique.modifierNiveau,NiveauHierarchique.supprimerNiveau)
    val charges = scenario("Tests de charges pour la ressource /niveauxHierarchiques").exec(NiveauHierarchique.liste100)
  
}