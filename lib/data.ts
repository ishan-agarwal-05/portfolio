export type CaseStudy = {
  slug: string;
  kind: "work" | "project";
  title: string;
  org: string;
  role?: string;
  period: string;
  oneLiner: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  repo?: string;
  repoNote?: string;
  summary: string;
  sections: { heading: string; body: string[] }[];
  honest: string;
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  summary: string;
  articles: { label: string; slug: string }[];
};

export const site = {
  name: "Ishan Agarwal",
  role: "Software Engineer, Backend, Platform & Applied AI",
  email: "ishan_agarwal@u.nus.edu",
  linkedin: "https://linkedin.com/in/ishan-agarwal-nus",
  github: "https://github.com/ishan-agarwal-05",
  resume: "/Ishan_Agarwal_Resume.pdf",
  url: "https://ishan-agarwal.com",
  availability: "Graduating May 2027 · open to full-time software & AI roles",
};

export const caseStudies: CaseStudy[] = [
  // ─────────────────────────── WORK ───────────────────────────
  {
    slug: "action-graph-generator",
    kind: "work",
    title: "Action Graph Code Generator",
    org: "Hyundai Motor Group Innovation Center Singapore",
    role: "Digital Twin & Simulation Engineering Intern",
    period: "Apr, Jun 2026",
    oneLiner:
      "A code generator that turns Kawasaki AS robot programs into wired Isaac Sim control graphs, taking a subprogram from about a week of manual work down to an afternoon.",
    metrics: [
      { value: "1 wk to ~4 h", label: "per subprogram, including review" },
      { value: "40+", label: "subprograms in a single factory cell" },
      { value: "7", label: "generation approaches benchmarked" },
      { value: "4", label: "undocumented API behaviours reverse-engineered" },
    ],
    stack: ["Python", "NVIDIA Isaac Sim", "OmniGraph", "USD", "Kawasaki AS"],
    summary:
      "HMGICS is building a digital twin of its electric-vehicle factory on NVIDIA Isaac Sim, working toward a software-defined dark factory by 2032. Wiring one robot subprogram into an Action Graph by hand took roughly an engineering week, and a single cell has forty or more subprograms across multiple robots. Over the last three months of my internship I scoped, researched and built a proof-of-concept generator that does the wiring automatically, so the remaining work is checking it rather than building it.",
    sections: [
      {
        heading: "Scoped alone from a one-line brief",
        body: [
          "The brief was a single sentence: automate the authoring of Action Graphs from robot programs. No acceptance criteria, no prior art inside the team, no spec. I started by writing down the existing manual workflow step by step with its pain points, defined the problem boundaries myself, and reviewed them with the team lead before writing any code. That was a different kind of work from my first three months, where the features were already defined.",
          "Before committing to an approach I evaluated seven candidates: deterministic Python generation, a local LLM, an LLM agent reading structured documentation, a custom API pipeline, and three others. I scored them on predictability, auditability, and whether they could run inside an air-gapped network at all. Deterministic Python won. The output drives the motion of a physical factory robot, so being able to explain every generated line matters more than being clever.",
        ],
      },
      {
        heading: "Ground truth first, generation second",
        body: [
          "I hand-built a correctly wired compound node for the wiper pick sequence and had the senior developer validate it: node structure, joint correction values, fork and join patterns. That became the reference. Every generated graph was diffed against its USD output until the generated version was indistinguishable from the hand-made one.",
          "The diffing is what surfaced four undocumented OmniGraph behaviours. og.Attribute.set() turned out to be runtime only, silently failing to persist to USD on reload. Target and relationship-typed attributes needed CreateRelationship().SetTargets() instead of the documented setter. Make Array input types reset values to zero unless the calls were sequenced in a particular order. And og.Controller.connect() simply does not work for cross-graph compound port connections, so those relationships had to be authored manually. Each one was found by reading the installed extension source, since there was no internet in that environment.",
          "All four workarounds went into a shared helper module, codegen_utils.py, which wraps node creation, wiring, attribute setting and target-prim relationships. Any future generator script gets the fixes without rediscovering them.",
        ],
      },
      {
        heading: "Built to be handed over",
        body: [
          "The generator was never the whole deliverable. I wrote a reference suite alongside it covering the node catalogue, the API patterns, the AS-to-graph translation rules, worked examples, every technical decision with the alternatives I rejected, and the parts of Kawasaki AS semantics that matter for code generation.",
          "To check the documentation actually worked, I drafted a user acceptance test: an engineer who has never seen the project generates a compound node using the documentation alone, with no verbal guidance. I also filed the internal AI use-case submission for the workflow and left behind a set of diagnostic and inspection scripts for the team.",
        ],
      },
    ],
    honest:
      "This is a validated proof of concept on one subprogram family, not a production system across all forty. Generated graphs still get reviewed by an engineer before they are trusted, which is why the honest figure is about four hours per subprogram rather than the raw runtime. The LLM approaches were also judged under air-gap constraints; with model access I would want to test a hybrid, deterministic for the core and a model for the long tail of AS constructs.",
  },
  {
    slug: "digital-twin-platform",
    kind: "work",
    title: "Digital Twin Simulation Platform",
    org: "Hyundai Motor Group Innovation Center Singapore",
    role: "Digital Twin & Simulation Engineering Intern",
    period: "Jan – Jun 2026",
    oneLiner:
      "Reporting infrastructure and three UI extensions for a factory digital twin, plus a traceability audit that turned a suspected code bug into a prioritised data remediation plan.",
    metrics: [
      { value: "3", label: "Omniverse Kit UI extensions shipped" },
      { value: "31% → 44%", label: "asset traceability, gaps root-caused" },
      { value: "36", label: "physical parts cross-referenced by hand" },
      { value: "1", label: "config-driven architecture reused by every later feature" },
    ],
    stack: ["Python", "Omniverse Kit", "USD", "YAML", "Model-View-Delegate"],
    summary:
      "Six months embedded in HMGICS's simulation team, a small specialist group building digital twin tooling on NVIDIA Isaac Sim in weekly sync with NVIDIA's own engineers. The proof of concept modelled one factory cell (FE02) end to end. I built the platform's UI surface, its reporting system, and the analysis that kept its data honest, starting from a fully offline Isaac Sim installation in a restricted network that I had to figure out and document myself, because nobody had recorded it before.",
    sections: [
      {
        heading: "Simulation reports engineers actually read",
        body: [
          "Before this, simulation output lived in raw log files or had to be observed live. I built the system that generates and opens a self-contained HTML report at the end of every run: per-robot joint-angle charts, tool-centre-point path charts, work-target completion statistics pulled from external tables, and a parts inventory of every asset in the scene. An offline fallback mode keeps reports generating with reduced data when external services are down.",
          "Getting this right meant understanding the full simulation lifecycle to hook the completion event without disturbing simulation state, and designing a modular data layer, YAML configuration, live data through an internal extension at runtime, CSV fallback. Along the way I fixed lifecycle bugs around stale state on scene changes and windows closed mid-simulation, and extracted CSV parsing and file loading into dedicated modules. That config-driven pattern was reused by every subsequent feature on the platform.",
        ],
      },
      {
        heading: "Three extensions, one architecture",
        body: [
          "I shipped a data visualisation extension rendering live records from an internal asset system into dynamic tables inside Isaac Sim (Model-View-Delegate pattern, config-driven dropdowns for car model and station filters); the DT Sim Manager landing page, built from scratch as the entry point launching the platform's simulation flows; and the New Product Introduction window, a three-state UI (pre-setup with scenario selection and clash review, active simulation, post-simulation review) with shared state across three visually distinct layouts and a custom expandable widget for clash detection.",
          "The NPI window was wireframed in FigJam and reviewed with the team lead before any code was written, an agreed design that measurably cut implementation iteration. I also consolidated the baseline simulation from two extensions into one and redesigned the stage-load flow around USD sublayer composition: create an empty stage, add the scene as a sublayer, flatten, apply starting configuration. Understanding why the previous template-stage approach kept failing required reading Isaac Sim's own source.",
        ],
      },
      {
        heading: "The traceability audit",
        body: [
          "The project target: over 80% of simulation assets traceable to identifiers in the factory's physical-parts systems. The report showed roughly 31%, and the working assumption was a code bug. I exported the full scene hierarchy to establish ground truth, 36 physical parts, and cross-referenced every asset against the mapping spreadsheet and the external system records, by hand.",
          "Result: 16 of 36 traceable, or 44%. Every gap was a data problem rather than a code one: identifiers that existed in the mapping file but were never written into the scene, parts with no identifier information at all, and one asset in the simulation that no external system knew about. I wrote it up with a remediation plan ordered by root cause, so the team could fix the data instead of hunting for a bug that was not there.",
        ],
      },
      {
        heading: "Communicating up and out",
        body: [
          "Beyond code: I wrote the Confluence documentation for the PoC's UI and reporting systems at a level pitched for three audiences, engineers maintaining it, line operators using it, leadership evaluating it. I produced video walkthroughs for user onboarding, and prepared a structured analysis of NVIDIA GTC 2026 announcements for the team and stakeholders, filtering a large volume of marketing-framed material down to what would actually affect the roadmap, with concrete recommendations.",
        ],
      },
    ],
    honest:
      "Two of my original objectives, Nucleus file selection and aggregated multi-run reports, never got built. Phase 2 moved to the action graph generator instead, which was the more useful thing for the team, but it does mean I finished the internship with two stated goals unmet.",
  },
  {
    slug: "techfour-dms",
    kind: "work",
    title: "Reusable Backend Microservices",
    org: "TechFour Engineering Solutions",
    role: "Software Engineering Intern",
    period: "May, Jul 2025",
    oneLiner:
      "Three Flask microservices built as internal building blocks, so the company would stop rewriting user management, document handling and notifications on every new project.",
    metrics: [
      { value: "3", label: "microservices built and deployed" },
      { value: "100+", label: "employee company, internal platform work" },
      { value: "SonarQube", label: "static analysis and security gates" },
      { value: "OpenAPI", label: "every endpoint documented in Swagger" },
    ],
    stack: ["Python", "Flask", "Flutter", "MySQL", "JWT", "SonarQube", "Swagger", "GitLab"],
    repo: "https://github.com/ishan-agarwal-05/dms_personal",
    repoNote: "personal rebuild",
    summary:
      "TechFour is a software company of over a hundred people, and it had noticed a pattern: every new project rebuilt the same foundations from scratch. Login, OTP, password reset, file upload, notifications. My internship was to build those once as standalone services with clean APIs, so future projects could pull them in instead of writing them again. There was no external client. The customer was the company's own future codebases.",
    sections: [
      {
        heading: "Three services, built to be reused",
        body: [
          "The user management service handles registration, JWT authentication with bcrypt hashing, OTP verification and password reset. The document service handles uploads with metadata validation, date-based organisation and lifecycle management behind an admin view. The communication service sends internal notifications out through WhatsApp and email integrations, with a cron scheduler for anything time-triggered. MySQL with connection pooling underneath, Flask on top.",
          "Designing for reuse changes the work. Each service had to stand on its own, with no assumptions about the app calling it, which meant thinking harder about API surface than I would have for a one-off feature. I also built Flutter web clients against them, which was the fastest way to find out where an API was awkward to consume.",
        ],
      },
      {
        heading: "The process around the code",
        body: [
          "This was my first exposure to engineering process as something deliberate rather than incidental. Work was tracked in Jira. The company had written policies for branch naming, commit messages and branching strategy, and code went through GitLab on a self-hosted instance. Every endpoint was documented in OpenAPI and served through Swagger UI as it was built, not afterwards, which quietly improved the endpoints themselves.",
          "Quality gates ran through SonarQube with SonarScanner, self-hosted alongside the project. It checks for bugs, code smells and security vulnerabilities, and I kept working through its findings until the services came back clean. Watching a tool flag things I was pleased with is a useful corrective early on.",
        ],
      },
      {
        heading: "Learning deployment from the person who ran it",
        body: [
          "The most valuable part of this internship was where I happened to sit. My desk was next to Sahil Bhoyar, who ran the company's GitLab, infrastructure and deployments. For about a month he taught me something most days: Linux fundamentals, Nginx, reverse proxying, load balancing, how deployments actually reach a server. He would give me something to read up on, then later show me that exact thing running in the production environment.",
          "That is a kind of knowledge that is hard to get from a course, because the interesting parts are the operational details nobody writes down. It is also why deployment and infrastructure stopped feeling like someone else's job to me.",
        ],
      },
    ],
    honest:
      "By the time I left, the services worked but had no real users, because the platform they were built for was still in development. So I can speak to the design and the code quality, not to how they behaved under production traffic. Load testing was minimal, and knowing what I know now I would have been more defensive about rate limiting on the OTP flow. The public repo is my own rebuild of the system, not company code.",
  },
  {
    slug: "pwc-rag",
    kind: "work",
    title: "RAG Assistant over Internal Knowledge",
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024, Jan 2025",
    oneLiner:
      "A retrieval-augmented assistant over several hundred internal policy and research documents, so teams could find answers and stop redoing research that already existed.",
    metrics: [
      { value: "100s", label: "of internal documents in the corpus" },
      { value: "2", label: "retrieval modes: policy lookup, prior work" },
      { value: "LangSmith", label: "tracing and offline evaluation" },
    ],
    stack: ["Python", "LangChain", "LangSmith", "Streamlit", "RAG"],
    summary:
      "PwC teams kept re-answering the same policy questions and redoing research another team had already finished, because the knowledge sat in several hundred documents that nobody could search by meaning. I worked on the retrieval-augmented assistant built to fix that, on a team shipping it for internal use.",
    sections: [
      {
        heading: "What the system did",
        body: [
          "The pipeline was built in LangChain: document ingestion and chunking, embedding into a vector store, retrieval, and prompt assembly for grounded answers. Two modes matched two different problems. Policy lookup returned an answer with the source passage beside it, so the reader could check it. Prior-work discovery was the more interesting one, because the useful output is not the generated text at all, it is the pointer to a document the team did not know existed.",
          "The interface was Streamlit, which for an internal tool used by consultants was the right call: the UI could change as fast as the feedback arrived, and getting it in front of real users early mattered more than polish.",
        ],
      },
      {
        heading: "Measuring instead of guessing",
        body: [
          "The part that shaped how I build things now was the evaluation discipline. Every chain was traced in LangSmith, and prompt changes were compared against a fixed question set offline rather than judged by reading a few outputs and feeling good about them.",
          "In late 2024 that was not yet standard practice, and the difference between an answer that seems better and an answer that measurably is better is the whole game once a model is in the loop. I have not built anything with an LLM in it since without setting up evaluation first.",
        ],
      },
    ],
    honest:
      "This was a prototype that proved the concept, not a hardened deployment. Access control and document-permission awareness were out of scope, and that is exactly where the hard engineering would start: a retrieval system that surfaces a document to someone who should not see it is worse than no retrieval system. It was also a short placement on an ongoing team effort, so the design was shared work rather than mine alone.",
  },
  {
    slug: "quadrafort-salesforce",
    kind: "work",
    title: "HR Recruitment Platform on Salesforce",
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May, Jul 2024",
    oneLiner:
      "Three months building an HR recruitment platform on Salesforce with application tracking and role-based access, plus both Salesforce certifications earned along the way.",
    metrics: [
      { value: "3 months", label: "first professional placement" },
      { value: "2", label: "Salesforce certifications earned" },
      { value: "10", label: "engineers on the build team" },
    ],
    stack: ["Salesforce", "Apex", "SOQL", "Lightning", "VS Code"],
    summary:
      "My first internship, taken after first year. It began with structured training on the Salesforce platform, its data model and its conventions, then moved into building a genuine HR recruitment platform with the rest of the team. Three months, and the placement that taught me how a professional engineering environment actually runs.",
    sections: [
      {
        heading: "Getting fluent in the platform",
        body: [
          "Salesforce development is its own discipline. You work within the platform's data model, its governor limits and its declarative tooling, and you write Apex where configuration cannot reach, which means learning the platform properly before you can build anything real. I worked through Salesforce's Trailhead curriculum and earned both the Administrator and Developer certifications during the internship.",
          "Alongside that came the things nobody teaches you explicitly: setting up a development environment properly, using version control the way a team expects, and how work moves from a request to something shipped.",
        ],
      },
      {
        heading: "The platform we built",
        body: [
          "The team built an HR recruitment application on Salesforce: candidate application tracking through each hiring stage, and role-based access so that an HR manager, a recruiter and an interviewer each see exactly what their role should and nothing beyond it. Permissions were the part that needed the most care, because in a hiring system the access model is the product as much as the workflow is.",
          "Most of the team were final-year students while I was finishing my first, which is an efficient way to learn quickly. I also got to watch the implementation of Domino's India's customer-complaints application up close, my first look at how a client deployment at national scale is planned and staged.",
        ],
      },
    ],
    honest:
      "This was an internal build rather than direct client delivery, and it was heavily supervised, as a first-year placement should be. Most of the system is configuration rather than code, which is how Salesforce is designed to be used but does mean it demonstrates platform judgement more than software engineering depth. The certifications and the access-control thinking are what I carried forward.",
  },
  {
    slug: "qa-reranker",
    kind: "project",
    title: "Margin-Triggered Reranking for Extractive QA",
    org: "NUS · CS4248 Natural Language Processing",
    period: "Aug – Dec 2025",
    oneLiner:
      "Found that a fine-tuned RoBERTa already had the right answer in its top five candidates for 95% of SQuAD questions, then built a reranker that fires only when the model is unsure.",
    metrics: [
      { value: "84.28 → 84.40", label: "exact match, SQuAD v1.1 dev" },
      { value: "95.1%", label: "questions with gold span in top-5" },
      { value: "55", label: "predictions changed, 14 fixed, 1 broken" },
    ],
    stack: ["PyTorch", "Hugging Face Transformers", "RoBERTa", "Sentence-BERT"],
    repo: "https://github.com/arshinsikka/CS4248_G02_QA",
    repoNote: "group repo · 14 of 18 commits mine",
    summary:
      "An error-analysis-first NLP project (team of five): instead of throwing a bigger model at SQuAD, we measured where the headroom actually was and spent compute only there. Fine-tuned RoBERTa-base to 84.28 EM / 90.93 F1, then added a bi-encoder reranking layer that activates only when the model's own confidence margin says it might be wrong.",
    sections: [
      {
        heading: "The headroom finding",
        body: [
          "The baseline model produces a full distribution over answer spans, but only the top one is ever used. We extracted the top-k candidates and computed oracle scores: with k=5, the gold span appears in the candidates for 95.1% of questions, and oracle exact match jumps from 84.28 to 95.11 (F1 from 90.93 to 97.08). The model wasn't failing to find answers, it was failing to rank them first.",
          "The margin between the top two candidate scores turned out to be the signal. When the gold span is ranked first, the median margin is about 0.60; when the gold span sits at rank two, it collapses to about 0.11. Low margin means the model itself suspects it might be wrong.",
        ],
      },
      {
        heading: "Spend compute only where the model is unsure",
        body: [
          "The reranking rule: if the top-two margin exceeds a threshold τ, keep the top answer untouched; below it, invoke a bi-encoder (all-MiniLM-L6-v2) that rescores both candidates by cosine similarity with the question, interpolated with the baseline scores at α = 0.5. Confident predictions cost nothing extra.",
          "The final system changed just 55 of 10,570 dev predictions, 14 became correct, 1 broke, for +0.12 EM and +0.11 F1 at near-zero marginal compute. We also ran the controls that make the result meaningful: global reranking without a margin trigger consistently hurts, reranking over top-3 or top-5 candidates hurts (more noise, no more signal), and a cross-encoder cost more without consistently winning. Negative results you can explain are worth more than a clean-looking table.",
        ],
      },
    ],
    honest:
      "+0.12 EM from a single dev-set run is a small number and I would not claim statistical significance from it. What the project is actually worth is the headroom analysis and the idea of spending compute only where the model is unsure. The controls that failed are in the report too.",
  },
  {
    slug: "fake-news-fairness",
    kind: "project",
    title: "Fake News Detection & the Fairness Cost of Metadata",
    org: "NUS · CS3264 Machine Learning",
    period: "Jan – May 2025",
    oneLiner:
      "Benchmarked 18 model/feature configurations on the LIAR political-claims benchmark and quantified a trade-off most papers skip: speaker metadata helps accuracy partly by learning who is speaking.",
    metrics: [
      { value: "18", label: "model & feature configurations" },
      { value: "64.5%", label: "best accuracy, XGBoost + Word2Vec + party" },
      { value: "+1–4", label: "points from metadata, with a fairness cost" },
    ],
    stack: ["scikit-learn", "XGBoost", "DistilBERT", "Word2Vec", "TF-IDF"],
    summary:
      "A systematic ablation on 12,836 short political statements from PolitiFact (the LIAR benchmark), binarised into true/false. We swept classical models (Logistic Regression, SVC, Random Forest, XGBoost), an MLP, and a fine-tuned DistilBERT across TF-IDF, Word2Vec and metadata feature sets, with the fairness analysis done properly instead of gestured at. Framed around a real deployment context: Singapore's POFMA fact-checking ecosystem, where manual review doesn't scale.",
    sections: [
      {
        heading: "The ablation",
        body: [
          "Three feature variants per model family, statement-only, statement plus selected metadata (party, speaker title, subject), and full pipelines including the speaker's historical credibility counts, across sparse TF-IDF and dense pre-trained Word2Vec representations. Eighteen configurations in all, each with proper preprocessing: top-15 category encoding with rare values grouped, multi-label subject splitting, credibility counts as numeric features.",
          "Patterns that held: dense embeddings beat TF-IDF for text-only inputs, SVMs beat logistic baselines in high dimensions, and the best configuration was XGBoost over Word2Vec plus party affiliation at 64.5% accuracy.",
        ],
      },
      {
        heading: "The finding that mattered",
        body: [
          "Metadata consistently lifts accuracy by 1–4 points, and the ablations show part of that lift comes from learning speaker identity rather than statement content. A model fed only the speaker's credibility history, with no statement text at all, still reaches 56.7% accuracy, essentially a prior on the person. That is a measurable fairness problem: a claim's predicted truthfulness should not depend on who said it, and any system deployed into a fact-checking pipeline would need that trade-off surfaced, not buried.",
          "For calibration: published binary-classification results on LIAR sit in a similar band, it is a genuinely hard benchmark, and the controlled comparison was the point.",
        ],
      },
    ],
    honest:
      "64.5% accuracy is modest, though it sits in the same range as published work on LIAR. The value is the 18-way comparison and the fairness measurement rather than the headline number. One thing I have to own: the code is gone. It lived on a teammate's laptop and was never pushed anywhere. Only the report survives.",
  },
  {
    slug: "lectureai",
    kind: "project",
    title: "LectureAI",
    org: "Co-founder · EdTech startup",
    period: "Feb – Dec 2025",
    oneLiner:
      "Co-founded a platform turning lecture recordings into AI-generated study notes. Led full-stack development, ran customer discovery across NUS cohorts, and made the call to wind it down.",
    metrics: [
      { value: "3", label: "co-founders, ten months" },
      { value: "e2e", label: "audio → transcript → structured notes pipeline" },
    ],
    stack: ["Python", "Celery", "Redis", "FFmpeg", "React", "LLM APIs", "Alembic"],
    repo: "https://github.com/arshinsikka/lectureai-mvp",
    repoNote: "on a co-founder's account",
    summary:
      "The most instructive project I've done, because it failed for a reason worth understanding: the product worked, and the market could not adopt it. Three co-founders, ten months, a real pipeline, real customer discovery, and a deliberate ending.",
    sections: [
      {
        heading: "Build",
        body: [
          "The pipeline took a raw lecture recording and produced structured study notes: FFmpeg audio processing, transcription, then LLM-based structuring into summaries and study materials, run asynchronously through a Celery task queue over Redis, because an hour-long lecture doesn't process inside an HTTP request. A Python backend with Alembic-managed migrations, a React frontend, and the operational glue between them. I led full-stack development end to end.",
          "The technically interesting decision was splitting correction from summarisation. A summariser fed a corrupted transcript produces a clean, well-organised summary of the wrong thing, so we used lecture slides as reference material to fix technical terminology in the transcript first, then summarised. Error propagation is a pipeline design problem, not a model problem.",
        ],
      },
      {
        heading: "Discovery, and what it said",
        body: [
          "I ran customer discovery across NUS student cohorts while we built. Two walls emerged. The soft one: students liked the output, said so enthusiastically, and then didn't change their study workflow or show willingness to pay at sustainable unit economics, interview enthusiasm and retention behaviour told different stories, and retention was telling the truth. The hard one: lecture recordings contain other students' voices, which in Singapore triggers real data-protection consent requirements. Every adoption conversation risked becoming a legal conversation first.",
        ],
      },
      {
        heading: "The wind-down call",
        body: [
          "We chose to stop rather than drift, a decision made when the evidence was in, not when the money ran out. What I'd do differently: run pricing and willingness-to-pay tests before building the full pipeline, not after. Talking to users is not the same as watching what they do.",
        ],
      },
    ],
    honest:
      "No product-market fit is the headline and I don't dress it up. The transferable asset is judgement: knowing which evidence would have changed the outcome, and testing it earlier next time. The repo is private under my co-founder's account.",
  },
  {
    slug: "bundl",
    kind: "project",
    title: "Bundl",
    org: "NUS Orbital · full-stack",
    period: "May – Aug 2024",
    oneLiner:
      "A web app that cuts food delivery costs by letting people in the same location pool orders, real-time matching, live chat, and a grouping algorithm.",
    metrics: [
      { value: "real-time", label: "order matching and chat via WebSockets" },
      { value: "2", label: "person team, built over one summer" },
    ],
    stack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB", "Material-UI"],
    repoNote: "repo access being restored",
    summary:
      "Built for NUS Orbital (the university's summer software programme): delivery fees are a fixed cost that nobody coordinates away, so Bundl lets users browse restaurants, see what people nearby are ordering, and bundle orders together, splitting the fee and cutting packaging waste.",
    sections: [
      {
        heading: "How it works",
        body: [
          "Users add items from multiple restaurants to a cart, see other open orders at their location, and coordinate through built-in chat to bundle. The matching layer groups compatible orders, same area, overlapping restaurant, close in time, and Socket.IO keeps carts, chat and matches live across clients without refresh. MongoDB stores users, restaurants and orders; Express serves the API; Material-UI keeps the interface out of the way.",
          "The interesting part was the real-time state. Keeping several people looking at the same changing order without anyone seeing a stale version is harder than the feature list makes it sound.",
        ],
      },
    ],
    honest:
      "Student-project scope. Authentication was basic, the matching was heuristic rather than optimal, and the planned features like OAuth, bill splitting and live restaurant data never got built. The repo sits under a teammate's account and I am in the process of getting it moved across.",
  },
  {
    slug: "teachers-pet",
    kind: "project",
    title: "Teacher's Pet",
    org: "NUS · CS2103T Software Engineering",
    period: "Sep – Dec 2024",
    oneLiner:
      "A Java desktop app for NUS teaching assistants, student records, attendance, grading tasks and queries, built brownfield on a ~6,000-line existing codebase with CI and automated tests.",
    metrics: [
      { value: "~6k", label: "lines of existing code extended brownfield" },
      { value: "CI", label: "automated test suite on every push" },
    ],
    stack: ["Java", "JavaFX", "Gradle", "JUnit", "GitHub Actions"],
    repo: "https://github.com/ishan-agarwal-05/tp",
    summary:
      "CS2103T teaches software engineering the honest way: you inherit a working ~6,000-line codebase (AddressBook-Level3) and evolve it as a team, with forking workflows, code review, CI, and documentation standards. Our product, Teacher's Pet, targets teaching assistants juggling student queries, attendance and grading across large classes.",
    sections: [
      {
        heading: "What it does",
        body: [
          "Student contact management with add/edit/delete/list, attendance tracking, per-student comments, task prioritisation for grading work, name- and class-based filtering to find anyone fast, and a random-student generator for cold-calling in tutorials. A CLI-first interface optimised for speed, with a JavaFX GUI over it.",
        ],
      },
      {
        heading: "What it taught",
        body: [
          "Working brownfield is the skill: reading an unfamiliar object-oriented design before changing it, keeping tests green through refactors, writing user and developer guides as part of the deliverable, and shipping through pull requests with review. It is the closest a university module gets to how software teams actually operate.",
        ],
      },
    ],
    honest:
      "A course project on a course-provided foundation. The architecture was inherited rather than designed by us, and the feature scope was set by the module. What it taught was how to extend an unfamiliar codebase without breaking it, which turned out to be most of what the internships involved too.",
  },
  {
    slug: "eg1311-robot",
    kind: "project",
    title: "Autonomous Obstacle-Course Robot",
    org: "NUS · EG1311 Design & Make",
    period: "Feb, Mar 2025",
    oneLiner:
      "An Arduino robot that crosses a bump and a slope, finds its own firing position with an ultrasonic sensor, launches a ping-pong ball over a 30cm wall, and reverses back to the start.",
    metrics: [
      { value: "30 cm", label: "wall the ball had to clear" },
      { value: "3", label: "drive motors on H-bridge control" },
      { value: "4", label: "wheel prototypes before one worked" },
    ],
    stack: ["Arduino", "C++", "HC-SR04", "L293D", "Servo", "Fusion 360", "Laser cutting"],
    summary:
      "The course was a 3cm bump, a 10cm slope and a 30cm wall. The robot had to cross all of it, stop at the wall, launch a ping-pong ball over it and reverse back to the start, with no human input. A team of us designed and built it: laser-cut wheels, a polypropylene chassis, a servo catapult and the firmware.",
    sections: [
      {
        heading: "Sensing instead of counting seconds",
        body: [
          "The easy version of this drives forward for a fixed time and fires. It fails as soon as the carpet grips differently or the battery sags, because it has no idea where it actually is. Instead the robot pulses an HC-SR04 ultrasonic sensor every loop, times the echo, and converts it to a distance. When the reading enters a narrow band near the wall it stops, waits three seconds for the chassis to settle, sweeps the servo to launch, then reverses.",
          "Mounting that sensor was its own problem. Too low and the bump or the ramp reads as an obstacle and the robot stops halfway through the course. We raised it on a propylene board braced with two ice-cream sticks, which is not elegant and worked perfectly.",
        ],
      },
      {
        heading: "Four wheels before one worked",
        body: [
          "Cardboard wheels at 8cm could not get over the 3cm bump: too small to carry the robot up and over. Laser-cut acrylic at 10cm cleared the bump and ran straight, being identical to each other, but slid helplessly on the slope because acrylic on a ramp has almost no grip. Rubber bands added traction and then peeled off, since the surface is too smooth for hot glue to hold. Anti-slip mat strips finally stuck and gripped, and that was the wheel we ran.",
          "The ball holder went through the same loop. Flat, the ball fell out whenever the robot tilted. We ended up tilting the holder past 90 degrees from its launch angle, raising it, and giving the rim a curved inward lip: stiff enough to hold the ball through the bumps, soft enough to release it when the servo fires.",
        ],
      },
      {
        heading: "When the fix is mechanical",
        body: [
          "The robot kept veering right. The cause was not the code: the front-right motor was simply weaker than the other two. We tested motor speeds to confirm it, then corrected it by angling both front wheels very slightly left so the drift cancelled out. A software fix would have been more satisfying and a lot slower.",
          "Power was the other one. A 9V for the Arduino plus a separate 6V AA pack for the motor driver looked sensible and produced motors that stuttered or refused to spin, because the pack could not deliver enough current. Running a single 9V in parallel to both fixed it and simplified the circuit. Loose twisted wires shorting on the breadboard got replaced with a proper detachable connector.",
        ],
      },
    ],
    honest:
      "The firing window is a fixed distance band checked once per loop, and the echo timing blocks while it waits, so approaching too fast can step over the window between readings and skip the launch. We tuned the drive speed until that stopped happening, which is a calibration rather than a fix. Slowing the approach as the distance closes would have been the right answer, and I would build it that way now.",
  },
  {
    slug: "educrypto",
    kind: "project",
    title: "EduCrypto",
    org: "NUS · CS4236 Cryptography in Practice",
    period: "Aug 2026, in progress",
    oneLiner:
      "A cryptography library built primitive by primitive across a semester, paired each week with an attack that breaks a service using that primitive badly.",
    metrics: [
      { value: "in progress", label: "Y4S1, running now" },
      { value: "weekly", label: "primitive, then the attack on it" },
      { value: "private", label: "code closed until the course ends" },
    ],
    stack: ["Python", "pytest", "Flask", "cryptography"],
    repoNote: "private until the semester ends, by course policy",
    summary:
      "CS4236 was recently redesigned away from proving theorems and toward using cryptography correctly in real systems: reading an application's security requirements, choosing the right primitive, picking a sound library implementation, and getting the parameters right. The semester's spine is a library called educrypto that I build up week by week, and the reason it sticks is that every primitive I implement, I then have to attack.",
    sections: [
      {
        heading: "How the semester is structured",
        body: [
          "Each week the module publishes three things: a feature request with an API and its behavioural requirements, a public pytest suite, and a deliberately vulnerable service that uses the library. I implement the primitive into educrypto so the tests pass, then write the attack that breaks the service built on top of it. Both halves live in the same repository, the library under src/educrypto and the attacks in their own module.",
          "The vulnerable services are small Flask applications, which is a pointed choice. The bug is never in the mathematics. It is in how the primitive got used: a reused key, a parameter left at its convenient default, ciphertext nobody authenticated, an API that made the unsafe call the easy one.",
        ],
      },
      {
        heading: "Where it ends up",
        body: [
          "By December this should be a working Python cryptography package covering symmetric encryption and its modes, message authentication and hashing, then the public-key half: RSA, Diffie-Hellman key exchange, El Gamal, and digital signatures, each with a matching attack demonstrating the failure mode when it is deployed carelessly. The later part of the course moves toward how these compose into real protocols, and where cryptography sits in modern systems like blockchain and privacy-preserving machine learning.",
          "It builds on CS2107, the information security module, which is where the threat-modelling half of my thinking came from. This one is the implementation half.",
        ],
      },
    ],
    honest:
      "This is genuinely unfinished and I am listing it because it is what I am working on now, not because it is a result. Right now it covers the earliest weeks: encoding, the one-time pad and the attack on reusing its key. The repository stays private until the course ends, because the module's policy forbids publishing the library while the assignment is running, and I will link it here once that lifts.",
  },
  {
    slug: "this-site",
    kind: "project",
    title: "This Website",
    org: "ishan-agarwal.com",
    period: "Aug 2026",
    oneLiner:
      "The site you're reading. Next.js, statically generated, with a command palette, an AI agent that answers questions about me, and a d20 that knows twenty things.",
    metrics: [
      { value: "100%", label: "static pages, no server except the agent" },
      { value: "⌘K", label: "command palette over everything" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude API"],
    repoNote: "repo public soon",
    summary:
      "A portfolio should demonstrate engineering, not just describe it. Every page here is statically generated from a single typed data model; the interactive pieces, command palette, JD fit-checker, the ask-me agent, are working software, not decoration.",
    sections: [
      {
        heading: "Decisions",
        body: [
          "All content lives in one typed TypeScript data model, case studies, experience, honours, even the d20 facts, so the pages, the command palette index and the agent's knowledge all derive from the same source of truth. Add a project once, and every surface knows about it.",
          "The ask-me agent is the only server-side piece: a rate-limited API route over the Claude API whose system prompt is generated from that same data model, so it can never claim something the site doesn't say. Light and dark themes are hand-built with CSS variables rather than a component library, and the type is Newsreader over Hanken Grotesk with JetBrains Mono for the machinery.",
        ],
      },
    ],
    honest:
      "Built with Claude as a pair, which feels like the honest thing to say on a site that has an AI agent on it. The content, the numbers and the calls about what goes in are mine.",
  },
];

export const experiences: Experience[] = [
  {
    org: "Hyundai Motor Group Innovation Center Singapore",
    role: "Digital Twin & Simulation Engineering Intern",
    period: "Jan 2026 – Jun 2026",
    location: "Singapore",
    stack: ["Python", "NVIDIA Isaac Sim", "OmniGraph", "USD"],
    summary:
      "Six months on the simulation team building digital twin tooling for an EV smart factory. Shipped the reporting system and three UI extensions, then scoped and built a code generator that takes a robot subprogram from about a week of manual wiring down to an afternoon.",
    articles: [
      { label: "Action Graph Code Generator", slug: "action-graph-generator" },
      { label: "Digital Twin Platform", slug: "digital-twin-platform" },
    ],
  },
  {
    org: "TechFour Engineering Solutions",
    role: "Software Engineering Intern",
    period: "May 2025 – Jul 2025",
    location: "India",
    stack: ["Python", "Flask", "Flutter", "MySQL"],
    summary:
      "Built three Flask microservices as internal building blocks for a 100-person company that kept rewriting the same foundations: auth and OTP, documents, notifications. SonarQube gates, OpenAPI docs, and a month of evening tutorials on Linux, Nginx and deployment from the engineer who ran the company's infrastructure.",
    articles: [{ label: "Plug-and-Play Microservices", slug: "techfour-dms" }],
  },
  {
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    location: "India",
    stack: ["Python", "LangChain", "LangSmith", "Streamlit"],
    summary:
      "Worked on a retrieval-augmented assistant over several hundred internal policy and research documents, with LangSmith tracing and offline evaluation so quality was measured rather than eyeballed.",
    articles: [{ label: "RAG Assistant", slug: "pwc-rag" }],
  },
  {
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May 2024 – Jul 2024",
    location: "India",
    stack: ["Salesforce", "Apex"],
    summary:
      "First internship, taken after first year. Built an HR recruitment platform on Salesforce with application tracking and role-based access for HR managers, recruiters and interviewers. Earned both Salesforce certifications during the placement.",
    articles: [{ label: "HR Recruiting on Salesforce", slug: "quadrafort-salesforce" }],
  },
];

export const now = {
  updated: "August 2026",
  items: [
    {
      label: "Final year at NUS",
      body: "Y4S1 underway. Computer Science with minors in Mathematics and Quantitative Finance, focus areas in AI and Computer Security.",
    },
    {
      label: "Building EduCrypto",
      body: "A cryptography library for CS4236, one primitive a week, each paired with an attack that breaks a service using it badly.",
      href: "/work/educrypto",
    },
    {
      label: "Cloud SaaS project, CS5224",
      body: "Cloud Computing group project starting September: design a SaaS that solves a real problem, build the prototype and web interface, then cost it honestly against an on-premise implementation. Aiming to build it on Singapore open data.",
    },
    {
      label: "Open to 2027 new-grad roles",
      body: "Graduating May 2027, looking for full-time software and AI engineering work, based in Singapore.",
    },
  ],
};

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "TypeScript / JavaScript", "SQL", "Apex", "LaTeX"],
  },
  {
    group: "Backend & Infrastructure",
    items: ["Flask", "Node.js", "React", "Flutter", "REST APIs", "Docker", "Git", "CI/CD", "MySQL", "MongoDB", "Celery / Redis"],
  },
  {
    group: "AI & Data",
    items: ["Hugging Face Transformers", "LangChain", "LangSmith", "scikit-learn", "XGBoost", "NumPy", "Pandas", "RAG pipelines"],
  },
  {
    group: "Security",
    items: ["Applied cryptography", "Threat modelling", "SonarQube", "JWT / auth flows", "Secure API design"],
  },
  {
    group: "Simulation & Robotics",
    items: ["NVIDIA Isaac Sim", "Omniverse Kit", "OmniGraph", "USD", "Arduino", "Fusion 360"],
  },
];

