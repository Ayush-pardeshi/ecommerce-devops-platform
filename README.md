# NOVAORA — High-Traffic E-Commerce Platform

### Production-Style DevOps & AWS Implementation

> A production-style e-commerce platform demonstrating automated CI/CD, containerization, AWS infrastructure, security scanning, staging validation, production deployment, automatic rollback, monitoring, centralized logging, PostgreSQL backup/restore, and cost-conscious cloud operations.

---

## 1. Project Overview

**NOVAORA** is a full-stack e-commerce application designed and deployed as a **production-style DevOps project on AWS**.

The purpose of this project was not only to build an e-commerce website, but to demonstrate how a modern DevOps engineer can take an application from:

**Source Code → Testing → Code Quality → Security Scanning → Containerization → Container Registry → Staging → DAST Testing → Production Approval → Production Deployment → Health Validation → Automatic Rollback → Monitoring → Logging**

The project combines:

* React frontend
* Python FastAPI backend
* PostgreSQL database
* Docker
* Docker Compose
* Amazon EC2
* Amazon ECR
* AWS VPC
* AWS IAM
* Terraform
* GitHub Actions
* SonarQube Cloud
* Trivy
* OWASP ZAP
* Amazon CloudWatch
* Nginx
* Git
* Linux
* Bash scripting

The project was implemented with a strong focus on:

* Automation
* Security
* Reliability
* Observability
* Deployment safety
* Infrastructure as Code
* Reproducibility
* Cost awareness
* Troubleshooting
* Real-world DevOps practices

---

# 2. Project Goals

The major goals of the project were:

1. Build a realistic full-stack e-commerce application.
2. Containerize the frontend and backend.
3. Run PostgreSQL as the application database.
4. Deploy the application on AWS EC2.
5. Store production container images in Amazon ECR.
6. Build an automated GitHub Actions CI/CD pipeline.
7. Run automated backend and frontend tests.
8. Perform code-quality analysis using SonarQube Cloud.
9. Perform vulnerability scanning using Trivy.
10. Deploy automatically to staging.
11. Validate the staging environment.
12. Perform OWASP ZAP DAST testing.
13. Require manual approval before production deployment.
14. Deploy production containers from ECR.
15. Perform production health checks.
16. Automatically rollback when a deployment fails.
17. Monitor the EC2 instance using CloudWatch.
18. Centralize application logs using CloudWatch Logs.
19. Create and test PostgreSQL backups.
20. Verify PostgreSQL restore capability.
21. Configure ECR lifecycle policies.
22. Automatically clean disposable Docker resources.
23. Document real troubleshooting scenarios.
24. Keep AWS usage cost-conscious.
25. Create visual evidence for the complete implementation.

---

# 3. Application

## NOVAORA

NOVAORA is the e-commerce application used as the workload for this DevOps implementation.

The application includes:

* Homepage
* Product catalog
* Product information
* Shopping cart
* Checkout flow
* Order confirmation
* Payment method selection
* Backend API
* PostgreSQL persistence
* Nginx frontend serving
* API reverse proxying

The application was intentionally developed to provide enough functionality to demonstrate:

* Frontend CI
* Backend CI
* Automated testing
* Container builds
* API health checks
* Database operations
* Deployment
* Security scanning
* Monitoring
* Logging
* Rollback

---

# 4. High-Level Architecture

```text
                         ┌──────────────────────┐
                         │      Developer       │
                         │                      │
                         │ Git Push / Pull      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       GitHub         │
                         │   Source Repository  │
                         └──────────┬───────────┘
                                    │
                                    ▼
                    ┌────────────────────────────────┐
                    │       GitHub Actions            │
                    │                                │
                    │  Backend CI                    │
                    │  Frontend CI                   │
                    │  Unit Tests                    │
                    │  SonarQube                     │
                    │  Docker Build                  │
                    │  Trivy                         │
                    │  ECR Push                      │
                    │  Staging Deployment            │
                    │  OWASP ZAP                     │
                    │  Production Approval           │
                    │  Production Deployment         │
                    │  Health Checks                  │
                    │  Docker Cleanup                │
                    └──────────────┬─────────────────┘
                                   │
                                   ▼
                         ┌──────────────────────┐
                         │     Amazon ECR       │
                         │                      │
                         │ Backend Image        │
                         │ Frontend Image       │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     AWS EC2          │
                         │                      │
                         │ Docker               │
                         │ Nginx                │
                         │ FastAPI              │
                         │ PostgreSQL           │
                         └──────────┬───────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │    End Users    │
                           │                 │
                           │ NOVAORA Website │
                           └─────────────────┘
```

---

# 5. CI/CD Flow

The complete deployment lifecycle is:

```text
Developer
   │
   ▼
Git Push
   │
   ▼
Backend CI
   │
   ├── Backend Tests
   │
   ▼
Frontend CI
   │
   ├── npm ci
   ├── Frontend Tests
   ├── Coverage
   └── Production Build
   │
   ▼
SonarQube Code Quality
   │
   ▼
Docker Build
   │
   ▼
Trivy Security Scan
   │
   ▼
Amazon ECR Push
   │
   ▼
Staging Deployment
   │
   ▼
Staging Smoke Tests
   │
   ▼
OWASP ZAP DAST
   │
   ▼
Manual Production Approval
   │
   ▼
Production Deployment
   │
   ▼
Production Health Checks
   │
   ├── SUCCESS ───────────────► Production Running
   │
   └── FAILURE
          │
          ▼
   Automatic Rollback
          │
          ▼
   Previous Working Version
          │
          ▼
   Docker Cleanup
```

---

# 6. CI/CD Pipeline Stages

The GitHub Actions workflow is organized into separate jobs with explicit dependencies.

## Pipeline Jobs

```text
backend ───────────────┐
                       │
                       ├──► sonarqube ──► docker
                       │                         │
frontend ──────────────┘                         ▼
                                           staging deployment
                                                 │
                                                 ▼
                                            OWASP ZAP
                                                 │
                                                 ▼
                                        production deployment
                                                 │
                                                 ▼
                                             cleanup
```

This dependency structure ensures that later stages do not run before their required validations are completed.

---

# 7. Backend CI

The backend CI stage validates the Python application before containerization.

The backend pipeline includes:

* Repository checkout
* Python environment preparation
* Dependency installation
* Backend test execution
* Application validation

The backend contains:

* FastAPI
* Uvicorn
* PostgreSQL integration
* SQLAlchemy/database layer
* Alembic migrations
* Authentication/security components
* API schemas
* Models
* Health endpoint

A backend health test is included in the project.

---

# 8. Frontend CI

The frontend uses:

* React
* Vite
* Node.js
* npm

The frontend pipeline performs:

```text
Checkout
   │
   ▼
Node.js Setup
   │
   ▼
npm ci
   │
   ▼
Tests + Coverage
   │
   ▼
Production Build
   │
   ▼
Coverage Artifact
```

The pipeline uses npm's clean installation process:

```bash
npm ci --ignore-scripts
```

This provides reproducible dependency installation based on the lock file.

---

# 9. Frontend Pipeline Optimization

One of the pipeline optimizations implemented was reducing unnecessary repeated work.

Instead of installing dependencies and generating coverage again during the SonarQube stage, the frontend job generates the coverage report once.

The resulting LCOV coverage file is uploaded as a GitHub Actions artifact.

The SonarQube job downloads the artifact and uses it for analysis.

```text
Frontend CI
    │
    ├── npm ci
    ├── Tests
    ├── Coverage
    └── Build
         │
         ▼
   frontend-coverage
       artifact
         │
         ▼
SonarQube Job
         │
         └── Download coverage
```

This avoids unnecessary duplicate frontend test execution.

---

# 10. Code Quality — SonarQube Cloud

SonarQube Cloud is used for static code analysis.

The project analyzes:

* Python backend
* JavaScript/React frontend

Excluded paths include:

* `node_modules`
* `dist`
* `.venv`
* Python cache directories
* Coverage files
* ZAP reports
* Generated files

Frontend coverage is connected to SonarQube using:

```text
application/frontend/coverage/lcov.info
```

