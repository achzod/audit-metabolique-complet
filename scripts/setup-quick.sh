#!/bin/bash

# SETUP RAPIDE - SCAN MÉTABOLIQUE COMPLET
# Configure l'environnement pour développement/production

set -e

echo "🔥 SETUP RAPIDE - SCAN MÉTABOLIQUE COMPLET"
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js non installé"
    exit 1
fi
echo "✅ Node.js $(node -v)"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm non installé"
    exit 1
fi
echo "✅ npm $(npm -v)"

# Installer dépendances
echo ""
echo "📦 Installation dépendances..."
npm install

# Vérifier .env
if [ ! -f .env ]; then
    echo ""
    echo "⚠️  Fichier .env manquant"
    echo "Création à partir de .env.example..."

    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ .env créé"
    else
        echo "❌ .env.example non trouvé"
        exit 1
    fi
fi

# Vérifier PostgreSQL
echo ""
echo "🔍 Vérification PostgreSQL..."

if command -v psql &> /dev/null; then
    echo "✅ PostgreSQL installé"
else
    echo "⚠️  PostgreSQL non détecté"
    echo "   Installation recommandée:"
    echo "   macOS: brew install postgresql"
    echo "   Ubuntu: apt install postgresql"
fi

# Setup Prisma
echo ""
echo "🗄️  Configuration Prisma..."

# Générer Prisma Client
npx prisma generate

echo "✅ Prisma Client généré"

# Proposer migration
echo ""
read -p "Exécuter les migrations Prisma maintenant ? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npx prisma migrate dev --name init || echo "⚠️  Migration échouée (vérifiez DATABASE_URL)"
fi

# Build TypeScript
echo ""
echo "🔨 Build TypeScript..."
npm run build

# Résumé
echo ""
echo "=" | awk '{printf "%s", $0; for(i=1;i<60;i++) printf "="; printf "\n"}'
echo "✅ SETUP TERMINÉ"
echo ""
echo "📋 PROCHAINES ÉTAPES:"
echo ""
echo "1. Configurez vos variables d'environnement dans .env:"
echo "   - ANTHROPIC_API_KEY (obligatoire pour AI)"
echo "   - DATABASE_URL (PostgreSQL)"
echo "   - STRIPE_SECRET_KEY (pour paiements)"
echo ""
echo "2. Exécutez les migrations si pas fait:"
echo "   npx prisma migrate dev"
echo ""
echo "3. Validez le système complet:"
echo "   npm run validate"
echo ""
echo "4. Lancez le serveur de dev:"
echo "   npm run dev"
echo ""
echo "5. Ouvrez http://localhost:3000/questionnaire"
echo ""

exit 0
