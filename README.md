# NOVAORA — High-Traffic E-Commerce Platform

A production-style e-commerce platform built to demonstrate modern **DevOps, AWS, CI/CD, Docker, DevSecOps, Infrastructure as Code, monitoring, logging, backup/restore, and automated rollback** practices.

---

## 1. Project Overview

**NOVAORA** is a full-stack e-commerce application consisting of:

* React frontend
* Python FastAPI backend
* PostgreSQL database
* Docker containers
* AWS EC2 deployment
* Amazon ECR container registry
* Terraform-managed AWS infrastructure
* GitHub Actions CI/CD
* SonarQube Cloud code-quality analysis
* Trivy container security scanning
* OWASP ZAP DAST scanning
* CloudWatch monitoring and logging
* PostgreSQL backup and restore
* Automatic production rollback

The project was designed to simulate a real-world DevOps deployment workflow rather than only running an application locally.

---

## 2. Architecture

```text
Developer
   |
   | git push
   v
GitHub Repository
   |
   v
GitHub Actions
   |
   +------------------+
   |                  |
   v                  v
Backend CI        Frontend CI
   |                  |
   |                  +--> Tests
   |                  +--> Coverage
   |                  +--> Build
   |                  +--> Coverage Artifact
   |                           |
   +-------------+-------------+
                 |
                 v
           SonarQube Cloud
                 |
                 v
        Docker Build + Trivy
                 |
                 v
          Amazon ECR
                 |
                 v
         Staging Deployment
                 |
                 v
          OWASP ZAP DAST
                 |
                 v
         Manual Approval
                 |
                 v
        Production Deploy
                 |
                 v
       Health Checks
                 |
          +------+------+
          |             |
        Success       Failure
          |             |
          v             v
       Running      Automatic
      Production     Rollback
                        |
                        v
                 Previous ECR Image
```

---

## 3. Technology Stack

### Application

* React 19
* Vite
* Python 3.14
* FastAPI
* PostgreSQL

### DevOps

* Git
* GitHub
* GitHub Actions
* Docker
* Docker Compose
* Amazon ECR
* Amazon EC2
* Terraform

### Security

* SonarQube Cloud
* Trivy
* OWASP ZAP
* Security Groups
* IAM
* Security headers

### Monitoring

* Amazon CloudWatch
* CloudWatch Agent
* Docker awslogs driver

---

## 4. Repository Structure

```text
ecommerce-devops-platform/
│
├── application/
│   ├── backend/
│   │   ├── app/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   ├── requirements.txt
│   │   └── ...
│   │
│   └── frontend/
│       ├── src/
│       ├── public/
│       ├── Dockerfile
│       ├── package.json
│       └── ...
│
├── docker/
│   ├── docker-compose.yml
│   └── docker-compose.staging.yml
│
├── scripts/
│   ├── deploy.sh
│   └── docker-cleanup.sh
│
├── terraform/
│   ├── environments/
│   │   └── dev/
│   │       ├── main.tf
│   │       └── providers.tf
│   │
│   └── modules/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── sonar-project.properties
├── README.md
└── .gitignore
```

---

## 5. CI/CD Pipeline

The GitHub Actions pipeline follows this flow:

```text
Git Push
   |
   +--> Backend CI
   |
   +--> Frontend CI
            |
            +--> Tests
            +--> Coverage
            +--> Build
            +--> Upload Coverage Artifact
   |
   v
SonarQube
   |
   v
Docker Build
   |
   +--> Trivy Backend Scan
   +--> Trivy Frontend Scan
   |
   v
Push Images to ECR
   |
   v
Deploy Staging
   |
   v
OWASP ZAP DAST
   |
   v
Manual Approval
   |
   v
Production Deployment
   |
   v
Health Checks
   |
   v
Docker Cleanup
```

### Pipeline Jobs

1. Backend CI
2. Frontend CI
3. SonarQube Code Quality
4. Docker Build, Scan and Push
5. Staging Deployment
6. OWASP ZAP DAST
7. Production Approval
8. Production Deployment
9. Docker Cleanup