The project achieved a successful SonarQube Quality Gate.

The final evidence shows:

* Quality Gate Passed
* New Issues: 0
* Security Hotspots: 0

The project also addressed a browser-storage security finding during development.

---

# 11. Security Issue Found During Development

SonarQube identified a security concern related to browser storage and order data.

The application originally handled stored order data in a way that could allow more data than necessary to be trusted from browser storage.

The implementation was improved by storing only an allowlisted subset of order information.

The stored object contains only required fields such as:

* Order ID
* Payment method
* Product ID
* Product name
* Quantity
* Product image
* Total
* Order status

The payment value is also restricted to expected values.

This demonstrates an important security principle:

> Do not blindly trust client-controlled browser storage.

---

# 12. Containerization

The application is containerized using Docker.

Containers are used for:

* Frontend
* Backend
* PostgreSQL

The project also uses Docker Compose to manage the application stack.

Basic architecture:

```text
Docker Compose
     │
     ├── Frontend
     │      └── Nginx
     │
     ├── Backend
     │      └── FastAPI / Uvicorn
     │
     └── PostgreSQL
```

---

# 13. Frontend Container

The frontend is built as a production container.

The process is:

```text
React Source
    │
    ▼
npm Build
    │
    ▼
dist/
    │
    ▼
Nginx Container
    │
    ▼
Production Website
```

The frontend uses:

```text
nginxinc/nginx-unprivileged
```

This avoids running the web server as the root user.

The application is served through Nginx.

---

# 14. Nginx

Nginx is responsible for:

* Serving frontend static files
* Handling HTTP requests
* Reverse proxying API requests
* Adding security headers
* Providing the production web entry point

The API path is routed through:

```text
/api/
```

The Nginx configuration includes security-related headers.

During troubleshooting, an Nginx header inheritance issue was identified.

A location-level `Cache-Control` configuration caused expected security headers to disappear because of Nginx header inheritance behavior.

The problematic configuration was corrected so that the security headers remained active.

This was validated through the production deployment.

---

# 15. Backend Container

The backend runs as a Python container.

Technology:

* Python 3.14
* FastAPI
* Uvicorn
* PostgreSQL
* SQLAlchemy
* Alembic

The backend container includes:

* Application code
* Dependencies
* Database migration process
* Database seeding
* Health check
* Non-root application user

The container exposes the backend application internally on port:

```text
8000
```

---

# 16. PostgreSQL

PostgreSQL is used as the relational database.

The database stores application data including:

* Products
* Users/authentication-related data
* Orders
* Application records

Database migrations are managed through Alembic.

The backend startup process includes database preparation and application initialization.

---

# 17. PostgreSQL Backup

Database backup was implemented and tested.

The project generated database backups in both dump and SQL formats during testing.

Examples of generated backup formats:

```text
.dump
.sql
```

Backups are intentionally not committed to GitHub.

Reason:

* Database backups may contain application data.
* They can become large.
* They should not be treated as source-code artifacts.
* Production backup storage should normally use dedicated secure storage.

---

# 18. PostgreSQL Restore Testing

A restore test was performed using a temporary database.

The process was:

```text
Production Database
       │
       ▼
     Backup
       │
       ▼
Temporary Restore Database
       │
       ▼
Verify Tables
       │
       ▼
Verify Product Records
       │
       ▼
Drop Temporary Database
```

The restore test successfully verified:

* Database restoration
* Six tables
* Three product records

The production database was not replaced during the restore test.

The temporary restore database was removed after verification.

This demonstrates that a backup is not considered reliable until the restore process has actually been tested.

---

# 19. Amazon ECR

Amazon Elastic Container Registry is used to store Docker images.

Two repositories are used:

```text
ecommerce-backend
ecommerce-frontend
```

The pipeline:

```text
Docker Build
    │
    ▼
Trivy Scan
    │
    ▼
AWS ECR Login
    │
    ▼
Image Tag
    │
    ▼
ECR Push
```

Production deployments pull the validated image from ECR.

---

# 20. Image Tagging

Images are tagged using version/commit-based references so deployments can identify the exact application version.

The deployment process records the currently running production image before replacing it.

This is important for rollback.

Instead of treating a deployment as:

```text
latest → latest
```

the deployment process can identify a previous known image and restore it when necessary.

---

# 21. ECR Lifecycle Policy

ECR lifecycle policies were configured for both backend and frontend repositories.

The policy is designed to:

1. Protect the `latest` image.
2. Keep the five most recent tagged images.
3. Expire older images.

This prevents unlimited accumulation of Docker images in ECR.

Benefits:

* Lower storage usage
* Cleaner registry
* Easier image management
* Reduced unnecessary AWS cost

The lifecycle policy is stored in the repository under:

```text
aws/ecr/lifecycle-policy.json
```

---

# 22. Trivy Security Scanning

Trivy is used for container vulnerability scanning.

The pipeline scans Docker images for:

* HIGH vulnerabilities
* CRITICAL vulnerabilities

The scan is configured to ignore unfixed vulnerabilities where appropriate.

The purpose is to identify vulnerable packages before production deployment.

Pipeline concept:

```text
Docker Build
     │
     ▼
Trivy Scan
     │
     ├── Security validation
     │
     ▼
ECR Push
```

Generated Trivy reports are not committed as source artifacts.

The project includes visual evidence of the Trivy security scan.

---

# 23. OWASP ZAP DAST

OWASP ZAP is used for Dynamic Application Security Testing.

Unlike static analysis, DAST tests the running application.

The workflow is:

```text
Application
    │
    ▼
Staging Deployment
    │
    ▼
Running Web Application
    │
    ▼
OWASP ZAP
    │
    ▼
DAST Security Testing
```

This is intentionally performed against the staging environment before production deployment.

The ZAP configuration is stored in:

```text
zap-reports/zap.yaml
```

Generated HTML reports are ignored by Git and are not committed.

---

# 24. Why Staging Exists

Production should not be the first place where a new container image is tested.

The project therefore uses:

```text
Build
   ↓
Staging
   ↓
Smoke Test
   ↓
ZAP DAST
   ↓
Production Approval
   ↓
Production
```

Staging provides an additional validation layer before the production environment is changed.

---

# 25. Staging Deployment

The staging deployment is automated by GitHub Actions.

The process:

```text
Validated ECR Images
        │
        ▼
Staging Deployment
        │
        ▼
Container Startup
        │
        ▼
Application Availability
        │
        ▼
Smoke Testing
```

The staging environment is intentionally used as the target for automated dynamic security testing.

---

# 26. Smoke Testing

Smoke tests verify that the application is responding after deployment.

The project validates important application endpoints such as:

* Backend health
* Frontend availability
* Product API

A deployment is not considered successful simply because Docker reports that the container started.

The application itself must respond successfully.

---

# 27. Production Deployment

Production deployment occurs only after the required pipeline stages complete successfully.

The flow is:

```text
Code
 ↓
Tests
 ↓
SonarQube
 ↓
Docker
 ↓
Trivy
 ↓
ECR
 ↓
Staging
 ↓
Smoke Tests
 ↓
ZAP
 ↓
Manual Approval
 ↓
Production
```

This provides multiple validation layers before production changes are introduced.

---

# 28. Manual Production Approval

Production deployment includes a manual approval gate.

The purpose is to prevent an automatically validated build from immediately becoming a production deployment without human confirmation.

The workflow is therefore:

```text
Automated Validation
        │
        ▼
Security Testing
        │
        ▼
Manual Approval
        │
        ▼
Production Deployment
```

This is implemented as an environment/deployment protection mechanism rather than pretending that there is a separate standalone "approval job."

---

# 29. Automatic Rollback

One of the major reliability features of this project is automatic rollback.

Rollback logic is implemented inside the production deployment script.

The process is:

```text
Deploy New Image
      │
      ▼
Wait for Containers
      │
      ▼
Health Checks
      │
      ├────────────── SUCCESS
      │                    │
      │                    ▼
      │              Deployment Complete
      │
      └────────────── FAILURE
                           │
                           ▼
                   Detect Failure
                           │
                           ▼
                 Pull Previous Image
                           │
                           ▼
                  Restore Containers
                           │
                           ▼
                  Run Health Checks
                           │
                           ▼
                Rollback Successful
```

