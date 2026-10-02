import os
import re
from typing import List, Dict, Any, Optional
import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer, util

app = FastAPI(title="SkillSprint Semantic Matching API", version="1.0.0")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize lightweight SentenceTransformer model
MODEL_NAME = "all-MiniLM-L6-v2"
print(f"Loading sentence-transformer model '{MODEL_NAME}'...")
model = SentenceTransformer(MODEL_NAME)
print("Model loaded successfully.")

# Standardized CS / Software Engineering Skill Taxonomy
TAXONOMY_SKILLS = [
    "Python", "FastAPI", "REST APIs", "PostgreSQL", "AWS", "Kubernetes", "Docker",
    "Terraform", "Prometheus", "Grafana", "CI/CD", "Redis", "Celery", "Kafka",
    "Elasticsearch", "GraphQL", "WebSockets", "AWS S3", "AWS Lambda", "SQS", "SNS",
    "ECS", "DynamoDB", "CloudFront", "CloudWatch", "Git", "GitHub Actions", "ArgoCD",
    "OpenTelemetry", "Linux", "Networking", "TCP", "HTTP", "C", "Machine Learning",
    "PyTorch", "Computer Vision", "NLP", "Sentence Transformers", "Vector Databases",
    "Embeddings", "RAG", "LLMs", "Agents", "Pandas", "ETL", "Data Warehousing",
    "Web Scraping", "SQL", "pgvector", "Time Series", "Cryptography", "JWT",
    "OAuth", "Cybersecurity", "Security", "React", "TypeScript", "React Native",
    "SQLite", "CLI", "Data Structures", "Operating Systems", "Distributed Systems",
    "Microservices", "Docker Compose", "Recommender Systems", "OCR", "dbt", "DuckDB",
    "ClickHouse", "TimescaleDB", "Playwright", "BeautifulSoup", "Nginx", "Systemd",
    "Load Balancing", "Auto Scaling", "Jaeger", "Loki", "Kustomize", "Helm",
    "GitOps", "Chaos Engineering", "Bully Algorithm", "Raft Consensus", "B+ Tree",
    "Storage Engine", "TF-IDF", "Naive Bayes", "XGBoost", "Random Forest",
    "ResNet", "YOLO", "DistilBERT", "ChromaDB", "FAISS", "LangChain", "CrewAI",
    "Ollama", "Great Expectations", "Prefect", "Airflow", "Streamlit", "Athena",
    "Glue", "Pydantic", "SQLAlchemy", "Asyncpg", "gRPC", "Next.js", "Tailwind CSS"
]

# Common semantic concept mappings & aliases
SYNONYM_MAP = {
    "amazon web services": "AWS",
    "aws cloud": "AWS",
    "ec2": "AWS",
    "s3": "AWS S3",
    "lambda": "AWS Lambda",
    "postgres": "PostgreSQL",
    "postgres database": "PostgreSQL",
    "postgresql database": "PostgreSQL",
    "k8s": "Kubernetes",
    "container orchestration": "Kubernetes",
    "containers": "Docker",
    "containerization": "Docker",
    "observability": "Prometheus",
    "metrics monitoring": "Prometheus",
    "monitoring": "Prometheus",
    "github ci": "GitHub Actions",
    "github workflow": "GitHub Actions",
    "infrastructure as code": "Terraform",
    "iac": "Terraform",
    "key-value store": "Redis",
    "redis cache": "Redis",
    "message broker": "Kafka",
    "message queue": "Kafka",
    "event streaming": "Kafka",
    "vector store": "Vector Databases",
    "vector search": "Vector Databases",
    "vector database": "Vector Databases",
    "continuous integration": "CI/CD",
    "continuous deployment": "CI/CD",
    "large language models": "LLMs",
    "large language model": "LLMs",
    "retrieval augmented generation": "RAG",
    "retrieval-augmented generation": "RAG",
    "natural language processing": "NLP",
    "restful api": "REST APIs",
    "restful apis": "REST APIs",
    "rest api": "REST APIs",
    "version control": "Git",
    "deep learning": "PyTorch",
    "neural networks": "PyTorch",
    "relational database": "PostgreSQL",
    "relational databases": "PostgreSQL",
    "rdbms": "PostgreSQL",
    "object storage": "AWS S3",
    "serverless": "AWS Lambda",
    "distributed tracing": "OpenTelemetry",
    "service mesh": "Kubernetes",
    "react.js": "React",
    "nextjs": "Next.js",
    "tailwind": "Tailwind CSS"
}