export const honours = [
  {
    title: "NTSE Scholar · All India Rank 21",
    detail:
      "National Talent Search Examination, the Government of India's national scholarship exam. Stage II merit holder among roughly a million candidates.",
  },
  {
    title: "FTRE · All India Rank 49",
    detail:
      "FIITJEE Talent Reward Examination: 100% scholarship and fee waiver worth about ₹6,00,000.",
  },
  {
    title: "ANTHE · All India Rank 98",
    detail:
      "Aakash National Talent Hunt Examination: 100% fee waiver plus scholarship.",
  },
  {
    title: "VVM · State Rank 1 (Uttar Pradesh)",
    detail:
      "Vigyan Vidyarthi Manthan, a Government of India (DST & NCERT) science talent initiative. Honoured by state education officials.",
  },
  {
    title: "Odyssey of the Mind · 3rd internationally",
    detail:
      "Eurofest, St. Petersburg. Led the team from ideation to final execution as primary developer of the robot.",
  },
  {
    title: "Cambridge C2 Proficiency · Grade A",
    detail: "The highest level of English certification, at the highest grade. IELTS 8.0.",
  },
  {
    title: "Salesforce Administrator & Developer",
    detail: "Both platform certifications, earned during my first internship.",
  },
  {
    title: "Academic scholarships",
    detail:
      "Full tuition scholarship at Mayoor School for ranking first across the batch three years running; 98% in senior secondary.",
  },
];

