/**
 * Client-side mirror of the skill taxonomy and synonym map used by the
 * semantic matching backend (backend/main.py). Keep these two in sync —
 * see backend/README.md for how the backend's embedding-based matching
 * uses the same concepts.
 *
 * The backend performs true semantic matching via sentence-transformer
 * embeddings + cosine similarity. This module gives the frontend a
 * synonym-aware approximation of that for use when the backend is
 * unreachable (see recommendProjects in recommendation.ts) — it is not a
 * replacement for the embedding model, just a closer offline stand-in
 * than plain case-insensitive string equality.
 */

export const TAXONOMY_SKILLS: string[] = [
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
  "GitOps", "Chaos Engineering", "Next.js", "Tailwind CSS",
];

export const SYNONYM_MAP: Record<string, string> = {
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
  "tailwind": "Tailwind CSS",
};

/**
 * Resolves a raw skill string to its canonical taxonomy name if a synonym
 * mapping exists, otherwise returns the trimmed input unchanged.
 */
export function normalizeSkill(skill: string): string {
  const trimmed = skill.trim();
  const canonical = SYNONYM_MAP[trimmed.toLowerCase()];
  return (canonical ?? trimmed).toLowerCase();
}

/**
 * Synonym-aware equivalence check: true if two skill strings are the same
 * skill once both are resolved to their canonical taxonomy form. This is
 * what lets the offline fallback recognize e.g. "K8s" ~ "Kubernetes" or
 * "Postgres" ~ "PostgreSQL" instead of requiring an exact string match.
 */
export function skillsMatch(a: string, b: string): boolean {
  return normalizeSkill(a) === normalizeSkill(b);
}

/**
 * For a target skill, finds whether it is covered by any skill in a user's
 * skill list, using synonym-aware matching.
 */
export function isSkillCovered(targetSkill: string, userSkills: string[]): boolean {
  return userSkills.some((s) => skillsMatch(s, targetSkill));
}

/**
 * Lightweight offline mirror of the backend's extract_skills_from_text
 * (synonym + taxonomy keyword-boundary matching only — no embedding
 * fallback, since that requires the sentence-transformer model). Used to
 * pull candidate skills out of free text (e.g. a pasted job description)
 * when the /analyze backend can't be reached.
 */
export function extractSkillsFromText(text: string): string[] {
  if (!text || !text.trim()) return [];
  const textLower = text.toLowerCase();
  const found = new Set<string>();

  for (const [synonym, canonical] of Object.entries(SYNONYM_MAP)) {
    if (new RegExp(`\\b${escapeRegExp(synonym)}\\b`, "i").test(textLower)) {
      found.add(canonical);
    }
  }

  for (const skill of TAXONOMY_SKILLS) {
    if (new RegExp(`\\b${escapeRegExp(skill.toLowerCase())}\\b`, "i").test(textLower)) {
      found.add(skill);
    }
  }

  return Array.from(found).sort();
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
