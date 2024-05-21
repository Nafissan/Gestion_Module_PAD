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

class FileMetaData {
    val mapper = new ObjectMapper();

    def log(session: Session, response: Response): Validation[Response] = {
        var content = response.body.string
        println(s">>>>>>>>> Requête -> ${response.request}")
        println(s"Réponse -> ${response}")
        println(s"Contenu -> ${content}")
        response
    }

    object FileMetaData {

        val liste = exec(http("Liste des file meta data")
            .get("/fileMetaData")
            .check(status.is(200))
            .check(jsonPath("$[0].id").saveAs("id"))
            .transformResponse(log)
        )

        val sizeOccurrence = exec(http("Liste des file meta data")
            .get("/fileMetaData/size")
            .check(status.is(200))
            .transformResponse(log)
        )

        val rechercherParIdentifiant = exec(http("Recherche d'un file meta data par son identifiant")
            .get("/fileMetaData/${id}")
            .check(status.is(200))
             .transformResponse(log)
        )
        
        val liste100 = exec(http("Liste des file meta data - 100 répétition avec un intervalle de 2 milliseconds -")
            .get("/fileMetaData")
            .check(status.is(200))
            //  .transformResponse(log)
        ).pause(2 milliseconds)
        
    }

    val crud = scenario("CRUD FILEMETADATA").exec(FileMetaData.liste, FileMetaData.sizeOccurrence, FileMetaData.rechercherParIdentifiant)
    val charges = scenario("Tests de charges pour la ressource FileMetaData").exec(FileMetaData.liste100)

}