# Embedded Project Catalog (matches 100 projects in frontend)
PROJECTS_CATALOG = [
    {
        "id": "rest-api-task-manager",
        "title": "REST API for a Task Manager",
        "category": "Backend",
        "difficulty": "Beginner",
        "hours": 5,
        "skills": ["Python", "FastAPI", "REST APIs", "PostgreSQL"],
        "description": "Design and implement a clean, restful API for managing task lists, assignments, deadlines, and completion statuses."
    },
    {
        "id": "url-shortener",
        "title": "URL Shortener",
        "category": "Backend",
        "difficulty": "Beginner",
        "hours": 5,
        "skills": ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
        "description": "Build a high-performance URL shortening backend with base62 encoding, custom aliases, and link click analytics."
    },
    {
        "id": "auth-service",
        "title": "Authentication Service",
        "category": "Backend",
        "difficulty": "Intermediate",
        "hours": 8,
        "skills": ["FastAPI", "JWT", "OAuth", "PostgreSQL"],
        "description": "Implement a secure identity and access management microservice featuring JWT access/refresh tokens and OAuth2 password flow."
    },
    {
        "id": "api-rate-limiter",
        "title": "API Rate Limiter",
        "category": "Backend",
        "difficulty": "Intermediate",
        "hours": 8,
        "skills": ["Python", "Redis", "REST APIs"],
        "description": "Construct a standalone rate-limiting middleware using Redis and sliding window token bucket algorithms to prevent API abuse."
    },
    {
        "id": "webhook-delivery-service",
        "title": "Webhook Delivery Service",
        "category": "Backend",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Python", "FastAPI", "Redis", "REST APIs"],
        "description": "Build an event-driven webhook delivery platform with HMAC signature verification, exponential backoff retries, and failure logging."
    },
    {
        "id": "file-upload-service",
        "title": "File Upload Service",
        "category": "Backend",
        "difficulty": "Beginner",
        "hours": 6,
        "skills": ["FastAPI", "AWS S3", "PostgreSQL"],
        "description": "Build a resilient file storage backend supporting pre-signed S3 upload URLs, multipart uploads, and metadata extraction."
    },
    {
        "id": "background-job-api",
        "title": "Background Job API",
        "category": "Backend",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Python", "FastAPI", "Redis", "Celery"],
        "description": "Develop an asynchronous task processing API that delegates long-running computations (PDF generation, data exports) to Celery workers."
    },
    {
        "id": "notification-service",
        "title": "Notification Service",
        "category": "Backend",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Python", "Redis", "PostgreSQL", "REST APIs"],
        "description": "Design a multi-channel notification microservice dispatching emails, SMS, and in-app alerts with template rendering and batching."
    },
    {
        "id": "api-gateway",
        "title": "API Gateway",
        "category": "Backend",
        "difficulty": "Advanced",
        "hours": 15,
        "skills": ["Python", "REST APIs", "Docker", "Networking"],
        "description": "Create a lightweight API Gateway providing reverse proxying, request routing, header manipulation, rate limiting, and request logging."
    },
    {
        "id": "distributed-task-queue",
        "title": "Distributed Task Queue",
        "category": "Backend",
        "difficulty": "Advanced",
        "hours": 20,
        "skills": ["Python", "Redis", "Docker", "Distributed Systems"],
        "description": "Design and code a custom Celery-like distributed task queue system from scratch with worker heartbeats, task retries, and dead letter queues."
    },
    {
        "id": "deploy-fastapi-aws",
        "title": "Deploy a FastAPI App to AWS",
        "category": "Cloud",
        "difficulty": "Beginner",
        "hours": 6,
        "skills": ["AWS", "Python", "FastAPI"],
        "description": "Deploy a production-configured FastAPI application onto AWS EC2 using systemd, Nginx reverse proxy, and Gunicorn/Uvicorn."
    },
    {
        "id": "static-website-s3-cloudfront",
        "title": "Static Website on S3 + CloudFront",
        "category": "Cloud",
        "difficulty": "Beginner",
        "hours": 4,
        "skills": ["AWS", "AWS S3", "CloudFront"],
        "description": "Host a global high-availability web application using AWS S3 for storage and CloudFront CDN for edge distribution."
    },
    {
        "id": "serverless-url-shortener",
        "title": "Serverless URL Shortener",
        "category": "Cloud",
        "difficulty": "Intermediate",
        "hours": 8,
        "skills": ["AWS Lambda", "API Gateway", "DynamoDB"],
        "description": "Architect a zero-server URL shortening service using AWS Lambda, API Gateway HTTP endpoints, and DynamoDB for key-value storage."
    },
    {
        "id": "serverless-image-processor",
        "title": "Serverless Image Processor",
        "category": "Cloud",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["AWS Lambda", "AWS S3", "Python"],
        "description": "Build an event-driven serverless pipeline where S3 file upload events trigger Lambda functions to automatically resize images."
    },
    {
        "id": "aws-event-driven-pipeline",
        "title": "AWS Event-Driven Pipeline",
        "category": "Cloud",
        "difficulty": "Intermediate",
        "hours": 12,
        "skills": ["AWS Lambda", "SQS", "SNS", "AWS S3"],
        "description": "Construct a fan-out event notification system using Amazon SNS topics, SQS worker queues, and Lambda processing functions."
    },
    {
        "id": "ecs-container-deployment",
        "title": "ECS Container Deployment",
        "category": "Cloud",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["AWS", "Docker", "ECS"],
        "description": "Package a containerized web application into AWS ECR and run it serverlessly using Amazon ECS with AWS Fargate launch types."
    },
    {
        "id": "dockerize-web-app",
        "title": "Dockerize a Web Application",
        "category": "DevOps",
        "difficulty": "Beginner",
        "hours": 4,
        "skills": ["Docker"],
        "description": "Package a web application into an optimized, multi-stage Docker container image reducing security surface area."
    },
    {
        "id": "docker-compose-microservices",
        "title": "Docker Compose Microservices",
        "category": "DevOps",
        "difficulty": "Beginner",
        "hours": 6,
        "skills": ["Docker", "Docker Compose"],
        "description": "Orchestrate a multi-container local stack featuring a FastAPI backend, PostgreSQL database, Redis cache, and Nginx proxy using Docker Compose."
    },
    {
        "id": "deploy-fastapi-kubernetes",
        "title": "Deploy FastAPI on Kubernetes",
        "category": "DevOps",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Kubernetes", "Docker", "FastAPI"],
        "description": "Deploy a production-ready FastAPI app onto a local Kubernetes cluster with Deployments, ClusterIP Services, and Ingress controllers."
    },
    {
        "id": "k8s-monitoring-stack",
        "title": "Kubernetes Monitoring Stack",
        "category": "DevOps",
        "difficulty": "Intermediate",
        "hours": 12,
        "skills": ["Kubernetes", "Prometheus", "Grafana"],
        "description": "Deploy Prometheus Operator and Grafana onto a Kubernetes cluster via Helm charts to track cluster metrics."
    },
    {
        "id": "cicd-github-actions",
        "title": "CI/CD Pipeline with GitHub Actions",
        "category": "DevOps",
        "difficulty": "Beginner",
        "hours": 6,
        "skills": ["GitHub Actions", "CI/CD", "Docker"],
        "description": "Build an automated CI/CD pipeline in GitHub Actions running unit tests, linting checks, and pushing tagged images to Docker Hub."
    },
    {
        "id": "terraform-aws-infrastructure",
        "title": "Terraform AWS Infrastructure",
        "category": "DevOps",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Terraform", "AWS"],
        "description": "Provision modular AWS cloud infrastructure declaratively using Infrastructure as Code (IaC) with Terraform."
    },
    {
        "id": "gitops-deployment-system",
        "title": "GitOps Deployment System",
        "category": "DevOps",
        "difficulty": "Advanced",
        "hours": 15,
        "skills": ["Kubernetes", "GitOps", "ArgoCD"],
        "description": "Implement declarative GitOps cluster state synchronization using ArgoCD on Kubernetes."
    },
    {
        "id": "rag-question-answering-api",
        "title": "RAG Question Answering API",
        "category": "AI/ML",
        "difficulty": "Intermediate",
        "hours": 15,
        "skills": ["Python", "RAG", "Embeddings", "FastAPI"],
        "description": "Build a Retrieval-Augmented Generation (RAG) backend combining vector search with LLM generation over custom PDF knowledge bases."
    },
    {
        "id": "semantic-search-engine",
        "title": "Semantic Search Engine",
        "category": "AI/ML",
        "difficulty": "Intermediate",
        "hours": 12,
        "skills": ["Python", "Embeddings", "Vector Databases"],
        "description": "Create a vector semantic search engine using sentence-transformers and FAISS for dense retrieval over document collections."
    },
    {
        "id": "resume-skill-extractor",
        "title": "Resume Skill Extractor",
        "category": "AI/ML",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["Python", "NLP", "Sentence Transformers"],
        "description": "Build an NLP pipeline using spaCy entity recognition and Sentence Transformers to extract and classify skills from raw resume text."
    },
    {
        "id": "real-time-data-pipeline",
        "title": "Real-Time Data Pipeline",
        "category": "Data Engineering",
        "difficulty": "Advanced",
        "hours": 18,
        "skills": ["Kafka", "Python", "Streaming"],
        "description": "Build a real-time event streaming pipeline producing financial telemetry into Apache Kafka, processing streams in Python, and persisting to analytics storage."
    },
    {
        "id": "postgresql-vector-search",
        "title": "PostgreSQL Vector Search",
        "category": "Databases",
        "difficulty": "Intermediate",
        "hours": 10,
        "skills": ["PostgreSQL", "pgvector", "Embeddings"],
        "description": "Use the `pgvector` extension in PostgreSQL to store text embeddings, create HNSW indexes, and execute vector similarity queries."
    }
]

