#!/bin/bash

API_URL="http://localhost:3000"
EMAIL="admin@example.com"
PASSWORD="admin"

echo "==> Connexion utilisateur"
TOKEN=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email": "'$EMAIL'", "password": "'$PASSWORD'"}' | jq -r .access_token)

echo "Token reçu: $TOKEN"

echo -e "\n==> Récupération utilisateur"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/users" | jq

echo -e "\n==> Création produit"
PRODUCT_ID=$(curl -s -X POST "$API_URL/products" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Product", "description": "Produit de test", "price": 99.99}' | jq -r .id)
echo "Produit créé avec ID: $PRODUCT_ID"

echo -e "\n==> Liste des produits"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/products" | jq

echo -e "\n==> Création d'une commande"
curl -s -X POST "$API_URL/orders" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"items": [{"productId": '$PRODUCT_ID', "quantity": 2}]}' | jq

echo -e "\n==> Liste des commandes"
curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/orders" | jq
