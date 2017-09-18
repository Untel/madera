# Projet fil rouge CESI BREST

*CAM : Équipe projet fil rouge composé de Clément DEBOOS, Adrien FERNANDES et Max-André LEROY*

## Installation

    git clone https://github.com/Untel/madera
    cd madera
    npm i -g @angular/cli ts-node
    npm i
    ng serve
 
## Déploiement
A faire au démarrage projet

    cd madera
    npm i -g firebase-tools
    firebase init

Dans firebase.json
    {
        "hosting": {
            "public": "dist",
            "rewrites": [ {
                "source": "**",
                "destination": "/index.html"
            } ]
        }
    }

Dans .firebaserc
    {
    "projects": {
        "default": "madera-8ef40"
    }
    }

    npm run deploy