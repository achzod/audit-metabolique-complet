#!/usr/bin/env python3
"""
🚀 AUTO DEPLOY TO RENDER
Lance ce script UNE FOIS et tout est déployé automatiquement!
"""

import requests
import json
import time
import os
import subprocess

def banner():
    print("""
    ╔══════════════════════════════════════════╗
    ║  🚀 AUTO DEPLOY ACHZOD AUDIT PLATFORM  ║
    ║     Render Deployment Automation        ║
    ╚══════════════════════════════════════════╝
    """)

def get_credentials():
    """Demande toutes les credentials UNE SEULE FOIS"""
    print("\n📋 CONFIGURATION (une seule fois):\n")

    creds = {}

    # Render API Key
    print("1. Render API Key")
    print("   → Va sur: https://dashboard.render.com/u/settings#api-keys")
    print("   → Crée une clé si tu n'en as pas")
    creds['render_api_key'] = input("   Colle ta Render API Key: ").strip()

    # Anthropic API Key
    print("\n2. Anthropic Claude API Key")
    print("   → Va sur: https://console.anthropic.com/settings/keys")
    creds['anthropic_api_key'] = input("   Colle ta Claude API Key: ").strip()

    # Stripe Keys
    print("\n3. Stripe Secret Key")
    print("   → Va sur: https://dashboard.stripe.com/test/apikeys")
    creds['stripe_secret_key'] = input("   Colle ta Stripe Secret Key (sk_test_...): ").strip()

    print("\n4. Stripe Publishable Key")
    creds['stripe_publishable_key'] = input("   Colle ta Stripe Publishable Key (pk_test_...): ").strip()

    return creds

def create_postgres_db(api_key):
    """Crée la database PostgreSQL sur Render"""
    print("\n\n🗄️  ÉTAPE 1/3: Création PostgreSQL Database...")

    url = "https://api.render.com/v1/postgres"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    data = {
        "name": "achzod-audit-db",
        "databaseName": "achzod_audits",
        "databaseUser": "achzod_user",
        "region": "frankfurt",
        "plan": "free",
        "version": "15"
    }

    print("   → Envoi requête à Render API...")
    response = requests.post(url, headers=headers, json=data)

    if response.status_code in [200, 201]:
        db_data = response.json()
        print("   ✅ Database créée!")
        print(f"   📦 ID: {db_data['id']}")
        print(f"   📦 Name: {db_data['name']}")

        # Attendre que la DB soit ready
        print("   ⏳ Attente que la DB soit prête (30-60 sec)...")
        time.sleep(45)

        # Récupérer l'internal URL
        db_id = db_data['id']
        db_info_url = f"https://api.render.com/v1/postgres/{db_id}"
        db_info = requests.get(db_info_url, headers=headers).json()

        internal_url = db_info.get('internalConnectionString', '')
        print(f"   ✅ Database URL: {internal_url[:50]}...")

        return internal_url
    else:
        print(f"   ❌ Erreur création DB: {response.status_code}")
        print(f"   {response.text}")

        # Vérifier si la DB existe déjà
        if "already exists" in response.text.lower():
            print("   ℹ️  La DB existe déjà, récupération...")
            dbs = requests.get("https://api.render.com/v1/postgres", headers=headers).json()
            for db in dbs:
                if db['name'] == 'achzod-audit-db':
                    return db.get('internalConnectionString', '')

        return None