This avoids leaving production in a failed state.

---

# 30. Rollback Implementation

The deployment script:

1. Detects the currently running production image.
2. Deploys the new image.
3. Waits for the application to initialize.
4. Performs health checks.
5. Detects deployment failure.
6. Retrieves the previous working image.
7. Restores the previous production version.
8. Performs health checks again.
9. Reports rollback success.
10. Returns a failure status to the CI/CD pipeline so the failed deployment is visible.

The important point is that:

> The application is restored while the pipeline still correctly reports that the new deployment failed.

This is a realistic production deployment behavior.

---

# 31. Controlled Rollback Testing

Rollback was tested intentionally by introducing a controlled deployment failure.

The failure was detected.

The previous image was restored.

The rollback process successfully reported:

```text
AUTOMATIC ROLLBACK SUCCESSFUL
```

Two screenshots document:

```text
12a-rollback-failure-detected.png
12b-automatic-rollback-success.png
```

The rollback test also exposed a frontend startup timing/race condition.

A controlled second test with an appropriate startup wait successfully validated the rollback behavior.

This demonstrates why deployment scripts should not assume that a container is immediately ready simply because it has started.

---

# 32. Docker Cleanup

The project includes:

```text
scripts/docker-cleanup.sh
```

The cleanup script removes disposable resources such as:

* Temporary ZAP images
* Local ECR images
* Build cache
* Dangling images

The script also displays Docker disk usage.

This was particularly important because the EC2 environment has limited disk capacity.

The script was syntax-checked using:

```bash
bash -n scripts/docker-cleanup.sh
```

---

# 33. Important Docker Disk-Space Troubleshooting

During the ZAP workflow, the EC2 instance experienced disk-space pressure.

Instead of deleting Docker's internal storage directly, unnecessary caches were identified and cleaned.

Examples included:

```text
/home/ubuntu/.cache/trivy
/home/ubuntu/.cache/pip-tools
```

This recovered disk space without using unsafe commands such as:

```bash
rm -rf /var/lib/containerd/*
```

The incident reinforced an important operational principle:

> Diagnose disk usage before deleting infrastructure-managed directories.

---

# 34. Docker Credential Warning

Docker reported a credential-storage warning because registry credentials were stored in:

```text
/home/ubuntu/.docker/config.json
```

without an encrypted credential helper.

This was recognized as a security improvement area.

The deployment architecture nevertheless uses AWS IAM/OIDC for GitHub Actions authentication rather than embedding long-lived AWS credentials inside the repository.

---

# 35. AWS VPC Architecture

The infrastructure includes a custom VPC.

High-level structure:

```text
VPC
10.0.0.0/16
│
├── Public Subnet
│   10.0.1.0/24
│
└── Private Subnet
    10.0.2.0/24
```

The VPC includes:

* VPC
* Public subnet
* Private subnet
* Internet Gateway
* Route configuration
* Security Groups

The public subnet is configured for internet-facing resources.

The private subnet is designed for internal workloads.

---

# 36. Security Groups

Separate security groups were configured according to application tiers.

## Web Security Group

Allows required web traffic:

```text
HTTP  → 80
HTTPS → 443
SSH   → 22
```

Outbound traffic is allowed as required for the workload.

---

## Backend Security Group

The backend application port:

```text
8000
```

is restricted to traffic originating from the web security group.

This avoids exposing the backend application directly to the public internet.

---

## Database Security Group

PostgreSQL:

```text
5432
```

is restricted to the backend security group.

Therefore:

```text
Internet
   │
   ▼
Web
   │
   ▼
Backend
   │
   ▼
PostgreSQL
```

The database is not designed to be directly exposed to the public internet.

---

# 37. IAM

AWS IAM is used to control permissions for infrastructure and automation.

The Terraform-related EC2 role includes permissions required for:

* EC2 operations
* ECR operations
* IAM PassRole where required

The role also uses AWS-managed policies for:

* Systems Manager
* CloudWatch Agent

The project avoids placing permanent AWS access keys inside the Git repository.

---

# 38. GitHub Actions Authentication

GitHub Actions uses an AWS IAM role for CI/CD authentication.

The workflow references an IAM role rather than storing permanent AWS access keys in the repository.

The repository includes the trust-policy configuration used for the GitHub Actions OIDC setup.

The trust relationship was corrected during development to ensure that the repository identity and subject conditions were properly configured.

This demonstrates:

> Prefer short-lived federated credentials over long-lived static cloud credentials.

---

# 39. Infrastructure as Code — Terraform

Terraform is used to define AWS infrastructure.

Terraform configuration includes resources such as:

* VPC
* Subnets
* Internet Gateway
* Route configuration
* Security Groups
* EC2
* IAM-related configuration

The infrastructure uses tagging to identify:

```text
Project
Environment
ManagedBy
Tier
Name
```

Example tagging concept:

```text
Project      = ecommerce-devops-platform
Environment  = dev
ManagedBy    = Terraform
Tier         = web
```

---

# 40. Terraform Validation

Terraform configuration was validated using:

```bash
terraform plan
```

The final validation returned:

```text
No changes. Your infrastructure matches the configuration.
```

This proves that Terraform's configuration matches the current managed infrastructure state at the time of validation.

The evidence screenshot:

```text
18-terraform-plan-no-changes.png
```

documents this result.

---

# 41. Terraform State

Terraform state/runtime files are not treated as normal application source files.

Generated Terraform state and local working files are excluded from source control where appropriate.

The repository contains the infrastructure configuration rather than committing sensitive runtime state.

---

# 42. CloudWatch Monitoring

Amazon CloudWatch is used for EC2 monitoring.

The CloudWatch Agent was installed and configured on the application EC2 instance.

The monitoring namespace is:

```text
Ecommerce/EC2
```

Metrics include:

* Memory available
* Memory used
* Memory used percentage
* Swap available
* Swap used
* Swap used percentage

The CloudWatch Agent was verified as:

```text
active
running
enabled
```

---

# 43. Centralized Application Logging

Docker containers use the AWS CloudWatch Logs driver.

Separate log groups are configured for:

```text
/ecommerce/backend
/ecommerce/frontend
```

Retention was configured to:

```text
7 days
```

This provides centralized application logging without requiring engineers to SSH into the EC2 instance for every log investigation.

---

# 44. Logging Architecture

```text
Backend Container ───────┐
                         │
                         ▼
                    CloudWatch Logs
                         │
                         └── /ecommerce/backend


Frontend Container ──────┐
                         │
                         ▼
                    CloudWatch Logs
                         │
                         └── /ecommerce/frontend
```

This makes application logs available through AWS CloudWatch.

---

# 45. Observability

The project demonstrates two major areas of observability:

## Metrics

CloudWatch Agent provides:

* Memory metrics
* Swap metrics
* EC2 resource visibility

## Logs

CloudWatch Logs provides:

* Backend application logs
* Frontend/Nginx logs

Together:

```text
Metrics + Logs
      │
      ▼
Observability
```

---

# 46. Health Checks

Health checks are implemented at multiple levels.

## Container Level

Docker health checks verify service readiness.

## Application Level

The deployment process validates application endpoints.

## Production Level

Production deployment checks:

* Backend availability
* Frontend availability
* Product API availability

A successful Docker start is therefore not treated as equivalent to a healthy application.

---

# 47. Deployment Scripts

The repository contains deployment-related scripts under:

```text
scripts/
```

Important scripts include:

```text
deploy-staging
deploy
docker-cleanup
```

The production deployment script contains the rollback logic.

This keeps the actual deployment behavior understandable and reusable instead of putting all logic into a huge CI YAML file.

---

# 48. Environment Separation

The project separates application environments conceptually into:

```text
Development
    │
    ▼
Staging
    │
    ▼
Production
```

Environment-specific deployment configuration is maintained separately.

Sensitive configuration is supplied through environment variables rather than hardcoding secrets into application source code.

---

# 49. Secrets Management

Sensitive values such as:

* Database credentials
* Application secret keys
* CI/CD tokens

