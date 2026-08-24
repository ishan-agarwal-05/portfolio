export type FitSkill = {
  name: string;
  aliases: string[]; // lowercase match terms
  level: "professional" | "project" | "coursework";
  evidence: string;
  href?: string;
};

// What I can actually claim, with where it came from.
export const fitSkills: FitSkill[] = [
  { name: "Python", aliases: ["python"], level: "professional", evidence: "Primary language across all four internships, simulation tooling at HMGICS, Flask microservices at TechFour, RAG pipelines at PwC.", href: "/#experience" },
  { name: "Java", aliases: ["java"], level: "project", evidence: "Teacher's Pet (CS2103T software engineering project) and NUS coursework.", href: "/#projects" },
  { name: "TypeScript / JavaScript", aliases: ["typescript", "javascript", "node", "node.js", "nodejs"], level: "project", evidence: "LectureAI full-stack platform, Bundl (React/Node/Socket.IO), this website.", href: "/work/lectureai" },
  { name: "React", aliases: ["react", "next.js", "nextjs", "frontend framework"], level: "project", evidence: "LectureAI, Bundl, and this site (Next.js).", href: "/#projects" },
  { name: "SQL / MySQL", aliases: ["sql", "mysql", "relational database", "rdbms"], level: "professional", evidence: "MySQL-backed microservices at TechFour; schema design in multiple projects.", href: "/#experience" },
  { name: "MongoDB", aliases: ["mongodb", "nosql"], level: "project", evidence: "Bundl's real-time order matching store.", href: "/#projects" },
  { name: "Flask / REST APIs", aliases: ["flask", "rest", "api design", "microservice", "microservices", "backend"], level: "professional", evidence: "Three deployed microservices at TechFour: auth/OTP, documents, communications.", href: "/work/techfour-dms" },
  { name: "Flutter", aliases: ["flutter", "mobile"], level: "professional", evidence: "Shipped the Flutter client at TechFour.", href: "/work/techfour-dms" },
  { name: "Docker & CI/CD", aliases: ["docker", "ci/cd", "cicd", "continuous integration", "devops"], level: "project", evidence: "CI/CD and automated testing on Teacher's Pet; SonarScanner quality gates at TechFour.", href: "/#experience" },
  { name: "LLM / RAG systems", aliases: ["llm", "rag", "retrieval-augmented", "retrieval augmented", "langchain", "generative ai", "genai", "gen ai", "prompt"], level: "professional", evidence: "RAG assistant over several hundred documents at PwC, LangChain, LangSmith tracing and offline evaluation.", href: "/work/pwc-rag" },
  { name: "ML / NLP", aliases: ["machine learning", "ml", "nlp", "natural language", "pytorch", "transformers", "hugging face", "deep learning", "scikit", "sklearn"], level: "project", evidence: "RoBERTa QA reranking study (84.3 EM on SQuAD), fake-news fairness ablation on LIAR (18 configs).", href: "/work/qa-reranker" },
  { name: "Robotics simulation", aliases: ["robotics", "simulation", "digital twin", "isaac sim", "omniverse", "usd", "gazebo", "ros"], level: "professional", evidence: "Six months on Hyundai's digital twin platform, Isaac Sim, OmniGraph, USD, code generation for robot control graphs.", href: "/work/action-graph-generator" },
  { name: "Code generation / metaprogramming", aliases: ["code generation", "codegen", "compiler", "dsl"], level: "professional", evidence: "The HMGICS action graph generator: robot programs in, wired control graphs out.", href: "/work/action-graph-generator" },
  { name: "Git & collaboration", aliases: ["git", "github", "version control", "code review"], level: "professional", evidence: "Shared team codebase at HMGICS from week one; reviewed work weekly.", href: "/#experience" },
  { name: "Salesforce / Apex", aliases: ["salesforce", "apex", "crm"], level: "professional", evidence: "HR recruiting app at Quadrafort; certified Administrator and Developer.", href: "/work/quadrafort-salesforce" },
  { name: "Data analysis", aliases: ["pandas", "numpy", "data analysis", "data pipeline", "etl"], level: "professional", evidence: "Traceability audit at HMGICS (36-part cross-reference); analysis tooling across ML projects.", href: "/work/digital-twin-platform" },
  { name: "Quantitative finance", aliases: ["quantitative", "quant", "finance", "trading", "stochastic"], level: "coursework", evidence: "Minor in Quantitative Finance and Mathematics, stochastic calculus, probability, real analysis.", href: "/#top" },
  { name: "Technical writing & documentation", aliases: ["documentation", "technical writing", "confluence"], level: "professional", evidence: "PoC documentation suite at HMGICS, structured for engineers, operators and leadership; handover docs validated by UAT protocol.", href: "/work/action-graph-generator" },
  { name: "Stakeholder communication", aliases: ["stakeholder", "presentation", "communication", "cross-functional"], level: "professional", evidence: "GTC 2026 technology analysis for stakeholders; weekly syncs with NVIDIA solutions architects.", href: "/#experience" },
];

// Things a JD might ask for that I genuinely don't have professionally, be honest.
export const knownGaps: { term: RegExp; label: string; note: string }[] = [
  { term: /\bkubernetes|k8s\b/i, label: "Kubernetes", note: "No production Kubernetes experience, Docker yes, orchestration not yet." },
  { term: /\baws|amazon web services|ec2|s3|lambda\b/i, label: "AWS", note: "No professional cloud-provider experience; comfortable picking it up given Docker/CI background." },
  { term: /\bgcp|google cloud\b/i, label: "GCP", note: "No professional GCP experience." },
  { term: /\bazure\b/i, label: "Azure", note: "No professional Azure experience." },
  { term: /\bGo(lang)?\b/, label: "Go", note: "Haven't shipped Go, strongest in Python, Java and TypeScript." },
  { term: /\brust\b/i, label: "Rust", note: "Haven't shipped Rust." },
  { term: /\bc\+\+\b/i, label: "C++", note: "Coursework-level only (systems modules), not professional." },
  { term: /\bkafka\b/i, label: "Kafka", note: "No hands-on Kafka; understand queueing concepts from systems coursework." },
  { term: /\bspring\b/i, label: "Spring", note: "Java yes, Spring framework not yet." },
  { term: /\b(\d+)\+?\s*years?\b/i, label: "Years of experience", note: "I graduate May 2027, four internships, but this is a new-grad profile." },
];
