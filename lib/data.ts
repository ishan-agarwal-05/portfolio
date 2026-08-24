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
    period: "Apr – Jun 2026",
    oneLiner:
      "A code generator that turns Kawasaki AS robot programs into fully wired Isaac Sim control graphs, collapsing an engineer-week of manual wiring per subprogram into seconds.",
    metrics: [
      { value: "1 wk → sec", label: "manual wiring per subprogram" },
      { value: "40+", label: "subprograms in a single factory cell" },
      { value: "7", label: "generation approaches benchmarked" },
      { value: "4", label: "undocumented API behaviours reverse-engineered" },
    ],
    stack: ["Python", "NVIDIA Isaac Sim", "OmniGraph", "USD", "Kawasaki AS"],
    summary:
      "HMGICS is building a digital twin of its electric-vehicle factory on NVIDIA Isaac Sim, working toward a software-defined dark factory by 2032. Manually wiring one robot subprogram into an Action Graph took roughly one engineering week, and a single cell has forty or more subprograms across multiple robots. Over the final three months of my internship I scoped, researched and built the proof-of-concept generator that does it in seconds, deterministic, auditable, and designed for an air-gapped network.",
    sections: [
      {
        heading: "Scoped alone from a one-line brief",
        body: [
          "The brief was a single sentence: automate the authoring of Action Graphs from robot programs. No acceptance criteria, no prior art inside the team, no formal spec. I started by documenting the existing manual workflow step-by-step with its pain points, defined the problem boundaries myself, and reviewed them with the team lead before writing any code. This was a different discipline from the feature-driven work of my first three months, open-ended research where the first deliverable is the problem definition itself.",
          "Before committing to an approach, I formally evaluated seven candidates, deterministic Python generation, a local LLM, an LLM agent over structured documentation, a custom API pipeline, and three others, against predictability, auditability, and compatibility with the air-gapped GPU environment. Deterministic Python with a structured reference documentation suite won. When the output describes the motion of a physical factory robot, being able to explain every generated line beats being clever.",
        ],
      },
      {
        heading: "Ground truth first, generation second",
        body: [
          "I hand-built a correctly wired compound node for the wiper pick sequence in Isaac Sim and validated it with the senior developer, node structure, joint correction values, fork/join patterns. That baseline became the oracle: every generated graph was diffed against its USD output, byte by byte, until the generator's output was indistinguishable from the hand-made version.",
          "That diffing surfaced four undocumented OmniGraph behaviours: og.Attribute.set() being runtime-only and silently failing to persist to USD on reload; target and relationship-typed attributes requiring CreateRelationship().SetTargets() instead of the documented setter; Make Array input type resolution silently zeroing values unless sequenced correctly; and og.Controller.connect() simply failing for cross-graph compound port connections, which forced manual relationship authoring. Each was diagnosed by reading the installed extension source directly, no internet in the environment, so no Stack Overflow, just source code and patience.",
          "All fixes were centralised into a shared helper module (codegen_utils.py) that wraps node creation, wiring, attribute setting and target-prim relationships, so every future generator script inherits the workarounds for free.",
        ],
      },
      {
        heading: "Built to be handed over",
        body: [
          "The deliverable was never just the generator. Alongside the code I wrote a reference suite covering the node catalogue, API patterns, AS-to-graph translation rules, worked examples, every technical decision with its rejected alternatives, and Kawasaki AS language semantics for code generation, structured so an engineer who has never seen the project can generate a compound node using only the documentation.",
          "That handover claim was made testable: I drafted a formal User Acceptance Test protocol in which an engineer unfamiliar with the project generates a node with no verbal guidance, documentation only. I also filed a formal internal AI use-case submission for the workflow, and built a suite of diagnostic and inspection scripts to support the team after my internship ended.",
        ],
      },
    ],
    honest:
      "This shipped as a validated proof of concept on one subprogram family, not a production system across all forty. The evaluation of LLM-based approaches was constrained by the air-gapped network, with model access, a hybrid approach (deterministic core, LLM for the long tail of AS constructs) is what I would test next.",
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
          "Result: 16 of 36 traceable (44%), and every single gap was a data completeness issue, not code, identifiers existing in the mapping file but never written into the scene, parts with no identifier information at all, and one asset in the simulation that no external system knew about. I shipped the findings with a prioritised remediation plan per root cause. Proving the absence of a bug is worth as much as fixing one.",
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
      "Two of my original objectives, Nucleus-based file selection and aggregated multi-run reports, were consciously dropped when the action graph automation project proved a higher-priority contribution to the team's scalability needs. Scope honesty over scope theatre.",
  },
  {
    slug: "techfour-dms",
    kind: "work",
    title: "Plug-and-Play Backend Microservices",
    org: "TechFour Engineering Solutions",
    role: "Software Engineering Intern",
    period: "May – Jul 2025",
    oneLiner:
      "Three deployed Flask microservices, auth, documents, communications, designed as reusable components for future client projects, with a Flutter client on top.",
    metrics: [
      { value: "3", label: "microservices built and deployed" },
      { value: "100%", label: "endpoints documented in Swagger" },
      { value: "2", label: "messaging channels integrated (WhatsApp, email)" },
    ],
    stack: ["Python", "Flask", "Flutter", "MySQL", "JWT", "SonarScanner", "Swagger"],
    repo: "https://github.com/ishan-agarwal-05/dms_personal",
    summary:
      "TechFour builds software for engineering-sector clients, and every new project kept re-implementing the same foundations. My internship brief was to build those foundations once, properly: a user-management service, a document-management service, and an internal communications service, deliberately designed as plug-and-play components that later client projects could drop in.",
    sections: [
      {
        heading: "The three services",
        body: [
          "User management handles registration, JWT-based authentication with bcrypt password hashing, OTP verification, and password reset flows. Document management handles uploads with metadata validation, date-based organisation, and lifecycle management with an admin dashboard for oversight. The communications service routes internal messages and notifications out through integrated WhatsApp and email APIs, with a cron scheduler for automated sends.",
          "Backed by MySQL with connection pooling, each service exposes a clean REST surface and owns its own concerns, the point was that a future client project should be able to take the auth service without inheriting the document service.",
        ],
      },
      {
        heading: "The client, and the quality gates",
        body: [
          "I shipped the accompanying Flutter web client, responsive Material Design over the three services, covering the user flows and the admin dashboard.",
          "Two habits from this internship stuck with me. Every endpoint was documented in Swagger as it was built, not after, which changed how I designed the endpoints themselves. And SonarScanner static-analysis quality gates ran on the codebase, which is a very effective way to discover that code you were proud of has a cognitive-complexity score it shouldn't.",
        ],
      },
    ],
    honest:
      "This was a small-team internship in India with direct client-facing pressure, the services shipped and worked, but load testing was minimal and I'd design the OTP flow's rate limiting more defensively today. The public repo is a personal rebuild of the system, not the client codebase.",
  },
  {
    slug: "pwc-rag",
    kind: "work",
    title: "RAG Assistant over Internal Knowledge",
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    oneLiner:
      "A retrieval-augmented generation assistant over several hundred internal policy and research documents, so teams could find policy answers and stop repeating research that already existed.",
    metrics: [
      { value: "100s", label: "of internal documents indexed" },
      { value: "2", label: "use cases: policy lookup & prior-work discovery" },
    ],
    stack: ["Python", "LangChain", "LangSmith", "Streamlit", "RAG"],
    summary:
      "A five-week winter internship with a concrete problem: PwC teams kept re-answering policy questions and re-doing research that another team had already done, because the knowledge lived in several hundred documents nobody could search semantically. I prototyped the retrieval-augmented assistant that changed that.",
    sections: [
      {
        heading: "The pipeline",
        body: [
          "Built in LangChain: document ingestion and chunking, embedding into a vector store, retrieval, and prompt assembly for grounded answers. The two retrieval modes matched the two use cases, direct policy lookup with the source passage surfaced alongside the answer, and prior-work discovery, where the value isn't the generated text at all but the pointer to the document a team didn't know existed.",
          "The frontend was Streamlit, deliberately. For an internal prototype whose users were consultants, not engineers, iteration speed on the interface mattered more than polish, and Streamlit let the interface change as fast as the feedback arrived.",
        ],
      },
      {
        heading: "Evaluation before vibes",
        body: [
          "The part of this project that shaped how I build LLM systems: LangSmith tracing on every chain, and offline evaluation runs instead of eyeballing outputs. Retrieval quality was measured, prompt changes were compared against a fixed question set, and regressions were visible instead of anecdotal. In 2024 that discipline was not yet the default, and watching answers improve measurably, rather than feeling better, was the real lesson of the internship.",
        ],
      },
    ],
    honest:
      "This was a prototype that proved the concept, not a hardened production deployment, access control and document-permission awareness were out of scope, and they are exactly where the hard work would begin. Say 'several hundred documents' to me and I can defend it; the corpus was real.",
  },
  {
    slug: "quadrafort-salesforce",
    kind: "work",
    title: "HR Recruiting on Salesforce",
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May – Jul 2024",
    oneLiner:
      "My first internship: an HR recruiting application built on the Salesforce platform with Apex, plus both Salesforce certifications earned while shipping it.",
    metrics: [
      { value: "2", label: "Salesforce certifications (Admin & Developer)" },
      { value: "1st", label: "professional codebase, year one of university" },
    ],
    stack: ["Salesforce", "Apex", "SOQL", "Lightning"],
    summary:
      "The summer after my first year at NUS, I joined Quadrafort to build an HR recruiting application on the Salesforce platform, candidate tracking, requisition management, and the workflow automation between them. It was my introduction to enterprise software: opinionated platforms, existing conventions, and code that other people depend on.",
    sections: [
      {
        heading: "Building inside a platform",
        body: [
          "Salesforce development is a different discipline from greenfield coding, you work with the platform's data model, governor limits, and declarative tools, and write Apex only where configuration can't reach. I built the recruiting app's custom objects, Apex logic and workflow automation, and earned both the Salesforce Administrator and Salesforce Developer certifications during the internship itself.",
          "I also observed the implementation of Domino's India's customer-complaints application up close, my first look at how a real deployment for a client at national scale is planned, staged and shipped.",
        ],
      },
    ],
    honest:
      "This was a first internship and reads like one, the scope was modest and closely supervised. Its real value was calibration: it taught me what production discipline looks like, and made every later internship legible.",
  },
  // ─────────────────────────── PROJECTS ───────────────────────────
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
    repoNote: "group repo · contributor",
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
      "+0.12 EM from one dev-set run is small and I would not claim statistical significance from it. The contribution is the headroom analysis and the selective-compute pattern, and the honest accounting of what didn't work.",
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
      "64.5% absolute accuracy is modest, as it is for published work on this benchmark. The contribution is the 18-way controlled comparison and the fairness measurement, not the headline number. Full disclosure: the report survives; the code does not, it lived on a teammate's laptop and was never pushed. Lesson absorbed permanently.",
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
      { value: "10 mo", label: "from first commit to wind-down decision" },
      { value: "e2e", label: "audio → transcript → structured notes pipeline" },
    ],
    stack: ["Python", "Celery", "Redis", "FFmpeg", "React", "LLM APIs", "Alembic"],
    repo: "https://github.com/arshinsikka/lectureai.co",
    repoNote: "landing-site repo · product repo private",
    summary:
      "The most instructive project I've done, because it failed for a reason worth understanding: the product worked, and the market didn't want it enough. Two co-founders, ten months, a real pipeline, real customer discovery, and a deliberate ending.",
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
          "The interesting engineering was in the real-time state: keeping several users' views of a shared, mutating order consistent is a small distributed-systems problem wearing a food-delivery costume.",
        ],
      },
    ],
    honest:
      "Student-project scope: authentication was basic, the matching algorithm was heuristic rather than optimal, and planned features (OAuth, bill splitting, live restaurant data) stayed on the roadmap. The repo currently lives under my former teammate's account, being restored to mine.",
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
      "A course project on a course-provided foundation, the architecture was inherited, not invented. The value was learning to extend someone else's design cleanly, which is most of what professional software work is.",
  },
  {
    slug: "eg1311-robot",
    kind: "project",
    title: "Obstacle-Course & Ball-Launching Robot",
    org: "NUS · EG1311 Design & Make",
    period: "Feb – Mar 2025",
    oneLiner:
      "An Arduino robot that navigates a physical obstacle course, bumps, ramps, and launches a ping-pong ball over obstacles. Firmware, CAD, wiring and soldering, all of it.",
    metrics: [
      { value: "1", label: "robot, from CAD model to competition run" },
      { value: "2", label: "subsystems: drive + launcher" },
    ],
    stack: ["Arduino", "C/C++", "Fusion 360", "Tinkercad"],
    summary:
      "A hardware project in a portfolio of software: designed and built a robot that drives an obstacle course with bumps and ramps, then launches a ping-pong ball accurately over an obstacle. Every layer was ours, CAD modelling in Fusion 360, circuit prototyping in Tinkercad, physical wiring and soldering, and the firmware.",
    sections: [
      {
        heading: "The build",
        body: [
          "The firmware handles motor control for tracked driving over uneven terrain, sensor integration for navigation, and actuator control for the launcher, where repeatable launch force mattered more than raw power, because accuracy over the obstacle was the scored objective. The drivetrain and launcher geometry were modelled and iterated in Fusion 360 before fabrication.",
          "Hardware debugging is a different sport from software debugging: when the robot veers left, the bug might be in your code, your wiring, your weight distribution, or the floor. Learning to isolate which layer is lying to you is the enduring lesson.",
        ],
      },
    ],
    honest:
      "An engineering-design module project, scoped to a term. It won't impress a robotics lab, but it is the reason simulation work at HMGICS felt grounded: I had physically fought the gap between modelled and real behaviour before simulating it.",
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
      "Designed and built in collaboration with Claude, which feels appropriate for a site with an AI agent on it. The judgement calls, the content and the numbers are mine.",
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
      "Six months on the simulation team building digital twin tooling for an EV smart factory, shipped the reporting system and three UI extensions, then scoped and built a code generator that collapses an engineer-week of robot-program wiring into seconds.",
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
      "Built and deployed three reusable backend microservices, auth/OTP, documents, communications, with WhatsApp and email integrations, a Flutter client, SonarScanner quality gates and full Swagger documentation.",
    articles: [{ label: "Plug-and-Play Microservices", slug: "techfour-dms" }],
  },
  {
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    location: "India",
    stack: ["Python", "LangChain", "LangSmith", "Streamlit"],
    summary:
      "Prototyped a retrieval-augmented generation assistant over several hundred internal policy and research documents, with LangSmith tracing and offline evaluation, so quality was measured rather than felt.",
    articles: [{ label: "RAG Assistant", slug: "pwc-rag" }],
  },
  {
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May 2024 – Jul 2024",
    location: "India",
    stack: ["Salesforce", "Apex"],
    summary:
      "First internship: an HR recruiting application on the Salesforce platform, with both Salesforce Administrator and Developer certifications earned along the way.",
    articles: [{ label: "HR Recruiting on Salesforce", slug: "quadrafort-salesforce" }],
  },
];

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
  { name: "D&D 5e", note: "the long campaigns" },
  { name: "Call of Cthulhu", note: "sanity optional" },
  { name: "Monster of the Week", note: "one mystery per session" },
  { name: "FIST", note: "paranormal mercenaries, zero prep" },
  { name: "Traveller", note: "spreadsheets in space" },
];

