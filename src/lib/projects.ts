export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectCategory =
  | "Backend"
  | "Cloud"
  | "DevOps"
  | "Systems"
  | "AI/ML"
  | "Data Engineering"
  | "Databases"
  | "Security"
  | "Frontend"
  | "Developer Tools"
  | "Mobile";

export interface Milestone {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  difficulty: Difficulty;
  hours: number;
  skills: string[];
  description: string;
  outcomes: string[];
  prerequisites: string[];
  whyThisProject?: string;
  techStack?: string[];
  milestones?: Milestone[];
}

export const projects: Project[] = [
  // 1. Backend & APIs
  {
    id: "rest-api-task-manager",
    title: "REST API for a Task Manager",
    category: "Backend",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "FastAPI", "REST APIs", "PostgreSQL"],
    description: "Design and implement a clean, restful API for managing task lists, assignments, deadlines, and completion statuses.",
    outcomes: ["Master RESTful API design conventions", "Perform CRUD operations with async PostgreSQL ORM", "Implement request body validation"],
    prerequisites: ["Basic Python knowledge", "Understanding of HTTP methods"],
    whyThisProject: "A fundamental backend project demonstrating production-grade API structure and database interaction.",
    techStack: ["Python 3.11", "FastAPI", "PostgreSQL", "SQLAlchemy", "Pydantic"],
    milestones: [
      { title: "Project Setup & Database Schema", description: "Set up FastAPI with SQLAlchemy and configure PostgreSQL models for Tasks and Users." },
      { title: "CRUD Endpoints", description: "Implement GET, POST, PUT, DELETE endpoints with Pydantic validation schemas." },
      { title: "Filtering & Sorting", description: "Add query parameters for filtering tasks by status and due dates." }
    ]
  },
  {
    id: "url-shortener",
    title: "URL Shortener",
    category: "Backend",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "FastAPI", "PostgreSQL", "REST APIs"],
    description: "Build a high-performance URL shortening backend with base62 encoding, custom aliases, and link click analytics.",
    outcomes: ["Implement efficient string encoding algorithms", "Handle HTTP 302 redirects", "Track event analytics"],
    prerequisites: ["Python syntax", "Relational database basics"],
    whyThisProject: "Classic systems & backend interview project covering unique key generation and fast database lookups.",
    techStack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
    milestones: [
      { title: "Base62 Encoder", description: "Create a utility to convert auto-incrementing IDs to compact short codes." },
      { title: "Redirection Engine", description: "Build the HTTP redirect route and increment analytics counters asynchronously." }
    ]
  },
  {
    id: "auth-service",
    title: "Authentication Service",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["FastAPI", "JWT", "OAuth", "PostgreSQL"],
    description: "Implement a secure identity and access management microservice featuring JWT access/refresh tokens and OAuth2 password flow.",
    outcomes: ["Understand cryptographic password hashing with bcrypt", "Manage token expiration and refresh cycles", "Implement role-based access control (RBAC)"],
    prerequisites: ["FastAPI basics", "Security fundamentals"],
    whyThisProject: "Security and authentication are core requirements for nearly every modern web application.",
    techStack: ["FastAPI", "PyJWT", "Passlib", "PostgreSQL"],
    milestones: [
      { title: "User Signup & Hashing", description: "Hash user passwords securely and persist credentials to PostgreSQL." },
      { title: "Token Generation & Middleware", description: "Generate JWT tokens upon login and protect routes via authorization headers." }
    ]
  },
  {
    id: "api-rate-limiter",
    title: "API Rate Limiter",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "Redis", "REST APIs"],
    description: "Construct a standalone rate-limiting middleware using Redis and sliding window token bucket algorithms to prevent API abuse.",
    outcomes: ["Master in-memory Redis data structures & TTLs", "Implement leaky bucket / token bucket algorithms", "Design middleware layers"],
    prerequisites: ["Python", "Basic network protocols"],
    whyThisProject: "Rate limiting is crucial for infrastructure stability and DDoS mitigation in backend environments.",
    techStack: ["Python", "Redis", "FastAPI"],
    milestones: [
      { title: "Redis Sliding Window", description: "Implement atomic Redis Lua scripts to track request timestamps per client IP." },
      { title: "FastAPI Middleware Integration", description: "Wrap endpoints in middleware to return HTTP 429 Too Many Requests when limits are hit." }
    ]
  },
  {
    id: "webhook-delivery-service",
    title: "Webhook Delivery Service",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "FastAPI", "Redis", "REST APIs"],
    description: "Build an event-driven webhook delivery platform with HMAC signature verification, exponential backoff retries, and failure logging.",
    outcomes: ["Handle asynchronous HTTP client dispatches", "Implement HMAC-SHA256 signature security", "Design retry queues with backoff"],
    prerequisites: ["Async Python", "Redis queues"],
    whyThisProject: "Webhooks power modern API ecosystems like Stripe, GitHub, and Twilio.",
    techStack: ["Python", "FastAPI", "Redis", "httpx"],
    milestones: [
      { title: "Event Ingestion API", description: "Accept client webhooks and push delivery tasks to a Redis queue." },
      { title: "Worker Dispatch & HMAC", description: "Dispatch webhooks asynchronously with signed payloads and handle non-200 responses." }
    ]
  },
  {
    id: "file-upload-service",
    title: "File Upload Service",
    category: "Backend",
    difficulty: "Beginner",
    hours: 6,
    skills: ["FastAPI", "AWS S3", "PostgreSQL"],
    description: "Build a resilient file storage backend supporting pre-signed S3 upload URLs, multipart uploads, and metadata extraction.",
    outcomes: ["Manage cloud object storage buckets", "Generate secure pre-signed URLs for client uploads", "Store and query file metadata"],
    prerequisites: ["Python", "Basic cloud storage concepts"],
    whyThisProject: "Offloading file uploads safely to cloud storage is standard practice for modern web architectures.",
    techStack: ["FastAPI", "boto3", "AWS S3", "PostgreSQL"],
    milestones: [
      { title: "Pre-Signed URL Generation", description: "Implement secure endpoints issuing temporary S3 upload permissions." },
      { title: "Metadata Callback API", description: "Record uploaded file dimensions, MIME types, and ownership in PostgreSQL." }
    ]
  },
  {
    id: "background-job-api",
    title: "Background Job API",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "FastAPI", "Redis", "Celery"],
    description: "Develop an asynchronous task processing API that delegates long-running computations (PDF generation, data exports) to Celery workers.",
    outcomes: ["Decouple web servers from CPU-heavy operations", "Monitor worker task progress and status polling", "Configure Celery & Redis message brokers"],
    prerequisites: ["FastAPI", "Redis basics"],
    whyThisProject: "Essential pattern for keeping API responses snappy while executing heavy background work.",
    techStack: ["Python", "FastAPI", "Celery", "Redis"],
    milestones: [
      { title: "Celery Task Queue Setup", description: "Configure Celery worker processes backed by Redis." },
      { title: "Job Submission & Polling API", description: "Build endpoints to submit jobs and poll real-time status updates." }
    ]
  },
  {
    id: "notification-service",
    title: "Notification Service",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Redis", "PostgreSQL", "REST APIs"],
    description: "Design a multi-channel notification microservice dispatching emails, SMS, and in-app alerts with template rendering and batching.",
    outcomes: ["Implement publisher-subscriber pattern", "Manage templated message queues", "Handle third-party API rate limits"],
    prerequisites: ["Python", "Relational database schemas"],
    whyThisProject: "Teaches clean domain separation and reliable delivery mechanics for notifications.",
    techStack: ["Python", "Redis Pub/Sub", "PostgreSQL", "Jinja2"],
    milestones: [
      { title: "Template Engine & Delivery Worker", description: "Render dynamic notification templates and publish to channel queues." },
      { title: "User Preference Filtering", description: "Check user opt-in settings in PostgreSQL before dispatching messages." }
    ]
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    category: "Backend",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "REST APIs", "Docker", "Networking"],
    description: "Create a lightweight API Gateway providing reverse proxying, request routing, header manipulation, rate limiting, and request logging.",
    outcomes: ["Understand low-level HTTP reverse proxying", "Manipulate headers and enforce SSL termination concepts", "Containerize gateway services"],
    prerequisites: ["HTTP spec knowledge", "Docker basics"],
    whyThisProject: "Demonstrates core microservice infrastructure concepts and network traffic management.",
    techStack: ["Python", "httpx", "Docker", "FastAPI"],
    milestones: [
      { title: "Reverse Proxy Core", description: "Forward incoming request streams to downstream microservice destinations." },
      { title: "Centralized Auth & Logging", description: "Intercept requests for authentication header validation and latency tracking." }
    ]
  },
  {
    id: "distributed-task-queue",
    title: "Distributed Task Queue",
    category: "Backend",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "Redis", "Docker", "Distributed Systems"],
    description: "Design and code a custom Celery-like distributed task queue system from scratch with worker heartbeats, task retries, and dead letter queues.",
    outcomes: ["Master concurrency control & worker pool scheduling", "Design fault-tolerant queue protocols", "Understand distributed messaging primitives"],
    prerequisites: ["Advanced Python concurrency", "Docker"],
    whyThisProject: "Deep dive into distributed systems engineering and message broker mechanics.",
    techStack: ["Python", "Redis", "Docker Compose", "asyncio"],
    milestones: [
      { title: "Queue Protocol & Broker", description: "Build Redis queue storage with task serialization and locking." },
      { title: "Worker Lifecycle & Heartbeat", description: "Implement worker process management with ping/pong health monitoring." }
    ]
  },
  {
    id: "api-versioning-system",
    title: "API Versioning System",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 7,
    skills: ["REST APIs", "FastAPI", "PostgreSQL"],
    description: "Implement a clean backward-compatible API versioning framework handling header, query parameter, and URL path version routing.",
    outcomes: ["Design non-breaking API schema migrations", "Implement version router dispatchers", "Manage deprecation headers"],
    prerequisites: ["REST API design"],
    whyThisProject: "Crucial software maintenance pattern for evolving public consumer APIs without breaking clients.",
    techStack: ["FastAPI", "Python", "PostgreSQL"],
    milestones: [
      { title: "Router Dispatcher", description: "Route requests to specific version handler functions based on Accept headers." },
      { title: "Schema Adapter Layer", description: "Transform legacy database representations into target version API outputs." }
    ]
  },
  {
    id: "multi-tenant-saas-backend",
    title: "Multi-Tenant SaaS Backend",
    category: "Backend",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "FastAPI", "PostgreSQL", "Authentication"],
    description: "Engineered multi-tenant architecture supporting row-level isolation, schema-per-tenant PostgreSQL database isolation, and tenant domain routing.",
    outcomes: ["Master multi-tenant database isolation strategies", "Implement tenant context injection middleware", "Build tenant onboarding pipelines"],
    prerequisites: ["PostgreSQL schemas", "FastAPI middleware"],
    whyThisProject: "High-value skill for B2B SaaS software companies requiring strict enterprise data separation.",
    techStack: ["Python", "FastAPI", "PostgreSQL (Schemas)", "SQLAlchemy"],
    milestones: [
      { title: "Tenant Middleware", description: "Extract tenant ID from subdomain or headers and dynamically route database connections." },
      { title: "Schema Migration Engine", description: "Automate migration runs across dynamic tenant PostgreSQL schemas." }
    ]
  },
  {
    id: "search-api",
    title: "Search API",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "FastAPI", "PostgreSQL", "Elasticsearch"],
    description: "Build a full-text search API with query autocomplete, faceted search filters, spell correction, and real-time index synchronization.",
    outcomes: ["Index relational database entities into Elasticsearch", "Execute complex boolean & fuzzy search queries", "Measure search query latency"],
    prerequisites: ["Python", "Search index basics"],
    whyThisProject: "Combines transactional relational storage with specialized inverted index search engines.",
    techStack: ["Python", "FastAPI", "Elasticsearch", "PostgreSQL"],
    milestones: [
      { title: "Elasticsearch Indexing Pipeline", description: "Sync PostgreSQL database inserts to Elasticsearch indices via background listeners." },
      { title: "Faceted Query Endpoint", description: "Expose multi-filter search API endpoints returning aggregations and match scores." }
    ]
  },
  {
    id: "graphql-api",
    title: "GraphQL API",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "GraphQL", "PostgreSQL"],
    description: "Develop a feature-rich GraphQL API with Strawberry/Graphene, implementing complex nested queries, mutations, and DataLoader optimization to prevent N+1 queries.",
    outcomes: ["Design expressive GraphQL schemas & resolvers", "Solve the N+1 query problem using DataLoader batching", "Implement field-level permissions"],
    prerequisites: ["Python", "Relational database queries"],
    whyThisProject: "Modern alternative to REST APIs widely used at companies like GitHub, Meta, and Shopify.",
    techStack: ["Python", "Strawberry GraphQL", "FastAPI", "PostgreSQL"],
    milestones: [
      { title: "Schema & Resolver Definition", description: "Define GraphQL types, queries, and mutation handlers." },
      { title: "DataLoader Optimization", description: "Batch and cache relational entity queries to eliminate N+1 latency." }
    ]
  },
  {
    id: "real-time-chat-backend",
    title: "Real-Time Chat Backend",
    category: "Backend",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "WebSockets", "Redis", "PostgreSQL"],
    description: "Construct a scalable real-time messaging server using WebSockets, Redis Pub/Sub for horizontal scaling across multiple instances, and chat history persistence.",
    outcomes: ["Manage persistent bi-directional WebSocket connections", "Scale stateful WebSocket connections with Redis Pub/Sub", "Persist chat message history"],
    prerequisites: ["Async Python", "WebSockets protocol"],
    whyThisProject: "Core application pattern for real-time collaboration tools, gaming backends, and live messaging.",
    techStack: ["Python", "FastAPI WebSockets", "Redis Pub/Sub", "PostgreSQL"],
    milestones: [
      { title: "WebSocket Connection Handler", description: "Manage active room client sockets and broadcast incoming messages." },
      { title: "Redis Pub/Sub Integration", description: "Distribute chat broadcasts across multiple node processes via Redis." }
    ]
  },

  // 2. Cloud & AWS
  {
    id: "deploy-fastapi-aws",
    title: "Deploy a FastAPI App to AWS",
    category: "Cloud",
    difficulty: "Beginner",
    hours: 6,
    skills: ["AWS", "Python", "FastAPI"],
    description: "Deploy a production-configured FastAPI application onto AWS Elastic Beanstalk or EC2 using systemd, Nginx reverse proxy, and Gunicorn/Uvicorn.",
    outcomes: ["Configure Linux EC2 instances", "Set up Nginx reverse proxying to Uvicorn", "Secure endpoints with HTTPS via certbot"],
    prerequisites: ["FastAPI basics", "Command line basics"],
    whyThisProject: "Fundamental cloud deployment experience for turning local backend projects into live web services.",
    techStack: ["AWS EC2", "Nginx", "Uvicorn", "Systemd"],
    milestones: [
      { title: "EC2 Provisioning & Security Groups", description: "Launch an EC2 instance with HTTP/HTTPS inbound rules." },
      { title: "Nginx & Systemd Configuration", description: "Configure systemd service files and Nginx reverse proxy rules." }
    ]
  },
  {
    id: "static-website-s3-cloudfront",
    title: "Static Website on S3 + CloudFront",
    category: "Cloud",
    difficulty: "Beginner",
    hours: 4,
    skills: ["AWS", "S3", "CloudFront"],
    description: "Host a global high-availability web application using AWS S3 for storage and CloudFront CDN for edge distribution with custom SSL certificates.",
    outcomes: ["Understand CDN edge caching & cache invalidations", "Configure S3 bucket policies & static web hosting", "Set up Route 53 DNS & ACM SSL certificates"],
    prerequisites: ["Basic web architecture concepts"],
    whyThisProject: "The industry standard pattern for serving static web applications globally with ultra-low latency.",
    techStack: ["AWS S3", "AWS CloudFront", "AWS Route 53"],
    milestones: [
      { title: "S3 Bucket Policy Setup", description: "Upload static build assets and configure restrictive bucket policies." },
      { title: "CloudFront Distribution", description: "Create edge distribution with HTTPS enforcement and custom caching behaviors." }
    ]
  },
  {
    id: "serverless-url-shortener",
    title: "Serverless URL Shortener",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["AWS Lambda", "API Gateway", "DynamoDB"],
    description: "Architect a zero-server URL shortening service using AWS Lambda, API Gateway HTTP endpoints, and DynamoDB for key-value storage.",
    outcomes: ["Design serverless architectures with zero compute overhead when idle", "Model single-table NoSQL schemas in DynamoDB", "Configure API Gateway proxy integrations"],
    prerequisites: ["AWS basics", "Python/Node.js syntax"],
    whyThisProject: "Demonstrates modern cost-effective serverless architecture design patterns.",
    techStack: ["AWS Lambda", "AWS API Gateway", "AWS DynamoDB", "Python"],
    milestones: [
      { title: "DynamoDB Table Design", description: "Create a DynamoDB table with partition keys for shortcode lookup." },
      { title: "Lambda Function & API Gateway", description: "Deploy Python Lambda handler functions tied to API Gateway routes." }
    ]
  },
  {
    id: "serverless-image-processor",
    title: "Serverless Image Processor",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["AWS Lambda", "S3", "Python"],
    description: "Build an event-driven serverless pipeline where S3 file upload events trigger Lambda functions to automatically resize, compress, and generate thumbnails.",
    outcomes: ["Configure S3 bucket event notifications", "Use Python Pillow library in AWS Lambda layers", "Write processed assets to destination buckets"],
    prerequisites: ["Python image processing", "AWS Lambda basics"],
    whyThisProject: "Classic event-driven serverless workflow pattern used extensively in media applications.",
    techStack: ["AWS Lambda", "AWS S3", "Python Pillow", "AWS SAM"],
    milestones: [
      { title: "S3 Event Binding", description: "Hook ObjectCreated S3 events to trigger an AWS Lambda function." },
      { title: "Lambda Layer & Image Processing", description: "Bundle Pillow library as a Lambda Layer and generate optimized thumbnails." }
    ]
  },
  {
    id: "aws-event-driven-pipeline",
    title: "AWS Event-Driven Pipeline",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["AWS Lambda", "SQS", "SNS", "S3"],
    description: "Construct a fan-out event notification system using Amazon SNS topics, SQS worker queues, and Lambda processing functions for decoupled event handling.",
    outcomes: ["Implement SNS to SQS fan-out messaging architecture", "Handle message batching and dead letter queues (DLQ)", "Ensure idempotency in event consumers"],
    prerequisites: ["Cloud messaging concepts", "AWS Lambda"],
    whyThisProject: "Mastering decoupled enterprise message distribution in cloud computing environments.",
    techStack: ["AWS SNS", "AWS SQS", "AWS Lambda", "Python"],
    milestones: [
      { title: "SNS Topic & SQS Subscription", description: "Configure SNS topic broadcasting to multiple SQS queues." },
      { title: "Queue Consumer & DLQ", description: "Process messages in Lambda with dead letter queue error handling." }
    ]
  },
  {
    id: "aws-log-processing-pipeline",
    title: "AWS Log Processing Pipeline",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["AWS Lambda", "CloudWatch", "S3", "Python"],
    description: "Stream CloudWatch log groups into Kinesis/Lambda to parse, filter anomaly events, and archive indexed outputs into S3 data lakes.",
    outcomes: ["Parse structured & unstructured server log streams", "Trigger automated CloudWatch alarms on log error threshold spikes", "Archive logs to S3 for cold storage analysis"],
    prerequisites: ["Python regex", "AWS CloudWatch basics"],
    whyThisProject: "Essential for cloud observability, incident detection, and compliance archiving.",
    techStack: ["AWS CloudWatch", "AWS Lambda", "AWS S3", "Python"],
    milestones: [
      { title: "CloudWatch Subscription Filter", description: "Create real-time subscription filters for incoming application log streams." },
      { title: "Parsing & Archival Lambda", description: "Extract stack traces and write structured JSON logs to S3 partitions." }
    ]
  },
  {
    id: "ecs-container-deployment",
    title: "ECS Container Deployment",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["AWS", "Docker", "ECS"],
    description: "Package a containerized web application into AWS ECR and run it serverlessly using Amazon ECS with AWS Fargate launch types behind an Application Load Balancer.",
    outcomes: ["Build & push Docker images to Amazon ECR", "Write ECS Task Definitions & Service configurations", "Configure Application Load Balancers with Target Groups"],
    prerequisites: ["Docker fundamentals", "AWS basics"],
    whyThisProject: "The standard cloud native method for running containerized microservices on AWS without managing EC2 servers.",
    techStack: ["AWS ECS Fargate", "AWS ECR", "AWS ALB", "Docker"],
    milestones: [
      { title: "ECR Repository & Push", description: "Build application container image and push tag to AWS ECR." },
      { title: "ECS Fargate Service Setup", description: "Define Task Definitions and launch containers behind an ALB." }
    ]
  },
  {
    id: "aws-auto-scaling-web-service",
    title: "AWS Auto-Scaling Web Service",
    category: "Cloud",
    difficulty: "Advanced",
    hours: 15,
    skills: ["AWS", "EC2", "Load Balancing", "Auto Scaling"],
    description: "Build a fault-tolerant multi-AZ web architecture using EC2 Auto Scaling Groups, Application Load Balancers, and CloudWatch metric policies.",
    outcomes: ["Configure dynamic target tracking scaling policies", "Distribute traffic across Multiple Availability Zones", "Perform zero-downtime rolling deployment updates"],
    prerequisites: ["Networking basics", "AWS EC2 & ALB concepts"],
    whyThisProject: "Demonstrates core cloud reliability, elasticity, and high availability design principles.",
    techStack: ["AWS EC2", "AWS Auto Scaling", "AWS ALB", "AWS CloudWatch"],
    milestones: [
      { title: "Launch Template Definition", description: "Create EC2 launch template with user data initialization scripts." },
      { title: "Auto Scaling & ALB Target Group", description: "Attach Auto Scaling Group to ALB with CPU utilization target tracking." }
    ]
  },
  {
    id: "infrastructure-cost-dashboard",
    title: "Infrastructure Cost Dashboard",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["AWS", "Python", "CloudWatch"],
    description: "Build an automated AWS FinOps dashboard aggregating CloudWatch metrics and AWS Cost Explorer API data to highlight idle resources and estimate monthly billing.",
    outcomes: ["Query AWS Cost Explorer & CloudWatch metrics APIs", "Identify underutilized cloud compute instances", "Generate actionable cost reduction reports"],
    prerequisites: ["Python", "AWS IAM roles & APIs"],
    whyThisProject: "Cloud cost optimization (FinOps) is a high-demand skill across engineering teams.",
    techStack: ["Python", "boto3", "AWS Cost Explorer API", "AWS CloudWatch"],
    milestones: [
      { title: "Cost Data Aggregator", description: "Query AWS Cost Explorer API for resource cost breakdowns." },
      { title: "Idle Resource Scanner", description: "Scan CloudWatch metrics for EC2 instances averaging under 5% CPU." }
    ]
  },
  {
    id: "multi-service-aws-architecture",
    title: "Multi-Service AWS Architecture",
    category: "Cloud",
    difficulty: "Advanced",
    hours: 20,
    skills: ["AWS", "Docker", "Networking"],
    description: "Architect a complex cloud topology featuring public/private subnets, NAT Gateways, VPC Peering, ECS Fargate services, and Aurora Serverless databases.",
    outcomes: ["Design secure multi-tier Virtual Private Clouds (VPC)", "Enforce strict security group ingress/egress boundary rules", "Implement VPC Endpoints for private AWS service communication"],
    prerequisites: ["Advanced networking & AWS architecture"],
    whyThisProject: "Comprehensive cloud architecture project covering real-world production network infrastructure design.",
    techStack: ["AWS VPC", "AWS ECS", "AWS Aurora", "AWS NAT Gateway"],
    milestones: [
      { title: "Custom VPC & Subnet Topology", description: "Provision public/private subnets across multiple AZs with NAT Gateways." },
      { title: "Private Database & Microservice Binding", description: "Deploy database in isolated private subnets accessible only via application security groups." }
    ]
  },
  {
    id: "serverless-rest-api",
    title: "Serverless REST API",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["AWS Lambda", "API Gateway", "DynamoDB"],
    description: "Build a production RESTful microservice on AWS Serverless stack utilizing OpenAPI definitions, API Gateway request validation, and DynamoDB secondary indices.",
    outcomes: ["Design GSI (Global Secondary Index) queries in DynamoDB", "Map API Gateway requests directly to Lambda functions", "Implement CORS policies and request validation"],
    prerequisites: ["Serverless basics", "REST conventions"],
    whyThisProject: "Clean serverless backend implementation pattern used in lightweight microservices.",
    techStack: ["AWS Lambda", "API Gateway", "DynamoDB", "Python"],
    milestones: [
      { title: "OpenAPI Spec & API Gateway", description: "Import OpenAPI schema into API Gateway with strict payload validation." },
      { title: "DynamoDB GSI Queries", description: "Implement fast index-based retrieval queries for filtering items." }
    ]
  },
  {
    id: "aws-data-ingestion-pipeline",
    title: "AWS Data Ingestion Pipeline",
    category: "Cloud",
    difficulty: "Intermediate",
    hours: 15,
    skills: ["AWS", "S3", "Lambda", "Python"],
    description: "Construct a streaming data ingestion engine consuming API webhooks into Kinesis Data Streams, executing transformation Lambda functions, and writing Parquet files to S3.",
    outcomes: ["Process real-time streaming data with Kinesis", "Transform raw JSON into columnar Parquet format using PyArrow", "Partition S3 data lake storage by date"],
    prerequisites: ["Python data handling", "AWS stream concepts"],
    whyThisProject: "Fundamental pipeline pattern powering cloud data lakes and analytics workloads.",
    techStack: ["AWS Kinesis", "AWS Lambda", "AWS S3", "PyArrow", "Python"],
    milestones: [
      { title: "Kinesis Stream & Ingestion", description: "Create Kinesis Data Stream capturing incoming high-frequency data events." },
      { title: "Parquet Conversion & S3 Partitioning", description: "Batch transform events into Parquet format and store in date-partitioned S3 paths." }
    ]
  },
  {
    id: "event-driven-order-system",
    title: "Event-Driven Order System",
    category: "Cloud",
    difficulty: "Advanced",
    hours: 20,
    skills: ["AWS", "SQS", "SNS", "Lambda", "PostgreSQL"],
    description: "Build an e-commerce order processing system utilizing Saga orchestrations, transactional outbox patterns, and SQS/SNS messaging for distributed consistency.",
    outcomes: ["Implement Saga pattern for distributed transactions", "Enforce transactional outbox patterns to prevent dual-write bugs", "Handle order rollback compensations"],
    prerequisites: ["Microservices patterns", "AWS messaging"],
    whyThisProject: "Solves hard real-world problems around consistency in distributed e-commerce backends.",
    techStack: ["AWS Lambda", "AWS SQS", "AWS SNS", "PostgreSQL", "Python"],
    milestones: [
      { title: "Transactional Outbox Implementation", description: "Write orders and outbox events in a single local database transaction." },
      { title: "Saga Execution & Event Rollbacks", description: "Coordinate payment, inventory, and shipping steps via SQS/SNS events." }
    ]
  },

  // 3. Kubernetes / DevOps / SRE
  {
    id: "dockerize-web-app",
    title: "Dockerize a Web Application",
    category: "DevOps",
    difficulty: "Beginner",
    hours: 4,
    skills: ["Docker"],
    description: "Package a web application into an optimized, multi-stage Docker container image reducing security surface area and minimizing final image footprint.",
    outcomes: ["Write multi-stage Dockerfiles", "Optimize layer caching and eliminate unnecessary build artifacts", "Configure non-root container users for security"],
    prerequisites: ["Basic Linux commands"],
    whyThisProject: "The essential starting point for modern containerized DevOps and deployment workflows.",
    techStack: ["Docker", "Alpine Linux", "Python"],
    milestones: [
      { title: "Multi-Stage Dockerfile", description: "Build application assets in a builder stage and copy binaries to a minimal runtime image." },
      { title: "Container Hardening", description: "Enforce non-root execution user and health check instructions." }
    ]
  },
  {
    id: "docker-compose-microservices",
    title: "Docker Compose Microservices",
    category: "DevOps",
    difficulty: "Beginner",
    hours: 6,
    skills: ["Docker", "Docker Compose"],
    description: "Orchestrate a multi-container local stack featuring a FastAPI backend, PostgreSQL database, Redis cache, and Nginx proxy using Docker Compose.",
    outcomes: ["Define multi-container network dependencies and environment variables", "Configure persistent named volumes for databases", "Use health checks to manage startup order dependencies"],
    prerequisites: ["Docker basics"],
    whyThisProject: "Recreates complete multi-service production environments locally with a single command.",
    techStack: ["Docker", "Docker Compose", "FastAPI", "PostgreSQL", "Redis", "Nginx"],
    milestones: [
      { title: "Compose File Definition", description: "Specify service build contexts, internal networks, and environment configs." },
      { title: "Health Check Dependency Ordering", description: "Ensure web server delays startup until PostgreSQL passes health checks." }
    ]
  },
  {
    id: "deploy-fastapi-kubernetes",
    title: "Deploy FastAPI on Kubernetes",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Kubernetes", "Docker", "FastAPI"],
    description: "Deploy a production-ready FastAPI app onto a local Kubernetes cluster (minikube/kind) with Deployments, ClusterIP Services, Ingress controllers, and ConfigMaps.",
    outcomes: ["Write Kubernetes YAML manifests for Deployments & Services", "Manage app secrets & configuration via ConfigMaps and Secrets", "Configure Nginx Ingress routes for external traffic"],
    prerequisites: ["Docker basics", "Basic Kubernetes terminology"],
    whyThisProject: "Core hands-on Kubernetes container orchestration project for cloud native engineers.",
    techStack: ["Kubernetes", "minikube", "Docker", "FastAPI", "kubectl"],
    milestones: [
      { title: "Manifest Setup & Deployment", description: "Write Deployment and Service manifests with liveness/readiness probes." },
      { title: "Ingress & ConfigMap Integration", description: "Route HTTP host traffic through Ingress controller into pods." }
    ]
  },
  {
    id: "k8s-horizontal-autoscaler",
    title: "Kubernetes Horizontal Autoscaler",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Kubernetes", "Docker"],
    description: "Configure Kubernetes Horizontal Pod Autoscaler (HPA) driven by metrics-server to dynamically scale pod replicas during synthetic load tests.",
    outcomes: ["Deploy metrics-server to Kubernetes clusters", "Configure CPU/Memory target metrics in HPA manifests", "Execute load testing using hey/locust to observe pod scaling"],
    prerequisites: ["Kubernetes Deployment basics"],
    whyThisProject: "Teaches automated cloud elasticity and capacity management under fluctuating traffic.",
    techStack: ["Kubernetes", "HPA", "Metrics Server", "Locust"],
    milestones: [
      { title: "Metrics Server Deployment", description: "Install metrics-server to expose pod CPU/RAM metrics to the control plane." },
      { title: "HPA Target Configuration & Load Test", description: "Define scaling triggers (1 to 10 pods) and generate traffic load." }
    ]
  },
  {
    id: "k8s-monitoring-stack",
    title: "Kubernetes Monitoring Stack",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Kubernetes", "Prometheus", "Grafana"],
    description: "Deploy Prometheus Operator and Grafana onto a Kubernetes cluster via Helm charts to track node metrics, cluster CPU/Memory saturation, and container restart alerts.",
    outcomes: ["Deploy applications using Helm package manager", "Write Prometheus ServiceMonitor resources for custom scrapers", "Build interactive Grafana dashboards for cluster metrics"],
    prerequisites: ["Kubernetes basics", "Basic monitoring concepts"],
    whyThisProject: "The standard observability foundation deployed by SRE teams across enterprise Kubernetes clusters.",
    techStack: ["Kubernetes", "Prometheus Operator", "Grafana", "Helm"],
    milestones: [
      { title: "kube-prometheus-stack Deployment", description: "Deploy Prometheus and Grafana onto cluster using Helm." },
      { title: "Custom ServiceMonitor & Dashboards", description: "Scrape custom application metrics and display visual dashboards in Grafana." }
    ]
  },
  {
    id: "k8s-logging-stack",
    title: "Kubernetes Logging Stack",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Kubernetes", "Logging", "Docker"],
    description: "Implement centralized log aggregation on Kubernetes using Fluent Bit daemonsets to collect pod stdout logs and store them in Grafana Loki or Elasticsearch.",
    outcomes: ["Deploy DaemonSets across all Kubernetes cluster nodes", "Parse container log output formatting", "Query aggregated cluster logs via Grafana Loki"],
    prerequisites: ["Kubernetes manifests", "Log formats"],
    whyThisProject: "Centralized logging is essential for troubleshooting microservices distributed across dozens of nodes.",
    techStack: ["Kubernetes", "Fluent Bit", "Grafana Loki", "Grafana"],
    milestones: [
      { title: "Fluent Bit DaemonSet Setup", description: "Run log collector on every cluster node harvesting stdout streams." },
      { title: "Loki Storage & Querying", description: "Ship logs to Loki and execute LogQL queries in Grafana." }
    ]
  },
  {
    id: "cicd-github-actions",
    title: "CI/CD Pipeline with GitHub Actions",
    category: "DevOps",
    difficulty: "Beginner",
    hours: 6,
    skills: ["GitHub Actions", "CI/CD", "Docker"],
    description: "Build an automated CI/CD pipeline in GitHub Actions that runs unit tests, linting checks, builds Docker images, and pushes tagged images to Docker Hub.",
    outcomes: ["Write reusable GitHub Actions workflow YAML files", "Manage repository secret keys securely", "Implement automated pull request validation builds"],
    prerequisites: ["Git & GitHub basics", "Docker"],
    whyThisProject: "Fundamental automation skill for enforcing software quality gates on every commit.",
    techStack: ["GitHub Actions", "Docker", "pytest", "Ruff"],
    milestones: [
      { title: "Test & Lint Workflow Job", description: "Trigger pytest and linter jobs automatically on pull request creation." },
      { title: "Docker Build & Push Job", description: "Build and publish Docker images to registry upon merging to main branch." }
    ]
  },
  {
    id: "k8s-cicd-deployment",
    title: "Kubernetes CI/CD Deployment",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Kubernetes", "GitHub Actions", "Docker"],
    description: "Extend a CI/CD pipeline to automatically execute rolling deployments to a remote Kubernetes cluster using kubectl and kustomize upon code merge.",
    outcomes: ["Automate image tag updating using Kustomize", "Execute secure remote kubectl deployments from CI runners", "Implement rollback mechanisms on failed deployments"],
    prerequisites: ["Kubernetes manifests", "GitHub Actions"],
    whyThisProject: "Connects continuous integration directly to continuous deployment on container clusters.",
    techStack: ["GitHub Actions", "Kubernetes", "Kustomize", "Docker"],
    milestones: [
      { title: "Kustomize Image Manifest Update", description: "Patch deployment image tags dynamically in CI workflows." },
      { title: "Cluster Deployment & Rollout Status", description: "Apply manifests to cluster and verify `kubectl rollout status` succeeds." }
    ]
  },
  {
    id: "gitops-deployment-system",
    title: "GitOps Deployment System",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Kubernetes", "GitOps", "ArgoCD"],
    description: "Implement declarative GitOps cluster state synchronization using ArgoCD on Kubernetes, where git repository changes drive automated cluster state updates.",
    outcomes: ["Understand GitOps pull-based deployment paradigms vs push pipelines", "Install and configure ArgoCD Applications", "Automate cluster drift detection and auto-sync"],
    prerequisites: ["Kubernetes manifests", "Git workflows"],
    whyThisProject: "State-of-the-art deployment methodology adopted by modern cloud-native engineering teams.",
    techStack: ["Kubernetes", "ArgoCD", "Git", "Helm"],
    milestones: [
      { title: "ArgoCD Installation & App Creation", description: "Install ArgoCD controller and point to Git manifest repository." },
      { title: "Auto-Sync & Drift Reconciliation", description: "Demonstrate automated cluster reconciliation when manually tampering with live pods." }
    ]
  },
  {
    id: "terraform-aws-infrastructure",
    title: "Terraform AWS Infrastructure",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Terraform", "AWS"],
    description: "Provision modular AWS cloud infrastructure (VPC, EC2 instances, S3 buckets, security groups) declaratively using Infrastructure as Code (IaC) with Terraform.",
    outcomes: ["Write modular reusable HCL (HashiCorp Configuration Language) code", "Manage remote S3 backend state files with DynamoDB state locking", "Execute terraform plan and apply safely"],
    prerequisites: ["AWS basics", "Command line basics"],
    whyThisProject: "The industry standard for managing cloud infrastructure reproducibly via code.",
    techStack: ["Terraform", "AWS", "HCL"],
    milestones: [
      { title: "Modular VPC Definition", description: "Write reusable Terraform modules for subnets, internet gateways, and routes." },
      { title: "Remote State & Backend Locking", description: "Store state file in S3 with DynamoDB table state locking." }
    ]
  },
  {
    id: "terraform-k8s-infrastructure",
    title: "Terraform Kubernetes Infrastructure",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Terraform", "Kubernetes"],
    description: "Provision a managed Kubernetes cluster (AWS EKS / GCP GKE) completely via Terraform modules, including node groups, IAM roles, and Helm provider releases.",
    outcomes: ["Provision managed Kubernetes clusters (EKS/GKE) using Terraform", "Utilize Helm and Kubernetes providers within Terraform configurations", "Destroy and recreate complex cluster environments cleanly"],
    prerequisites: ["Terraform basics", "Kubernetes fundamentals"],
    whyThisProject: "Pairs cloud infrastructure provisioning with cluster creation in a single reproducible repo.",
    techStack: ["Terraform", "AWS EKS", "Kubernetes Provider", "Helm Provider"],
    milestones: [
      { title: "EKS Cluster Provisioning Module", description: "Define EKS control plane and worker node groups in HCL." },
      { title: "Provider Integration", description: "Bootstrap initial cluster Helm charts directly from Terraform execution." }
    ]
  },
  {
    id: "infrastructure-monitoring-dashboard",
    title: "Infrastructure Monitoring Dashboard",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Prometheus", "Grafana", "Docker"],
    description: "Deploy Prometheus, Node Exporter, and Grafana using Docker Compose to monitor host system CPU, disk I/O, memory usage, and network traffic metrics.",
    outcomes: ["Instrument host infrastructure with Prometheus Node Exporter", "Configure Prometheus alert rules for high disk usage / high CPU", "Design custom dashboard visual panels in Grafana"],
    prerequisites: ["Docker Compose basics"],
    whyThisProject: "Teaches how metrics are generated at the OS node level and transformed into actionable alerts.",
    techStack: ["Prometheus", "Grafana", "Node Exporter", "Docker Compose"],
    milestones: [
      { title: "Node Exporter Scraping", description: "Configure Prometheus to scrape node_exporter metrics every 15s." },
      { title: "Alertmanager Rules Setup", description: "Write alert rules for disk space exhaustion and memory thresholds." }
    ]
  },
  {
    id: "service-health-monitoring-system",
    title: "Service Health Monitoring System",
    category: "DevOps",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Prometheus", "Docker"],
    description: "Build an automated synthetic endpoint monitoring daemon in Python that checks target service latency/uptime and exposes custom Prometheus metrics.",
    outcomes: ["Write custom Prometheus metrics exporters using prometheus_client library", "Implement HTTP synthetic ping monitors with timeout handling", "Track p95/p99 latency histograms"],
    prerequisites: ["Python async", "HTTP protocol"],
    whyThisProject: "Demonstrates custom application instrumentation and blackbox synthetic testing.",
    techStack: ["Python", "prometheus_client", "httpx", "Docker"],
    milestones: [
      { title: "Synthetic Probe Worker", description: "Execute periodic HTTP requests to target endpoints and measure response timing." },
      { title: "Prometheus Metrics Exporter", description: "Expose `/metrics` endpoint returning counter and histogram metrics." }
    ]
  },
  {
    id: "distributed-tracing-demo",
    title: "Distributed Tracing Demo",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 15,
    skills: ["OpenTelemetry", "Docker", "Kubernetes"],
    description: "Instrument a polyglot microservice application with OpenTelemetry SDKs, collecting distributed traces via OpenTelemetry Collector and visualizing calls in Jaeger.",
    outcomes: ["Propagate trace contexts across HTTP headers (`traceparent`)", "Configure OpenTelemetry Collector pipelines", "Identify latency bottlenecks across microservice call graphs"],
    prerequisites: ["Microservices architecture", "Docker"],
    whyThisProject: "Distributed tracing is essential for debugging request flows across modern microservice topographies.",
    techStack: ["OpenTelemetry", "Jaeger", "Docker Compose", "Python", "Node.js"],
    milestones: [
      { title: "OpenTelemetry SDK Instrumentation", description: "Instrument HTTP clients and web routers to inject/extract W3C trace contexts." },
      { title: "Jaeger Trace Analysis", description: "View trace waterfalls in Jaeger UI to pinpoint service latency bottlenecks." }
    ]
  },
  {
    id: "incident-management-simulator",
    title: "Incident Management Simulator",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "Kubernetes", "Prometheus"],
    description: "Build a chaos engineering simulator that injects failure modes (network latency, pod crashes, memory leaks) into a test cluster and measures system resilience.",
    outcomes: ["Understand Chaos Engineering principles", "Programmatically interact with Kubernetes API via Python client", "Measure Mean Time To Detection (MTTD) and Recovery (MTTR)"],
    prerequisites: ["Python", "Kubernetes API basics"],
    whyThisProject: "SRE-focused project teaching chaos engineering and automated self-healing validation.",
    techStack: ["Python", "Kubernetes Client Library", "Chaos Mesh / Litmus", "Prometheus"],
    milestones: [
      { title: "Chaos Injection Scripts", description: "Write Python scripts killing target pods and introducing synthetic packet loss." },
      { title: "Resilience Metrics Collector", description: "Track recovery times and verify automated pod restart behavior." }
    ]
  },
  {
    id: "blue-green-deployment-system",
    title: "Blue-Green Deployment System",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Kubernetes", "CI/CD"],
    description: "Implement zero-downtime Blue-Green deployment strategy in Kubernetes by toggling Service selector labels between identical Blue and Green Deployment environments.",
    outcomes: ["Design zero-downtime Blue-Green deployment switching logic", "Perform instantaneous traffic cutovers via Kubernetes Services", "Automate rollback procedures when Green environment health checks fail"],
    prerequisites: ["Kubernetes Deployment & Service objects"],
    whyThisProject: "Essential deployment strategy for mission-critical web applications requiring zero downtime during releases.",
    techStack: ["Kubernetes", "kubectl", "GitHub Actions", "Bash"],
    milestones: [
      { title: "Blue/Green Manifest Setup", description: "Deploy parallel Blue and Green Deployments alongside a single routing Service." },
      { title: "Automated Switch & Rollback Script", description: "Script instant label selector switching with automated smoke-test verification." }
    ]
  },
  {
    id: "canary-deployment-system",
    title: "Canary Deployment System",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 18,
    skills: ["Kubernetes", "CI/CD", "Observability"],
    description: "Build a progressive Canary deployment mechanism using Istio / Argo Rollouts to route 5% -> 25% -> 100% of production traffic based on automated HTTP error rate metrics.",
    outcomes: ["Configure traffic splitting weights in Service Mesh (Istio / Linkerd)", "Automate progressive canary rollouts driven by Prometheus error rates", "Execute instant automatic rollbacks on error rate spikes"],
    prerequisites: ["Kubernetes networking", "Prometheus metrics"],
    whyThisProject: "Sophisticated deployment strategy used by high-velocity tech companies to minimize release risk.",
    techStack: ["Kubernetes", "Argo Rollouts", "Istio", "Prometheus"],
    milestones: [
      { title: "Argo Rollout Strategy Manifest", description: "Define step-weighted traffic shifts tied to metric analysis templates." },
      { title: "Automated Canary Promotion", description: "Observe real-time error rate verification promoting canary releases automatically." }
    ]
  },
  {
    id: "self-healing-kubernetes-service",
    title: "Self-Healing Kubernetes Service",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Kubernetes", "Python", "Prometheus"],
    description: "Develop a custom Kubernetes Operator in Python (Kopf framework) that watches Prometheus alerts and automatically remedies degraded application state.",
    outcomes: ["Build custom Kubernetes Operators using Python Kopf", "Consume Custom Resource Definitions (CRDs)", "Automate remediation actions (restarting pods, clearing caches, scaling)"],
    prerequisites: ["Python", "Kubernetes API & CRD concepts"],
    whyThisProject: "Advanced SRE automation project extending the Kubernetes control plane with custom self-healing logic.",
    techStack: ["Python", "Kopf Framework", "Kubernetes API", "Prometheus"],
    milestones: [
      { title: "Kopf Operator Initialization", description: "Write custom operator watching specialized Kubernetes CRD resources." },
      { title: "Remediation Event Loop", description: "Trigger automated pod replacement actions upon receiving Prometheus alert webhooks." }
    ]
  },
  {
    id: "local-k8s-cluster-platform",
    title: "Local Kubernetes Cluster Platform",
    category: "DevOps",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Kubernetes", "Linux", "Networking"],
    description: "Build a multi-node Kubernetes cluster from scratch on Linux VMs using `kubeadm`, configuring Containerd runtime, Calico CNI networking, and storage provisioners.",
    outcomes: ["Understand Kubernetes control plane components (etcd, kube-apiserver, scheduler)", "Install and configure CNI (Container Network Interface) plugins", "Manage cluster certificates and control plane bootstrapping"],
    prerequisites: ["Linux system administration", "Networking fundamentals"],
    whyThisProject: "Deepens foundational understanding of how Kubernetes control planes operate under the hood.",
    techStack: ["Kubernetes", "kubeadm", "Containerd", "Calico CNI", "Linux"],
    milestones: [
      { title: "Control Plane Bootstrapping", description: "Initialize etcd and apiserver on control plane node using kubeadm." },
      { title: "CNI & Worker Node Joining", description: "Install Calico CNI and join worker nodes to establish pod-to-pod networking." }
    ]
  },

  // 4. Systems & Distributed Systems
  {
    id: "tcp-chat-server",
    title: "TCP Chat Server",
    category: "Systems",
    difficulty: "Beginner",
    hours: 6,
    skills: ["Python", "Networking", "TCP"],
    description: "Build a multi-user CLI chat server using raw Python TCP socket programming and non-blocking I/O or multi-threading.",
    outcomes: ["Understand low-level socket bind, listen, accept primitives", "Manage concurrent TCP client socket connections", "Implement custom protocol framing"],
    prerequisites: ["Python basics"],
    whyThisProject: "Foundational networking project demonstrating raw socket operations and concurrency.",
    techStack: ["Python", "socket", "threading"],
    milestones: [
      { title: "Socket Server Loop", description: "Bind socket to port and handle concurrent incoming connections with threads." },
      { title: "Broadcast Engine", description: "Maintain active connection list and broadcast incoming messages to all connected clients." }
    ]
  },
  {
    id: "http-server-from-scratch",
    title: "HTTP Server from Scratch",
    category: "Systems",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "HTTP", "Networking"],
    description: "Build an HTTP/1.1 web server from scratch over TCP sockets without using external web framework libraries, handling request parsing and response header formatting.",
    outcomes: ["Parse raw HTTP request strings (method, path, headers, body)", "Format compliant HTTP/1.1 response status headers", "Serve static files and handle 404 errors"],
    prerequisites: ["Python socket programming", "HTTP specification"],
    whyThisProject: "Demystifies how modern web servers like Nginx or Uvicorn operate at the network protocol layer.",
    techStack: ["Python", "socket", "HTTP/1.1 RFC"],
    milestones: [
      { title: "HTTP Request Parser", description: "Parse byte streams from sockets into structured method, header, and path objects." },
      { title: "Response Formatter & Static File Server", description: "Construct HTTP status responses and stream file bytes back over TCP." }
    ]
  },
  {
    id: "reverse-proxy",
    title: "Reverse Proxy",
    category: "Systems",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Networking", "HTTP"],
    description: "Construct a multithreaded reverse proxy server routing incoming HTTP requests to backend target servers with header rewriting and response streaming.",
    outcomes: ["Understand reverse proxy routing & header manipulation", "Forward TCP streams between client and upstream target servers", "Implement basic round-robin upstream load balancing"],
    prerequisites: ["Sockets", "HTTP protocol"],
    whyThisProject: "Teaches core infrastructure patterns used in Nginx, HAProxy, and cloud load balancers.",
    techStack: ["Python", "socket", "asyncio"],
    milestones: [
      { title: "Traffic Forwarding Engine", description: "Receive client TCP streams and forward to designated upstream backend servers." },
      { title: "Header Injection & Upstream Health Check", description: "Inject `X-Forwarded-For` headers and prune unreachable upstream nodes." }
    ]
  },
  {
    id: "load-balancer",
    title: "Load Balancer",
    category: "Systems",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Networking", "HTTP", "Distributed Systems"],
    description: "Design a Layer 4 and Layer 7 load balancer featuring Round-Robin, Least Connections, and IP Hash load distribution strategies alongside active health checking.",
    outcomes: ["Implement Layer 4 (TCP) vs Layer 7 (HTTP) routing algorithms", "Execute active health check probes to detect failed backends", "Evaluate throughput metrics under high connection concurrency"],
    prerequisites: ["Networking", "Systems programming concepts"],
    whyThisProject: "Crucial infrastructure project exploring traffic management and high-availability systems.",
    techStack: ["Python", "socket", "asyncio"],
    milestones: [
      { title: "Routing Algorithm Engine", description: "Implement Round-Robin and Least-Connections selection logic." },
      { title: "Active Health Checker Daemon", description: "Poll backend nodes periodically and remove failed instances from active pools." }
    ]
  },
  {
    id: "key-value-store",
    title: "Key-Value Store",
    category: "Systems",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "Data Structures", "Storage"],
    description: "Implement a disk-backed key-value database using append-only log files (Write-Ahead Logging), in-memory hash index (hash index/memtable), and log compaction.",
    outcomes: ["Understand Write-Ahead Logging (WAL) for durability", "Implement in-memory index pointer structures", "Perform background log compaction & segment merging"],
    prerequisites: ["Python data structures", "File I/O"],
    whyThisProject: "Demonstrates core database engine storage fundamentals powering Bitcask and LSM-trees.",
    techStack: ["Python", "File I/O", "Data Structures"],
    milestones: [
      { title: "Append-Only WAL Engine", description: "Write key-value mutations sequentially to disk log files." },
      { title: "Memtable & Log Compactor", description: "Maintain in-memory byte offset pointers and merge stale log records periodically." }
    ]
  },
  {
    id: "redis-like-cache",
    title: "Redis-Like Cache",
    category: "Systems",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "Networking", "Data Structures"],
    description: "Build an in-memory database server implementing the RESP (Redis Serialization Protocol) with TTL key expiration, LRU eviction, and pub/sub channels.",
    outcomes: ["Parse custom network protocols (RESP)", "Implement LRU (Least Recently Used) cache eviction using doubly linked lists", "Manage timer event loops for TTL key expirations"],
    prerequisites: ["Data structures", "Network protocols"],
    whyThisProject: "High-impact project replicating the inner workings of Redis.",
    techStack: ["Python", "asyncio", "Custom Data Structures"],
    milestones: [
      { title: "RESP Protocol Parser", description: "Decode incoming RESP arrays and bulk strings over TCP sockets." },
      { title: "LRU Eviction & Expiration Engine", description: "Maintain doubly-linked list with hash map for O(1) LRU eviction when memory caps trigger." }
    ]
  },
  {
    id: "distributed-key-value-store",
    title: "Distributed Key-Value Store",
    category: "Systems",
    difficulty: "Advanced",
    hours: 25,
    skills: ["Distributed Systems", "Networking"],
    description: "Architect a fault-tolerant distributed key-value database using Consistent Hashing for data partitioning and vector clocks for eventual consistency conflict resolution.",
    outcomes: ["Implement Consistent Hashing hash rings with virtual nodes", "Understand Vector Clocks & eventual consistency model", "Handle node joins, leaves, and re-replication"],
    prerequisites: ["Advanced distributed systems & networking"],
    whyThisProject: "Deep dive into distributed database principles inspired by Amazon Dynamo.",
    techStack: ["Python", "asyncio", "Consistent Hashing Algorithm"],
    milestones: [
      { title: "Consistent Hash Ring", description: "Map keys to node rings with virtual node replicas for balanced distribution." },
      { title: "Replication & Conflict Resolution", description: "Replicate writes to N successor nodes and resolve conflicts via vector clocks." }
    ]
  },
  {
    id: "leader-election-simulator",
    title: "Leader Election Simulator",
    category: "Systems",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Distributed Systems", "Networking"],
    description: "Build a distributed node cluster implementing Bully and Ring leader election algorithms to elect new cluster primaries during node failures.",
    outcomes: ["Understand distributed leader election mechanics", "Simulate network partitions and node failure events", "Implement heartbeat timeouts"],
    prerequisites: ["Distributed systems basics"],
    whyThisProject: "Teaches fundamental consensus and primary node selection algorithms.",
    techStack: ["Python", "asyncio", "Networking"],
    milestones: [
      { title: "Heartbeat Failure Detector", description: "Detect node crashes via missing heartbeat interval timers." },
      { title: "Bully Election Protocol", description: "Execute election message rounds to select the active node with highest ID." }
    ]
  },
  {
    id: "raft-consensus-simulator",
    title: "Raft Consensus Simulator",
    category: "Systems",
    difficulty: "Advanced",
    hours: 25,
    skills: ["Distributed Systems", "Algorithms"],
    description: "Implement the Raft consensus algorithm in Python covering Leader Election, Log Replication, Safety guarantees, and cluster membership changes.",
    outcomes: ["Master Raft consensus algorithm state transitions (Follower, Candidate, Leader)", "Implement atomic replicated state machines", "Guarantee log consistency across network partitions"],
    prerequisites: ["Advanced algorithms & concurrency"],
    whyThisProject: "The gold standard implementation project for distributed systems engineers.",
    techStack: ["Python", "asyncio", "Raft Protocol"],
    milestones: [
      { title: "Leader Election State Machine", description: "Implement randomized election timers, candidate request-vote RPCs, and term increments." },
      { title: "Log Replication Engine", description: "Append entry RPCs with log consistency checks and majority quorum commits." }
    ]
  },
  {
    id: "message-broker",
    title: "Message Broker",
    category: "Systems",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "Networking", "Distributed Systems"],
    description: "Build a distributed publish-subscribe message broker supporting topic partitioning, consumer group offset management, and disk persistence like Apache Kafka.",
    outcomes: ["Design partition-based append log storage", "Manage consumer group offset tracking", "Implement zero-copy file transmission concepts"],
    prerequisites: ["Systems programming", "File I/O"],
    whyThisProject: "Understands the internal streaming primitives of Apache Kafka.",
    techStack: ["Python", "File Storage", "TCP Sockets"],
    milestones: [
      { title: "Partitioned Segment Log", description: "Write published messages to partitioned disk log files with index offsets." },
      { title: "Consumer Group Offset Manager", description: "Track committed offsets per consumer group and handle rebalances." }
    ]
  },
  {
    id: "mini-database-engine",
    title: "Mini Database Engine",
    category: "Systems",
    difficulty: "Advanced",
    hours: 25,
    skills: ["Python", "Storage", "Data Structures"],
    description: "Implement a simplified relational database engine featuring a SQL lexer/parser, B+ Tree index structures, buffer pool manager, and execution planner.",
    outcomes: ["Write SQL lexer & AST parser", "Implement disk-based B+ Tree node splitting & merging", "Manage fixed-size page buffer pools in memory"],
    prerequisites: ["Data structures & algorithms"],
    whyThisProject: "Exposes every core subsystem of relational database engines like SQLite and PostgreSQL.",
    techStack: ["Python", "B+ Tree Data Structure", "Binary File Parsing"],
    milestones: [
      { title: "B+ Tree Storage Engine", description: "Construct disk-backed B+ Tree node structures for index search & inserts." },
      { title: "SQL Query Parser & Execution Plan", description: "Parse simple SELECT/INSERT SQL queries into execution operator trees." }
    ]
  },
  {
    id: "file-system-simulator",
    title: "File System Simulator",
    category: "Systems",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Operating Systems", "Storage"],
    description: "Design a virtual file system simulator managing inode allocations, directory entries, data block allocation bitmaps, and indirect pointers on a virtual disk file.",
    outcomes: ["Understand UNIX-style inode metadata structures", "Manage free block bitwise allocation maps", "Implement directory lookup & file read/write operations"],
    prerequisites: ["C/Python", "Bitwise operations"],
    whyThisProject: "Classic Operating Systems project explaining how files are structured on physical storage.",
    techStack: ["Python/C", "Binary File I/O"],
    milestones: [
      { title: "Superblock & Inode Allocation", description: "Format virtual disk image with Superblock, Inode tables, and Bitmaps." },
      { title: "Directory & File Operations", description: "Implement file creation, block allocation, directory traversing, and deletion." }
    ]
  },
  {
    id: "process-scheduler-simulator",
    title: "Process Scheduler Simulator",
    category: "Systems",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Operating Systems", "Algorithms"],
    description: "Simulate operating system process CPU scheduling algorithms (First-Come First-Served, Shortest Job First, Round Robin, Multi-Level Feedback Queue).",
    outcomes: ["Calculate turnaround time, wait time, and CPU utilization metrics", "Simulate preemptive vs non-preemptive context switches", "Implement MLFQ priority queues"],
    prerequisites: ["Data structures", "OS concepts"],
    whyThisProject: "Visualizes how OS kernels schedule computing processes across CPU cores.",
    techStack: ["Python", "Priority Queues"],
    milestones: [
      { title: "Scheduler Engine", description: "Simulate clock cycles executing CPU burst time queues." },
      { title: "Metrics Analysis", description: "Output comparative chart metrics comparing Round Robin vs MLFQ performance." }
    ]
  },
  {
    id: "memory-allocator",
    title: "Memory Allocator",
    category: "Systems",
    difficulty: "Advanced",
    hours: 15,
    skills: ["C", "Memory Management", "Operating Systems"],
    description: "Write a custom C memory allocator implementing `malloc()`, `free()`, and `realloc()` using explicit free lists, memory block splitting, and coalescing.",
    outcomes: ["Understand heap pointer arithmetic and alignment", "Manage boundary tag memory block headers/footers", "Implement free list block splitting & coalescing"],
    prerequisites: ["C programming", "Pointers"],
    whyThisProject: "Essential systems programming project demonstrating how dynamic memory is managed at the OS level.",
    techStack: ["C", "sbrk/mmap", "GCC"],
    milestones: [
      { title: "Block Header & Split Logic", description: "Format heap memory chunks with boundary headers and split oversized blocks." },
      { title: "Free List Coalescing", description: "Merge adjacent freed memory blocks to prevent heap fragmentation." }
    ]
  },
  {
    id: "linux-shell",
    title: "Linux Shell",
    category: "Systems",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["C", "Linux", "Operating Systems"],
    description: "Build a custom Unix shell in C supporting command parsing, process execution via `fork()` & `execvp()`, I/O redirection (`>`, `<`), and pipeline chaining (`|`).",
    outcomes: ["Master Unix process creation primitives (`fork`, `exec`, `waitpid`)", "Implement file descriptor redirection using `dup2()`", "Construct inter-process communication pipelines using `pipe()`"],
    prerequisites: ["C programming", "Linux basics"],
    whyThisProject: "Classic systems software project revealing how terminal shells execute commands.",
    techStack: ["C", "POSIX APIs", "GCC"],
    milestones: [
      { title: "Command Parser & Process Execution", description: "Tokenize input lines and execute commands using `fork()` and `execvp()`." },
      { title: "Pipes & File Redirection", description: "Wire stdin/stdout streams across piped process chains using `pipe()` and `dup2()`." }
    ]
  },
  {
    id: "container-runtime-scratch",
    title: "Container Runtime from Scratch",
    category: "Systems",
    difficulty: "Advanced",
    hours: 25,
    skills: ["Linux", "Containers", "Operating Systems"],
    description: "Construct a lightweight Linux container runtime from scratch using Linux namespaces (PID, mount, net), cgroups for resource limits, and `chroot`/overlayfs.",
    outcomes: ["Isolate processes using Linux Namespaces (`unshare`/`clone`)", "Restrict CPU & Memory usage via cgroups v2", "Mount root filesystems using OverlayFS"],
    prerequisites: ["C/Go/Python on Linux", "Advanced OS concepts"],
    whyThisProject: "Understands the low-level Linux kernel primitives powering Docker and runc.",
    techStack: ["Linux", "C/Go", "Namespaces", "Cgroups v2"],
    milestones: [
      { title: "Namespace Isolation Setup", description: "Spawn isolated processes in new PID, mount, and UTS namespaces." },
      { title: "Cgroup Memory & CPU Limits", description: "Create cgroup v2 controllers enforcing max memory thresholds on child processes." }
    ]
  },

  // 5. AI / ML
  {
    id: "spam-classifier",
    title: "Spam Classifier",
    category: "AI/ML",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "Machine Learning"],
    description: "Train a Naive Bayes text classification model to categorize emails and messages as spam vs ham using TF-IDF vectorization.",
    outcomes: ["Clean and preprocess natural language text", "Apply TF-IDF feature extraction", "Evaluate precision, recall, and F1-score"],
    prerequisites: ["Python basics"],
    whyThisProject: "Classic introductory machine learning project for natural language processing.",
    techStack: ["Python", "scikit-learn", "Pandas", "NLTK"],
    milestones: [
      { title: "Text Preprocessing & TF-IDF", description: "Tokenize text, remove stop words, and generate TF-IDF feature matrices." },
      { title: "Model Training & Evaluation", description: "Train Multinomial Naive Bayes and evaluate confusion matrix." }
    ]
  },
  {
    id: "movie-recommendation-system",
    title: "Movie Recommendation System",
    category: "AI/ML",
    difficulty: "Beginner",
    hours: 8,
    skills: ["Python", "Machine Learning", "Recommender Systems"],
    description: "Build collaborative filtering and content-based recommendation engines using matrix factorization (SVD) and cosine similarity.",
    outcomes: ["Implement content-based metadata filtering", "Build user-item rating matrix factorization models", "Calculate Top-K personalized recommendations"],
    prerequisites: ["Python", "NumPy basics"],
    whyThisProject: "Fundamental algorithm project powering recommendation platforms like Netflix and Spotify.",
    techStack: ["Python", "scikit-learn", "Pandas", "Surprise"],
    milestones: [
      { title: "Content-Based Similarity", description: "Compute pairwise cosine similarity across movie genre & plot metadata." },
      { title: "Collaborative Filtering Engine", description: "Train SVD model on user rating matrices to predict unrated movie scores." }
    ]
  },
  {
    id: "house-price-predictor",
    title: "House Price Predictor",
    category: "AI/ML",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "Machine Learning"],
    description: "Develop a regression model (Ridge, Random Forest, XGBoost) predicting real estate market prices from tabular feature sets.",
    outcomes: ["Perform feature engineering & one-hot encoding", "Handle missing data imputation", "Evaluate RMSE and R2 metrics"],
    prerequisites: ["Python", "Pandas"],
    whyThisProject: "Standard supervised regression workflow for tabular data science.",
    techStack: ["Python", "scikit-learn", "Pandas", "XGBoost"],
    milestones: [
      { title: "Feature Engineering Pipeline", description: "Encode categorical variables and scale numerical features." },
      { title: "Model Hyperparameter Tuning", description: "Cross-validate Random Forest & XGBoost regressor models." }
    ]
  },
  {
    id: "customer-churn-predictor",
    title: "Customer Churn Predictor",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "Machine Learning", "Pandas"],
    description: "Build an end-to-end customer churn prediction pipeline with class imbalance handling (SMOTE), feature importance analysis, and model explainability (SHAP).",
    outcomes: ["Address class imbalance using SMOTE resampling", "Calculate SHAP values for model feature attribution", "Build predictive customer churn risk alerts"],
    prerequisites: ["Python", "scikit-learn"],
    whyThisProject: "High-value enterprise business analytics problem in subscription SaaS.",
    techStack: ["Python", "scikit-learn", "SHAP", "IMBLearn"],
    milestones: [
      { title: "SMOTE Resampling & Training", description: "Balance dataset classes and train Gradient Boosting Classifier." },
      { title: "SHAP Model Attribution", description: "Generate SHAP waterfall plots explaining key churn indicators." }
    ]
  },
  {
    id: "image-classification-model",
    title: "Image Classification Model",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "PyTorch", "Computer Vision"],
    description: "Train a Convolutional Neural Network (CNN) in PyTorch using transfer learning (ResNet50) to classify custom image datasets.",
    outcomes: ["Understand Convolutional Neural Network layers", "Fine-tune pre-trained models via Transfer Learning", "Apply data augmentation pipelines (data transforms)"],
    prerequisites: ["Python", "Linear algebra concepts"],
    whyThisProject: "Core Deep Learning project establishing computer vision fundamentals.",
    techStack: ["Python", "PyTorch", "torchvision"],
    milestones: [
      { title: "Data Augmentation & Loader", description: "Build PyTorch Dataset and DataLoader with random flips and color jitter." },
      { title: "Transfer Learning Training Loop", description: "Fine-tune ResNet50 backbone on custom dataset and monitor validation loss." }
    ]
  },
  {
    id: "object-detection-app",
    title: "Object Detection App",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "PyTorch", "Computer Vision"],
    description: "Deploy a real-time object detection inference service using YOLOv8 or Faster R-CNN for video stream bounding box annotations.",
    outcomes: ["Process video frames with OpenCV", "Execute real-time object detection inference", "Draw labeled bounding boxes and confidence scores"],
    prerequisites: ["PyTorch basics", "OpenCV"],
    whyThisProject: "Practical computer vision application for autonomous systems and video analysis.",
    techStack: ["Python", "PyTorch", "YOLOv8", "OpenCV"],
    milestones: [
      { title: "YOLO Inference Pipeline", description: "Load pre-trained YOLO weights and run inference on image frames." },
      { title: "Real-Time Video Stream Processor", description: "Process live webcam/video feeds and draw bounding box overlays." }
    ]
  },
  {
    id: "sentiment-analysis-api",
    title: "Sentiment Analysis API",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "NLP", "FastAPI"],
    description: "Expose a fine-tuned Hugging Face DistilBERT model as a high-throughput REST API using FastAPI for real-time text sentiment scoring.",
    outcomes: ["Serve Hugging Face Transformer models", "Optimize model inference speed with batching", "Build FastAPI endpoints for sentiment analytics"],
    prerequisites: ["FastAPI", "NLP basics"],
    whyThisProject: "Bridges modern transformer-based NLP with backend API deployment.",
    techStack: ["Python", "Hugging Face Transformers", "FastAPI", "PyTorch"],
    milestones: [
      { title: "Transformer Pipeline Integration", description: "Load DistilBERT pipeline for sentiment classification." },
      { title: "FastAPI Batch Inference Endpoint", description: "Accept list of text payloads and return batch sentiment scores." }
    ]
  },
  {
    id: "resume-skill-extractor",
    title: "Resume Skill Extractor",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "NLP", "Sentence Transformers"],
    description: "Build a natural language processing pipeline using spaCy entity recognition and Sentence Transformers to extract and classify skills from raw resume text.",
    outcomes: ["Extract Named Entities using spaCy rules & NER", "Compute sentence embeddings with Sentence Transformers", "Map free-text skills to a canonical skill taxonomy"],
    prerequisites: ["Python", "NLP fundamentals"],
    whyThisProject: "Directly powers HR tech platforms, job matching engines, and skill gap tools.",
    techStack: ["Python", "spaCy", "sentence-transformers", "scikit-learn"],
    milestones: [
      { title: "NER & Pattern Matching", description: "Extract candidate skill phrases using spaCy entity rules." },
      { title: "Semantic Embedding Mapping", description: "Map extracted phrases to canonical skill taxonomy via vector similarity." }
    ]
  },
  {
    id: "semantic-search-engine",
    title: "Semantic Search Engine",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "Embeddings", "Vector Databases"],
    description: "Create a vector semantic search engine using sentence-transformers and Qdrant/FAISS for dense retrieval over document collections.",
    outcomes: ["Generate dense vector embeddings for documents", "Index vectors into FAISS / Qdrant vector databases", "Execute ANN (Approximate Nearest Neighbor) similarity search"],
    prerequisites: ["Python", "Vector concepts"],
    whyThisProject: "Core information retrieval pattern replacing simple keyword search with semantic intent matching.",
    techStack: ["Python", "sentence-transformers", "FAISS", "Qdrant"],
    milestones: [
      { title: "Document Embedding Pipeline", description: "Chunk text files and encode into 384-dimensional dense vectors." },
      { title: "FAISS Index & Query API", description: "Build FAISS index for sub-millisecond similarity search queries." }
    ]
  },
  {
    id: "document-similarity-engine",
    title: "Document Similarity Engine",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "NLP", "Embeddings"],
    description: "Develop a document comparison tool computing pairwise semantic similarity scores, highlighting shared concepts and unique content blocks.",
    outcomes: ["Compute document-level embeddings", "Calculate cosine similarity matrices across text corpora", "Generate semantic diff visualizations"],
    prerequisites: ["Python NLP"],
    whyThisProject: "Useful for plagiarism detection, contract comparison, and content duplicate detection.",
    techStack: ["Python", "sentence-transformers", "scikit-learn"],
    milestones: [
      { title: "Embedding Aggregation Engine", description: "Generate pooled sentence embeddings for full document bodies." },
      { title: "Pairwise Matrix Comparison", description: "Output similarity heatmaps across multi-document sets." }
    ]
  },
  {
    id: "rag-question-answering-api",
    title: "RAG Question Answering API",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 15,
    skills: ["Python", "RAG", "Embeddings", "FastAPI"],
    description: "Build a Retrieval-Augmented Generation (RAG) backend combining vector search (FAISS/ChromaDB) with LLM generation to answer questions over custom PDF knowledge bases.",
    outcomes: ["Implement RAG (Retrieval-Augmented Generation) architectures", "Chunk documents with semantic overlap strategies", "Inject relevant context retrieved from vector stores into LLM prompts"],
    prerequisites: ["Python", "FastAPI", "Vector DB basics"],
    whyThisProject: "The premier AI engineering architecture pattern deployed across enterprise knowledge bases.",
    techStack: ["Python", "FastAPI", "ChromaDB", "sentence-transformers", "LangChain/LlamaIndex"],
    milestones: [
      { title: "PDF Ingestion & Chunking", description: "Extract text from PDFs, split into overlapping chunks, and store in ChromaDB." },
      { title: "RAG Query Endpoint", description: "Retrieve top-K matching context chunks and assemble prompt for LLM completion." }
    ]
  },
  {
    id: "local-rag-system",
    title: "Local RAG System",
    category: "AI/ML",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "LLMs", "RAG", "Vector Databases"],
    description: "Construct a 100% offline, privacy-first local RAG system running local LLMs (Ollama / Llama.cpp) and local vector embeddings without external API keys.",
    outcomes: ["Run local LLMs using Ollama / llama.cpp", "Build fully offline vector retrieval pipelines", "Ensure data privacy for sensitive local documents"],
    prerequisites: ["RAG architecture", "Local LLM setup"],
    whyThisProject: "High demand for privacy-compliant AI systems operating in healthcare, finance, and legal domains.",
    techStack: ["Python", "Ollama", "ChromaDB", "sentence-transformers"],
    milestones: [
      { title: "Ollama Integration", description: "Connect Python backend to local Ollama instance running Llama 3 / Mistral." },
      { title: "Local Pipeline Execution", description: "Perform complete retrieval and generation cycle locally on GPU/CPU." }
    ]
  },
  {
    id: "ai-agent-with-tools",
    title: "AI Agent with Tools",
    category: "AI/ML",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "LLMs", "Agents", "APIs"],
    description: "Build an autonomous AI agent capable of tool calling (web search, Python code execution, API querying) using ReAct reasoning loops.",
    outcomes: ["Implement ReAct (Reason + Act) agent execution loops", "Define structured function schemas for LLM tool calling", "Handle agent error recovery and loop termination"],
    prerequisites: ["Python", "LLM APIs"],
    whyThisProject: "Represents the next frontier of AI application development beyond simple chat interfaces.",
    techStack: ["Python", "LangChain / CrewAI", "DuckDuckGo Search API"],
    milestones: [
      { title: "Tool Definition & Schemas", description: "Expose calculator, web search, and database lookup tools to the agent." },
      { title: "ReAct Execution Loop", description: "Implement thought-action-observation loop until final answer is derived." }
    ]
  },
  {
    id: "multi-agent-research-system",
    title: "Multi-Agent Research System",
    category: "AI/ML",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "LLMs", "Agents"],
    description: "Design a multi-agent system where specialized researcher, writer, and editor agents collaborate asynchronously to produce in-depth research reports.",
    outcomes: ["Architect multi-agent orchestration workflows", "Pass structured state between specialized AI agents", "Implement human-in-the-loop review steps"],
    prerequisites: ["AI Agents", "Python async"],
    whyThisProject: "Cutting-edge AI engineering pattern for automating complex multi-step knowledge workflows.",
    techStack: ["Python", "CrewAI / LangGraph", "FastAPI"],
    milestones: [
      { title: "Agent Role Definition", description: "Configure Researcher, Content Planner, Writer, and Reviewer agents." },
      { title: "Graph Workflow Execution", description: "Execute state graph passing output artifacts between agents to produce final markdown report." }
    ]
  },
  {
    id: "llm-evaluation-framework",
    title: "LLM Evaluation Framework",
    category: "AI/ML",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "LLMs", "Evaluation"],
    description: "Create an automated testing and evaluation suite measuring RAG faithfulness, answer relevance, hallucination rates, and latency across prompt iterations.",
    outcomes: ["Calculate automated RAG metrics (Faithfulness, Answer Relevancy, Context Recall)", "Build benchmark test datasets", "Visualize performance regression across prompt versions"],
    prerequisites: ["RAG systems", "Python data analysis"],
    whyThisProject: "Essential quality engineering framework for moving LLM prototypes safely into production.",
    techStack: ["Python", "Ragas", "DeepEval", "Pandas"],
    milestones: [
      { title: "Evaluation Dataset Curation", description: "Assemble ground-truth question, context, and ground-truth answer test cases." },
      { title: "Automated Metric Scoring", description: "Run evaluation runs measuring context relevancy and hallucination rates." }
    ]
  },
  {
    id: "prompt-testing-platform",
    title: "Prompt Testing Platform",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "LLMs", "APIs"],
    description: "Build a developer playground for running side-by-side prompt variations across different LLM providers (OpenAI, Anthropic, local) with cost/latency tracking.",
    outcomes: ["Unify API clients across multiple LLM providers", "Calculate token cost estimations per request", "Compare side-by-side response metrics"],
    prerequisites: ["Python", "Web APIs"],
    whyThisProject: "Valuable developer productivity tool for AI application teams.",
    techStack: ["Python", "FastAPI", "LiteLLM"],
    milestones: [
      { title: "Unified LLM Gateway", description: "Wrap OpenAI, Anthropic, and Ollama APIs under a single standardized interface." },
      { title: "Comparative Evaluation UI", description: "Run parallel prompts and return latency, token counts, and cost estimates." }
    ]
  },
  {
    id: "ai-document-processing-pipeline",
    title: "AI Document Processing Pipeline",
    category: "AI/ML",
    difficulty: "Advanced",
    hours: 18,
    skills: ["Python", "OCR", "NLP", "LLMs"],
    description: "Build an Intelligent Document Processing (IDP) pipeline combining OCR (Tesseract / PaddleOCR), layout analysis, and LLMs to extract structured JSON from complex invoices and forms.",
    outcomes: ["Perform OCR layout extraction on scanned PDFs", "Parse complex multi-column tables and key-value forms", "Validate extracted JSON against Pydantic schemas"],
    prerequisites: ["Python", "OCR & NLP basics"],
    whyThisProject: "High-value enterprise AI application in financial services and logistics.",
    techStack: ["Python", "PaddleOCR", "pdf2image", "Pydantic"],
    milestones: [
      { title: "OCR Layout Extraction", description: "Convert PDF pages to high-res images and extract text bounding boxes." },
      { title: "Structured Schema Extraction", description: "Pass structured OCR layout blocks to LLM to produce validated JSON output." }
    ]
  },
  {
    id: "semantic-resume-matcher",
    title: "Semantic Resume Matcher",
    category: "AI/ML",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "NLP", "Embeddings"],
    description: "Build a semantic resume-to-job-description matching engine utilizing sentence-transformer embeddings to score candidate fit beyond exact keyword matches.",
    outcomes: ["Generate vector representations for resumes and job descriptions", "Calculate semantic similarity scores", "Identify missing domain skill gaps automatically"],
    prerequisites: ["Python", "NLP concepts"],
    whyThisProject: "Identical underlying engine powering modern intelligent recruitment platforms.",
    techStack: ["Python", "sentence-transformers", "scikit-learn", "FastAPI"],
    milestones: [
      { title: "Skill & Experience Embedder", description: "Encode candidate profiles and job requirements into high-dimensional vector spaces." },
      { title: "Semantic Gap Detection API", description: "Compute cosine distance and output detailed match percentage & skill gaps." }
    ]
  },

  // 6. Data Engineering
  {
    id: "csv-data-pipeline",
    title: "CSV Data Pipeline",
    category: "Data Engineering",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "Pandas"],
    description: "Build an automated data ingestion and cleaning script processing messy multi-file CSV datasets with schema validation, deduplication, and export.",
    outcomes: ["Clean and normalize raw data with Pandas", "Implement data validation rules", "Automate batch file processing"],
    prerequisites: ["Python basics"],
    whyThisProject: "The fundamental starting point for all data engineering and data science workflows.",
    techStack: ["Python", "Pandas"],
    milestones: [
      { title: "Data Cleaning & Normalization", description: "Parse dirty CSV files, drop duplicates, and fix mismatched date formats." },
      { title: "Automated Export", description: "Save validated datasets into clean Parquet and CSV output directories." }
    ]
  },
  {
    id: "etl-pipeline",
    title: "ETL Pipeline",
    category: "Data Engineering",
    difficulty: "Beginner",
    hours: 6,
    skills: ["Python", "SQL", "ETL"],
    description: "Construct a modular Extract, Transform, Load (ETL) pipeline extracting data from public REST APIs, transforming records, and loading into a SQL database.",
    outcomes: ["Understand Extract, Transform, Load architecture", "Perform relational database data insertion via SQL", "Implement idempotent execution pipelines"],
    prerequisites: ["Python", "SQL basics"],
    whyThisProject: "The core workload executed daily by data engineers across every industry.",
    techStack: ["Python", "SQLite / PostgreSQL", "SQLAlchemy", "httpx"],
    milestones: [
      { title: "API Extractor & Transformer", description: "Fetch JSON records from public REST API and clean schema fields." },
      { title: "SQL Database Loader", description: "Load transformed records idempotently into relational database tables." }
    ]
  },
  {
    id: "data-warehouse-pipeline",
    title: "Data Warehouse Pipeline",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "SQL", "Data Warehousing"],
    description: "Build a dimensional data warehouse model (Star Schema with Fact & Dimension tables) and populate it using dbt (data build tool) or Python transformations.",
    outcomes: ["Model Star Schema data structures (Facts vs Dimensions)", "Write dbt transformation models & tests", "Understand OLAP vs OLTP database usage"],
    prerequisites: ["SQL proficiency", "Python"],
    whyThisProject: "Core data architecture pattern for corporate business intelligence and analytics reporting.",
    techStack: ["Python", "DuckDB / PostgreSQL", "dbt", "SQL"],
    milestones: [
      { title: "Star Schema Modeling", description: "Design Fact and Dimension tables for business analytical queries." },
      { title: "dbt Transformation Models", description: "Write SQL data transformations with data quality tests." }
    ]
  },
  {
    id: "real-time-data-pipeline",
    title: "Real-Time Data Pipeline",
    category: "Data Engineering",
    difficulty: "Advanced",
    hours: 18,
    skills: ["Kafka", "Python", "Streaming"],
    description: "Build a real-time event streaming pipeline producing financial/IoT telemetry into Apache Kafka, processing streams in Python, and persisting to analytics storage.",
    outcomes: ["Manage Apache Kafka topics, producers, and consumer groups", "Perform windowed aggregation calculations on streaming data", "Handle stream backpressure and out-of-order events"],
    prerequisites: ["Python", "Data pipelines"],
    whyThisProject: "High-value skill powering real-time dashboards, fraud detection, and live metrics.",
    techStack: ["Apache Kafka", "Python (confluent-kafka)", "Docker Compose"],
    milestones: [
      { title: "Kafka Event Producer", description: "Stream high-frequency synthetic event payloads into Kafka topics." },
      { title: "Stream Processor Consumer", description: "Compute tumbling window averages and persist aggregated results to storage." }
    ]
  },
  {
    id: "kafka-event-pipeline",
    title: "Kafka Event Pipeline",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Kafka", "Python"],
    description: "Architect a multi-topic Kafka event routing system handling schema evolution with Schema Registry (Avro) and error processing dead-letter topics.",
    outcomes: ["Enforce event schema contracts using Avro & Schema Registry", "Implement dead-letter queue (DLQ) consumer patterns", "Manage consumer group offsets"],
    prerequisites: ["Kafka basics", "Python"],
    whyThisProject: "Enterprise event streaming pattern ensuring strict data contracts across teams.",
    techStack: ["Apache Kafka", "Schema Registry", "Python", "Avro"],
    milestones: [
      { title: "Avro Schema Registration", description: "Define Avro event schemas and register with Kafka Schema Registry." },
      { title: "DLQ Handling Consumer", description: "Route malformed messages to dead-letter topics automatically." }
    ]
  },
  {
    id: "log-analytics-pipeline",
    title: "Log Analytics Pipeline",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "SQL", "ETL"],
    description: "Construct an end-to-end log processing pipeline parsing web server log files, storing structured outputs in DuckDB/PostgreSQL, and generating traffic insights.",
    outcomes: ["Parse unstructured regex log formats (Apache/Nginx logs)", "Load columnar data efficiently using DuckDB", "Execute SQL analytics for traffic aggregations"],
    prerequisites: ["Python", "Regex", "SQL"],
    whyThisProject: "Practical data engineering project processing server telemetry into analytical reports.",
    techStack: ["Python", "DuckDB", "SQL"],
    milestones: [
      { title: "Log Regex Parser", description: "Parse raw log streams into structured dictionaries." },
      { title: "DuckDB Analytical Queries", description: "Execute SQL queries calculating top IP bandwidth usage and 5xx error rates." }
    ]
  },
  {
    id: "web-scraping-pipeline",
    title: "Web Scraping Pipeline",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "Web Scraping", "ETL"],
    description: "Build a robust web scraper with Playwright / BeautifulSoup handling user-agent rotation, proxy pools, rate limiting, and database persistence.",
    outcomes: ["Scrape dynamic JS-rendered web pages with Playwright", "Manage proxy rotation and anti-bot mitigation techniques", "Store structured scraped data cleanly"],
    prerequisites: ["Python", "HTML DOM structure"],
    whyThisProject: "Teaches automated data collection from public web sources.",
    techStack: ["Python", "Playwright", "BeautifulSoup4", "PostgreSQL"],
    milestones: [
      { title: "Headless Browser Scraper", description: "Automate page navigation and DOM extraction using Playwright." },
      { title: "Proxy & Retry Manager", description: "Rotate proxies and handle failed requests gracefully." }
    ]
  },
  {
    id: "data-quality-monitoring-system",
    title: "Data Quality Monitoring System",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "SQL", "Data Engineering"],
    description: "Implement automated data quality testing suites using Great Expectations to validate null checks, schema drift, range constraints, and anomaly alerts.",
    outcomes: ["Write automated data quality assertion suites", "Detect schema drift and data corruption early in pipelines", "Publish automated data documentation"],
    prerequisites: ["Python", "SQL"],
    whyThisProject: "Essential software engineering discipline applied to data reliability and governance.",
    techStack: ["Python", "Great Expectations", "SQLAlchemy", "PostgreSQL"],
    milestones: [
      { title: "Expectation Suite Definition", description: "Define validation rules for column nullability, unique keys, and value distributions." },
      { title: "Pipeline Integration & Alerting", description: "Run automated validations before loading data into production tables." }
    ]
  },
  {
    id: "batch-processing-system",
    title: "Batch Processing System",
    category: "Data Engineering",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "SQL"],
    description: "Design a batch data processing job framework using Apache Airflow / Prefect to orchestrate scheduled DAG workflows with task dependencies.",
    outcomes: ["Define Directed Acyclic Graphs (DAGs) for workflow orchestration", "Manage task retry logic and slack alerts on job failures", "Handle backfilling of historical batch data"],
    prerequisites: ["Python", "ETL concepts"],
    whyThisProject: "Standard workflow orchestration tool used across all modern data teams.",
    techStack: ["Python", "Prefect / Apache Airflow", "SQL"],
    milestones: [
      { title: "DAG Workflow Definition", description: "Create multi-step task DAG with conditional execution logic." },
      { title: "Scheduling & Error Handling", description: "Set cron execution schedules with automated retry policies." }
    ]
  },
  {
    id: "streaming-analytics-dashboard",
    title: "Streaming Analytics Dashboard",
    category: "Data Engineering",
    difficulty: "Advanced",
    hours: 18,
    skills: ["Kafka", "Python", "SQL"],
    description: "Build a real-time streaming analytics platform combining Kafka, ClickHouse/DuckDB for fast OLAP queries, and a live updating Streamlit dashboard.",
    outcomes: ["Process real-time event streams into OLAP storage engines", "Execute sub-second analytical queries on millions of rows", "Build dynamic live dashboards"],
    prerequisites: ["Kafka", "SQL", "Python"],
    whyThisProject: "Combines real-time data engineering with fast analytical visualization engines.",
    techStack: ["Kafka", "ClickHouse", "Python", "Streamlit"],
    milestones: [
      { title: "ClickHouse Ingestion Engine", description: "Stream Kafka events directly into ClickHouse tables." },
      { title: "Streamlit Live Dashboard", description: "Build auto-refreshing dashboard visualizing real-time metrics." }
    ]
  },
  {
    id: "data-lake-aws",
    title: "Data Lake on AWS",
    category: "Data Engineering",
    difficulty: "Advanced",
    hours: 20,
    skills: ["AWS", "S3", "Python", "Data Engineering"],
    description: "Architect a cloud data lake using S3 partitions (Raw, Bronze, Gold layers), AWS Glue data crawlers, and Amazon Athena for serverless SQL querying.",
    outcomes: ["Design Medallion Data Lake architecture (Bronze -> Silver -> Gold)", "Configure AWS Glue Crawlers and Data Catalog", "Query S3 Parquet datasets serverlessly using Amazon Athena"],
    prerequisites: ["AWS basics", "SQL"],
    whyThisProject: "The prevailing cloud data lake pattern powering enterprise analytics.",
    techStack: ["AWS S3", "AWS Glue", "AWS Athena", "PySpark / Python"],
    milestones: [
      { title: "Medallion S3 Layering", description: "Structure S3 buckets into raw, cleansed, and curated data layers." },
      { title: "Glue Catalog & Athena Queries", description: "Run Glue crawlers to generate catalog schemas and query via Athena." }
    ]
  },
  {
    id: "metadata-catalog",
    title: "Metadata Catalog",
    category: "Data Engineering",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "SQL", "Data Engineering"],
    description: "Build an automated data lineage and metadata catalog scanner extracting table schemas, column types, and data lineage graphs from database instances.",
    outcomes: ["Extract database metadata via system information schemas", "Construct data lineage dependency graphs", "Expose searchable catalog API"],
    prerequisites: ["SQL internal schemas", "Python"],
    whyThisProject: "High-value enterprise data governance tool for tracking data provenance.",
    techStack: ["Python", "SQLAlchemy", "NetworkX", "FastAPI"],
    milestones: [
      { title: "Schema Extractor Engine", description: "Inspect database system catalogs to harvest tables, foreign keys, and views." },
      { title: "Lineage Graph Visualizer", description: "Generate Directed Graphs of table transformation pipelines using NetworkX." }
    ]
  },

  // 7. Databases
  {
    id: "sql-analytics-dashboard",
    title: "SQL Analytics Dashboard",
    category: "Databases",
    difficulty: "Beginner",
    hours: 5,
    skills: ["SQL", "PostgreSQL"],
    description: "Write complex PostgreSQL queries utilizing window functions, Common Table Expressions (CTEs), and aggregations to analyze business metrics.",
    outcomes: ["Master SQL Window Functions (`ROW_NUMBER`, `RANK`, `LAG/LEAD`)", "Write complex multi-stage CTEs", "Analyze monthly recurring revenue (MRR) and cohort retention"],
    prerequisites: ["Basic SQL queries"],
    whyThisProject: "Essential SQL analytical mastery required for backend and data engineering roles.",
    techStack: ["PostgreSQL", "SQL"],
    milestones: [
      { title: "Cohort Retention Queries", description: "Write CTE queries measuring monthly user retention cohorts." },
      { title: "Window Function Metrics", description: "Calculate running revenue totals and period-over-period growth rates." }
    ]
  },
  {
    id: "postgresql-rest-api",
    title: "PostgreSQL REST API",
    category: "Databases",
    difficulty: "Beginner",
    hours: 6,
    skills: ["PostgreSQL", "FastAPI"],
    description: "Build a REST API backed by PostgreSQL using raw SQL (asyncpg) to understand connection pooling, transaction isolation, and query parameter binding.",
    outcomes: ["Execute async raw SQL queries via asyncpg", "Manage database connection pools", "Prevent SQL injection vulnerabilities using parameterized bindings"],
    prerequisites: ["Python", "SQL basics"],
    whyThisProject: "Demonstrates database fundamentals without hiding behind ORM abstractions.",
    techStack: ["Python", "FastAPI", "asyncpg", "PostgreSQL"],
    milestones: [
      { title: "Connection Pool Setup", description: "Configure asyncpg connection pool with connection lifetime management." },
      { title: "Parameterized CRUD Endpoints", description: "Write secure parameterized raw SQL queries for REST API routes." }
    ]
  },
  {
    id: "database-migration-tool",
    title: "Database Migration Tool",
    category: "Databases",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "SQL", "PostgreSQL"],
    description: "Build a custom database schema migration tool in Python tracking revision histories, applying forward/rollback SQL scripts, and managing schema locks.",
    outcomes: ["Understand database migration versioning mechanisms", "Execute transactional schema DDL statements", "Implement advisory locks to prevent concurrent migration runs"],
    prerequisites: ["Python", "SQL DDL"],
    whyThisProject: "Understands the inner mechanisms of Alembic and Flyway schema migration tools.",
    techStack: ["Python", "PostgreSQL", "SQLAlchemy / asyncpg"],
    milestones: [
      { title: "Migration History Table", description: "Track applied migration version hashes in a dedicated metadata table." },
      { title: "Up/Down Script Executor", description: "Execute SQL DDL files inside single transactions with advisory locking." }
    ]
  },
  {
    id: "query-performance-analyzer",
    title: "Query Performance Analyzer",
    category: "Databases",
    difficulty: "Advanced",
    hours: 15,
    skills: ["SQL", "PostgreSQL", "Database Internals"],
    description: "Analyze PostgreSQL query execution plans using `EXPLAIN ANALYZE`, identify sequential table scans, construct optimal B-tree / GIN indexes, and tune query performance.",
    outcomes: ["Interpret PostgreSQL `EXPLAIN ANALYZE` execution trees", "Distinguish Index Scans vs Bitmap Index Scans vs Seq Scans", "Optimize slow multi-table joins"],
    prerequisites: ["SQL experience", "Database index concepts"],
    whyThisProject: "Crucial database optimization skills for scaling backend applications under heavy load.",
    techStack: ["PostgreSQL", "SQL"],
    milestones: [
      { title: "Execution Plan Analysis", description: "Inspect execution trees to isolate high-cost operations." },
      { title: "Indexing Strategy & Verification", description: "Apply partial/composite indexes and measure query speedups." }
    ]
  },
  {
    id: "database-backup-service",
    title: "Database Backup Service",
    category: "Databases",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["PostgreSQL", "Python"],
    description: "Build an automated PostgreSQL database backup daemon executing `pg_dump`, encrypting backup archives with AES-256, and uploading to S3 with retention policies.",
    outcomes: ["Execute `pg_dump` and Point-in-Time Recovery (PITR) concepts", "Encrypt data archives with symmetric cryptography", "Manage cloud backup retention policies"],
    prerequisites: ["Python", "PostgreSQL CLI tools"],
    whyThisProject: "Critical database administration task protecting organizations against data loss.",
    techStack: ["Python", "PostgreSQL (`pg_dump`)", "AWS S3", "Cryptography"],
    milestones: [
      { title: "Automated Dump & Encryption", description: "Stream `pg_dump` outputs through Gzip compression and AES encryption." },
      { title: "S3 Upload & Pruning", description: "Upload to S3 and delete backups older than 30 days." }
    ]
  },
  {
    id: "full-text-search-system",
    title: "Full-Text Search System",
    category: "Databases",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["PostgreSQL", "Search"],
    description: "Implement native PostgreSQL Full-Text Search utilizing `tsvector`, `tsquery`, GIN indexes, stemming, and fuzzy match ranking functions.",
    outcomes: ["Understand PostgreSQL `tsvector` and `tsquery` primitives", "Index text columns with GIN (Generalized Inverted Index) structures", "Rank search matches using `ts_rank`"],
    prerequisites: ["PostgreSQL basics"],
    whyThisProject: "Leverages PostgreSQL built-in search capabilities without adding complex search cluster dependencies.",
    techStack: ["PostgreSQL", "SQL"],
    milestones: [
      { title: "GIN Indexing & Tsvector", description: "Create generated `tsvector` columns indexed with GIN." },
      { title: "Ranked Search Query API", description: "Execute full-text searches with language stemming and relevance ranking." }
    ]
  },
  {
    id: "postgresql-vector-search",
    title: "PostgreSQL Vector Search",
    category: "Databases",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["PostgreSQL", "pgvector", "Embeddings"],
    description: "Use the `pgvector` extension in PostgreSQL to store text embeddings, create HNSW (Hierarchical Navigable Small World) indexes, and execute vector similarity queries.",
    outcomes: ["Enable and configure the `pgvector` PostgreSQL extension", "Create HNSW / IVFFlat vector indexes for fast approximate search", "Perform cosine distance `<=>` similarity queries in SQL"],
    prerequisites: ["PostgreSQL", "Vector embeddings basics"],
    whyThisProject: "Combines transactional relational database capabilities with AI vector storage in a single database.",
    techStack: ["PostgreSQL", "pgvector", "Python", "SQL"],
    milestones: [
      { title: "pgvector Setup & HNSW Indexing", description: "Install pgvector extension and create 1536-dimensional vector columns with HNSW index." },
      { title: "Similarity Search API", description: "Write SQL queries executing vector distance matches." }
    ]
  },
  {
    id: "database-replication-simulator",
    title: "Database Replication Simulator",
    category: "Databases",
    difficulty: "Advanced",
    hours: 20,
    skills: ["PostgreSQL", "Distributed Systems"],
    description: "Simulate primary-replica physical and logical replication in PostgreSQL, testing read-scaling, replication lag monitoring, and automated failover.",
    outcomes: ["Understand Write-Ahead Log (WAL) shipping mechanisms", "Configure physical streaming replication vs logical replication", "Handle primary database failover & replica promotion"],
    prerequisites: ["PostgreSQL administration", "Distributed systems basics"],
    whyThisProject: "Deep dive into database high availability and read-scaling architectures.",
    techStack: ["PostgreSQL", "Docker Compose", "Bash / Python"],
    milestones: [
      { title: "Streaming Replication Cluster", description: "Spin up primary and read-replica PostgreSQL containers via Docker Compose." },
      { title: "Failover Promotion Script", description: "Detect primary failure and promote read-replica to primary." }
    ]
  },
  {
    id: "time-series-database-app",
    title: "Time-Series Database App",
    category: "Databases",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["PostgreSQL", "Time Series"],
    description: "Build an IoT metrics storage engine using TimescaleDB (PostgreSQL time-series extension) with hypertables, automatic continuous aggregations, and data retention policies.",
    outcomes: ["Utilize TimescaleDB hypertables for time-series data partitioning", "Configure continuous aggregates for real-time downsampling", "Implement automated data retention chunk drop policies"],
    prerequisites: ["PostgreSQL basics"],
    whyThisProject: "Essential database design pattern for financial tick data, IoT metrics, and monitoring.",
    techStack: ["PostgreSQL", "TimescaleDB", "SQL"],
    milestones: [
      { title: "Hypertable Partitioning", description: "Convert metrics tables to TimescaleDB hypertables partitioned by time." },
      { title: "Continuous Aggregation Setup", description: "Create continuous aggregate views computing hourly averages automatically." }
    ]
  },
  {
    id: "database-connection-pooler",
    title: "Database Connection Pooler",
    category: "Databases",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "PostgreSQL", "Networking"],
    description: "Construct a lightweight database connection pooler (like PgBouncer) in Python that multiplexes client connections over a fixed pool of backend PostgreSQL connections.",
    outcomes: ["Understand session vs transaction level connection pooling", "Implement TCP socket proxying for PostgreSQL wire protocol", "Reduce database memory overhead under heavy concurrent connection spikes"],
    prerequisites: ["Python socket programming", "PostgreSQL protocol"],
    whyThisProject: "High-level database infrastructure project exploring wire protocol proxying.",
    techStack: ["Python", "asyncio", "PostgreSQL Wire Protocol"],
    milestones: [
      { title: "PostgreSQL Wire Protocol Handler", description: "Parse frontend startup & query packets from client connections." },
      { title: "Connection Multiplexer Pool", description: "Route client queries across pre-established backend connection pools." }
    ]
  },

  // 8. Security
  {
    id: "password-manager",
    title: "Password Manager",
    category: "Security",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Cryptography"],
    description: "Build a secure local password manager vault using AES-256-GCM encryption, PBKDF2 master key derivation, and zero-knowledge architecture.",
    outcomes: ["Derive cryptographic keys securely with PBKDF2 / Argon2", "Encrypt/decrypt sensitive payloads using AES-256-GCM", "Prevent side-channel leaks"],
    prerequisites: ["Python basics"],
    whyThisProject: "Hands-on application of modern symmetric cryptography and key derivation.",
    techStack: ["Python", "cryptography library"],
    milestones: [
      { title: "Key Derivation & Master Password", description: "Derive strong AES keys from master password via PBKDF2HMAC." },
      { title: "Vault Encryption & Decryption", description: "Encrypt credentials with AES-256-GCM and store in local JSON vault." }
    ]
  },
  {
    id: "jwt-auth-service",
    title: "JWT Authentication Service",
    category: "Security",
    difficulty: "Beginner",
    hours: 6,
    skills: ["Python", "JWT", "Authentication"],
    description: "Implement a stateless authentication service in Python creating, signing (RS256 asymmetric keys), and validating JSON Web Tokens (JWT).",
    outcomes: ["Understand symmetric (HS256) vs asymmetric (RS256) token signatures", "Enforce token claims validation (`exp`, `iss`, `aud`)", "Manage public/private key pairs"],
    prerequisites: ["Python", "Web basics"],
    whyThisProject: "Core authentication primitive used across web microservices.",
    techStack: ["Python", "PyJWT", "FastAPI"],
    milestones: [
      { title: "RS256 Key Pair Generation", description: "Generate RSA public/private key pairs for token signing and verification." },
      { title: "Token Issuer & Verifier API", description: "Issue signed tokens on login and verify incoming bearer tokens." }
    ]
  },
  {
    id: "oauth-login-system",
    title: "OAuth Login System",
    category: "Security",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["OAuth", "Authentication", "FastAPI"],
    description: "Build an OAuth 2.0 / OpenID Connect (OIDC) authentication flow allowing users to log in via GitHub or Google identity providers.",
    outcomes: ["Understand OAuth 2.0 Authorization Code flow with PKCE", "Exchange authorization codes for access & ID tokens", "Retrieve and normalize user profile claims"],
    prerequisites: ["FastAPI", "Web security concepts"],
    whyThisProject: "Industry standard method for implementing social login in modern applications.",
    techStack: ["Python", "FastAPI", "httpx", "OAuth2"],
    milestones: [
      { title: "Authorization Redirect Route", description: "Generate OAuth login state parameter and redirect user to provider authorization page." },
      { title: "Token Exchange Callback", description: "Handle OAuth callback, verify state, and exchange code for user identity." }
    ]
  },
  {
    id: "api-security-scanner",
    title: "API Security Scanner",
    category: "Security",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "HTTP", "Cybersecurity"],
    description: "Build an automated security vulnerability scanner testing HTTP endpoints for OWASP Top 10 API flaws (Broken Auth, BOLA/IDOR, Rate Limiting, SQLi injection).",
    outcomes: ["Detect Broken Object Level Authorization (BOLA/IDOR) vulnerabilities", "Fuzz HTTP parameters for SQL injection and XSS reflection", "Generate structured security assessment audit reports"],
    prerequisites: ["Python", "HTTP specification", "Web security concepts"],
    whyThisProject: "Practical offensive security tool for auditing backend API safety.",
    techStack: ["Python", "httpx", "BeautifulSoup4"],
    milestones: [
      { title: "Param Fuzzer Engine", description: "Inject SQLi/XSS payloads into request query parameters and headers." },
      { title: "IDOR Authorization Checker", description: "Attempt multi-user token cross-resource access to flag IDOR flaws." }
    ]
  },
  {
    id: "dependency-vulnerability-scanner",
    title: "Dependency Vulnerability Scanner",
    category: "Security",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Security"],
    description: "Construct a CLI tool scanning project dependency files (`requirements.txt`, `package.json`) against the OSV (Open Source Vulnerabilities) API database to flag CVEs.",
    outcomes: ["Parse lockfiles and package manifests", "Query open-source vulnerability databases (OSV API)", "Calculate CVE severity ratings (CVSS scores)"],
    prerequisites: ["Python", "Package managers"],
    whyThisProject: "Software supply chain security project essential for modern CI/CD pipelines.",
    techStack: ["Python", "OSV API", "packaging"],
    milestones: [
      { title: "Manifest Package Extractor", description: "Parse dependency versions from requirements.txt and package-lock.json files." },
      { title: "OSV Database Query Engine", description: "Query OSV API for CVE vulnerabilities matching identified dependency versions." }
    ]
  },
  {
    id: "secret-detection-tool",
    title: "Secret Detection Tool",
    category: "Security",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "Security", "Git"],
    description: "Develop a pre-commit Git hook scanner inspecting code diffs for committed API keys, AWS credentials, private keys, and high-entropy secret strings.",
    outcomes: ["Utilize regex and Shannon Entropy formulas to detect secrets", "Hook into Git pre-commit workflow hooks", "Prevent accidental credential leaks in Git history"],
    prerequisites: ["Python", "Regex", "Git"],
    whyThisProject: "Protects engineering teams against devastating accidental secret leaks.",
    techStack: ["Python", "Git Hooks", "Regex"],
    milestones: [
      { title: "Entropy & Regex Detector", description: "Scan file diff strings using regex patterns and Shannon entropy calculations." },
      { title: "Git Pre-Commit Hook Integration", description: "Block git commit execution when potential secrets are detected." }
    ]
  },
  {
    id: "network-port-scanner",
    title: "Network Port Scanner",
    category: "Security",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "Networking"],
    description: "Build a multithreaded network port scanner (similar to Nmap) probing target IP ranges for open TCP ports and fingerprinting active server header banners.",
    outcomes: ["Perform fast multithreaded TCP SYN / Connect socket scanning", "Extract service banner strings for fingerprinting", "Parse network CIDR subnet ranges"],
    prerequisites: ["Python sockets", "TCP/IP networking"],
    whyThisProject: "Foundational network security reconnaissance project.",
    techStack: ["Python", "socket", "concurrent.futures"],
    milestones: [
      { title: "Multithreaded Socket Scanner", description: "Probe TCP ports across target subnet using thread pool executor." },
      { title: "Service Banner Grabber", description: "Read initial response bytes to identify running services (SSH, HTTP, FTP)." }
    ]
  },
  {
    id: "log-based-intrusion-detector",
    title: "Log-Based Intrusion Detector",
    category: "Security",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "Security", "Machine Learning"],
    description: "Build a SIEM log analyzer in Python applying anomaly detection algorithms (Isolation Forest) on authentication logs to flag brute-force and credential stuffing attacks.",
    outcomes: ["Parse Linux auth.log and web server logs", "Train Isolation Forest models for anomaly detection", "Generate real-time security incident alerts"],
    prerequisites: ["Python", "Machine Learning basics", "Security logs"],
    whyThisProject: "Advanced Blue Team security engineering project combining ML with incident detection.",
    techStack: ["Python", "scikit-learn", "Pandas", "Regex"],
    milestones: [
      { title: "Auth Log Parser", description: "Extract failed login counts, IP origins, and timestamp velocities." },
      { title: "Anomaly Detection Engine", description: "Train Isolation Forest model flagging statistically anomalous login behavior." }
    ]
  },
  {
    id: "secure-file-sharing-service",
    title: "Secure File Sharing Service",
    category: "Security",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "Cryptography", "FastAPI"],
    description: "Build an end-to-end encrypted file sharing web platform where files are encrypted client-side before upload, with burn-after-reading expiration timers.",
    outcomes: ["Implement Client-Side Encryption (CSE)", "Handle self-destructing access tokens", "Ensure zero-knowledge server storage"],
    prerequisites: ["FastAPI", "Cryptography concepts"],
    whyThisProject: "High-security file transport application emphasizing zero-knowledge cloud principles.",
    techStack: ["Python", "FastAPI", "Web Crypto API", "PostgreSQL"],
    milestones: [
      { title: "Zero-Knowledge Ingestion API", description: "Accept pre-encrypted file payloads and store blind ciphertext." },
      { title: "One-Time Access Expiration Engine", description: "Delete file ciphertext immediately upon initial download." }
    ]
  },
  {
    id: "web-security-testing-lab",
    title: "Web Security Testing Lab",
    category: "Security",
    difficulty: "Advanced",
    hours: 15,
    skills: ["HTTP", "Web Security"],
    description: "Develop a vulnerable web application (like DVWA) paired with automated exploit scripts demonstrating XSS, CSRF, SQL Injection, and CORS misconfigurations.",
    outcomes: ["Demonstrate Cross-Site Scripting (XSS) & CSRF attacks", "Implement Content Security Policy (CSP) headers", "Remediate web application security vulnerabilities"],
    prerequisites: ["Web development", "HTTP security headers"],
    whyThisProject: "Comprehensive application security sandbox demonstrating both attack techniques and defensive mitigations.",
    techStack: ["Python", "FastAPI", "HTML/JS"],
    milestones: [
      { title: "Vulnerable Endpoint & Exploit Payload", description: "Create sample endpoints vulnerable to reflected XSS and SQLi." },
      { title: "Defensive Hardening & CSP", description: "Apply parameter sanitization, ORM queries, and strict CSP headers." }
    ]
  },

  // 9. Frontend / Full Stack
  {
    id: "personal-portfolio",
    title: "Personal Portfolio",
    category: "Frontend",
    difficulty: "Beginner",
    hours: 4,
    skills: ["React", "TypeScript"],
    description: "Design and deploy a modern responsive developer portfolio site featuring project showcases, dark mode toggle, and responsive layouts.",
    outcomes: ["Build clean UI layouts with React & Tailwind CSS", "Implement dark mode theme persistence", "Deploy to static web hosting (Vercel / GitHub Pages)"],
    prerequisites: ["HTML/CSS", "React basics"],
    whyThisProject: "Essential personal branding tool for every software engineer.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    milestones: [
      { title: "Component Structure & Layout", description: "Build Header, Hero, Projects Grid, and Contact form components." },
      { title: "Dark Mode & Responsive Polish", description: "Configure Tailwind dark mode state and mobile drawer navigation." }
    ]
  },
  {
    id: "job-application-tracker",
    title: "Job Application Tracker",
    category: "Frontend",
    difficulty: "Beginner",
    hours: 6,
    skills: ["React", "TypeScript", "PostgreSQL"],
    description: "Build a full-stack CRUD application for tracking job applications across interview stages with status tags, notes, and metrics.",
    outcomes: ["Manage stateful Kanban-style UI columns", "Build REST backend endpoints", "Persist application data in SQL database"],
    prerequisites: ["React", "TypeScript basics"],
    whyThisProject: "Practical career management tool demonstrating full-stack CRUD functionality.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL"],
    milestones: [
      { title: "Full-Stack API & Database", description: "Build Job Application database schema and REST API endpoints." },
      { title: "React Dashboard UI", description: "Build interactive job tracking table with status filters and edit modals." }
    ]
  },
  {
    id: "kanban-board",
    title: "Kanban Board",
    category: "Frontend",
    difficulty: "Beginner",
    hours: 8,
    skills: ["React", "TypeScript"],
    description: "Construct an interactive Trello-like Kanban board featuring drag-and-drop task reordering, column management, and local storage state persistence.",
    outcomes: ["Implement drag-and-drop UI interactions (dnd-kit / react-beautiful-dnd)", "Manage complex nested React state trees", "Persist UI state to localStorage"],
    prerequisites: ["React state management"],
    whyThisProject: "Classic frontend project demonstrating complex user interaction state management.",
    techStack: ["React", "TypeScript", "dnd-kit", "Tailwind CSS"],
    milestones: [
      { title: "Drag and Drop Engine", description: "Implement smooth drag-and-drop card movement across columns." },
      { title: "State Persistence & Modals", description: "Add task detail editing modals and persist board state to storage." }
    ]
  },
  {
    id: "real-time-chat-ui",
    title: "Real-Time Chat UI",
    category: "Frontend",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["React", "WebSockets"],
    description: "Build a responsive messaging web client connecting via WebSockets to render real-time chat feeds, typing indicators, and online status badges.",
    outcomes: ["Connect React applications to WebSocket servers", "Handle auto-reconnect and message queuing", "Render auto-scrolling message streams"],
    prerequisites: ["React", "WebSockets basics"],
    whyThisProject: "Teaches stateful client-side real-time data handling.",
    techStack: ["React", "TypeScript", "WebSockets API", "Tailwind CSS"],
    milestones: [
      { title: "WebSocket Hook Integration", description: "Create custom `useWebSocket` hook with auto-reconnect logic." },
      { title: "Chat Feed & Typing Indicators", description: "Render chat message bubbles with auto-scroll and live typing events." }
    ]
  },
  {
    id: "analytics-dashboard-ui",
    title: "Analytics Dashboard",
    category: "Frontend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["React", "TypeScript", "Data Visualization"],
    description: "Develop a data visualization dashboard displaying interactive charts (line, bar, pie) driven by live backend API polling and filter controls.",
    outcomes: ["Integrate chart libraries (Recharts / Chart.js)", "Build interactive date-range filter components", "Handle loading skeleton states during data fetches"],
    prerequisites: ["React", "TypeScript"],
    whyThisProject: "Common frontend project requirement for enterprise SaaS web applications.",
    techStack: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
    milestones: [
      { title: "Interactive Chart Components", description: "Render time-series metrics charts with tooltips using Recharts." },
      { title: "Date Range & Metric Filters", description: "Wire control inputs to trigger dynamic chart data re-renders." }
    ]
  },
  {
    id: "collaborative-editor",
    title: "Collaborative Editor",
    category: "Frontend",
    difficulty: "Advanced",
    hours: 20,
    skills: ["React", "WebSockets", "Distributed Systems"],
    description: "Build a real-time collaborative rich-text editor (like Google Docs) using Conflict-Free Replicated Data Types (CRDTs via Yjs) over WebSockets.",
    outcomes: ["Understand CRDT (Conflict-Free Replicated Data Type) real-time sync", "Render shared remote presence cursors", "Manage concurrent document edit conflict resolution"],
    prerequisites: ["Advanced React", "WebSockets"],
    whyThisProject: "Impressive frontend engineering project implementing real-time collaborative state algorithms.",
    techStack: ["React", "Yjs", "WebSockets", "TipTap / Slate.js"],
    milestones: [
      { title: "Yjs CRDT Document Binding", description: "Bind editor instance to Yjs document over WebSockets." },
      { title: "Remote Cursor Presence", description: "Display live named cursor flags for active concurrent collaborators." }
    ]
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker",
    category: "Frontend",
    difficulty: "Beginner",
    hours: 6,
    skills: ["React", "PostgreSQL"],
    description: "Build a full-stack financial expense tracking web application with category budgeting, receipt image attachments, and monthly spending charts.",
    outcomes: ["Build REST API routes for financial transactions", "Calculate aggregate category spending totals", "Render data summaries in pie charts"],
    prerequisites: ["React", "SQL"],
    whyThisProject: "Practical full-stack web application with core CRUD operations.",
    techStack: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
    milestones: [
      { title: "Transaction API & Schema", description: "Build database models and endpoints for logged expenses." },
      { title: "Dashboard Breakdown UI", description: "Render spending category charts and monthly budget progress bars." }
    ]
  },
  {
    id: "saas-dashboard",
    title: "SaaS Dashboard",
    category: "Frontend",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["React", "TypeScript", "REST APIs"],
    description: "Architect a comprehensive multi-page B2B SaaS dashboard featuring team management tables, billing subscription plans, and API key management.",
    outcomes: ["Structure large React codebases with clean layout routes", "Build reusable data table components with pagination & sorting", "Manage global user session state"],
    prerequisites: ["React", "TypeScript"],
    whyThisProject: "Models real-world production web application layouts and UI patterns.",
    techStack: ["React", "TypeScript", "TanStack Table", "Tailwind CSS"],
    milestones: [
      { title: "DataTable Component", description: "Build reusable table supporting column sorting, filtering, and pagination." },
      { title: "Subscription & API Key UI", description: "Build billing plan selection and API secret key generation UI." }
    ]
  },
  {
    id: "file-management-interface",
    title: "File Management Interface",
    category: "Frontend",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["React", "AWS S3"],
    description: "Build a cloud file manager web app (like Google Drive/Dropbox) featuring drag-and-drop uploads, folder hierarchies, and file preview modals.",
    outcomes: ["Implement direct-to-S3 client file uploads using pre-signed URLs", "Render recursive folder navigation trees", "Handle file selection and modal image/PDF previews"],
    prerequisites: ["React", "S3 pre-signed URLs"],
    whyThisProject: "Combines modern frontend UI patterns with cloud object storage integration.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "AWS S3 API"],
    milestones: [
      { title: "Pre-Signed Upload Handler", description: "Upload client files directly to S3 with upload progress indicators." },
      { title: "Folder Tree Navigator", description: "Render dynamic folder breadcrumbs and file grid item previews." }
    ]
  },
  {
    id: "developer-documentation-platform",
    title: "Developer Documentation Platform",
    category: "Frontend",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["React", "Markdown", "Search"],
    description: "Construct a developer documentation portal (like Stripe Docs) rendering Markdown/MDX articles with dynamic table-of-contents and full-text search.",
    outcomes: ["Render Markdown / MDX content dynamically with syntax highlighting", "Build fast client-side instant search indexes (FlexSearch / Fuse.js)", "Generate automatic active heading Table of Contents"],
    prerequisites: ["React", "TypeScript"],
    whyThisProject: "High-quality developer-experience product focused on typography and instant search.",
    techStack: ["Next.js", "React", "MDX", "FlexSearch", "Tailwind CSS"],
    milestones: [
      { title: "MDX Rendering Pipeline", description: "Parse MDX files with syntax highlighting code blocks." },
      { title: "Instant Search Modal", description: "Index documentation text into FlexSearch for instant Cmd+K search." }
    ]
  },

  // 10. Developer Tools
  {
    id: "cli-task-manager",
    title: "CLI Task Manager",
    category: "Developer Tools",
    difficulty: "Beginner",
    hours: 4,
    skills: ["Python", "CLI"],
    description: "Build an interactive command-line interface (CLI) tool for managing tasks, tags, and priorities using Python's `argparse` or `Click` libraries.",
    outcomes: ["Build user-friendly CLI applications with argument parsing", "Format rich terminal text outputs with colors and tables", "Persist local task data to JSON/SQLite"],
    prerequisites: ["Python basics"],
    whyThisProject: "Great introduction to developer tools and command-line application design.",
    techStack: ["Python", "Click / Typer", "Rich"],
    milestones: [
      { title: "CLI Command Parser", description: "Define `add`, `list`, `complete`, and `delete` commands." },
      { title: "Terminal Table Formatting", description: "Render color-coded task tables using `Rich` library." }
    ]
  },
  {
    id: "git-like-version-control",
    title: "Git-Like Version Control",
    category: "Developer Tools",
    difficulty: "Advanced",
    hours: 20,
    skills: ["Python", "Git", "Data Structures"],
    description: "Construct a mini version control system in Python implementing content-addressable storage (SHA-1 blobs, trees, commits) and branching like Git.",
    outcomes: ["Understand Git content-addressable object storage (`blob`, `tree`, `commit`)", "Compute SHA-1 hashes for file contents", "Manage repository HEAD references and branch switching"],
    prerequisites: ["Python", "Data structures", "File I/O"],
    whyThisProject: "Demystifies the inner workings of Git version control.",
    techStack: ["Python", "hashlib", "zlib"],
    milestones: [
      { title: "Object Store (`hash-object`)", description: "Compress file content with zlib and store in `.mygit/objects` by SHA-1 hash." },
      { title: "Commit & Tree Engine", description: "Construct tree objects representing directory snapshots and append commit metadata." }
    ]
  },
  {
    id: "code-formatter",
    title: "Code Formatter",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Parsing"],
    description: "Build an automated code style formatter that parses source code files, enforces indentation rules, and normalizes quote styles.",
    outcomes: ["Parse text file token streams", "Apply consistent code style formatting rules", "Implement `--check` diff flags for CI pipelines"],
    prerequisites: ["Python string manipulation"],
    whyThisProject: "Understands developer tooling mechanics behind Black and Prettier.",
    techStack: ["Python", "tokenize"],
    milestones: [
      { title: "Token Stream Processor", description: "Parse source code into token lists and re-indent blocks." },
      { title: "Diff Generator", description: "Output formatted code diffs when run with `--check` flag." }
    ]
  },
  {
    id: "static-code-analyzer",
    title: "Static Code Analyzer",
    category: "Developer Tools",
    difficulty: "Advanced",
    hours: 15,
    skills: ["Python", "AST", "Compilers"],
    description: "Construct a static linter parsing Python Abstract Syntax Trees (AST) to detect code smells, unused variables, complex functions (cyclomatic complexity), and security anti-patterns.",
    outcomes: ["Inspect and traverse Abstract Syntax Trees (AST)", "Calculate Cyclomatic Complexity metrics for functions", "Report file line numbers for static code lints"],
    prerequisites: ["Python", "Compiler/AST concepts"],
    whyThisProject: "Deep dive into program analysis powering tools like Pylint and ESLint.",
    techStack: ["Python", "ast module"],
    milestones: [
      { title: "AST Visitor Implementation", description: "Traverse AST nodes inspecting function definitions and variable scopes." },
      { title: "Complexity & Smell Rules", description: "Flag functions exceeding cyclomatic complexity threshold of 10." }
    ]
  },
  {
    id: "dependency-graph-generator",
    title: "Dependency Graph Generator",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Graphs"],
    description: "Build a developer utility scanning Python project import statements, building module dependency graphs, and rendering visual SVG/DOT architecture diagrams.",
    outcomes: ["Parse import statements across multi-file codebases", "Detect circular dependency loops", "Render graph visualizations using Graphviz"],
    prerequisites: ["Python", "Graph algorithms"],
    whyThisProject: "Helps engineering teams visualize and refactor monolithic codebase dependencies.",
    techStack: ["Python", "ast", "Graphviz", "NetworkX"],
    milestones: [
      { title: "Import Graph Scanner", description: "Parse file imports to build adjacency matrix of module relationships." },
      { title: "Circular Dependency Detection", description: "Execute cycle detection algorithms and render Graphviz diagrams." }
    ]
  },
  {
    id: "cli-log-analyzer",
    title: "CLI Log Analyzer",
    category: "Developer Tools",
    difficulty: "Beginner",
    hours: 5,
    skills: ["Python", "CLI"],
    description: "Build a fast command-line tool scanning large log files, outputting error code frequency tables, top requesting IP addresses, and response latency percentiles.",
    outcomes: ["Process multi-gigabyte log files efficiently line-by-line", "Calculate p50, p90, and p99 latency statistics", "Format clean terminal report summaries"],
    prerequisites: ["Python basics"],
    whyThisProject: "Practical CLI utility for DevOps and backend engineers troubleshooting server incidents.",
    techStack: ["Python", "Click", "argparse"],
    milestones: [
      { title: "Streaming Line Reader", description: "Process log file streams without loading full file into memory." },
      { title: "Percentile & Frequency Calculator", description: "Output top error codes and p95 latency summaries." }
    ]
  },
  {
    id: "api-testing-cli",
    title: "API Testing CLI",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "HTTP"],
    description: "Create a lightweight CLI tool (similar to Postman CLI / HTTPie) executing YAML-defined API test suites with status assertions, header checks, and response timing.",
    outcomes: ["Parse YAML test scenario files", "Execute HTTP request suites with assertion evaluations", "Output colored test result summaries"],
    prerequisites: ["Python", "HTTP protocol"],
    whyThisProject: "Automates API integration testing in command-line environments.",
    techStack: ["Python", "httpx", "PyYAML", "Rich"],
    milestones: [
      { title: "YAML Test Spec Parser", description: "Parse endpoint URL, method, headers, and expected status codes." },
      { title: "Assertion Runner", description: "Execute HTTP requests and assert status code & JSON response fields match." }
    ]
  },
  {
    id: "environment-config-manager",
    title: "Environment Configuration Manager",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["Python", "CLI"],
    description: "Build a CLI utility to validate, format, and sync `.env` configuration files across team environments against a schema template.",
    outcomes: ["Validate presence of required environment variables", "Detect missing keys between `.env` and `.env.example` templates", "Encrypt sensitive secrets locally"],
    prerequisites: ["Python"],
    whyThisProject: "Prevents subtle runtime bugs caused by missing environment variables.",
    techStack: ["Python", "Click"],
    milestones: [
      { title: "Schema Validator", description: "Compare active `.env` file against `.env.example` template definition." },
      { title: "Key Formatter & Sync", description: "Sort keys alphabetically and generate missing template entries." }
    ]
  },
  {
    id: "local-secrets-manager",
    title: "Local Secrets Manager",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["Python", "Cryptography"],
    description: "Develop a secure CLI tool for storing, retrieving, and injecting encrypted developer secrets into shell sub-processes securely.",
    outcomes: ["Manage local OS keychains (Keyring API)", "Inject environment variables dynamically into child processes", "Encrypt local secret stores with AES"],
    prerequisites: ["Python", "Cryptography basics"],
    whyThisProject: "Prevents storing unencrypted plaintext secrets in developer source trees.",
    techStack: ["Python", "cryptography", "keyring"],
    milestones: [
      { title: "OS Keychain Integration", description: "Store encryption keys in native macOS Keychain / Linux Secret Service." },
      { title: "Subprocess Secret Injection", description: "Execute shell commands with decrypted secrets injected into subprocess environment." }
    ]
  },
  {
    id: "developer-metrics-dashboard",
    title: "Developer Metrics Dashboard",
    category: "Developer Tools",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["Python", "Git", "Data Visualization"],
    description: "Build an engineering analytics tool extracting local Git commit metrics (lines added/deleted, commit velocity, modified hotspots) and displaying visual HTML reports.",
    outcomes: ["Extract Git log commit history via Git Python / subprocess", "Calculate code churn and file hotspot metrics", "Generate interactive HTML charts"],
    prerequisites: ["Python", "Git"],
    whyThisProject: "Valuable engineering management tool for visualizing codebase evolution.",
    techStack: ["Python", "GitPython", "Plotly", "Pandas"],
    milestones: [
      { title: "Git Commit Log Extractor", description: "Parse commit logs to extract author, timestamp, and line churn." },
      { title: "Plotly Report Generation", description: "Generate interactive HTML charts showing commit velocity over time." }
    ]
  },

  // 11. Mobile / Other
  {
    id: "habit-tracker",
    title: "Habit Tracker",
    category: "Mobile",
    difficulty: "Beginner",
    hours: 6,
    skills: ["React Native", "TypeScript"],
    description: "Build a cross-platform mobile application tracking daily habits, completion streaks, and reminder notifications.",
    outcomes: ["Build mobile layouts with React Native components", "Manage daily completion streak state", "Schedule local mobile push notifications"],
    prerequisites: ["React basics"],
    whyThisProject: "Great introduction to mobile app development with React Native.",
    techStack: ["React Native", "Expo", "TypeScript"],
    milestones: [
      { title: "Habit Grid Component", description: "Render daily habit cards with completion checkboxes." },
      { title: "Streak Counter & Notifications", description: "Calculate consecutive streak days and schedule local reminders." }
    ]
  },
  {
    id: "offline-notes-app",
    title: "Offline Notes App",
    category: "Mobile",
    difficulty: "Beginner",
    hours: 8,
    skills: ["React Native", "SQLite"],
    description: "Develop a fast mobile note-taking application persisting data locally in SQLite with full-text search and tags.",
    outcomes: ["Integrate SQLite databases into React Native mobile apps", "Execute raw SQL operations locally on device", "Implement fast text search across notes"],
    prerequisites: ["React Native", "SQL basics"],
    whyThisProject: "Teaches local on-device database storage in mobile environments.",
    techStack: ["React Native", "Expo SQLite", "TypeScript"],
    milestones: [
      { title: "SQLite Database Hook", description: "Initialize local SQLite database table and migrations on app boot." },
      { title: "Note Editor & Search UI", description: "Build rich note editor with live search filtering across saved SQLite records." }
    ]
  },
  {
    id: "expense-tracking-app",
    title: "Expense Tracking App",
    category: "Mobile",
    difficulty: "Beginner",
    hours: 8,
    skills: ["React Native", "PostgreSQL"],
    description: "Construct a full-stack mobile financial app allowing users to log expenses, photograph receipts using device camera, and view spending breakdowns.",
    outcomes: ["Access mobile device camera hardware", "Sync mobile UI state with REST backend endpoints", "Render mobile pie chart visualizations"],
    prerequisites: ["React Native", "REST APIs"],
    whyThisProject: "Combines mobile hardware integration with full-stack backend APIs.",
    techStack: ["React Native", "Expo Camera", "FastAPI", "PostgreSQL"],
    milestones: [
      { title: "Camera Hardware Capture", description: "Capture receipt photos via Expo Camera and upload to backend API." },
      { title: "Spending Summary Dashboard", description: "Render monthly expense charts and category breakdowns." }
    ]
  },
  {
    id: "real-time-delivery-tracker",
    title: "Real-Time Delivery Tracker",
    category: "Mobile",
    difficulty: "Advanced",
    hours: 15,
    skills: ["React Native", "Maps", "WebSockets"],
    description: "Build a real-time food/package delivery tracking app displaying live courier GPS location movement markers on an interactive mobile map.",
    outcomes: ["Integrate mobile map views (react-native-maps)", "Stream live GPS coordinate updates over WebSockets", "Animate map marker position movements smoothly"],
    prerequisites: ["React Native", "WebSockets"],
    whyThisProject: "Complex mobile engineering project replicating DoorDash / Uber live tracking UX.",
    techStack: ["React Native", "react-native-maps", "WebSockets", "FastAPI"],
    milestones: [
      { title: "Mobile Map & Marker Rendering", description: "Render interactive map view with custom courier vehicle icon." },
      { title: "WebSocket GPS Stream", description: "Stream live coordinate updates over WebSocket and animate marker movements." }
    ]
  },
  {
    id: "campus-event-app",
    title: "Campus Event App",
    category: "Mobile",
    difficulty: "Intermediate",
    hours: 10,
    skills: ["React Native", "REST APIs"],
    description: "Create a mobile discovery app for university students featuring event calendars, RSVP tracking, category filters, and campus map locations.",
    outcomes: ["Consume REST backend APIs in React Native apps", "Manage RSVP state and user event schedules", "Build filterable list views"],
    prerequisites: ["React Native"],
    whyThisProject: "Practical student-focused mobile utility application.",
    techStack: ["React Native", "Expo", "TypeScript"],
    milestones: [
      { title: "Event Listing & Filter UI", description: "Render event cards with date filters and search bar." },
      { title: "RSVP & Calendar Sync", description: "Save user RSVPs and sync event details to native device calendar." }
    ]
  },
  {
    id: "qr-attendance-system",
    title: "QR Attendance System",
    category: "Mobile",
    difficulty: "Intermediate",
    hours: 8,
    skills: ["React Native", "QR", "PostgreSQL"],
    description: "Build a mobile check-in app utilizing camera QR code scanning to verify student attendance at campus events in real time.",
    outcomes: ["Integrate QR code camera scanner libraries", "Validate encrypted QR token payloads against backend APIs", "Track event check-in timestamps"],
    prerequisites: ["React Native", "REST APIs"],
    whyThisProject: "Useful mobile utility solving event check-in logistics.",
    techStack: ["React Native", "Expo BarCodeScanner", "FastAPI", "PostgreSQL"],
    milestones: [
      { title: "QR Scanner Integration", description: "Scan QR tokens using device camera and send check-in requests to backend." },
      { title: "Attendance Roster API", description: "Verify token validity and record check-in timestamp in PostgreSQL." }
    ]
  },
  {
    id: "offline-first-mobile-app",
    title: "Offline-First Mobile App",
    category: "Mobile",
    difficulty: "Advanced",
    hours: 15,
    skills: ["React Native", "SQLite", "Sync"],
    description: "Architect an offline-first mobile application storing writes locally in SQLite while disconnected, syncing queued mutations to the cloud server when network recovers.",
    outcomes: ["Design offline-first mobile synchronization architectures", "Manage local optimistic UI updates", "Resolve data sync conflicts between local SQLite and remote databases"],
    prerequisites: ["React Native", "SQLite", "REST APIs"],
    whyThisProject: "Essential architecture pattern for reliable enterprise mobile applications operating in poor connectivity areas.",
    techStack: ["React Native", "WatermelonDB / SQLite", "FastAPI"],
    milestones: [
      { title: "Local Mutation Queue", description: "Queue local data edits in SQLite when device goes offline." },
      { title: "Reconciliation Sync Engine", description: "Detect network recovery and sync queued mutations to cloud API with conflict resolution." }
    ]
  },
  {
    id: "location-based-recommendation-app",
    title: "Location-Based Recommendation App",
    category: "Mobile",
    difficulty: "Intermediate",
    hours: 12,
    skills: ["React Native", "Maps", "APIs"],
    description: "Develop a mobile app utilizing device GPS location to discover nearby points of interest, restaurants, or study spots with distance sorting.",
    outcomes: ["Request device location permissions (Expo Location)", "Execute spatial radius queries against backend spatial database", "Render distance-sorted lists and map pin clusters"],
    prerequisites: ["React Native", "APIs"],
    whyThisProject: "Teaches mobile location services and geospatial query integration.",
    techStack: ["React Native", "Expo Location", "react-native-maps", "FastAPI"],
    milestones: [
      { title: "GPS Location Fetcher", description: "Fetch current device latitude/longitude coordinates upon app load." },
      { title: "Spatial Search & Map Markers", description: "Fetch nearby places within 5km radius and render on interactive map." }
    ]
  }
];
