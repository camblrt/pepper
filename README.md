# Pepper Quizz - Robot.io

Robot io est un robot permettant d'attirer les étudiants sur le stand de CPE Lyon lors d'un salon étudiant. Pour se faire Pepper fait une présentation de l'école en racontant une histoire suivant une vidéo et il présente un quizz aux étudiants afin de faire connaître l'école de manière ludique.

## Getting Started

Pour lancer le jeu, vous avez besoin d'un robot Pepper et d'utilisateurs. Sur le robot Pepper, aller sur le lien du [Quizz Pepper](https://pepper-prod.herokuapp.com/0924toiwdhg2TOKAREV223578098765redcvbnkiuytrew34567uyhgbnmk) et lancer le [Quizz](https://pepper-prod.herokuapp.com/) sur l'appareil de l'utilisateur.
Lorsque tous deux sont sur la page d'acceuil, l'administrateur peut lancer le jeu via l'interface Android.

## Git Workflow

3 Principales branches : Master - Staging - Develop 

- [Master](https://pepper-prod.herokuapp.com/) + [Develop](https://pepper-stagging.herokuapp.com/) : Code Fonctionnel ( Sans DB )

- [Staging](https://pepper-staging-2.herokuapp.com/) : Code( Avec DB )

## Modification

Si vous faites des modifications sur le projet et que vous souhaitez lancer l'application en local, vous devez tout d'abord run le script `./build-react-script.sh` qui va build les projets ReactJS et les copier dans le NodeJS. Puis vous devez lancer `npm start` à la route du projet pour acceder au jeu sur `localhost:3000`.

## Running the tests

Les tests sont lancés lorsque vous faites un commit sur les branches: develop, staging et master. Ou en lancant NPM test sur un terminal.

## Deployment

Le deploiement est lancé automatiquement lorsque vous fait un commit sur les branches: develop, staging et master lorsque les tests sont passés.

## Teaser

[La vidéo de présentation](https://www.youtube.com/watch?v=crK0oAH4LTc) vous permet d'en apprendre un peu plus sur nous et de visualiser les fonctionnalités de notre Projet.

## Vivify Scrum

Nous avons utilisé [VivifyScrum](https://app.vivifyscrum.com/boards/46695) afin de gérer notre projet avec la méthode Agile framework Scrum.

## Authors

* **Baptiste Blanc** - *Pepper engineer*

* **Camille Blériot** - *Software engineer* 

* **Quentin Ginot** - *DataBase engineer* 

* **Julien Vera** - *Software engineer* 

* **Valentin Wiart** - *Devops engineer*