are not intended to be committed into GitHub.

The repository includes example environment files where appropriate:

```text
.env.example
```

while real environment configuration remains outside version control.

Git ignore rules prevent sensitive or generated files from being accidentally committed.

---

# 50. Git Ignore Strategy

The repository intentionally ignores:

* Python virtual environments
* Node modules
* Build output
* Coverage output
* Generated security reports
* Database backups
* Runtime files
* Terraform generated state/runtime data
* Other temporary files

At the same time, legitimate portfolio configuration files are explicitly allowed.

For example:

```text
github-actions-trust-policy.json
zap-reports/zap.yaml
```

are tracked because they are configuration/source artifacts.

Generated reports such as:

```text
zap-reports/zap-report.html
trivy-backend.json
```

are intentionally excluded.

---

# 51. Git Repository Quality

The project was audited on both EC2 environments.

The audit included:

```bash
git status
git status --short --untracked-files=all
git ls-files
git fetch origin
git diff --stat origin/main..HEAD
git diff --stat HEAD..origin/main
```

The audit confirmed that:

* No unexpected untracked files remained.
* Important project files were tracked.
* Generated files were excluded.
* Security configuration files were present.
* Terraform files were present.
* Local changes were identified before final synchronization.

---

# 52. Repository Structure

The project follows a structure similar to:

```text
ecommerce-devops-platform/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── application/
│   │
│   ├── backend/
│   │   ├── alembic/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── .dockerignore
│   │   ├── .env.example
│   │   ├── alembic.ini
│   │   ├── entrypoint.sh
│   │   ├── requirements.txt
│   │   ├── main.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── database/
│   │   ├── auth/
│   │   └── security/
│   │
│   └── frontend/
│       ├── src/
│       ├── tests/
│       ├── Dockerfile
│       ├── .dockerignore
│       ├── .env.example
│       ├── nginx/
│       ├── package.json
│       └── package-lock.json
│
├── aws/
│   └── ecr/
│       └── lifecycle-policy.json
│
├── docker/
│   ├── docker-compose.yml
│   ├── docker-compose.base.yml
│   ├── docker-compose.prod.yml
│   ├── docker-compose.staging.yml
│   └── docker-compose.ecr.yml
│
├── scripts/
│   ├── deploy.sh
│   ├── deploy-staging.sh
│   └── docker-cleanup.sh
│
├── terraform/
│   └── environments/
│       └── dev/
│           ├── main.tf
│           ├── providers.tf
│           └── .terraform.lock.hcl
│
├── zap-reports/
│   └── zap.yaml
│
├── docs/
│   └── screenshots/
│
├── github-actions-trust-policy.json
├── sonar-project.properties
├── pyproject.toml
├── .gitignore
└── README.md
```

> Generated files, secrets, database backups, virtual environments, dependency directories, and runtime artifacts are intentionally excluded from the repository.

---

# 53. Docker Compose Design

The project uses multiple Compose configurations to separate common configuration from environment-specific behavior.

The general concept is:

```text
Base Configuration
       │
       ├── Development
       ├── Staging
       └── Production
```

This allows environment-specific ports and deployment behavior without duplicating the entire Compose configuration.

---

# 54. Production Docker Stack

The production stack contains:

```text
Frontend
Backend
PostgreSQL
```

with a dedicated Docker network.

The PostgreSQL database uses persistent Docker volume storage.

The application services communicate using Docker networking rather than relying on hardcoded container IP addresses.

---

# 55. PostgreSQL Persistence

PostgreSQL uses persistent storage through a Docker volume.

Conceptually:

```text
PostgreSQL Container
        │
        ▼
Persistent Docker Volume
        │
        ▼
Database Data
```

This means the database container can be recreated without intentionally deleting its persistent database storage.

---

# 56. Real Troubleshooting — PostgreSQL DNS

One of the real deployment problems encountered was:

```text
backend could not resolve postgres
```

The problem was related to Docker networking/service discovery.

The backend expected the PostgreSQL service to be reachable using the hostname:

```text
postgres
```

The PostgreSQL container/network configuration was corrected while preserving the existing database volume.

After recreating the service with the correct network/service identity:

```text
Backend
   │
   ▼
postgres
   │
   ▼
PostgreSQL
```

the backend could resolve the database successfully.

This demonstrated the importance of understanding Docker DNS and service names.

---

# 57. Real Troubleshooting — Terraform IAM

During Terraform/AWS testing, an IAM policy was accidentally replaced with an incomplete policy containing only the required `iam:PassRole` permission.

This caused AWS authorization failures.

The issue was diagnosed by examining the required permissions and restoring the intended policy containing:

```text
EC2 permissions
ECR permissions
IAM PassRole
```

with `iam:PassRole` restricted to the required Terraform role.

The infrastructure was then revalidated successfully.

---

# 58. Real Troubleshooting — GitHub OIDC

The GitHub Actions AWS trust policy initially had an identity/subject matching issue.

The trust policy was corrected so that the GitHub repository identity was properly restricted.

This reinforced the principle that:

> OIDC trust policies should be as specific as practical.

---

# 59. Real Troubleshooting — Frontend Port Mismatch

A frontend container port mismatch was discovered between:

* Docker configuration
* Nginx listening configuration
* Compose port mapping

The configuration was aligned so that the container and host mappings matched the intended architecture.

The final production deployment successfully served the frontend.

---

# 60. Real Troubleshooting — Product Data

The frontend initially contained an empty product entry.

This created an unwanted empty product slot in the application.

The product data was corrected and the application was rebuilt and redeployed.

The final NOVAORA product page was verified visually.

---

# 61. Real Troubleshooting — Staging/Production Compose Interaction

During development, staging Compose configuration affected the production stack because the environments were sharing configuration/network assumptions.

The Compose setup was corrected to separate the relevant deployment behavior and network/project configuration.

This reinforced the importance of environment isolation.

---

# 62. Real Troubleshooting — ZAP Report Permissions

The ZAP report directory became owned by the root user after security scanning.

This prevented the normal EC2 user from working with the generated report.

Ownership was corrected so that the application user could access the required files.

The final generated report remains ignored because it is a generated artifact.

---

# 63. Real Troubleshooting — Rollback Timing

The first rollback validation exposed a startup timing issue.

The container had started, but the frontend application was not immediately ready when the health check executed.

The deployment process was adjusted to allow the service enough startup time before validation.

A controlled second rollback test then succeeded.

This is an important production lesson:

> Container startup and application readiness are different events.

---

# 64. Real Troubleshooting — Nginx Security Headers

An Nginx location-specific header configuration caused security headers to disappear due to header inheritance behavior.

The configuration was simplified/corrected so the required security headers remained available.

This issue was not simply ignored because the website was functioning; it was investigated at the web-server configuration level.

---

# 65. Real Troubleshooting — Browser Storage Security

A SonarQube security finding related to browser storage was investigated.

The implementation was changed so only explicitly allowed order fields were written to local storage.

This reduced the amount of browser-controlled information trusted by the application.

---

# 66. Real Troubleshooting — Disk Space

The limited EC2 environment experienced storage pressure during security scanning.

Instead of blindly removing Docker's internal storage, cache directories were identified and cleaned.

This preserved the Docker environment while recovering disk space.

---

# 67. AWS Cost Optimization

Cost awareness was a major constraint throughout the project.

The project deliberately avoided unnecessary infrastructure.

Cost-conscious decisions included:

* Using EC2 instead of expensive managed compute for the portfolio workload.
* Avoiding NAT Gateway.
* Using a small EC2 environment.
* Using ECR lifecycle policies.
* Cleaning Docker build cache.
* Cleaning unused local images.
* Removing disposable security-scan resources.
* Using short CloudWatch log retention.
* Removing temporary restore databases after testing.
* Avoiding unnecessary AWS services.
* Reviewing resources before final cleanup.

---

# 68. Why NAT Gateway Was Not Used

A NAT Gateway was intentionally avoided.

For a small portfolio project, NAT Gateway cost can be significant relative to the project's requirements.

The design therefore avoids introducing NAT Gateway simply to make the architecture look more complicated.

