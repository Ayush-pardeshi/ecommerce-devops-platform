# ============================================================
# AWS ACCOUNT INFORMATION
# ============================================================

data "aws_caller_identity" "current" {}


# ============================================================
# VPC
# ============================================================

resource "aws_vpc" "dev" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name        = "ecommerce-dev-vpc"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
  }
}


# ============================================================
# PUBLIC SUBNET
# ============================================================

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "eu-north-1a"
  map_public_ip_on_launch = true

  tags = {
    Name        = "ecommerce-dev-public-subnet"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "public"
  }
}


# ============================================================
# PRIVATE SUBNET
# ============================================================

resource "aws_subnet" "private" {
  vpc_id                  = aws_vpc.dev.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "eu-north-1a"
  map_public_ip_on_launch = false

  tags = {
    Name        = "ecommerce-dev-private-subnet"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "private"
  }
}


# ============================================================
# INTERNET GATEWAY
# ============================================================

resource "aws_internet_gateway" "dev" {
  vpc_id = aws_vpc.dev.id

  tags = {
    Name        = "ecommerce-dev-igw"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
  }
}


# ============================================================
# PUBLIC ROUTE TABLE
# ============================================================

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.dev.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.dev.id
  }

  tags = {
    Name        = "ecommerce-dev-public-rt"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "public"
  }
}


# ============================================================
# PUBLIC ROUTE TABLE ASSOCIATION
# ============================================================

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}


# ============================================================
# OUTPUTS
# ============================================================

output "aws_account_id" {
  value = data.aws_caller_identity.current.account_id
}

output "aws_caller_arn" {
  value = data.aws_caller_identity.current.arn
}

output "vpc_id" {
  value = aws_vpc.dev.id
}

output "vpc_cidr" {
  value = aws_vpc.dev.cidr_block
}

output "public_subnet_id" {
  value = aws_subnet.public.id
}

output "private_subnet_id" {
  value = aws_subnet.private.id
}

output "internet_gateway_id" {
  value = aws_internet_gateway.dev.id
}

output "public_route_table_id" {
  value = aws_route_table.public.id
}


# ---------------------------------------------------------
# Security Group - Web / Frontend
# ---------------------------------------------------------

resource "aws_security_group" "web" {
  name        = "ecommerce-dev-web-sg"
  description = "Security group for web/frontend traffic"
  vpc_id      = aws_vpc.dev.id

  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH administration"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "ecommerce-dev-web-sg"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "web"
  }
}


# ---------------------------------------------------------
# Security Group - Backend / API
# ---------------------------------------------------------

resource "aws_security_group" "backend" {
  name        = "ecommerce-dev-backend-sg"
  description = "Security group for backend API"
  vpc_id      = aws_vpc.dev.id

  ingress {
    description     = "Backend API from web tier"
    from_port       = 8000
    to_port         = 8000
    protocol        = "tcp"
    security_groups = [aws_security_group.web.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "ecommerce-dev-backend-sg"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "backend"
  }
}


# ---------------------------------------------------------
# Security Group - Database
# ---------------------------------------------------------

resource "aws_security_group" "database" {
  name        = "ecommerce-dev-database-sg"
  description = "Security group for PostgreSQL database"
  vpc_id      = aws_vpc.dev.id

  ingress {
    description     = "PostgreSQL from backend"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.backend.id]
  }

  egress {
    description = "Allow outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "ecommerce-dev-database-sg"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "database"
  }
}

# ---------------------------------------------------------
# Ubuntu AMI
# ---------------------------------------------------------

data "aws_ami" "ubuntu" {
  most_recent = true

  owners = ["099720109477"] # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd-gp3/ubuntu-noble-24.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}


# ---------------------------------------------------------
# EC2 - Web Server
# ---------------------------------------------------------

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t3.micro"
  key_name      = "ayush"
  iam_instance_profile = "EcommerceTerraformEC2Role"

  subnet_id = aws_subnet.public.id

  vpc_security_group_ids = [
    aws_security_group.web.id
  ]

  associate_public_ip_address = true

  root_block_device {
    volume_size = 16
    volume_type = "gp3"

    tags = {
      Name = "ecommerce-dev-web-root"
    }
  }

  tags = {
    Name        = "ecommerce-dev-web"
    Environment = "dev"
    Project     = "ecommerce-devops-platform"
    ManagedBy   = "Terraform"
    Tier        = "web"
  }
}

# ---------------------------------------------------------
# EC2 Outputs
# ---------------------------------------------------------

output "web_instance_id" {
  description = "ID of the Terraform-managed web EC2 instance"
  value       = aws_instance.web.id
}

output "web_instance_public_ip" {
  description = "Public IPv4 address of the web EC2 instance"
  value       = aws_instance.web.public_ip
}

output "web_instance_public_dns" {
  description = "Public DNS name of the web EC2 instance"
  value       = aws_instance.web.public_dns
}

output "web_instance_ami" {
  description = "Ubuntu AMI used by the web EC2 instance"
  value       = data.aws_ami.ubuntu.id
}
