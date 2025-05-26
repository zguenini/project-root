
# Fullstack Dropshipping (NestJS + React + PostgreSQL) avec Docker Compose

## Structure du projet
/ton-projet-root
  /backend       # Dézippe ici ton backend complet
  /frontend      # Dézippe ici ton frontend complet
  docker-compose.yml
  README-DOCKER.txt

## Démarrage
1. Place tes sources backend dans le dossier backend, et frontend dans frontend.
2. A la racine (là où se trouve docker-compose.yml), lance :
   docker-compose up --build
3. Accède à :
   - Backend NestJS : http://localhost:3000
   - Frontend React : http://localhost:3001
   - PostgreSQL : localhost:5432 (user: postgres, mdp: password, db: dropshipping)