export const ttrpgSystems = [
  { name: "D&D 5e", note: "long campaigns" },
  { name: "Call of Cthulhu", note: "plans falling apart" },
  { name: "Monster of the Week", note: "one mystery a session" },
  { name: "FIST", note: "paranormal mercenaries" },
  { name: "Traveller", note: "spreadsheets in space" },
];

export const reading = [
  { name: "Lord of the Mysteries", note: "webnovel" },
  { name: "Shadow Slave", note: "webnovel" },
  { name: "One Piece", note: "still going" },
  { name: "SFF", note: "the standing habit" },
];

export const beyond = [
  {
    title: "Tabletop RPGs",
    body: "Always at the table, never behind the screen. I play rather than run, which means turning up, reading the room, committing to a character and living with the dice. D&D 5e for the long campaigns, Call of Cthulhu when the plan is meant to fall apart, Monster of the Week for a mystery in one sitting, FIST for paranormal mercenary work with almost no prep, and Traveller for the joy of a spreadsheet in space.",
  },
  {
    title: "Reading",
    body: "Constantly, and not fussy about the form. Science fiction and fantasy, plus a long-running habit with webnovels and manga: Lord of the Mysteries, Shadow Slave, One Piece. Serialised fiction is an interesting thing to follow as an engineer, because you watch a writer maintain state and pay off setup across thousands of chapters, mostly without notes.",
  },
  {
    title: "Travel",
    body: "Over thirty countries so far, and at least one trip a year with my family. Much of Europe, including Scandinavia and the centre, west and south, along with North America, South Africa and Japan most recently. It is the fastest way I know to find out that the way something is done at home is not the only way it could be done.",
  },
  {
    title: "Teaching and volunteering",
    body: "Volunteer teacher with Teach SG, tutoring secondary and JC students, and before that with SETU under the Each One Teach One initiative. I keep coming back to it because teaching is the most reliable way to find the gaps in what you thought you knew, and because the students who most need someone patient rarely have one.",
  },
];