Backend and Frontend CI run in parallel because they are independent.

---

## 6. Frontend CI Optimization

Frontend dependencies and tests are not repeated in the SonarQube job.

The Frontend CI job performs:

```text
npm ci
   |
   v
npm run test:coverage
   |
   v
npm run build
   |
   v
Upload frontend-coverage artifact
```

SonarQube then downloads the coverage artifact instead of installing dependencies and running coverage again.

This reduces duplicated work and makes the pipeline more efficient.

---

## 7. Docker

The application is containerized using Docker.

### Containers

* Frontend
* Backend
* PostgreSQL

Docker Compose is used for multi-container application management.

Example:

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

Check application logs:

```bash
docker compose logs
```

---

## 8. Amazon ECR

Docker images are stored in Amazon Elastic Container Registry.

Repositories:

```text
ecommerce-backend
ecommerce-frontend
```

Images are tagged using Git commit SHA values so that specific application versions can be identified and rolled back.

Example:

```text
ecommerce-backend:<commit-sha>
ecommerce-frontend:<commit-sha>
```

---

## 9. ECR Lifecycle Policy

ECR lifecycle policies are configured to:

* Protect the `latest` image
* Keep the 5 most recent tagged images
* Automatically expire older tagged images

This reduces unnecessary storage usage while retaining recent versions for rollback.

---

## 10. Terraform Infrastructure

Terraform is used as Infrastructure as Code.

The infrastructure includes:

* VPC
* Public subnet
* Private subnet
* Internet Gateway
* Route table
* Security Groups
* EC2
* IAM configuration

Terraform allows the infrastructure to be recreated consistently instead of being configured manually.

Validate the configuration:

```bash
terraform validate
```

Create a plan:

```bash
terraform plan
```

Example expected result:

```text
No changes. Your infrastructure matches the configuration.
```

---

## 11. AWS Network Design

The project uses a VPC with:

```text
VPC
10.0.0.0/16
   |
   +-- Public Subnet
   |     10.0.1.0/24
   |
   +-- Private Subnet
         10.0.2.0/24
```

The design separates publicly accessible resources from private application/database resources.

---

## 12. Security Groups

Security is implemented using restricted security-group rules.

### Web Security Group

Allows:

```text
HTTP   80
HTTPS  443
SSH    22
```

### Backend Security Group

Allows:

```text
8000
```

only from the web security group.

### Database Security Group

Allows:

```text
5432
```

only from the backend security group.

This prevents the PostgreSQL database from being directly exposed to the internet.

---

## 13. SonarQube Cloud

SonarQube Cloud is used for static code analysis and code quality.

The pipeline:

1. Runs backend/frontend CI
2. Generates frontend coverage
3. Uploads the coverage artifact
4. Downloads coverage in SonarQube job
5. Runs SonarQube analysis
6. Verifies the Quality Gate

The final Quality Gate passed successfully.

---

## 14. Trivy Security Scan

Trivy is used to scan Docker images for vulnerabilities.

The pipeline scans:

```text
Backend Docker image
Frontend Docker image
```

The configuration checks for:

* HIGH vulnerabilities
* CRITICAL vulnerabilities

Unfixed vulnerabilities are ignored using:

```text
ignore-unfixed: true
```

The final Trivy scans passed successfully.

---

## 15. OWASP ZAP DAST

OWASP ZAP is used for Dynamic Application Security Testing.

Unlike static analysis, ZAP tests the running application.

Pipeline flow:

```text
Build
  |
  v
Staging Deployment
  |
  v
Running Application
  |
  v
OWASP ZAP
```

ZAP can identify issues such as:

* Cross-site scripting
* Security header problems
* Exposed endpoints
* Other web application security weaknesses

The final ZAP scan passed successfully.

---

## 16. Production Deployment

Production deployment is automated using the deployment script:

```text
scripts/deploy.sh
```

The script:

1. Detects the current production image
2. Pulls the new ECR image
3. Starts the new version
4. Performs health checks
5. Verifies the application
6. Keeps the new version if checks pass
7. Automatically restores the previous version if checks fail