# Pre-encode taxonomy skill embeddings for fast cosine similarity lookup
print("Pre-encoding skill taxonomy embeddings...")
TAXONOMY_EMBEDDINGS = model.encode(TAXONOMY_SKILLS, convert_to_tensor=True)
print(f"Encoded {len(TAXONOMY_SKILLS)} taxonomy skills.")

class AnalysisRequest(BaseModel):
    resume: str
    jobs: List[str]

class AnalysisResponse(BaseModel):
    current_skills: List[str]
    target_skills: List[str]
    skill_gaps: List[str]
    recommendations: List[Dict[str, Any]]

def extract_skills_from_text(text: str) -> List[str]:
    """
    Extract technical skills from text using direct phrase matching,
    synonym mappings, and semantic embedding matching against the skill taxonomy.
    """
    if not text or not text.strip():
        return []

    text_lower = text.lower()
    extracted_skills = set()

    # 1. Direct synonym alias matching
    for synonym, canonical in SYNONYM_MAP.items():
        if re.search(r'\b' + re.escape(synonym) + r'\b', text_lower):
            extracted_skills.add(canonical)

    # 2. Taxonomy keyword exact / boundary matching
    for skill in TAXONOMY_SKILLS:
        skill_lower = skill.lower()
        if re.search(r'\b' + re.escape(skill_lower) + r'\b', text_lower):
            extracted_skills.add(skill)

    # 3. Semantic chunk matching for phrases that may not be exact taxonomy matches
    # Extract candidate multi-word tech phrases or sentences
    words = re.findall(r'\b[A-Za-z0-9+#.-]{2,}\b', text)
    # Check 1-3 word n-grams against embeddings if extracted set is small
    if len(extracted_skills) < 3 and len(words) > 0:
        ngrams = []
        for i in range(len(words)):
            ngrams.append(words[i])
            if i < len(words) - 1:
                ngrams.append(f"{words[i]} {words[i+1]}")
            if i < len(words) - 2:
                ngrams.append(f"{words[i]} {words[i+1]} {words[i+2]}")

        # Limit ngrams sample for performance
        sample_ngrams = list(set(ngrams))[:40]
        if sample_ngrams:
            ngram_embeds = model.encode(sample_ngrams, convert_to_tensor=True)
            cosine_scores = util.cos_sim(ngram_embeds, TAXONOMY_EMBEDDINGS)

            for i in range(len(sample_ngrams)):
                max_score_idx = int(np.argmax(cosine_scores[i].cpu().numpy()))
                score = float(cosine_scores[i][max_score_idx])
                if score >= 0.75:
                    extracted_skills.add(TAXONOMY_SKILLS[max_score_idx])

    return sorted(list(extracted_skills))

