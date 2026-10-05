# SkillSprint Backend — Semantic Matching Service

A small FastAPI service that turns free-text resumes and job descriptions
into a structured skill-gap analysis and ranked project recommendations.
It's the service the frontend calls at `POST /analyze`; see
[`main.py`](./main.py) for the implementation this document describes.

## Why a separate backend

Matching "AWS" against "Amazon Web Services", or "container orchestration"
against "Kubernetes", isn't a string-equality problem — it needs a notion
of semantic closeness. This service uses a local
[sentence-transformers](https://www.sbert.net/) model (`all-MiniLM-L6-v2`)
to embed skills and text into vectors and compare them by cosine
similarity, so equivalent skills phrased differently are still recognized
as a match.

The frontend also has a lightweight offline fallback
(`src/lib/skillTaxonomy.ts`, `src/lib/recommendation.ts`) for when this
service isn't reachable. That fallback does synonym + keyword matching
only — it does **not** run the embedding model in the browser, so it's a
closer approximation than plain string equality but not a substitute for
this service. Keep the taxonomy and synonym map in the two files in sync
if you change one.

## Request lifecycle

`POST /analyze` takes a resume string and a list of target job description
strings, and returns the full analysis in one round trip:

```
AnalysisRequest { resume: str, jobs: list[str] }
  │
  ├─ 1. extract_skills_from_text(resume)        → current_skills
  ├─ 2. extract_skills_from_text(" ".join(jobs)) → target_skills
  ├─ 3. perform_semantic_skill_matching(current_skills, target_skills)
  │        → skill_gaps  (target skills not covered by current_skills)
  └─ 4. rank PROJECTS_CATALOG against skill_gaps → recommendations
         │
AnalysisResponse { current_skills, target_skills, skill_gaps, recommendations }
```

### 1–2. Skill extraction (`extract_skills_from_text`)

Three passes over the input text, in order of precedence:

1. **Synonym alias matching** — `SYNONYM_MAP` maps informal phrases
   ("k8s", "postgres", "iac", "amazon web services", ...) to their
   canonical taxonomy name. Each alias is matched with a word-boundary
   regex (`\bpostgres\b`) so it doesn't fire on substrings.
2. **Taxonomy keyword matching** — every skill in `TAXONOMY_SKILLS`
   (~115 canonical skill names) is checked directly against the text with
   the same word-boundary matching.
3. **Embedding fallback for sparse input** — if fewer than 3 skills were
   found by steps 1–2 (e.g. a short, jargon-light description), the text
   is broken into 1–3 word n-grams, embedded with the sentence-transformer
   model, and compared by cosine similarity against the pre-computed
   `TAXONOMY_EMBEDDINGS`. Any n-gram scoring ≥ 0.75 against a taxonomy
   skill contributes that skill. This step only runs when needed — it's
   the most expensive part of extraction, since it means encoding
   multiple n-grams at request time.

The result is a deduplicated, sorted list of canonical skill names.

### 3. Gap detection (`perform_semantic_skill_matching`)

For each target skill, the service checks three ways it might already be
covered by the candidate's current skills, cheapest first:

1. **Exact match** — case-insensitive string equality.
2. **Synonym match** — both skills resolve to the same canonical name via
   `SYNONYM_MAP`.
3. **Embedding similarity** — cosine similarity between the target
   skill's embedding and every current-skill embedding; if the best match
   is ≥ the similarity threshold (`0.68` in the `/analyze` endpoint), the
   skill is considered covered.

A target skill is only reported as a gap if none of the three checks
pass. This is also where "AWS" ≈ "Amazon Web Services" gets handled even
if the synonym map doesn't have that exact phrasing — the embedding
check catches paraphrases the synonym map wasn't written for.

### 4. Project ranking

`PROJECTS_CATALOG` is a fixed list of project definitions (id, title,
category, difficulty, hours, skills, description) — a subset mirrored
from the frontend's larger catalog in `src/lib/projects.ts`. For each
project:

```
matched_gap_skills = project.skills ∩ skill_gaps   (case-insensitive)
score = (len(matched_gap_skills) * 15)
      + (len(matched_gap_skills) / len(project.skills) * 20)   # how focused the project is on your gaps
      + (len(matched_gap_skills) / len(skill_gaps)   * 25)     # how much of your overall gap it covers
```

Projects with zero matched gap skills are dropped. The remainder is
sorted descending by `(number of matched gap skills, score)`, and each
recommendation includes a human-readable `explanation` naming the gap
skills it addresses.

This scoring logic is deliberately duplicated (not shared) with the
frontend's offline recommender in `src/lib/recommendation.ts`, which runs
the same formula over the frontend's full project catalog when this
service is unavailable.

## API

### `GET /`
Health check. Returns `{"status": "ok", "service": ..., "model": ...}`.

### `POST /analyze`

Request:
```json
{
  "resume": "Python, FastAPI, PostgreSQL, Docker, REST APIs, Git",
  "jobs": ["Backend Engineer with AWS, Kubernetes, Terraform, and CI/CD experience"]
}
```

Response:
```json
{
  "current_skills": ["Docker", "FastAPI", "Git", "PostgreSQL", "Python", "REST APIs"],
  "target_skills": ["AWS", "CI/CD", "Kubernetes", "Terraform"],
  "skill_gaps": ["AWS", "CI/CD", "Kubernetes", "Terraform"],
  "recommendations": [
    {
      "project": { "id": "deploy-fastapi-aws", "title": "Deploy a FastAPI App to AWS", "...": "..." },
      "score": 41.7,
      "matched_gap_skills": ["AWS"],
      "explanation": "This project addresses 1 of your identified skill gaps: AWS."
    }
  ]
}
```

Returns `400` if both `resume` and `jobs` are empty.

## Running locally

```bash
cd backend
python -m venv venv          # if venv/ doesn't already exist
source venv/bin/activate
pip install fastapi uvicorn sentence-transformers numpy
python main.py                # serves on http://127.0.0.1:8000
```

The frontend reads `NEXT_PUBLIC_API_URL` (defaults to
`http://127.0.0.1:8000`) to find this service. First startup downloads
and loads the `all-MiniLM-L6-v2` model, which takes a few seconds.

## Extending the taxonomy

To recognize a new skill:
1. Add its canonical name to `TAXONOMY_SKILLS` in `main.py`.
2. Add any common aliases to `SYNONYM_MAP` (lowercase key → canonical
   value).
3. Mirror both additions in `src/lib/skillTaxonomy.ts` on the frontend so
   the offline fallback stays consistent with the backend.
4. Restart the service — taxonomy embeddings are pre-computed once at
   startup (`TAXONOMY_EMBEDDINGS`), not per-request.