This is an important DevOps principle:

> Production-style does not mean unnecessarily expensive.

---

# 69. Resource Cleanup

Before AWS account/resource cleanup, the project was designed so that temporary resources could be identified and removed safely.

The cleanup process considers:

* EC2 instances
* ECR repositories/images
* CloudWatch log groups
* CloudWatch monitoring
* IAM roles/policies
* VPC resources
* Security groups
* Subnets
* Internet Gateway
* Terraform-managed resources
* Docker containers/images/cache

The goal is to avoid leaving billable resources running after the portfolio evidence has been captured.

---

# 70. Why Screenshots Matter

Because the AWS environment is temporary, the project includes visual evidence.

The screenshots demonstrate that the implementation actually existed and worked.

The evidence covers:

* GitHub repository
* CI/CD pipeline
* NOVAORA application
* Docker
* ECR
* Terraform
* Health checks
* Rollback
* SonarQube
* Trivy
* OWASP ZAP
* CloudWatch
* PostgreSQL
* ECR lifecycle policies

---

# 71. Project Evidence

The repository includes the following evidence screenshots.

## Repository & CI/CD

![GitHub Repository](docs/screenshots/01-github-repository-overview.png)

![GitHub Actions Pipeline Success](docs/screenshots/02-github-actions-pipeline-success.png)

![Full GitHub Actions Pipeline](docs/screenshots/19-github-actions-full-pipeline-success.png)

---

## NOVAORA Application

![NOVAORA Production Homepage](docs/screenshots/03-novaora-production-homepage.png)

![NOVAORA Products](docs/screenshots/04-novaora-products.png)

![NOVAORA Cart](docs/screenshots/05-novaora-cart.png)

---

## Docker & Amazon ECR

![ECR Repositories](docs/screenshots/03-ecr-repositories.png)

![Docker Production Containers](docs/screenshots/07-docker-production-containers.png)

![ECR Backend Images](docs/screenshots/09-ecr-backend-images.png)

![ECR Frontend Images](docs/screenshots/09-ecr-frontend-images.png)

---

## Infrastructure & Terraform

![Terraform Managed EC2](docs/screenshots/06-terraform-managed-ec2.png)

![Terraform Plan](docs/screenshots/18-terraform-plan-no-changes.png)

---

## Deployment & Health Checks

![Production Health Checks](docs/screenshots/08-production-health-checks.png)

![Automatic Rollback Failure Detection](docs/screenshots/12a-rollback-failure-detected.png)

![Automatic Rollback Success](docs/screenshots/12b-automatic-rollback-success.png)

---

## Security

![SonarQube Quality Gate](docs/screenshots/14-sonarqube-quality-gate-passed.png)

![Trivy Security Scan](docs/screenshots/15-trivy-security-scan.png)

![OWASP ZAP DAST](docs/screenshots/16-owasp-zap-dast-scan.png)

---

## Monitoring & Logging

![CloudWatch EC2 Monitoring](docs/screenshots/10-cloudwatch-ec2-monitoring.png)

![CloudWatch Backend Logs](docs/screenshots/11-cloudwatch-backend-logs.png)

![CloudWatch Frontend Logs](docs/screenshots/11-cloudwatch-frontend-logs.png)

---

## Database & AWS Optimization

![PostgreSQL Backup and Restore](docs/screenshots/13-postgresql-backup-database-verification.png)

![ECR Backend Lifecycle Policy](docs/screenshots/17a-ecr-backend-lifecycle-policy.png)

![ECR Frontend Lifecycle Policy](docs/screenshots/17b-ecr-frontend-lifecycle-policy.png)

---

# 72. Complete Technology Stack

## Application

| Area          | Technology |
| ------------- | ---------- |
| Frontend      | React      |
| Build Tool    | Vite       |
| Backend       | Python     |
| API Framework | FastAPI    |
| Database      | PostgreSQL |
| Web Server    | Nginx      |
| API Server    | Uvicorn    |

## DevOps

| Area                    | Technology     |
| ----------------------- | -------------- |
| Source Control          | Git            |
| Repository              | GitHub         |
| CI/CD                   | GitHub Actions |
| Containers              | Docker         |
| Container Orchestration | Docker Compose |
| Registry                | Amazon ECR     |
| Infrastructure as Code  | Terraform      |
| OS                      | Ubuntu Linux   |

## Security

| Area                 | Technology            |
| -------------------- | --------------------- |
| Code Quality         | SonarQube Cloud       |
| Container Security   | Trivy                 |
| DAST                 | OWASP ZAP             |
| Cloud Authentication | AWS IAM + GitHub OIDC |

## AWS

| Service          | Purpose                        |
| ---------------- | ------------------------------ |
| EC2              | Application compute            |
| ECR              | Container image registry       |
| VPC              | Network isolation              |
| IAM              | Identity and access management |
| CloudWatch       | Metrics and logs               |
| CloudWatch Agent | EC2 resource monitoring        |
| CloudWatch Logs  | Application logging            |

---

# 73. Security Practices Demonstrated

The project demonstrates:

* Non-root application containers
* Restricted security groups
* Backend port isolation
* Database port isolation
* IAM-based AWS access
* GitHub OIDC
* No long-lived AWS access keys in GitHub
* Environment-based configuration
* `.env.example` usage
* Git ignore protection
* SonarQube static analysis
* Trivy image scanning
* OWASP ZAP DAST
* Nginx security headers
* Client-side data allowlisting
* ECR lifecycle management
* Controlled production approval
* Automated rollback

---

# 74. Reliability Practices Demonstrated

The project includes:

* Docker health checks
* Application health checks
* Staging deployment
* Smoke testing
* Production validation
* Previous-image tracking
* Automatic rollback
* PostgreSQL backup
* PostgreSQL restore testing
* Persistent database storage
* CloudWatch monitoring
* Centralized logging
* Docker cleanup

---

# 75. DevOps Practices Demonstrated

The project demonstrates practical knowledge of:

```text
Git
Linux
Docker
Docker Compose
AWS EC2
AWS VPC
AWS IAM
Amazon ECR
Terraform
GitHub Actions
CI/CD
Infrastructure as Code
Container Security
Static Analysis
DAST
CloudWatch
Application Logging
Database Backup
Database Restore
Health Checks
Smoke Testing
Rollback
Cost Optimization
Troubleshooting
```

---

# 76. What Happens After a Developer Pushes Code?

A typical deployment works like this:

### Step 1 — Developer Pushes Code

```bash
git push
```

GitHub receives the new commit.

### Step 2 — Backend CI

The backend is tested.

### Step 3 — Frontend CI

The frontend:

* Installs dependencies
* Runs tests
* Generates coverage
* Builds successfully

### Step 4 — SonarQube

The code is analyzed for:

* Bugs
* Vulnerabilities
* Code smells
* Security hotspots
* Quality issues

### Step 5 — Docker Build

Backend and frontend production images are built.

### Step 6 — Trivy

Container images are scanned.

### Step 7 — ECR

Validated images are pushed to Amazon ECR.

### Step 8 — Staging

The new images are deployed to staging.

### Step 9 — Smoke Tests

The staging application is validated.

### Step 10 — OWASP ZAP

The running staging application is tested dynamically.

### Step 11 — Production Approval

A human approves the production deployment.

### Step 12 — Production

The approved image is deployed.

### Step 13 — Health Checks

Production endpoints are tested.

### Step 14 — Rollback if Necessary

If health checks fail:

```text
New Image
   ↓
Failure
   ↓
Previous Image
   ↓
Restore
   ↓
Health Check
```

### Step 15 — Cleanup

Disposable Docker resources are removed.

---

# 77. Deployment Safety Model

The deployment process follows the principle:

```text
Fail Before Production
```

rather than:

```text
Deploy First
Fix Later
```

Validation happens progressively:

```text
Source
  ↓
Tests
  ↓
Code Quality
  ↓
Security
  ↓
Container
  ↓
Staging
  ↓
DAST
  ↓
Human Approval
  ↓
Production
  ↓
Health Validation
```

---

# 78. What Makes This Project Production-Oriented?

This project is not claiming to be a complete hyperscale production platform.

