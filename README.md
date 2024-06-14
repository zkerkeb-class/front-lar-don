# League of Legends Chat Application

## Description du service

### Objectif
Développer une application permettant aux utilisateurs de dialoguer avec les personnages de League of Legends grâce à une intelligence artificielle fournie par OpenAI. Les utilisateurs ont accès à un seul champion gratuitement et peuvent souscrire à un abonnement pour parler avec tous les personnages.

### Fonctionnalités principales
- **Dialogue interactif avec les personnages de League of Legends.**
- **Intégration avec l'IA OpenAI pour générer des réponses réalistes.**
- **Modèle économique freemium : accès gratuit à un champion et abonnement payant pour accéder à tous les personnages.**
- **Utilisation des API pour gérer les dialogues, les données de personnages et l'authentification des utilisateurs.**

### Vidéo de Présentation
Regardez la [vidéo de présentation](https://vimeo.com/947290399?share=copy) pour en savoir plus sur notre application.

<img src="https://github.com/zkerkeb-class/front-lar-don/blob/main/public/image%20(2).png" width="256"/>

## Membres du projet
- **Lucas SEVAULT**
- **Aubin OLIVRIE**
- **Ryan PEYROT**

## Installation et configuration

1. Exécutez `npm install`.
2. Créez un fichier `.env` avec la configuration suivante :

```env
REACT_APP_URL_API=http://localhost:3000/bdd-api
REACT_APP_URL_AI=http://localhost:4004
REACT_APP_URL_OAUTH=http://localhost:4001
REACT_APP_LOL_API=https://ddragon.leagueoflegends.com/cdn/14.8.1/data/fr_FR
Lancement du projet
```

Exécutez npm start pour démarrer l'application front-end.