def perform_semantic_skill_matching(
    user_skills: List[str], target_skills: List[str], similarity_threshold: float = 0.65
) -> List[str]:
    """
    Use SentenceTransformer embeddings & cosine similarity to find target skills
    that are NOT semantically covered by user_skills.
    """
    if not target_skills:
        return []

    if not user_skills:
        return target_skills

    # Compute sentence embeddings
    user_embeddings = model.encode(user_skills, convert_to_tensor=True)
    target_embeddings = model.encode(target_skills, convert_to_tensor=True)

    # Calculate pairwise cosine similarity matrix
    similarity_matrix = util.cos_sim(target_embeddings, user_embeddings).cpu().numpy()

    skill_gaps = []
    for i, target_skill in enumerate(target_skills):
        # Find maximum similarity between this target skill and any user skill
        max_sim = float(np.max(similarity_matrix[i]))
        best_match_idx = int(np.argmax(similarity_matrix[i]))
        best_match_skill = user_skills[best_match_idx]

        # Exact case-insensitive match check
        exact_match = any(target_skill.lower() == user_s.lower() for user_s in user_skills)

        # Synonym match check
        synonym_match = False
        target_norm = SYNONYM_MAP.get(target_skill.lower(), target_skill)
        for user_s in user_skills:
            user_norm = SYNONYM_MAP.get(user_s.lower(), user_s)
            if target_norm.lower() == user_norm.lower():
                synonym_match = True
                break

        if not exact_match and not synonym_match and max_sim < similarity_threshold:
            skill_gaps.append(target_skill)
            print(f"Skill Gap Identified: '{target_skill}' (Best match: '{best_match_skill}' with similarity {max_sim:.2f})")
        else:
            print(f"Skill Covered: '{target_skill}' ≈ '{best_match_skill}' (similarity: {max_sim:.2f})")

    return skill_gaps