Instead, it demonstrates production-oriented engineering practices at a portfolio-project scale.

Important characteristics include:

* Automated deployments
* Infrastructure as Code
* Security scanning
* Staging validation
* Manual production approval
* Health checks
* Automatic rollback
* Monitoring
* Centralized logging
* Database recovery testing
* Image lifecycle management
* Cost controls
* Troubleshooting
* Environment separation

---

# 79. What Was Intentionally Not Used

The project intentionally does not depend on every DevOps technology available.

The following were not required for this implementation:

```text
Jenkins
Ansible
Kubernetes
Amazon EKS
GitLab CI/CD
Argo CD
Helm
Prometheus/Grafana
```

The reason is not lack of awareness.

The project focuses on completing a coherent end-to-end AWS CI/CD implementation rather than adding technologies only for the sake of increasing the tool list.

Future versions can introduce these technologies where they provide actual architectural value.

---

# 80. Limitations

The current implementation is intentionally designed for a portfolio-scale environment.

Some production-scale capabilities that could be added later include:

* Multi-AZ application servers
* Application Load Balancer
* Auto Scaling
* Managed PostgreSQL using Amazon RDS
* ElastiCache
* S3-based backup storage
* Kubernetes
* EKS
* Blue/Green deployments
* Canary deployments
* Prometheus/Grafana
* Distributed tracing
* WAF
* CloudFront
* Secrets Manager
* Parameter Store
* Automated disaster recovery
* Multi-region deployment

These are considered future improvements rather than claiming they are already implemented.

---

# 81. Future Improvements

Potential next steps include:

### Infrastructure

* Add Application Load Balancer.
* Introduce Auto Scaling.
* Move PostgreSQL to Amazon RDS.
* Introduce private application/database tiers.
* Add stronger network segmentation.

### Security

* AWS Secrets Manager.
* AWS WAF.
* CloudTrail-based security monitoring.
* Container signing.
* Image provenance/attestation.
* Dependency update automation.

### CI/CD

* Blue/Green deployment.
* Canary deployment.
* Automated release versioning.
* Deployment notifications.
* More extensive integration testing.

### Observability

* Prometheus.
* Grafana.
* Loki.
* Distributed tracing.
* Application performance monitoring.

### Platform Engineering

* Kubernetes.
* Amazon EKS.
* Helm.
* Argo CD.
* GitOps.

---

# 82. Key Lessons Learned

This project provided practical experience with several important DevOps lessons.

## Lesson 1 — A running container is not necessarily a healthy application

Docker may say:

```text
container started
```

while the application is still initializing.

Health checks must validate the actual application.

---

## Lesson 2 — Rollback must be tested

A rollback script that has never been tested is only an assumption.

The project intentionally performed controlled rollback testing.

---

## Lesson 3 — Security must be part of CI/CD

Security is not only a final manual check.

This project integrates:

```text
SonarQube
Trivy
OWASP ZAP
```

into the delivery process.

---

## Lesson 4 — Backups are not enough

A backup is useful only if it can be restored.

The PostgreSQL restore process was actually tested.

---

## Lesson 5 — Logs should be centralized

Having to SSH into a server every time an application issue occurs is inefficient.

CloudWatch centralizes the application logs.

---

## Lesson 6 — Infrastructure should be reproducible

Terraform provides a repeatable description of the AWS infrastructure.

---

## Lesson 7 — Cost is part of architecture

Adding more AWS services does not automatically make an architecture better.

For a portfolio environment, unnecessary services can create unnecessary cost.

---

## Lesson 8 — Troubleshooting is a DevOps skill

Real DevOps work includes:

* Reading logs
* Understanding DNS
* Checking ports
* Checking Docker networking
* Investigating IAM
* Checking disk usage
* Validating health endpoints
* Understanding Nginx behavior
* Inspecting Git state

This project intentionally documents those troubleshooting experiences.

---

# 83. Interview Explanation — Short Version

A concise interview explanation of the project:

> “I built a production-style e-commerce DevOps platform using React, FastAPI and PostgreSQL and deployed it on AWS EC2 using Docker and Amazon ECR. I implemented a GitHub Actions CI/CD pipeline covering backend and frontend testing, SonarQube code-quality analysis, Trivy container scanning, Docker image builds, ECR push, staging deployment, smoke testing and OWASP ZAP DAST. Production deployment requires manual approval and includes health checks with automatic rollback to the previous ECR image if the new deployment fails. I also implemented CloudWatch monitoring and centralized container logs, PostgreSQL backup and restore testing, ECR lifecycle policies and Docker cleanup. Terraform is used for infrastructure configuration, and I focused heavily on security, reliability and AWS cost optimization.”

---

# 84. Interview Explanation — CI/CD

If asked:

**“Explain your CI/CD pipeline.”**

Answer:

> “The pipeline starts when code is pushed to GitHub. Backend and frontend CI run first. The frontend also generates coverage, which is passed to the SonarQube job as an artifact so the tests don't need to run twice. After code-quality validation, Docker images are built and scanned using Trivy. The validated images are pushed to Amazon ECR. The same images are deployed to staging, where smoke tests and OWASP ZAP DAST are performed. Production is protected by a manual approval gate. After approval, the production deployment pulls the ECR image and performs application health checks. If the deployment fails, the deployment script automatically restores the previous working image.”

---

# 85. Interview Explanation — Rollback

If asked:

**“How did you implement rollback?”**

Answer:

> “I implemented automatic rollback inside the production deployment script. Before replacing the production image, the script identifies the currently running image. After deployment, it waits for the application to initialize and performs health checks. If the new version fails, the script pulls the previous working ECR image, restores the containers and performs the health checks again. It then reports that the rollback was successful while still returning a failure status to GitHub Actions so the failed deployment is visible.”

---

# 86. Interview Explanation — Security

If asked:

**“How did you implement security?”**

Answer:

> “I implemented security at multiple stages. SonarQube is used for source-code analysis, Trivy scans Docker images for vulnerabilities, and OWASP ZAP performs DAST against the running staging application. AWS IAM and GitHub OIDC are used instead of storing long-lived AWS credentials in GitHub. Security groups restrict backend and database access by tier. The containers run as non-root where applicable, and Nginx provides security headers. I also fixed a SonarQube finding related to trusting browser storage by allowlisting the data stored by the application.”

---

# 87. Interview Explanation — Monitoring

If asked:

**“How did you implement monitoring and logging?”**

Answer:

> “I installed the CloudWatch Agent on the EC2 instance to collect memory and swap metrics. Docker containers use the AWS logs driver and send frontend and backend logs to separate CloudWatch log groups. The log groups use seven-day retention to keep the portfolio environment cost-conscious.”

---

# 88. Interview Explanation — Database Recovery

If asked:

**“How did you test database backup and restore?”**

Answer:

> “I created PostgreSQL backups in dump and SQL formats and restored one backup into a temporary database rather than touching production. I verified the restored schema and product records, confirmed that six tables and three product records were restored, and then removed the temporary database. This allowed me to validate the recovery process without risking the production database.”

---

# 89. Interview Explanation — Terraform

If asked:

**“Why did you use Terraform?”**

Answer:

> “I used Terraform to define the AWS infrastructure as code. It allows the infrastructure to be reviewed and reproduced instead of depending entirely on manually created AWS resources. I validated the final configuration using terraform plan, which confirmed that there were no pending infrastructure changes.”

---

# 90. Interview Explanation — Cost Optimization

If asked:

**“How did you control AWS cost?”**

Answer:

> “I avoided unnecessary managed services and specifically avoided NAT Gateway because it wasn't justified for this portfolio environment. I also configured ECR lifecycle policies to retain only the required images, used seven-day CloudWatch log retention, cleaned Docker build cache and unused images, removed temporary restore databases after testing, and planned the final AWS cleanup after capturing project evidence.”

---

# 91. Interview Explanation — Troubleshooting

If asked:

**“What problems did you face?”**

A strong answer is:

