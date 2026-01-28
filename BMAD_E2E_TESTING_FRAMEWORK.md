# BMAD E2E Testing Framework
## Sistema Completo di Test End-to-End Automatici

> **Creato:** 2026-01-27
> **Autore:** Claude Code (Analisi progetto KickerLink)
> **Status:** Documentazione Sistema Attuale

---

## 📋 **Indice**

1. [Overview del Sistema](#overview-del-sistema)
2. [Architettura dei Test](#architettura-dei-test)
3. [Componenti Principali](#componenti-principali)
4. [Test API Backend](#test-api-backend)
5. [Test Mobile App](#test-mobile-app)
6. [Database Setup/Reset](#database-setupreset)
7. [Automazione CI/CD](#automazione-cicd)
8. [Esecuzione dei Test](#esecuzione-dei-test)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 **Overview del Sistema**

Il framework E2E di BMAD è un sistema completo e modulare per testare automaticamente tutte le funzionalità dell'applicazione KickerLink, dal backend API alle app mobile.

### **Statistiche Attuali**
- **153 test totali** suddivisi in 4 suite principali
- **Copertura completa** di funzionalità business-critical
- **Multi-platform**: API, Android, iOS (futuro)
- **Automazione CI/CD** integrata con EAS

### **Suite di Test Disponibili**
| Suite | File | Test Count | Focus |
|-------|------|------------|-------|
| **Comprehensive** | `e2e-comprehensive-features.sh` | 47 | Funzionalità complete |
| **Coach Contacts** | `e2e-coach-contacts-flow.sh` | 61 | Gestione contatti coach |
| **Parent Dashboard** | `e2e-parent-dashboard-flow.sh` | 28 | Dashboard genitori |
| **Player Access** | `e2e-player-direct-access.sh` | 17 | Accesso diretto giocatori |

---

## 🏗️ **Architettura dei Test**

```
KickerLink E2E Testing
├── 🔧 Backend API Tests (Bash + curl + jq)
│   ├── Script modulari per ogni flusso
│   ├── Setup/teardown automatico database
│   └── Assertion con JSON parsing
├── 📱 Mobile App Tests (Maestro + YAML)
│   ├── Flow dichiarativi per UI testing
│   ├── Screenshot automatici
│   └── Multi-device support
├── 🗄️ Database Management
│   ├── Endpoint dedicati per reset
│   ├── Seed data standardizzato
│   └── Isolation tra test run
└── ⚙️ CI/CD Automation (EAS Workflows)
    ├── Trigger automatici su PR
    ├── Build Android preview
    └── Test execution parallela
```

---

## 🧩 **Componenti Principali**

### **1. Test API Backend**
- **Location**: `server/tests/e2e/*.sh`
- **Technology**: Bash scripts + curl + jq
- **Pattern**: Setup → Test → Assert → Cleanup

### **2. Test Mobile App**
- **Location**: `app/maestro/flows/**/*.yaml`
- **Technology**: Maestro (Mobile UI Testing)
- **Pattern**: Launch → Navigate → Interact → Assert

### **3. Database Management**
- **Location**: `server/src/routes/e2e-test.ts`
- **Endpoints**: `/__test__/reset`, `/__test__/seed`
- **Safety**: Solo in environment di sviluppo/test

### **4. CI/CD Workflows**
- **Location**: `app/.eas/workflows/e2e-*.yml`
- **Platform**: EAS (Expo Application Services)
- **Triggers**: PR, manual execution

---

## 🌐 **Test API Backend**

### **Struttura Standard**

Ogni script di test API segue questo pattern:

```bash
#!/bin/bash

# ============================================
# CONFIGURAZIONE BASE
# ============================================

# Colori per output leggibile
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configurazione endpoint
API_BASE="${API_BASE:-http://localhost:3001}"

# Contatori per statistiche
TESTS_PASSED=0
TESTS_FAILED=0
TESTS_TOTAL=0

# ============================================
# UTILITY FUNCTIONS
# ============================================

# Logging colorato
log_success() {
    echo -e "${GREEN}✓${NC} $1"
    ((TESTS_PASSED++))
    ((TESTS_TOTAL++))
}

log_error() {
    echo -e "${RED}✗${NC} $1"
    ((TESTS_FAILED++))
    ((TESTS_TOTAL++))
}

# API call wrapper con auth automatico
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=${4:-$ACCESS_TOKEN}

    if [ -n "$data" ]; then
        curl -s -X "$method" "$API_BASE$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data"
    else
        curl -s -X "$method" "$API_BASE$endpoint" \
            -H "Authorization: Bearer $token"
    fi
}

# Response validation con JSON parsing
check_response() {
    local response=$1
    local expected_field=$2
    local test_name=$3

    if echo "$response" | jq -e ".success == true" > /dev/null 2>&1; then
        if [ -n "$expected_field" ]; then
            if echo "$response" | jq -e ".$expected_field" > /dev/null 2>&1; then
                log_success "$test_name"
                return 0
            else
                log_error "$test_name - Campo '$expected_field' non trovato"
                return 1
            fi
        else
            log_success "$test_name"
            return 0
        fi
    else
        log_error "$test_name"
        echo "$response" | jq .
        return 1
    fi
}
```

### **Pattern di Test**

1. **Bootstrap**: Crea utente e organizzazione test
2. **Setup**: Prepara dati necessari (players, teams, events)
3. **Execute**: Esegue le operazioni da testare
4. **Assert**: Verifica risultati attesi
5. **Cleanup**: Pulisce dati temporanei

### **Esempio Test Completo**

```bash
# ============================================
# TEST: GENDER VALIDATION
# ============================================
log_section "TEST GENDER VALIDATION"

# Setup: Crea giocatori con diversi gender
MALE_PLAYER_DATA="{
    \"firstName\": \"Marco\",
    \"lastName\": \"Rossi_$TEST_RUN_ID\",
    \"gender\": \"MALE\",
    \"birthDate\": \"2014-05-20\"
}"

FEMALE_PLAYER_DATA="{
    \"firstName\": \"Sofia\",
    \"lastName\": \"Verdi_$TEST_RUN_ID\",
    \"gender\": \"FEMALE\",
    \"birthDate\": \"2014-03-15\"
}"

# Crea giocatori
MALE_RESPONSE=$(api_call POST "/api/org/$ORG_ID/players" "$MALE_PLAYER_DATA")
FEMALE_RESPONSE=$(api_call POST "/api/org/$ORG_ID/players" "$FEMALE_PLAYER_DATA")

# Extract IDs
MALE_PLAYER_ID=$(echo "$MALE_RESPONSE" | jq -r '.data.id')
FEMALE_PLAYER_ID=$(echo "$FEMALE_RESPONSE" | jq -r '.data.id')

# Test: Assegna giocatore maschio a team maschile (OK)
ASSIGN_RESPONSE=$(api_call POST "/api/org/$ORG_ID/teams/$MALE_TEAM_ID/players" "{\"playerIds\":[\"$MALE_PLAYER_ID\"]}")
check_response "$ASSIGN_RESPONSE" "data" "Assegnazione giocatore maschio a team maschile"

# Test: Assegna giocatrice a team maschile (DEVE FALLIRE)
ASSIGN_FEMALE_RESPONSE=$(api_call POST "/api/org/$ORG_ID/teams/$MALE_TEAM_ID/players" "{\"playerIds\":[\"$FEMALE_PLAYER_ID\"]}")
check_error_response "$ASSIGN_FEMALE_RESPONSE" "" "Gender validation - blocca giocatrice in team maschile"
```

### **Features Chiave**

- ✅ **Auto-setup**: Crea account e org temporanei per ogni run
- ✅ **Isolation**: Ogni test usa ID univoci per evitare conflitti
- ✅ **JSON Parsing**: jq per validazione response strutturati
- ✅ **Error Testing**: Verifica sia success che failure cases
- ✅ **Colored Output**: Logging leggibile con colori
- ✅ **Statistics**: Conta automatico test passed/failed

---

## 📱 **Test Mobile App**

### **Maestro Framework**

I test mobile usano **Maestro**, un framework dichiarativo per UI testing.

### **Struttura Flow**

```yaml
# Smoke Test: Login Flow
appId: com.kickrlink.app
tags:
  - smoke
  - login
  - auth
---

# Launch app
- launchApp:
    clearState: true

# Wait for login screen
- extendedWaitUntil:
    visible:
      id: "screen.login"
    timeout: 10000

# Input phone number
- tapOn:
    id: "input.login.phone"
- inputText: ${TEST_PHONE}

# Hide keyboard
- hideKeyboard

# Continue to PIN
- tapOn:
    id: "btn.login.continue"

# Wait for PIN screen
- extendedWaitUntil:
    visible:
      id: "input.login.pin"
    timeout: 10000

# Input PIN
- tapOn:
    id: "input.login.pin"
- inputText: ${TEST_PIN}

# Submit login
- tapOn:
    id: "btn.login.submit"

# Verify success
- extendedWaitUntil:
    visible:
      anyOf:
        - id: "screen.home"
        - id: "screen.selectProfile"
    timeout: 15000

# Take screenshot for debugging
- takeScreenshot: "01_login_success"

# Final assertion
- assertVisible:
    anyOf:
      - id: "screen.home"
      - id: "screen.selectProfile"
```

### **Flow Smoke Test Disponibili**

| Flow | File | Descrizione |
|------|------|-------------|
| **Launch** | `00_launch.yaml` | Avvio app e verifiche base |
| **Login** | `01_login.yaml` | Flusso completo login (phone + PIN) |
| **Select Profile** | `02_select_profile.yaml` | Selezione profilo multi-org |
| **Navigation** | `03_navigation.yaml` | Navigazione tab principali |
| **Logout** | `04_logout.yaml` | Logout e pulizia session |

### **Configurazione Maestro**

```yaml
# maestro/config.yaml
flows:
  - flows/smoke
env:
  TEST_PHONE: "3331234567"
  TEST_PIN: "123456"
  API_BASE: "https://kickrlink-production.up.railway.app"
```

### **Features Chiave**

- ✅ **Declarative**: Flow definiti in YAML leggibile
- ✅ **Cross-Platform**: Android e iOS support
- ✅ **Screenshots**: Capture automatici per debugging
- ✅ **Variables**: Parametri configurabili tramite env vars
- ✅ **Assertions**: Verifiche UI robuste con timeout
- ✅ **Parallel Execution**: Possibilità di sharding per velocità

---

## 🗄️ **Database Setup/Reset**

### **Endpoint Dedicati**

Il sistema include endpoint specializzati per gestire il database durante i test:

```typescript
// server/src/routes/e2e-test.ts

// IMPORTANTE: Disponibili SOLO in ambiente di sviluppo
export async function e2eTestRoutes(fastify: FastifyInstance) {
  // Security check
  fastify.addHook('preHandler', async (request, reply) => {
    if (process.env.NODE_ENV === 'production') {
      return reply.status(403).send({
        success: false,
        error: 'FORBIDDEN',
        message: 'Test endpoints are not available in production'
      });
    }
  });

  // Reset completo database
  fastify.post('/reset', async (request, reply) => {
    await prisma.$transaction([
      // Elimina in ordine per rispettare foreign key constraints
      prisma.attendance.deleteMany({}),
      prisma.registration.deleteMany({}),
      prisma.event.deleteMany({}),
      prisma.playerProfile.deleteMany({}),
      prisma.team.deleteMany({}),
      prisma.organization.deleteMany({}),
      prisma.user.deleteMany({})
    ]);

    return { success: true, message: 'Database reset completed' };
  });

  // Seed con dati standard
  fastify.post('/seed', async (request, reply) => {
    // Crea user standard, org, players, events per test
    // ...implementation
  });
}
```

### **Utilizzo nei Test**

```bash
# Reset database prima di ogni test suite
log "Resetting database..."
RESET_RESPONSE=$(curl -s -X POST "$API_BASE/__test__/reset")

if echo "$RESET_RESPONSE" | jq -e ".success == true" > /dev/null; then
    log_success "Database reset completed"
else
    log_error "Database reset failed"
    exit 1
fi
```

### **Safety Features**

- 🔒 **Production Block**: Endpoint bloccati in produzione
- 🔄 **Transaction Safety**: Operazioni atomiche con rollback
- 📊 **Constraint Respect**: Eliminazione in ordine corretto
- 🎯 **Selective Reset**: Possibilità di resettare solo alcune tabelle

---

## ⚙️ **Automazione CI/CD**

### **EAS Workflows**

Il sistema include workflow automatizzati per EAS (Expo Application Services):

```yaml
# .eas/workflows/e2e-smoke.yml
name: E2E Smoke (Android)

on:
  pull_request:
    branches: ['*']

jobs:
  # Build Android preview APK
  build_android:
    type: build
    params:
      platform: android
      profile: preview

  # Run Maestro smoke tests
  e2e_maestro:
    type: maestro
    needs: [build_android]
    params:
      build_id: ${{ needs.build_android.outputs.build_id }}
      flow_path:
        - maestro/flows/smoke
      env:
        TEST_PHONE: '3331234567'
        TEST_PIN: '123456'
        API_BASE: ${{ secrets.E2E_API_BASE }}
      retries: 2
      record_screen: true
      maestro_version: '1.36.0'
```

### **Workflow Disponibili**

| Workflow | File | Trigger | Descrizione |
|----------|------|---------|-------------|
| **Smoke** | `e2e-smoke.yml` | PR, Manual | Test base funzionalità |
| **Regression** | `e2e-regression.yml` | Release, Manual | Test completi pre-release |

### **Features Automazione**

- ✅ **Auto-trigger**: Su PR e rilasci
- ✅ **Build Integration**: Build automatico APK/IPA
- ✅ **Parallel Execution**: Job paralleli per velocità
- ✅ **Retry Logic**: Retry automatico per flaky tests
- ✅ **Screen Recording**: Video per debugging fallimenti
- ✅ **Environment Isolation**: Variabili separate per test/prod

---

## 🚀 **Esecuzione dei Test**

### **Test API Backend**

```bash
# Setup environment
export API_BASE="http://localhost:3001"

# Start server (required)
cd server
npm run dev

# Run complete suite (in altro terminale)
cd server/tests/e2e

# All comprehensive tests (47 tests)
./e2e-comprehensive-features.sh

# Coach contacts flow (61 tests)
./e2e-coach-contacts-flow.sh

# Parent dashboard flow (28 tests)
./e2e-parent-dashboard-flow.sh

# Player direct access (17 tests)
./e2e-player-direct-access.sh

# Run all tests (153 tests total)
for script in e2e-*.sh; do
    echo "Running $script..."
    ./$script
done
```

### **Test Mobile App**

```bash
# Install Maestro
curl -Ls "https://get.maestro.mobile.dev" | bash

# Start app in simulator/device
cd app
npx expo start --android  # or --ios

# Run smoke tests
cd maestro
maestro test flows/smoke

# Run with custom environment
TEST_PHONE="1234567890" \
TEST_PIN="999999" \
maestro test flows/smoke

# Run specific flow
maestro test flows/smoke/01_login.yaml
```

### **Test con CI/CD**

```bash
# Trigger manual workflow
eas workflow:run e2e-smoke

# Check workflow status
eas workflow:list

# View logs
eas workflow:view <workflow-id>
```

---

## ✨ **Best Practices**

### **Scrittura Test API**

1. **Unique Test Data**: Usa timestamp o UUID per evitare conflitti
```bash
TEST_RUN_ID=$(date +%s)
USER_EMAIL="test_${TEST_RUN_ID}@example.com"
```

2. **Error Testing**: Testa sia success che error cases
```bash
# Test success case
check_response "$RESPONSE" "data" "Operation should succeed"

# Test error case
check_error_response "$ERROR_RESPONSE" "400" "Operation should fail validation"
```

3. **Cleanup**: Sempre pulire dati temporanei
```bash
# Cleanup after test
if [ -n "$CREATED_ID" ]; then
    api_call DELETE "/api/resource/$CREATED_ID" >/dev/null 2>&1
fi
```

### **Scrittura Test Mobile**

1. **Robust Selectors**: Usa ID stabili invece di text o XPath
```yaml
# Good
- tapOn:
    id: "btn.login.submit"

# Avoid (text might change)
- tapOn:
    text: "Accedi"
```

2. **Proper Waits**: Sempre aspettare elementi prima di interagire
```yaml
# Wait before interaction
- extendedWaitUntil:
    visible:
      id: "input.phone"
    timeout: 10000

# Then interact
- tapOn:
    id: "input.phone"
```

3. **Screenshots**: Cattura screenshot per debugging
```yaml
# At key points
- takeScreenshot: "login_success"
- takeScreenshot: "error_state"
```

### **Database Management**

1. **Isolation**: Ogni test run deve essere isolato
2. **Transaction Safety**: Usa transazioni per operazioni multiple
3. **Foreign Key Respect**: Elimina in ordine corretto
4. **Environment Check**: Mai esporre endpoint test in produzione

### **CI/CD Integration**

1. **Environment Variables**: Usa secrets per dati sensibili
2. **Retry Logic**: Implementa retry per test flaky
3. **Parallel Execution**: Usa job paralleli quando possibile
4. **Artifact Collection**: Salva screenshots/logs per debugging

---

## 🐛 **Troubleshooting**

### **Test API Fallimenti**

**Problema**: Test API falliscono con 401 Unauthorized
```bash
# Debug: Verifica token
echo "Access token: $ACCESS_TOKEN"
echo "$REGISTER_RESPONSE" | jq '.data.accessToken'

# Solution: Check registration response
if [ -z "$ACCESS_TOKEN" ]; then
    echo "Registration failed, check API response"
fi
```

**Problema**: JSON parsing errors
```bash
# Debug: Raw response
echo "Raw API response:"
echo "$RESPONSE"

# Check jq syntax
echo "$RESPONSE" | jq . >/dev/null || echo "Invalid JSON"
```

### **Test Mobile Fallimenti**

**Problema**: Element not found
```yaml
# Debug: Take screenshot to see current state
- takeScreenshot: "debug_element_missing"

# Add longer timeout
- extendedWaitUntil:
    visible:
      id: "target.element"
    timeout: 20000  # Increase from 10000
```

**Problema**: Flaky tests
```yaml
# Add retry logic in EAS workflow
retries: 3

# Or use runFlow with error handling
- runFlow:
    file: subflow.yaml
    onError: continue
```

### **Database Issues**

**Problema**: Foreign key constraint errors
```typescript
// Fix order of deletion
await prisma.$transaction([
  // Children first
  prisma.registration.deleteMany({}),
  prisma.event.deleteMany({}),
  // Parents last
  prisma.organization.deleteMany({})
]);
```

**Problema**: Test data conflicts
```bash
# Use unique test data
TEST_RUN_ID=$(date +%s)_$(shuf -i 1000-9999 -n 1)
```

### **CI/CD Issues**

**Problema**: Build failures in EAS
```yaml
# Check build logs
eas build:list --status=errored

# View specific build
eas build:view <build-id>
```

**Problema**: Environment variable missing
```yaml
# Verify secrets are set
env:
  TEST_VAR: ${{ secrets.TEST_VAR }}

# Add fallback values
env:
  API_BASE: ${{ secrets.E2E_API_BASE || 'http://localhost:3001' }}
```

---

## 📚 **Risorse Aggiuntive**

### **Documentazione Tool**

- [Maestro Documentation](https://maestro.mobile.dev/)
- [jq Manual](https://stedolan.github.io/jq/manual/)
- [EAS Build & Submit](https://docs.expo.dev/build/introduction/)
- [Bash Scripting Guide](https://tldp.org/LDP/Bash-Beginners-Guide/html/)

### **File di Riferimento**

```
server/tests/e2e/
├── e2e-comprehensive-features.sh    # Reference per structure completa
├── e2e-coach-contacts-flow.sh       # Reference per flow complessi
└── e2e-parent-dashboard-flow.sh     # Reference per user flows

app/maestro/flows/smoke/
├── 01_login.yaml                    # Reference per auth flow
├── 02_select_profile.yaml           # Reference per navigation
└── 03_navigation.yaml               # Reference per UI interaction

server/src/routes/
└── e2e-test.ts                      # Reference per DB management

app/.eas/workflows/
├── e2e-smoke.yml                    # Reference per CI/CD setup
└── e2e-regression.yml               # Reference per full test suite
```

---

## 🎯 **Conclusioni**

Il framework E2E di BMAD fornisce una **copertura completa** di test automatizzati per garantire la qualità dell'applicazione KickerLink. Con **153 test attivi**, copertura API e mobile, e integrazione CI/CD, rappresenta uno standard elevato per la **delivery confidence**.

### **Key Benefits**

- ✅ **Comprehensive Coverage**: API + Mobile + Database + CI/CD
- ✅ **Automated Execution**: Zero manual intervention
- ✅ **Fast Feedback**: Esecuzione su PR e deploy
- ✅ **Reliable Results**: Isolation e retry per stabilità
- ✅ **Developer Friendly**: Output chiaro e debugging tools

### **Next Steps Suggeriti**

1. **Espandere copertura iOS** con workflow EAS dedicato
2. **Performance testing** con load tests automatizzati
3. **Visual regression** testing per UI consistency
4. **Integration con monitoring** per alert in produzione

> 💡 **Questo framework può essere facilmente adattato ad altri progetti** seguendo gli stessi pattern architetturali.

---

*📄 Documento generato per progetto **KickerLink** - Sistema di gestione scuole calcio*