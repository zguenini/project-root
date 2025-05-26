# Dropshipping SaaS – Monorepo Fullstack

![CI](https://github.com/zguenini/project-root/actions/workflows/security-audit.yml/badge.svg)
![Snyk IaC](https://github.com/zguenini/project-root/actions/workflows/snyk-infra.yml/badge.svg)
![Docker Security](https://github.com/zguenini/project-root/actions/workflows/docker-security.yml/badge.svg)

---

## 🚀 Présentation

**Dropshipping SaaS** est une plateforme internationale moderne dédiée à l’automatisation avancée du dropshipping, construite en monorepo :  
- **Backend** : NestJS + TypeScript (API REST/GraphQL, PostgreSQL, JWT, multi-tenant)
- **Frontend** : React/Next.js + TypeScript + TailwindCSS (UI internationale, dashboard, management)
- **Infra** : Docker, Docker Compose, Kubernetes ready, CI/CD, tests, monitoring, sécurité avancée

---

## 🗂️ Arborescence principale

```plaintext
.
├── backend/           # API, logique métier (NestJS, PostgreSQL, JWT, Stripe, etc.)
├── frontend/          # Interface utilisateur (React/Next.js, i18n, Dashboard)
├── infrastructure/    # Terraform, Pulumi, API Gateway, Service Mesh, Chaos tests
├── monitoring/        # Prometheus, Grafana, SLO/SLA, synthetic monitoring
├── docs/              # OpenAPI, playbooks, runbooks, compliance, finance
├── api/               # Documentation API (v1/v2), exemples, webhooks
├── scripts/           # Outils et automatisations (runbooks, DR, rollback)
├── .github/workflows/ # CI/CD, tests, audits sécurité, déploiement
├── docker-compose.yml # Stack locale prête à l’emploi (fullstack)
├── .env.example       # Exemple d’environnement
├── README.md
└── ...