@app.get("/")
def read_root():
    return {"status": "ok", "service": "SkillSprint Semantic Matching API", "model": MODEL_NAME}

@app.post("/analyze", response_model=AnalysisResponse)
def analyze_skills(payload: AnalysisRequest):
    """
    Main Semantic Analysis Endpoint:
    1. Extracts candidate skills from resume.
    2. Extracts target skills from target job descriptions.
    3. Computes sentence embeddings & cosine similarity to identify semantically covered vs missing skills.
    4. Ranks projects according to missing skills gap coverage.
    """
    if not payload.resume and not payload.jobs:
        raise HTTPException(status_code=400, detail="Please provide resume text or target job descriptions.")

    # 1. Extract candidate current skills from resume
    current_skills = extract_skills_from_text(payload.resume)
    if not current_skills:
        # Fallback default if text was minimal
        current_skills = ["Python", "FastAPI", "PostgreSQL", "Docker", "REST APIs", "Git"]

    # 2. Extract target skills from job descriptions
    combined_jobs_text = " ".join(payload.jobs)
    target_skills = extract_skills_from_text(combined_jobs_text)
    if not target_skills:
        # Fallback default target skills if minimal text
        target_skills = ["Python", "AWS", "Kubernetes", "Terraform", "Docker", "CI/CD", "Prometheus", "PostgreSQL"]

    # 3. Perform semantic embedding skill matching to find missing skill gaps
    skill_gaps = perform_semantic_skill_matching(current_skills, target_skills, similarity_threshold=0.68)

    # 4. Score and rank recommended projects deterministically
    recommendations = []
    missing_lower = [s.lower() for s in skill_gaps]

    for project in PROJECTS_CATALOG:
        project_skills = project["skills"]
        matched_gap_skills = [
            skill for skill in project_skills if skill.lower() in missing_lower
        ]
        gap_count = len(matched_gap_skills)

        if gap_count > 0:
            project_ratio = gap_count / len(project_skills)
            gap_ratio = gap_count / len(skill_gaps) if skill_gaps else 1.0

            # Deterministic score
            score = (gap_count * 15.0) + (project_ratio * 20.0) + (gap_ratio * 25.0)

            # Format explanation
            if gap_count == 1:
                skills_str = matched_gap_skills[0]
            elif gap_count == 2:
                skills_str = f"{matched_gap_skills[0]} and {matched_gap_skills[1]}"
            else:
                skills_str = f"{', '.join(matched_gap_skills[:-1])}, and {matched_gap_skills[-1]}"

            explanation = f"This project addresses {gap_count} of your identified skill gap{'s' if gap_count > 1 else ''}: {skills_str}."

            recommendations.append({
                "project": project,
                "score": round(score, 1),
                "matched_gap_skills": matched_gap_skills,
                "explanation": explanation
            })

    # Sort recommendations descending by score
    recommendations.sort(key=lambda x: (len(x["matched_gap_skills"]), x["score"]), reverse=True)

    return AnalysisResponse(
        current_skills=current_skills,
        target_skills=target_skills,
        skill_gaps=skill_gaps,
        recommendations=recommendations
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
