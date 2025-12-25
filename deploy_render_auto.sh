#!/bin/bash

echo "╔══════════════════════════════════════════╗"
echo "║  🚀 AUTO DEPLOY ACHZOD AUDIT PLATFORM  ║"
echo "║     Render Deployment via CLI            ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Check if credentials provided
if [ -z "$RENDER_API_KEY" ] || [ -z "$ANTHROPIC_API_KEY" ] || [ -z "$STRIPE_SECRET_KEY" ]; then
    echo "❌ ERREUR: Variables d'environnement manquantes"
    echo ""
    echo "Lance ce script avec:"
    echo ""
    echo "RENDER_API_KEY='rnd_xxx' \\"
    echo "ANTHROPIC_API_KEY='sk-ant-api03-xxx' \\"
    echo "STRIPE_SECRET_KEY='sk_test_xxx' \\"
    echo "STRIPE_PUBLISHABLE_KEY='pk_test_xxx' \\"
    echo "./deploy_render_auto.sh"
    echo ""
    echo "📋 Où trouver les clés:"
    echo "  • Render: https://dashboard.render.com/u/settings#api-keys"
    echo "  • Claude: https://console.anthropic.com/settings/keys"
    echo "  • Stripe: https://dashboard.stripe.com/test/apikeys"
    echo ""
    exit 1
fi

echo "✅ Credentials détectées"
echo ""

# Generate NEXTAUTH_SECRET
NEXTAUTH_SECRET=$(openssl rand -base64 32)

echo "🗄️  ÉTAPE 1/3: Création PostgreSQL Database..."
echo ""

# Create PostgreSQL Database
DB_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.render.com/v1/postgres \
  -d '{
    "name": "achzod-audit-db",
    "databaseName": "achzod_audits",
    "databaseUser": "achzod_user",
    "region": "frankfurt",
    "plan": "free",
    "version": "15"
  }')

echo "$DB_RESPONSE" | grep -q '"id"'
if [ $? -eq 0 ]; then
    DB_ID=$(echo "$DB_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
    echo "   ✅ Database créée: $DB_ID"
    echo "   ⏳ Attente 45 sec pour que la DB soit prête..."
    sleep 45

    # Get internal connection string
    DB_INFO=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
      "https://api.render.com/v1/postgres/$DB_ID")

    DATABASE_URL=$(echo "$DB_INFO" | python3 -c "import sys, json; print(json.load(sys.stdin).get('internalConnectionString', ''))")

    if [ -z "$DATABASE_URL" ]; then
        echo "   ❌ Impossible de récupérer DATABASE_URL"
        exit 1
    fi

    echo "   ✅ DATABASE_URL obtenue"
else
    echo "   ℹ️  Database existe peut-être déjà, récupération..."

    # Try to get existing DB
    DBS=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
      "https://api.render.com/v1/postgres")

    DATABASE_URL=$(echo "$DBS" | python3 -c "import sys, json; dbs = json.load(sys.stdin); db = next((d for d in dbs if d['name'] == 'achzod-audit-db'), None); print(db.get('internalConnectionString', '') if db else '')")

    if [ -z "$DATABASE_URL" ]; then
        echo "   ❌ Database non trouvée"
        exit 1
    fi

    echo "   ✅ Database existante trouvée"
fi

echo ""
echo "🌐 ÉTAPE 2/3: Création Web Service..."
echo ""

# Create Web Service
SERVICE_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $RENDER_API_KEY" \
  -H "Content-Type: application/json" \
  https://api.render.com/v1/services \
  -d "{
    \"type\": \"web_service\",
    \"name\": \"achzod-audit-platform\",
    \"repo\": \"https://github.com/achzod/achzod-audit-platform\",
    \"branch\": \"main\",
    \"region\": \"frankfurt\",
    \"plan\": \"free\",
    \"buildCommand\": \"npm install && npx prisma generate && npm run build\",
    \"startCommand\": \"npm start\",
    \"envVars\": [
      { \"key\": \"DATABASE_URL\", \"value\": \"$DATABASE_URL\" },
      { \"key\": \"ANTHROPIC_API_KEY\", \"value\": \"$ANTHROPIC_API_KEY\" },
      { \"key\": \"STRIPE_SECRET_KEY\", \"value\": \"$STRIPE_SECRET_KEY\" },
      { \"key\": \"STRIPE_PUBLISHABLE_KEY\", \"value\": \"$STRIPE_PUBLISHABLE_KEY\" },
      { \"key\": \"NEXT_PUBLIC_APP_URL\", \"value\": \"https://achzod-audit-platform.onrender.com\" },
      { \"key\": \"NEXTAUTH_SECRET\", \"value\": \"$NEXTAUTH_SECRET\" },
      { \"key\": \"NEXTAUTH_URL\", \"value\": \"https://achzod-audit-platform.onrender.com\" },
      { \"key\": \"NODE_VERSION\", \"value\": \"20.11.0\" }
    ]
  }")

echo "$SERVICE_RESPONSE" | grep -q '"id"'
if [ $? -eq 0 ]; then
    SERVICE_ID=$(echo "$SERVICE_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin)['id'])")
    echo "   ✅ Web Service créé: $SERVICE_ID"
else
    echo "   ❌ Erreur création service"
    echo "$SERVICE_RESPONSE"
    exit 1
fi

echo ""
echo "⏳ ÉTAPE 3/3: Déploiement en cours..."
echo "   (Build Next.js + Prisma, 2-3 minutes...)"
echo ""

# Wait for deployment
echo "   → Monitoring du déploiement..."
sleep 10

for i in {1..30}; do
    DEPLOYS=$(curl -s -H "Authorization: Bearer $RENDER_API_KEY" \
      "https://api.render.com/v1/services/$SERVICE_ID/deploys")

    STATUS=$(echo "$DEPLOYS" | python3 -c "import sys, json; deploys = json.load(sys.stdin); print(deploys[0]['status'] if deploys else 'unknown')" 2>/dev/null)

    if [ "$STATUS" = "live" ]; then
        echo "   ✅ DÉPLOIEMENT TERMINÉ!"
        break
    elif [ "$STATUS" = "build_failed" ] || [ "$STATUS" = "failed" ]; then
        echo "   ❌ Déploiement échoué"
        break
    else
        echo "   ⏳ Status: $STATUS..."
        sleep 10
    fi
done

echo ""
echo "=================================================="
echo ""
echo "🎉 DÉPLOIEMENT TERMINÉ!"
echo ""
echo "📍 TON APP EST LIVE:"
echo "   https://achzod-audit-platform.onrender.com"
echo ""
echo "📊 DASHBOARD RENDER:"
echo "   https://dashboard.render.com"
echo ""
echo "📂 REPO GITHUB:"
echo "   https://github.com/achzod/achzod-audit-platform"
echo ""
echo "=================================================="
echo ""
echo "🧪 TESTE TON APP:"
echo "1. Ouvre: https://achzod-audit-platform.onrender.com"
echo "2. Clique 'SCAN ANABOLIQUE'"
echo "3. Remplis le questionnaire"
echo "4. Vois ton audit généré! 🔥"
echo ""
echo "⚠️  STRIPE WEBHOOK (pour paiements premium):"
echo "https://dashboard.stripe.com/webhooks"
echo "Endpoint: https://achzod-audit-platform.onrender.com/api/payment/stripe"
echo "Event: checkout.session.completed"
echo ""