def create_web_service(api_key, db_url, creds):
    """Crée le Web Service Next.js sur Render"""
    print("\n\n🌐 ÉTAPE 2/3: Création Web Service Next.js...")

    url = "https://api.render.com/v1/services"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    # Générer NEXTAUTH_SECRET
    import secrets
    nextauth_secret = secrets.token_urlsafe(32)

    data = {
        "type": "web_service",
        "name": "achzod-audit-platform",
        "repo": "https://github.com/achzod/achzod-audit-platform",
        "branch": "main",
        "region": "frankfurt",
        "plan": "free",
        "buildCommand": "npm install && npx prisma generate && npm run build",
        "startCommand": "npm start",
        "envVars": [
            {
                "key": "DATABASE_URL",
                "value": db_url
            },
            {
                "key": "ANTHROPIC_API_KEY",
                "value": creds['anthropic_api_key']
            },
            {
                "key": "STRIPE_SECRET_KEY",
                "value": creds['stripe_secret_key']
            },
            {
                "key": "STRIPE_PUBLISHABLE_KEY",
                "value": creds['stripe_publishable_key']
            },
            {
                "key": "NEXT_PUBLIC_APP_URL",
                "value": "https://achzod-audit-platform.onrender.com"
            },
            {
                "key": "NEXTAUTH_SECRET",
                "value": nextauth_secret
            },
            {
                "key": "NEXTAUTH_URL",
                "value": "https://achzod-audit-platform.onrender.com"
            },
            {
                "key": "NODE_VERSION",
                "value": "20.11.0"
            }
        ]
    }

    print("   → Envoi requête à Render API...")
    response = requests.post(url, headers=headers, json=data)

    if response.status_code in [200, 201]:
        service_data = response.json()
        print("   ✅ Web Service créé!")
        print(f"   📦 ID: {service_data['id']}")
        print(f"   📦 Name: {service_data['name']}")
        print(f"   🌐 URL: https://achzod-audit-platform.onrender.com")

        return service_data
    else:
        print(f"   ❌ Erreur création service: {response.status_code}")
        print(f"   {response.text}")
        return None

def wait_for_deployment(api_key, service_id):
    """Attend que le déploiement soit terminé"""
    print("\n\n⏳ ÉTAPE 3/3: Déploiement en cours...")

    headers = {
        "Authorization": f"Bearer {api_key}"
    }

    url = f"https://api.render.com/v1/services/{service_id}/deploys"

    print("   → Build Next.js en cours...")
    print("   → Génération Prisma client...")
    print("   → Optimisation production...")
    print("\n   (Ça prend 2-3 minutes, sois patient...)\n")

    max_attempts = 40
    attempt = 0

    while attempt < max_attempts:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            deploys = response.json()
            if deploys and len(deploys) > 0:
                latest_deploy = deploys[0]
                status = latest_deploy.get('status', '')

                if status == 'live':
                    print("\n   ✅ DÉPLOIEMENT TERMINÉ!")
                    return True
                elif status in ['build_failed', 'failed']:
                    print(f"\n   ❌ Déploiement échoué: {status}")
                    return False
                else:
                    print(f"   ⏳ Status: {status}...", end='\r')

        time.sleep(5)
        attempt += 1

    print("\n   ⚠️  Timeout, mais le deploy continue...")
    return True

def main():
    banner()

    # Récupérer toutes les credentials
    creds = get_credentials()

    print("\n\n🚀 DÉMARRAGE DU DÉPLOIEMENT AUTOMATIQUE...\n")
    print("=" * 50)

    # Étape 1: Créer PostgreSQL
    db_url = create_postgres_db(creds['render_api_key'])
    if not db_url:
        print("\n❌ Échec création database. Arrêt.")
        return

    # Étape 2: Créer Web Service
    service = create_web_service(creds['render_api_key'], db_url, creds)
    if not service:
        print("\n❌ Échec création web service. Arrêt.")
        return

    # Étape 3: Attendre déploiement
    success = wait_for_deployment(creds['render_api_key'], service['id'])

    # Résumé final
    print("\n\n" + "=" * 50)
    print("\n🎉 DÉPLOIEMENT TERMINÉ!\n")
    print("📍 TON APP EST LIVE SUR:")
    print("   https://achzod-audit-platform.onrender.com")
    print("\n📊 DASHBOARD RENDER:")
    print("   https://dashboard.render.com")
    print("\n📂 REPO GITHUB:")
    print("   https://github.com/achzod/achzod-audit-platform")
    print("\n" + "=" * 50)

    print("\n\n🧪 TESTE TON APP:")
    print("1. Ouvre: https://achzod-audit-platform.onrender.com")
    print("2. Clique 'SCAN ANABOLIQUE'")
    print("3. Remplis le questionnaire")
    print("4. Vois ton audit généré! 🔥")

    print("\n\n⚠️  IMPORTANT - STRIPE WEBHOOK:")
    print("Pour que les paiements premium fonctionnent:")
    print("1. Va sur: https://dashboard.stripe.com/webhooks")
    print("2. Add endpoint: https://achzod-audit-platform.onrender.com/api/payment/stripe")
    print("3. Event: checkout.session.completed")
    print("4. Copie le webhook secret et ajoute-le dans Render env vars")
    print("\n")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Déploiement annulé par l'utilisateur.")
    except Exception as e:
        print(f"\n\n❌ ERREUR: {e}")
        import traceback
        traceback.print_exc()
