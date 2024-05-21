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

class Ressource {

val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }
    
     object Ressource {
        val creerRessource = exec(http("Créer une ressource")
            .post("/ressources")
            .body(
                StringBody(
                    """{	
						"name": "UNITEORG",
						"nomRessource": "UNITEORG",
						"privileges": [
							{
								"nom": "UNITE_ADD",
								"description": "Ajouter",
								"createdAt": "2020-08-08T00:00:00.000+0000",
								"updatedAt": "2020-08-14T00:00:00.000+0000"
							},
							{
								"nom": "UNITE_UPDATE",
								"description": "Modifier",
								"createdAt": "2020-08-08T00:00:00.000+0000",
								"updatedAt": "2020-08-14T00:00:00.000+0000"
							},
							{
								"nom": "UNITE_DELETE",
								"description": "Supprimer",
								"createdAt": "2020-08-08T00:00:00.000+0000",
								"updatedAt": "2020-08-14T00:00:00.000+0000"
							},
							{
								"nom": "UNITE_READ",
								"description": "Lister",
								"createdAt": "2020-08-08T00:00:00.000+0000",
								"updatedAt": "2020-08-14T00:00:00.000+0000"
							}
						]
                       }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("ressource_enregistre"))
            .check(jsonPath("$.name").saveAs("name"))
            .transformResponse(log)) 
            .exec( session => {
                val ressourceEnregistre:String = session.attributes.get("ressource_enregistre").get.asInstanceOf[String]
                val name:String = session.attributes.get("name").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(ressourceEnregistre.split(","))
                session.set("ressourceEnregistre", ressourceEnregistre)
            })

        val listerRessource = exec(http("Liste les ressources")
            .get("/ressources")
            .check(status.is(200))
        )

        val modifierRessource = exec(http("Modifier une ressource ")
            .put("/ressources")
            .body(
                StringBody(
                   "${ressourceEnregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        
		val rechercherRessource = exec(http("Recherche une ressource par son identifiant")
		            .get("/ressources/${id}")
		            .check(status.is(200))
		)
		
        val supprimerRessource = exec(http("Supprimer une ressource")
            .delete("/ressources")
            .body(
                StringBody(
                    "${ressourceEnregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 
      
        val listerRessource100Fois = exec(http("Liste les ressources - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/ressources")
            .check(status.is(200))
        ).pause(2 milliseconds)
    }

    val crud = scenario("CRUD RESSOURCE").exec(Ressource.creerRessource, Ressource.listerRessource, Ressource.rechercherRessource, Ressource.modifierRessource, Ressource.supprimerRessource)
    val charges = scenario("Tests de charges ressource").exec(Ressource.listerRessource100Fois)
 }