> “I faced several real deployment issues. The backend initially couldn't resolve the PostgreSQL Docker service, so I investigated Docker networking and service discovery. I also encountered an IAM permission problem during Terraform testing after a policy was accidentally replaced, and I restored the required permissions. During ZAP testing the EC2 instance experienced disk pressure, so I investigated cache usage and cleaned unnecessary caches. I also fixed an Nginx security-header inheritance issue, a frontend port mismatch, a product-data issue, a ZAP report ownership issue and a rollback startup timing problem. These issues helped me understand that DevOps is not only about writing pipelines but also about troubleshooting the infrastructure and application underneath them.”

---

# 92. GitHub Actions Workflow

The primary workflow is:

```text
.github/workflows/ci.yml
```

The workflow contains the major CI/CD jobs required for the project.

Important environment configuration includes:

```text
AWS Region
AWS Account/Role Configuration
EC2 Deployment Target
Backend ECR Repository
Frontend ECR Repository
```

Secrets such as SonarQube authentication are provided through GitHub Secrets.

---

# 93. SonarQube Configuration

The repository contains:

```text
sonar-project.properties
```

The configuration defines:

* Organization
* Project key
* Source directories
* Exclusions
* Frontend LCOV coverage

This allows SonarQube analysis to be consistently executed by CI.

---

# 94. Security Configuration Artifacts

The repository includes legitimate security configuration such as:

```text
github-actions-trust-policy.json
zap-reports/zap.yaml
```

These files are source/configuration artifacts and therefore belong in Git.

Generated scan reports are excluded from version control.

---

# 95. Evidence Count

The project currently contains **26 implementation screenshots** covering:

```text
Repository
CI/CD
NOVAORA Application
Docker
ECR
Terraform
Health Checks
Rollback
PostgreSQL
SonarQube
Trivy
OWASP ZAP
CloudWatch
ECR Lifecycle
```

The screenshots are stored under:

```text
docs/screenshots/
```

---

# 96. Final CI/CD Result

The completed pipeline demonstrates successful execution of:

```text
Backend CI                         ✓
Frontend CI                        ✓
Frontend Tests                     ✓
Frontend Coverage                  ✓
Frontend Build                     ✓
SonarQube                          ✓
Docker Build                       ✓
Trivy Backend Scan                 ✓
Trivy Frontend Scan                ✓
ECR Push                           ✓
Staging Deployment                 ✓
Staging Smoke Testing              ✓
OWASP ZAP DAST                     ✓
Production Approval                ✓
Production Deployment              ✓
Production Health Checks           ✓
Automatic Rollback                 ✓
Docker Cleanup                     ✓
CloudWatch Monitoring              ✓
CloudWatch Logging                 ✓
PostgreSQL Backup                  ✓
PostgreSQL Restore Verification    ✓
ECR Lifecycle Policy               ✓
Terraform Validation               ✓
```

---

# 97. Final Architecture Summary

The final solution combines:

```text
                 SOURCE CONTROL
                      │
                      ▼
                   GitHub
                      │
                      ▼
              GitHub Actions
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
    Backend        Frontend       SonarQube
       │              │              │
       └──────────────┼──────────────┘
                      ▼
                 Docker Build
                      │
                      ▼
                  Trivy Scan
                      │
                      ▼
                     ECR
                      │
                      ▼
                  Staging
                      │
                      ▼
                 Smoke Tests
                      │
                      ▼
                  OWASP ZAP
                      │
                      ▼
              Manual Approval
                      │
                      ▼
                 Production
                      │
             ┌────────┴────────┐
             ▼                 ▼
        Health Checks       CloudWatch
             │                 │
        ┌────┴────┐            ├── Metrics
        │         │            └── Logs
      PASS      FAIL
        │         │
        ▼         ▼
     Success   Rollback
                  │
                  ▼
           Previous ECR Image
```

---

# 98. DevOps Concepts Demonstrated

This project demonstrates practical understanding of:

### Linux

* SSH
* File permissions
* Users/groups
* Processes
* Services
* Networking
* Disk troubleshooting
* Package management
* Shell scripting
* Pipes
* Logs

### Git

* Repository management
* Branches
* Commits
* Push/pull
* Fetch
* `.gitignore`
* Rollback
* Working-tree auditing

### Docker

* Dockerfiles
* Multi-stage builds
* Containers
* Images
* Volumes
* Networks
* Health checks
* Compose
* Image cleanup
* Container logs

### AWS

* EC2
* VPC
* Subnets
* Internet Gateway
* Security Groups
* IAM
* ECR
* CloudWatch
* CloudWatch Logs
* IAM OIDC

### Terraform

* Infrastructure as Code
* Providers
* Resources
* Variables/configuration
* State awareness
* `terraform plan`
* Infrastructure validation

### CI/CD

* GitHub Actions
* Job dependencies
* Artifacts
* Automated tests
* Build automation
* Deployment automation
* Manual approval
* Rollback

### DevSecOps

* SonarQube
* Trivy
* OWASP ZAP
* Security headers
* IAM
* OIDC
* Secrets separation
* Container security

### Reliability

* Health checks
* Smoke testing
* Rollback
* Backup
* Restore
* Monitoring
* Centralized logging

### Operations

* Troubleshooting
* Disk management
* Docker cleanup
* Log investigation
* DNS troubleshooting
* IAM troubleshooting
* Nginx troubleshooting
* Deployment troubleshooting
* Cost optimization

---

# 99. Project Outcome

The final result is a working full-stack e-commerce application backed by a DevOps delivery platform.

The project demonstrates that application delivery does not stop at:

```text
docker build
```

Instead, the complete lifecycle includes:

```text
Build
→ Test
→ Analyze
→ Scan
→ Package
→ Store
→ Deploy
→ Validate
→ Secure
→ Approve
→ Release
→ Monitor
→ Recover
→ Clean Up
```

This is the core DevOps mindset demonstrated by the project.

---

# 100. Final Portfolio Statement

NOVAORA was built as a practical demonstration of how a DevOps engineer can design, automate, secure, deploy, monitor and recover a modern full-stack application on AWS.

The strongest part of the project is not any single technology.

It is the complete workflow:

```text
Developer
   ↓
GitHub
   ↓
Automated CI/CD
   ↓
Testing
   ↓
Code Quality
   ↓
Security
   ↓
Docker
   ↓
Amazon ECR
   ↓
Staging
   ↓
DAST
   ↓
Production Approval
   ↓
Production
   ↓
Health Checks
   ↓
Automatic Rollback
   ↓
Monitoring
   ↓
Logging
   ↓
Database Recovery
   ↓
Cost Optimization
```

The project was also intentionally documented with visual evidence so that the implementation can be reviewed even after the temporary AWS environment is removed.

---

# 101. Key Takeaway

> **NOVAORA demonstrates an end-to-end DevOps workflow for a containerized e-commerce application, combining AWS infrastructure, Terraform, GitHub Actions CI/CD, Docker, Amazon ECR, automated testing, SonarQube, Trivy, OWASP ZAP, production approval, health checks, automatic rollback, CloudWatch monitoring, centralized logging, PostgreSQL recovery testing and cost-conscious cloud operations.**

---

## 102. Project Status

**Status: Completed Portfolio Implementation**

Core implementation completed:

* Application ✓
* Dockerization ✓
* PostgreSQL ✓
* AWS EC2 ✓
* Amazon ECR ✓
* GitHub Actions ✓
* SonarQube ✓
* Trivy ✓
* OWASP ZAP ✓
* Staging ✓
* Production ✓
* Manual Approval ✓
* Health Checks ✓
* Automatic Rollback ✓
* CloudWatch Monitoring ✓
* CloudWatch Logging ✓
* PostgreSQL Backup ✓
* PostgreSQL Restore Test ✓
* ECR Lifecycle ✓
* Docker Cleanup ✓
* Terraform ✓
* Security Configuration ✓
* Troubleshooting ✓
* Cost Optimization ✓
* Evidence Screenshots ✓
* Documentation ✓

---

# 103. Final Note

This repository is intended to demonstrate practical DevOps engineering rather than simply list DevOps tools.

Every major technology included in the project has a purpose:

```text
GitHub
    → Source Control

GitHub Actions
    → CI/CD Automation

Docker
    → Application Packaging

Docker Compose
    → Multi-container Application Management

Amazon ECR
    → Container Registry

Amazon EC2
    → Application Compute

Terraform
    → Infrastructure as Code

SonarQube
    → Code Quality

Trivy
    → Container Security

OWASP ZAP
    → Dynamic Application Security Testing

Nginx
    → Web Server / Reverse Proxy

PostgreSQL
    → Application Database

CloudWatch
    → Monitoring and Logging

IAM + OIDC
    → Secure AWS Authentication

ECR Lifecycle
    → Image Retention / Cost Control

Automatic Rollback
    → Deployment Reliability

Backup / Restore
    → Database Recovery

## 🎯 Why This Project?

This project was chosen to demonstrate how DevOps practices can be applied to a realistic, continuously changing web application rather than to an isolated demo service.

An e-commerce application is a useful DevOps use case because it represents a system where developers may frequently release new features, fix bugs, update products, improve the user experience, and apply security updates. These changes need to be delivered quickly without sacrificing application quality, security, or availability.

Instead of focusing only on building the e-commerce application, this project focuses on the **complete software delivery lifecycle** around the application.

The goal was to answer a real-world question:

> **How can a development team safely move application changes from Git commit to production with minimum manual work, built-in security checks, monitoring, and the ability to recover automatically when a deployment fails?**

This project demonstrates that workflow using GitHub Actions, Docker, Amazon ECR, AWS EC2, Terraform, SonarQube, Trivy, OWASP ZAP, CloudWatch, PostgreSQL, and automated deployment/rollback scripts.

---

## 🌍 Real-World Use

The platform represents a simplified production-oriented environment that could be used as a foundation for an e-commerce company or another web-based business application.

In a real organization, developers continuously push changes to the application. Every change needs to be validated before it reaches customers.

This project automates that process:

```text
Developer
    ↓
Git Push
    ↓
Automated Tests
    ↓
Code Quality Analysis
    ↓
Security Scanning
    ↓
Docker Image Build
    ↓
Amazon ECR
    ↓
Staging Deployment
    ↓
Smoke Tests + OWASP ZAP
    ↓
Production Approval
    ↓
Production Deployment
    ↓
Health Checks
    ↓
CloudWatch Monitoring & Logs
    ↓
Automatic Rollback if Deployment Fails

### Problems This Project Solves

#### 1. Manual deployment

Without CI/CD, an engineer may need to manually build the application, connect to a server, copy files, restart services, and verify the deployment.

**Solution:** GitHub Actions automates the software delivery process.

#### 2. Deploying broken code

A deployment can fail because of application errors, failed tests, incorrect configuration, or an unhealthy container.

**Solution:** Unit tests, health checks, smoke tests, and deployment validation are performed before considering the release successful.

#### 3. Security issues reaching production

Container images and web applications can contain known vulnerabilities.

**Solution:** Trivy scans container images and OWASP ZAP performs dynamic security testing before production deployment.

#### 4. Low-quality code

Code can technically work while still containing maintainability or quality problems.

**Solution:** SonarQube is integrated into the CI/CD pipeline to provide code-quality analysis.

#### 5. Failed production deployments

A new release can start successfully but later fail health checks.

**Solution:** The deployment script detects the failure and automatically restores the previous known-working version.

#### 6. Lack of visibility after deployment

Knowing that a deployment completed is not enough. Engineers need to understand what is happening on the server and inside the application.

**Solution:** CloudWatch is used for EC2 monitoring and centralized application/container logs.

#### 7. Data recovery

Application failures, operational mistakes, or database problems can result in data loss.

**Solution:** PostgreSQL backup and restore procedures were implemented and tested using a temporary restore database without modifying the production database.

#### 8. Infrastructure inconsistency

Manually creating cloud infrastructure makes environments harder to reproduce and maintain.

**Solution:** AWS networking and EC2 infrastructure are defined using Terraform Infrastructure as Code.

---

## 💼 How This Would Help a Real DevOps Team

A similar approach can help a real team achieve:

* **Faster releases** — developers do not need to manually perform every deployment step.
* **Repeatable deployments** — the same pipeline performs the same validation and deployment process every time.
* **Improved release confidence** — tests and quality/security checks happen before production.
* **Reduced deployment risk** — failed releases can automatically roll back.
* **Better security** — vulnerabilities are checked during the delivery process rather than only after deployment.
* **Better troubleshooting** — logs and monitoring provide operational visibility.
* **Infrastructure consistency** — Terraform provides a repeatable infrastructure definition.
* **Operational recovery** — backups and rollback procedures provide recovery options.

The project therefore demonstrates not just knowledge of individual DevOps tools, but how those tools work together to support a **reliable software delivery process**.

---

## 🧠 Important Project Questions This Implementation Can Answer

### Why did you choose an e-commerce application?

E-commerce provides a realistic web application scenario where frequent deployments, security, availability, database reliability, monitoring, and rollback are important. It gives the DevOps implementation a practical business context instead of demonstrating tools in isolation.

### What was your main DevOps objective?

The main objective was to automate and secure the path from a developer's Git push to a validated production deployment while providing monitoring, health checks, and automatic recovery when a deployment fails.

### Why did you use GitHub Actions?

GitHub Actions was used to automate the CI/CD workflow directly from the GitHub repository and connect code changes with testing, scanning, image building, deployment, and cleanup.

### Why Docker?

Docker packages the application and its dependencies into consistent containers, reducing differences between environments and making deployment more repeatable.

### Why Amazon ECR?

ECR provides a private AWS container registry where the backend and frontend Docker images can be stored and retrieved during deployment.

### Why Terraform?

Terraform allows the AWS infrastructure to be defined as code, making the infrastructure reproducible and reducing manual configuration.

### Why staging before production?

Staging provides an environment where the newly built application can be deployed and tested before it is allowed to reach production.

### Why manual approval?

Production deployment is a higher-risk operation. Manual approval creates a deliberate release-control point after automated tests and security checks have passed.

### What happens if production deployment fails?

The deployment script detects failed health checks, identifies the previous production image, restores it, starts the previous version, verifies its health, and reports that automatic rollback was successful.

### Why are health checks important?

A container being "running" does not necessarily mean the application is working correctly. Health checks verify that the actual application endpoints respond successfully.

### Why use both Trivy and OWASP ZAP?

They address different security layers.

* **Trivy** → scans container images for known vulnerabilities.
* **OWASP ZAP** → tests the running web application for common web security issues.

### Why SonarQube?

SonarQube provides automated code-quality analysis and helps identify issues before code progresses through the delivery pipeline.

### Why CloudWatch?

CloudWatch provides operational visibility into the EC2 environment and application logs, making it easier to monitor the system and troubleshoot problems.

### Why PostgreSQL backup and restore testing?

A backup is only useful if it can actually be restored. The project therefore tested restoration into a temporary database and verified the restored schema and data.

### Is this actually production?

This is a **production-oriented portfolio implementation**, not a claim that it is serving real customers at enterprise scale.

The architecture demonstrates real DevOps practices while intentionally using a smaller AWS/EC2-based design suitable for learning and Free Tier constraints.

### What would you improve for a larger production environment?

Possible future improvements include:

* Kubernetes/EKS for container orchestration
* Auto Scaling for variable traffic
* Application Load Balancer
* Multi-AZ architecture
* Managed database such as Amazon RDS
* Centralized secrets management
* More advanced observability and alerting
* Blue/green or canary deployment strategies
* Disaster recovery across multiple Availability Zones/regions

These were intentionally outside the scope of the current Free Tier-focused implementation.

---

## ✅ What This Project Demonstrates

The project demonstrates the ability to think beyond individual tools and design a complete DevOps workflow covering:

**Development → Testing → Quality → Security → Containerization → Registry → Infrastructure → Staging → Approval → Production → Health Checks → Monitoring → Logging → Rollback → Backup & Recovery**

This makes the project useful as a practical demonstration of **Cloud, DevOps, DevSecOps, Infrastructure as Code, CI/CD, release management, monitoring, troubleshooting, and operational recovery skills.**


The project therefore represents a complete DevOps lifecycle rather than an isolated collection of tools.