---

## 17. Automatic Rollback

Rollback is implemented inside the production deployment script.

The deployment does not simply start a new container and assume success.

It verifies the deployed application.

If the health checks fail:

```text
New Version
    |
    v
Health Check
    |
    X
Failure
    |
    v
Previous ECR Image
    |
    v
Production Restored
```

This provides automatic recovery from failed deployments.

The rollback mechanism was also tested using a controlled failure scenario.

---

## 18. Health Checks

The deployment verifies the application after deployment.

The checks include:

* Backend health
* Frontend availability
* Product API availability

A deployment is considered successful only after these checks pass.

---

## 19. Monitoring

Amazon CloudWatch is used to monitor the EC2 instance.

Metrics include:

* Available memory
* Used memory
* Memory utilization percentage
* Swap usage
* Swap utilization

CloudWatch Agent is configured on the EC2 instance.

---

## 20. Centralized Logging

Docker containers use the CloudWatch logs driver.

Log groups:

```text
/ecommerce/backend
/ecommerce/frontend
```

Logs are retained for 7 days.

This allows application logs to be viewed centrally through CloudWatch instead of only through the EC2 server.

---

## 21. PostgreSQL Backup

PostgreSQL backups are created using database dump files.

Example:

```text
backups/
├── ecommerce-YYYYMMDD-HHMMSS.dump
└── ecommerce_YYYYMMDD_HHMMSS.sql
```

Backups are intentionally not committed to Git because database dumps may contain sensitive application data.

---

## 22. PostgreSQL Restore Verification

A restore test was performed using a temporary database.

The restored database was verified by checking:

* Database tables
* Product records
* Application data

After verification, the temporary restore database was removed.

The production database remained unchanged.

---

## 23. Security Practices

The project implements several security practices:

* IAM roles instead of unnecessary long-lived credentials
* Restricted Security Groups
* Database not publicly exposed
* Non-root Docker containers
* SonarQube code analysis
* Trivy image scanning
* OWASP ZAP DAST
* Security headers
* ECR image scanning
* ECR lifecycle policies
* Minimal data stored in browser localStorage
* Environment variables for sensitive configuration

Secrets and environment files are excluded from version control.

---

## 24. Troubleshooting and Issues Faced

During development, several real deployment issues were encountered and resolved.

### PostgreSQL DNS Issue

The backend could not resolve the PostgreSQL container.

The PostgreSQL container was recreated while preserving the existing volume and correct Docker network configuration.

---

### Terraform IAM Permission Issue

A Terraform EC2 IAM policy was accidentally replaced with a policy containing only:

```text
iam:PassRole
```

Terraform then returned an AccessDenied error.

The policy was restored with the required EC2, ECR and PassRole permissions.

---

### Docker Disk Space Issue

Docker/ZAP processing consumed significant disk space.

Temporary caches such as:

```text
/home/ubuntu/.cache/trivy
/home/ubuntu/.cache/pip-tools
```

were cleaned.

---

### ZAP Report Permission Issue

ZAP generated root-owned report files.

File ownership was corrected so the normal application user could access the reports.

---

### Nginx Security Header Issue

A cache-control configuration caused security headers to disappear due to Nginx header inheritance behavior.

The problematic configuration was removed.

---

### Frontend Port Mismatch

The frontend container port and production mapping were initially inconsistent.

The configuration was corrected to use:

```text
Container: 8080
Production host: 80
```

---

### Frontend Product Data Issue

An empty product entry was accidentally introduced into the product data.

The invalid entry was removed and the frontend build was verified again.

---

### Rollback Startup Race

During an initial rollback test, the application required additional startup time.

The controlled rollback test was repeated with an appropriate wait period and successfully restored the previous version.

---

### Browser Storage Security Issue

SonarQube identified a browser-storage security issue.

The stored order data was changed to an allow-listed structure containing only required fields instead of storing raw cart/customer data.

The issue was resolved and the Quality Gate passed.

---

## 25. Cost Optimization

The project was designed with AWS cost awareness.

