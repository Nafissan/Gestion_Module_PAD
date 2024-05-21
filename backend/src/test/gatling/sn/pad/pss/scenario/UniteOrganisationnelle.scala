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

class UniteOrganisationnelle {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object UniteOrganisationnelle {
        val enregistrer = exec(http("Enregitrer unité")
            .post("/uniteOrganisationnelles")
            .body(
                StringBody(
                    """
                    {
                        "code": "UO999",
                        "nom": "XXX",
                        "description": "Direction XXXX",
                        "createdAt": "2020-11-30T14:42:34.000+0000",
                        "updatedAt": "2020-11-30T14:42:34.000+0000",
                        "niveauHierarchique": {
                        "id": 1,
                        "libelle": "Direction",
                        "position": 1,
                        "createdAt": "2020-04-01T09:50:28.000+0000",
                        "updatedAt": "2020-04-01T09:50:28.000+0000"
                        },
                        "uniteSuperieure": {
                            "id": 1
                            },
                            "uniteSuperieure": null
                        }
                }
                    """.stripMargin
                )
            ).asJson
            .check(status.is(200))
            .check(bodyString.saveAs("unite_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 

        val liste = exec(http("Liste des unités")
            .get("/uniteOrganisationnelles")
            .check(status.is(200))
        )

        val modifier = exec(http("Modifier unité")
            .put("/uniteOrganisationnelles")
            .body(
                StringBody(
                   "${unite_enregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimer = exec(http("Supprimer unité")
            .delete("/uniteOrganisationnelles")
            .body(
                StringBody(
                    "${unite_enregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherParIdentifiant = exec(http("Recherche d'une uniteOrganisationnelle par son identifiant")
            .get("/uniteOrganisationnelles/${id}")
            .check(status.is(200))
        )
        
        val liste100 = exec(http("Liste des uniteOrganisationnelles - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/uniteOrganisationnelles")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD Unité").exec(UniteOrganisationnelle.enregistrer, UniteOrganisationnelle.liste, UniteOrganisationnelle.rechercherParIdentifiant, UniteOrganisationnelle.modifier, UniteOrganisationnelle.supprimer)
    val charges = scenario("Tests de charges pour la ressource UniteOrganisationnelle").exec(UniteOrganisationnelle.liste100)

}