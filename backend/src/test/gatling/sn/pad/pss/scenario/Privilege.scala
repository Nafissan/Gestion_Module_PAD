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

class Privilege {

val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }
    
     object Privilege {
        val creerPrivilege = exec(http("Créer un privilege")
            .post("/privileges")
            .body(
                StringBody(
                    """{	
						"nom": "MENU_DASHBOARD",
						"description": "Dashboard",
						"createdAt": "2020-11-30T15:42:34.000+0000",
						"updatedAt": "2021-01-06T08:58:18.000+0000"
                       }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("privilege_enregistre"))
            .check(jsonPath("$.nom").saveAs("nom"))
            .transformResponse(log)) 
            .exec( session => {
                val privilegeEnregistre:String = session.attributes.get("privilege_enregistre").get.asInstanceOf[String]
                val nom:String = session.attributes.get("nom").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(privilegeEnregistre.split(","))
                session.set("privilegeEnregistre", privilegeEnregistre)
            })

        val listerPrivilege = exec(http("Liste des privileges")
            .get("/privileges")
            .check(status.is(200))
        )

        val modifierPrivilege = exec(http("Modifier un privileges")
            .put("/privileges")
            .body(
                StringBody(
                   "${privilegeEnregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        
		val rechercherPrivilege = exec(http("Recherche d'un privilege par son identifiant")
		            .get("/privileges/${id}")
		            .check(status.is(200))
		)
		
        val supprimerPrivilege = exec(http("Supprimer un privilege")
            .delete("/privileges")
            .body(
                StringBody(
                    "${privilegeEnregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 
      
        val listerPrivilege100Fois = exec(http("Liste des privileges - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/privileges")
            .check(status.is(200))
        ).pause(2 milliseconds)
    }

    val crud = scenario("CRUD PRIVILEGE").exec(Privilege.creerPrivilege, Privilege.listerPrivilege, Privilege.rechercherPrivilege, Privilege.modifierPrivilege, Privilege.supprimerPrivilege)
    val charges = scenario("Tests de charges privilege").exec(Privilege.listerPrivilege100Fois)
 }