export const beyond = [
  {
    title: "Tabletop RPGs",
    body: "The hobby I'll talk about longest if you let me. Running a table is systems design with feelings: encounter balance, pacing, improvising within rules, keeping five people engaged for four hours. Played across D&D 5e, Call of Cthulhu, Monster of the Week, FIST and Traveller, each one a different physics engine for stories.",
  },
  {
    title: "Teaching",
    body: "Volunteer teacher with Teach SG, and previously with SETU under the Each One Teach One initiative. Explaining something badly is how you find out you didn't understand it.",
  },
  {
    title: "Music",
    body: "Six years of formal Indian classical training, now applied to keyboard. Practice regimes for music and for algorithms turn out to be the same discipline: slow is smooth, smooth is fast.",
  },
  {
    title: "Travel & photography",
    body: "Most recently Japan, Tokyo, Kyoto, Nara, and a convenience-store car park with an unreasonable view of Fuji. The camera comes along everywhere.",
  },
];

export const photos = [
  { src: "/photos/shibuya_sky.jpg", alt: "Above Tokyo at Shibuya Sky", caption: "Shibuya Sky, Tokyo" },
  { src: "/photos/kyoto.jpg", alt: "The Kamo river in Kyoto at dusk", caption: "Kamo river, Kyoto" },
  { src: "/photos/nara.jpg", alt: "Making friends with a deer in Nara", caption: "Local resident, Nara" },
  { src: "/photos/mount_fuji.jpg", alt: "Mount Fuji from a convenience-store car park", caption: "Fuji, from a car park" },
];

export const d20Facts = [
  "I've played D&D 5e, Call of Cthulhu, Monster of the Week, FIST and Traveller, and I will absolutely run a one-shot if you ask.",
  "Natural 20! I once reverse-engineered four undocumented NVIDIA APIs by diffing USD files in an air-gapped network.",
  "Six years of formal Indian classical music training, now applied to keyboard.",
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
  "Most recent adventure: Tokyo, Kyoto and Nara, the deer photo in Beyond is real.",
  "This site's entire content lives in one typed data file. The palette, matcher and agent all read from it.",
  "This site has a command palette. Press ⌘K.",
];

export const paletteIndex = [
  { label: "Intro", href: "/#top", group: "Sections" },
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