Practices used:

* EC2-based deployment
* No NAT Gateway
* Small resource footprint
* ECR lifecycle policies
* CloudWatch log retention
* Docker cleanup
* Removal of temporary resources
* Temporary restore database removed after testing
* AWS resources reviewed before cleanup

---

## 26. Evidence

The project includes screenshots demonstrating the implementation.

Important evidence includes:

* GitHub repository
* GitHub Actions successful pipeline
* NOVAORA homepage
* Product page
* Shopping cart
* Terraform-managed EC2
* Docker containers
* Production health checks
* ECR images
* CloudWatch monitoring
* CloudWatch backend logs
* CloudWatch frontend logs
* Automatic rollback failure detection
* Automatic rollback success
* PostgreSQL backup and restore verification
* SonarQube Quality Gate
* Trivy security scan
* OWASP ZAP DAST
* ECR lifecycle policies
* Terraform plan
* Full GitHub Actions pipeline

---

## 27. Final CI/CD Result

The final optimized pipeline successfully completed:

```text
Backend CI              ✓
Frontend CI             ✓
Frontend Coverage       ✓
Frontend Build          ✓
SonarQube                ✓
Docker Build             ✓
Trivy Backend            ✓
Trivy Frontend           ✓
ECR Push                 ✓
Staging Deployment       ✓
OWASP ZAP                ✓
Production Deployment    ✓
Health Checks            ✓
Docker Cleanup           ✓
```

The frontend coverage artifact is transferred from Frontend CI to SonarQube, avoiding duplicated dependency installation and coverage execution.

---

## 28. Key DevOps Concepts Demonstrated

This project demonstrates practical experience with:

* Linux
* AWS EC2
* VPC
* Subnets
* Security Groups
* IAM
* Docker
* Docker Compose
* Amazon ECR
* Terraform
* Git
* GitHub
* GitHub Actions
* CI/CD
* SonarQube
* Trivy
* OWASP ZAP
* Nginx
* PostgreSQL
* CloudWatch
* Monitoring
* Centralized logging
* Backup and restore
* Deployment automation
* Health checks
* Automatic rollback
* Security
* Cost optimization

---

## 29. Future Improvements

Possible future improvements include:

* AWS RDS for managed PostgreSQL
* Application Load Balancer
* Auto Scaling
* HTTPS with ACM
* Prometheus and Grafana
* Kubernetes/EKS
* Argo CD
* Ansible
* Advanced deployment strategies such as blue-green deployment
* Infrastructure monitoring dashboards
* Automated database backup scheduling

These were intentionally kept outside the current implementation to maintain a controlled and cost-conscious project scope.

---

## 30. Interview Explanation

### Short Explanation

> I built a production-style e-commerce platform called NOVAORA using React, FastAPI and PostgreSQL. I containerized the application using Docker and deployed it on AWS EC2 with images stored in Amazon ECR.
>
> I used Terraform to manage the AWS infrastructure and GitHub Actions to create a complete CI/CD pipeline. The pipeline performs backend and frontend testing, code-quality analysis with SonarQube, Docker image security scanning using Trivy, staging deployment, OWASP ZAP DAST scanning, manual production approval and automated production deployment.
>
> I also implemented health checks and automatic rollback. If the newly deployed production version fails its health checks, the deployment script automatically restores the previous working ECR image.
>
> For operations, I configured CloudWatch monitoring and centralized Docker logs, and I implemented PostgreSQL backup and restore verification.
>
> The project gave me practical experience across CI/CD, AWS, Docker, Terraform, DevSecOps, monitoring, logging, database recovery and production deployment.

---

## 31. Project Goal

The main goal of this project was not simply to deploy an e-commerce application.

The goal was to demonstrate how a real DevOps engineer can:

```text
Build
  ↓
Test
  ↓
Analyze
  ↓
Secure
  ↓
Containerize
  ↓
Deploy
  ↓
Verify
  ↓
Monitor
  ↓
Recover
  ↓
Maintain

This project represents the complete DevOps lifecycle for a production-style application.

