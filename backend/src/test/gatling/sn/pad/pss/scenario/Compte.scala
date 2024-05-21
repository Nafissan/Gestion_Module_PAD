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

class Compte {

val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }
    
     object Compte {
        val creerCompte = exec(http("Créer un compte")
            .post("/comptes")
            .body(
                StringBody(
                    """{
							"username": "seydina.fall",
							"password": "$2a$10$7a22hX0ez4dl6.K5LqAYqOaGGIRlDGBfn9dQJgNYoGhs7lwEbBvie",
							"enabled": true,
							"createdAt": null,
							"updatedAt": "2021-01-06T11:52:42.000+0000",
							"roles": [
								{
									"id": 3,
									"nomRole": "Agent",
									"description": "Agent d'une unité organisationnelle",
									"privileges": [
										{
										"nom": "MENU_ESPACE_PRIVE",
										"description": "Espace Prive",
										"createdAt": "2020-11-30T15:42:34.000+0000",
										"updatedAt": "2020-11-30T15:42:34.000+0000"
										},
										{
										"nom": "ABSENCE_ADD",
										"description": "Ajouter",
										"createdAt": "2020-08-08T00:00:00.000+0000",
										"updatedAt": "2020-08-14T00:00:00.000+0000"
										},
										{
										"nom": "ABSENCE_READ",
										"description": "Lister",
										"createdAt": "2020-08-08T00:00:00.000+0000",
										"updatedAt": "2020-08-14T00:00:00.000+0000"
										}
									]
								}
							],
							"agent": {"id": 19}			
                       }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("compte_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val compteEnregistre:String = session.attributes.get("compte_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(compteEnregistre.split(","))
                session.set("compteEnregistre", compteEnregistre)
            })

        val listerCompte = exec(http("Liste des comptes")
            .get("/comptes")
            .check(status.is(200))
        )

        val modifierCompte = exec(http("Modifier le compte d'un agent")
            .put("/comptes")
            .body(
                StringBody(
                   "${compteEnregistre}"
                )
            ).asJson
            .check(status.is(200))
        )

        val supprimerCompte = exec(http("Supprimer un compte")
            .delete("/comptes")
            .body(
                StringBody(
                    "${compteEnregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 

        val rechercherCompte = exec(http("Recherche d'un compte par son identifiant")
            .get("/comptes/1")
            .check(status.is(200))
        )
        
        val listerCompte100Fois = exec(http("Liste des comptes - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/comptes")
            .check(status.is(200))
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD COMPTE").exec(Compte.creerCompte, Compte.listerCompte, Compte.rechercherCompte, Compte.modifierCompte, Compte.supprimerCompte)
    val charges = scenario("Tests de charges compte").exec(Compte.listerCompte100Fois)
    
}