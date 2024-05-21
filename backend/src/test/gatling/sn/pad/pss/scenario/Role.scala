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

class Role {

val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }
    
     object Role {
        val creerRole = exec(http("Créer un role")
            .post("/roles")
            .body(
                StringBody(
                    """{	
						"nomRole": "ADMINISTRATION",
						"description": "compte admin test"
                       }""".stripMargin
                )
            ).asJson
            .check(status.is(201))
            .check(bodyString.saveAs("role_enregistre"))
            .check(jsonPath("$.id").saveAs("id"))
            .transformResponse(log)) 
            .exec( session => {
                val roleEnregistre:String = session.attributes.get("role_enregistre").get.asInstanceOf[String]
                val id:String = session.attributes.get("id").get.asInstanceOf[String]
                val json:String = mapper.writeValueAsString(roleEnregistre.split(","))
                session.set("roleEnregistre", roleEnregistre)
            })

        val listerRole = exec(http("Liste des roles")
            .get("/roles")
            .check(status.is(200))
        )

        val modifierRole = exec(http("Modifier le role d'un agent")
            .put("/roles")
            .body(
                StringBody(
                   "${roleEnregistre}"
                )
            ).asJson
            .check(status.is(200))
        )
        
		val rechercherRole = exec(http("Recherche d'un role par son identifiant")
		            .get("/roles/${id}")
		            .check(status.is(200))
		)
		
        val supprimerRole = exec(http("Supprimer un role")
            .delete("/roles")
            .body(
                StringBody(
                    "${roleEnregistre}"
                )
            ).asJson
            .check(status.is(200))
            .transformResponse(log)
        ) 
      
        val listerRole100Fois = exec(http("Liste des roles - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/roles")
            .check(status.is(200))
        ).pause(2 milliseconds)
    }

    val crud = scenario("CRUD ROLE").exec(Role.creerRole, Role.listerRole, Role.rechercherRole, Role.modifierRole, Role.supprimerRole)
    val charges = scenario("Tests de charges roles").exec(Role.listerRole100Fois)
 }