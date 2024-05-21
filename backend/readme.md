 # PSALARIES-BACKEND - SPRING BOOT + JPA + REST API + OPEN LIBERTY
## Introduction
   ------------
### Prérequis 

| Outils           |    Version            |
| :--------------- |  :---------------:    |
| JDK              |  1.8                  |
| Spring Boot      | 2.1.16                |
| MAVEN            | 3.6                   |
| Open Liberty     | webProfile8-20.0.0.12 |
| MYSQL            | 5.7.11                |
| GIT              | 2.22.0                |


### Initialisation du projet
* Cloner le projet avec la commande

`git clone http://10.1.0.143/youssou.gueye/psalaries-backend.git` 

* Se positionner sur le repertoire du projet

`cd psalaries-backend` 
 

## Configuration
* #### Ignore les fichiers de  configuration
Executer la commande suivante pour ignorer localement 
les fichiers de configuration

 `git update-index --assume-unchanged  src/main/resources/application.properties src/main/resources/application-prod.properties src/main/resources/application-dev.properties  src/it/resources/application.properties src/it/resources/application-test.properties src/it/resources/application-dev.properties
` 
* ### Environnement developpement 
Se positionner sur la branche de developpement

`git checkout Psalaries-backend-dev` 

Tests unitaires 

`mvn test` 

Tests d' intégration 

`mvn verify` 

Packager l'application en executant les tests unitaires et d'intégration

`mvn install` 

 Calculer le pourcentage de code accessible par les tests unitaires avec **Cobertura**

`mvn cobertura:cobertura` 

Mesurer la qualité de code avec **Sonar**

`mvn sonar:sonar` 

* ### Environnement test
Se positionner sur la branche de developpement

`git checkout Psalaries-backend-dev`

Editer le fichier applications.properties qui se trouve dans le repertoire **src/it/resources** .

Modifier le profil de développement en test

`spring.profiles.active=test`

Créer le serveur de déploiement

`server create pssalaries` 

Packager l'application en executant les tests unitaires et d'intégration

`mvn install` 

Démarrer le serveur Open Liberty

`server run pssalaries` 

Tester la performance de l'application avec **Gatling**.

`mvn gatling:test`

* ### Environnement production
Packager l'application en executant les tests unitaires et d'intégration

`mvn install` 

Déplacer le package war généré dans le repertoire dropins du serveur websphere.

Démarrer le serveur websphere

`server run pssalaries` 



 
 