export const d20Facts = [
  "I play D&D 5e, Call of Cthulhu, Monster of the Week, FIST and Traveller. Always a player, never the DM.",
  "Natural 20! I once reverse-engineered four undocumented NVIDIA APIs by diffing USD files in an air-gapped network.",
  "Six years of formal Indian classical music training, now applied to the keyboard.",
  "All India Rank 21 in the NTSE, India's national talent search examination.",
  "Third place internationally at Odyssey of the Mind in St. Petersburg, I built the robot.",
  "I volunteer as a teacher with Teach SG.",
  "Cambridge C2 Proficiency, Grade A, the examiner's way of saying I will not stop talking.",
  "I co-founded a startup and made the call to shut it down. Best judgement rep I've ever earned.",
  "All India Rank 49 in FTRE, worth a ₹6,00,000 scholarship.",
  "I speak English, Hindi, and a little German.",
  "Minoring in both Mathematics and Quantitative Finance alongside CS.",
  "My favourite bug hunt: proving a 31% traceability number was a data problem, not a code problem.",
  "I benchmarked seven code-generation approaches before writing the real one.",
  "I've worked in an air-gapped network, no Stack Overflow, just source code and patience.",
  "Focus areas: Artificial Intelligence and Computer Security.",
  "I wireframe UIs before coding them. It has never once been a waste of time.",
  "State Rank 1 in Uttar Pradesh in VVM, a national science talent search.",
  "I have been to over thirty countries, and I still travel with my family at least once a year.",
  "This site's entire content lives in one typed data file. The palette, matcher and agent all read from it.",
  "This site has a command palette. Press ⌘K.",
];

export const paletteIndex = [
  { label: "Intro", href: "/#top", group: "Sections" },
  { label: "Currently", href: "/#now", group: "Sections" },
  { label: "Work", href: "/#work", group: "Sections" },
  { label: "Projects", href: "/#projects", group: "Sections" },
  { label: "Honours", href: "/#honours", group: "Sections" },
  { label: "Toolbox", href: "/#skills", group: "Sections" },
  { label: "Beyond the Terminal", href: "/#beyond", group: "Sections" },
  { label: "Ask the agent", href: "/ask", group: "Pages" },
  { label: "Contact", href: "/contact", group: "Pages" },
  ...caseStudies.map((c) => ({
    label: c.title,
    href: `/work/${c.slug}`,
    group: c.kind === "work" ? "Work Articles" : "Project Articles",
  })),
];
