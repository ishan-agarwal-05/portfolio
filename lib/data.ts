export type CaseStudy = {
  slug: string;
  title: string;
  org: string;
  period: string;
  oneLiner: string;
  metrics: { value: string; label: string }[];
  stack: string[];
  summary: string;
  sections: { heading: string; body: string[] }[];
  honest: string; // the "what I'd do differently / what didn't work" section
};

export type Experience = {
  org: string;
  role: string;
  period: string;
  location: string;
  stack: string[];
  bullets: string[];
  caseStudySlug?: string;
};

export type Project = {
  title: string;
  tag: string;
  period: string;
  description: string;
  stack: string[];
  caseStudySlug?: string;
  repo?: string; // left undefined until repos are ready
};

export const site = {
  name: "Ishan Agarwal",
  role: "Software Engineer — Backend, Platform & Applied AI",
  email: "ishan_agarwal@u.nus.edu",
  linkedin: "https://linkedin.com/in/ishan-agarwal-nus",
  github: "https://github.com/ishan-agarwal-05", // placeholder until repos are up
  resume: "/Ishan_Agarwal_Resume.pdf",
  availability: "Graduating May 2027 · open to full-time software & AI roles",
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "action-graph-generator",
    title: "Action Graph Code Generator",
    org: "Hyundai Motor Group Innovation Center Singapore",
    period: "Apr – Jun 2026",
    oneLiner:
      "A code generator that turns Kawasaki AS robot programs into fully wired Isaac Sim control graphs — collapsing an engineer-week of manual wiring per subprogram into seconds.",
    metrics: [
      { value: "1 wk → sec", label: "manual wiring per subprogram" },
      { value: "40+", label: "subprograms in a single factory cell" },
      { value: "7", label: "generation approaches benchmarked" },
      { value: "4", label: "undocumented API behaviours reverse-engineered" },
    ],
    stack: ["Python", "NVIDIA Isaac Sim", "OmniGraph", "USD", "Kawasaki AS"],
    summary:
      "HMGICS is building a digital twin of its EV factory on NVIDIA Isaac Sim. Manually wiring one robot subprogram into an Action Graph took roughly one engineering week, and a single cell has forty or more subprograms. I scoped, researched and built a proof-of-concept generator that does it in seconds — deterministic, auditable, and designed for an air-gapped network.",
    sections: [
      {
        heading: "Scoped alone from a one-line brief",
        body: [
          "The brief was a single sentence: automate the authoring of Action Graphs from robot programs. No acceptance criteria, no prior art inside the team. I started by documenting the existing manual workflow step-by-step with its pain points, then defined the problem boundaries myself and reviewed them with the team lead before writing code.",
          "Before committing to an approach, I formally evaluated seven candidates — deterministic Python generation, a local LLM, an LLM agent over structured documentation, a custom API pipeline, and others — against predictability, auditability, and compatibility with the air-gapped GPU environment. Deterministic Python with a structured reference documentation suite won. When the output drives a physical factory cell, being able to explain every generated line beats being clever.",
        ],
      },
      {
        heading: "Ground truth first, generation second",
        body: [
          "I hand-built a correctly wired compound node for the wiper pick sequence and validated it with the senior developer — node structure, joint corrections, fork/join patterns. That baseline became the oracle: every generated graph was diffed against its USD output.",
          "That diffing surfaced four undocumented OmniGraph behaviours: attribute writes that were runtime-only and silently failed to persist to USD; relationship-typed attributes needing CreateRelationship().SetTargets() instead of the documented setter; Make Array type resolution silently zeroing values unless sequenced correctly; and cross-graph compound port connections that the controller API simply cannot make. Each was diagnosed by reading the installed extension source directly. All fixes were centralised into a shared helper module so future generator scripts inherit them for free.",
        ],
      },
      {
        heading: "Built to be handed over",
        body: [
          "The deliverable was not just the generator. I wrote a reference suite covering the node catalogue, API patterns, AS-to-graph translation rules, worked examples, every technical decision with its rejected alternatives, and Kawasaki AS semantics for code generation — structured so an engineer who has never seen the project can generate a compound node using only the documentation. That handover test was drafted as a formal User Acceptance Test protocol. A formal AI use-case submission for the workflow was also filed internally.",
        ],
      },
    ],
    honest:
      "This shipped as a validated proof of concept on one subprogram family, not a production system across all forty. The evaluation of LLM-based approaches was constrained by the air-gapped network — with model access, a hybrid approach (deterministic core, LLM for the long tail of AS constructs) is what I would test next.",
  },
  {
    slug: "digital-twin-platform",
    title: "Digital Twin Simulation Platform",
    org: "Hyundai Motor Group Innovation Center Singapore",
    period: "Jan – Jun 2026",
    oneLiner:
      "Reporting infrastructure and three UI extensions for a factory digital twin — plus a traceability audit that turned a suspected code bug into a prioritised data remediation plan.",
    metrics: [
      { value: "3", label: "Omniverse Kit UI extensions shipped" },
      { value: "31% → 44%", label: "asset traceability, with gaps root-caused" },
      { value: "36", label: "physical parts cross-referenced by hand" },
      { value: "1", label: "config-driven architecture reused by every later feature" },
    ],
    stack: ["Python", "Omniverse Kit", "USD", "YAML", "Model-View-Delegate"],
    summary:
      "Six months embedded in the simulation team building the proof-of-concept digital twin of factory cell FE02 — the platform's UI surface, its reporting system, and the analysis that kept its data honest.",
    sections: [
      {
        heading: "Simulation reports engineers actually read",
        body: [
          "Before this, simulation output lived in raw log files or had to be observed live. I built the system that generates and opens a self-contained HTML report at the end of every run: per-robot joint-angle charts, tool-centre-point paths, work-target completion statistics, and a parts inventory of the scene. An offline fallback mode keeps reports generating with reduced data when external services are down.",
          "Getting this right meant understanding the full simulation lifecycle to hook the completion event without disturbing simulation state, and designing a modular data layer — YAML configuration, live data through an internal extension at runtime, CSV fallback. That config-driven pattern was reused by every subsequent feature on the platform.",
        ],
      },
      {
        heading: "Three extensions, one architecture",
        body: [
          "I shipped a data visualisation extension rendering live records from an internal asset system into dynamic tables inside Isaac Sim (Model-View-Delegate, config-driven dropdowns), the DT Sim Manager landing page that launches the platform's simulation flows, and the New Product Introduction window — a three-state UI (pre-setup, active, review) that I wireframed in FigJam and reviewed with the team lead before writing any code. The wireframe-first habit measurably cut implementation iteration.",
          "Along the way I consolidated the baseline simulation from two extensions into one and redesigned the stage-load flow around USD sublayer composition — which required reading Isaac Sim source to understand why the previous template-stage approach kept failing.",
        ],
      },
      {
        heading: "The traceability audit",
        body: [
          "The project target: over 80% of simulation assets traceable to identifiers in the factory's physical-parts systems. The report showed roughly 31%, and the working assumption was a code bug. I exported the full scene hierarchy to establish ground truth — 36 physical parts — and cross-referenced every asset against the mapping spreadsheet and the external system records.",
          "Result: 16 of 36 traceable (44%), and every single gap was a data completeness issue, not code — identifiers missing from the scene, parts absent from the mapping file, one asset in the simulation that no system knew about. I shipped the findings with a prioritised remediation plan. Proving the absence of a bug is worth as much as fixing one.",
        ],
      },
    ],
    honest:
      "Two of my original objectives — Nucleus-based file selection and aggregated multi-run reports — were consciously dropped when the action graph automation project proved a higher-priority contribution. Scope honesty over scope theatre.",
  },
  {
    slug: "qa-reranker",
    title: "Margin-Triggered Reranking for Extractive QA",
    org: "NUS · Natural Language Processing",
    period: "Aug – Dec 2025",
    oneLiner:
      "Found that a fine-tuned RoBERTa already had the right answer in its top five for 95% of SQuAD questions — then built a reranker that fires only when the model is unsure.",
    metrics: [
      { value: "84.3", label: "exact-match baseline, SQuAD v1.1" },
      { value: "95%", label: "questions with gold span in top-5 candidates" },
      { value: "~0", label: "added compute on confident predictions" },
    ],
    stack: ["Python", "PyTorch", "Hugging Face Transformers", "RoBERTa", "bi-encoders"],
    summary:
      "An error-analysis-first NLP project: instead of throwing a bigger model at SQuAD, I measured where the headroom actually was and spent compute only there.",
    sections: [
      {
        heading: "The headroom finding",
        body: [
          "After fine-tuning RoBERTa to an 84.3 exact-match baseline, the interesting question was where the remaining errors lived. Candidate analysis showed the gold span already sat in the model's top five candidates for 95% of questions — the model wasn't failing to find answers, it was failing to rank them first.",
        ],
      },
      {
        heading: "Spend compute only where the model is unsure",
        body: [
          "The margin between the top two candidate scores turned out to be a strong confidence signal. I added a bi-encoder reranker that fires only on low-margin cases — the model's own uncertainty triggers the second opinion. Confident predictions pass through untouched, so the accuracy gain comes at near-zero marginal compute.",
          "I also tried a cross-encoder reranker: it cost more and didn't consistently win. Keeping the negative result in the writeup was deliberate — a rejected alternative you can explain is worth more than a clean-looking report.",
        ],
      },
    ],
    honest:
      "The exact-match gain from reranking was small (+0.12 EM on one dev-set run — I would not claim statistical significance from that). The real contribution was the headroom analysis and the selective-compute pattern, which changes about 0.5% of predictions at essentially no cost.",
  },
  {
    slug: "lectureai",
    title: "LectureAI",
    org: "Co-founder · EdTech startup",
    period: "Feb – Dec 2025",
    oneLiner:
      "Co-founded a platform turning lecture recordings into AI-generated study notes. Led full-stack development, ran customer discovery across NUS cohorts — and made the call to wind it down.",
    metrics: [
      { value: "10 mo", label: "from first commit to wind-down decision" },
      { value: "full-stack", label: "product built and led end to end" },
    ],
    stack: ["TypeScript", "React", "Node.js", "LLM APIs", "audio pipelines"],
    summary:
      "The most instructive project I've done, because it failed for a reason worth understanding: the product worked, the market didn't want it enough.",
    sections: [
      {
        heading: "Build",
        body: [
          "I led full-stack development of the platform — upload a lecture recording, get structured smart notes and study materials out. The technical pipeline (audio ingestion, transcription, LLM-based structuring, delivery) worked.",
        ],
      },
      {
        heading: "Discovery, and what it said",
        body: [
          "I ran customer discovery across NUS student cohorts. The pattern that emerged: students liked the output but wouldn't change their study workflow or pay enough to sustain the unit economics. Retention told the truth that enthusiasm in interviews didn't.",
        ],
      },
      {
        heading: "The wind-down call",
        body: [
          "We chose to stop rather than drift — a deliberate decision, made when the evidence was in, not when the money ran out. What I'd do differently: run pricing and willingness-to-pay tests before building the full pipeline, not after. Talking to users is not the same as watching what they do.",
        ],
      },
    ],
    honest:
      "No product-market fit is the headline, and I don't dress it up. The transferable asset is the judgement: knowing what evidence would have changed the outcome, and testing it earlier next time.",
  },
  {
    slug: "fake-news-fairness",
    title: "Fake News Detection & the Fairness Cost of Metadata",
    org: "NUS · Machine Learning",
    period: "Jan – May 2025",
    oneLiner:
      "Benchmarked 18 model/feature configurations on the LIAR benchmark and quantified a trade-off most papers skip: speaker metadata helps accuracy by overfitting to speaker identity.",
    metrics: [
      { value: "18", label: "model & feature configurations benchmarked" },
      { value: "+2–4", label: "macro-F1 points from speaker metadata" },
      { value: "1", label: "measurable fairness cost identified" },
    ],
    stack: ["Python", "scikit-learn", "DistilBERT", "TF-IDF", "Word2Vec"],
    summary:
      "A systematic ablation on political-claims classification — from TF-IDF baselines to a fine-tuned DistilBERT — with the fairness analysis done properly instead of gestured at.",
    sections: [
      {
        heading: "The ablation",
        body: [
          "Eighteen configurations across the feature and model axes: TF-IDF and Word2Vec representations through classical models up to a fine-tuned DistilBERT, with and without the LIAR benchmark's speaker metadata fields.",
        ],
      },
      {
        heading: "The finding",
        body: [
          "Adding speaker metadata reliably lifts macro-F1 by 2 to 4 points — and the error analysis shows why: the model partially learns who is speaking rather than what is being said. That is a measurable fairness cost. A claim's predicted truthfulness should not depend on the speaker's identity, and quantifying that trade-off was the point of the project.",
          "For context, published binary-classification results on LIAR sit in a similar band — it is a genuinely hard benchmark, and the ablation methodology mattered more than leaderboard position.",
        ],
      },
    ],
    honest:
      "Absolute accuracy on LIAR (64.5% binary) is modest, as it is for published work on this benchmark. The contribution is the controlled comparison and the fairness measurement, not the headline number.",
  },
];

export const experiences: Experience[] = [
  {
    org: "Hyundai Motor Group Innovation Center Singapore",
    role: "Digital Twin & Simulation Engineering Intern",
    period: "Jan 2026 – Jun 2026",
    location: "Singapore",
    stack: ["Python", "NVIDIA Isaac Sim", "OmniGraph", "USD"],
    bullets: [
      "Built a code generator turning Kawasaki AS robot programs into wired Isaac Sim control graphs — roughly one engineer-week of manual wiring per subprogram, down to seconds.",
      "Scoped the project alone from a one-line brief; benchmarked seven generation approaches before choosing deterministic Python for auditability in an air-gapped network.",
      "Shipped the simulation reporting system and three Omniverse Kit UI extensions on a config-driven architecture every later feature reused.",
      "Audited asset traceability across 36 physical parts, lifting measured coverage from 31% to 44% and proving the remaining gaps were data, not code.",
    ],
    caseStudySlug: "action-graph-generator",
  },
  {
    org: "TechFour Engineering Solutions",
    role: "Software Engineering Intern",
    period: "May 2025 – Jul 2025",
    location: "India",
    stack: ["Python", "Flask", "Flutter", "MySQL"],
    bullets: [
      "Built and deployed three backend microservices — user management (auth, OTP, password reset), document handling, and internal communications — designed as plug-and-play components for reuse across client projects.",
      "Integrated WhatsApp and email APIs and shipped the Flutter client.",
      "Added SonarScanner quality gates and documented every endpoint in Swagger.",
    ],
  },
  {
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    location: "India",
    stack: ["Python", "LangChain", "LangSmith", "Streamlit"],
    bullets: [
      "Prototyped a retrieval-augmented generation assistant over several hundred internal policy and research documents — policy lookup, plus surfacing prior work so teams stopped repeating research.",
      "Built the retrieval pipeline in LangChain with LangSmith for tracing and offline evaluation.",
    ],
  },
  {
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May 2024 – Jul 2024",
    location: "India",
    stack: ["Salesforce", "Apex"],
    bullets: [
      "Built an HR recruiting application on the Salesforce platform; earned Salesforce Administrator and Developer certifications during the internship.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Margin-Triggered QA Reranking",
    tag: "NLP research",
    period: "Aug – Dec 2025",
    description:
      "Fine-tuned RoBERTa to 84.3 EM on SQuAD, found 95% top-5 headroom, and added a bi-encoder reranker that fires only on low-confidence predictions.",
    stack: ["PyTorch", "Transformers"],
    caseStudySlug: "qa-reranker",
  },
  {
    title: "Fake News Detection on LIAR",
    tag: "ML fairness",
    period: "Jan – May 2025",
    description:
      "18-configuration ablation from TF-IDF to DistilBERT, quantifying the fairness cost of speaker metadata.",
    stack: ["scikit-learn", "DistilBERT"],
    caseStudySlug: "fake-news-fairness",
  },
  {
    title: "LectureAI",
    tag: "startup · co-founder",
    period: "Feb – Dec 2025",
    description:
      "AI lecture-notes platform built and wound down deliberately after customer discovery said no.",
    stack: ["React", "Node.js", "LLM APIs"],
    caseStudySlug: "lectureai",
  },
  {
    title: "Bundl",
    tag: "full-stack",
    period: "May – Aug 2024",
    description:
      "Order-pooling web app cutting food delivery fees: real-time matching, in-app chat, and a grouping algorithm.",
    stack: ["React", "Socket.IO", "Node.js", "MongoDB"],
  },
  {
    title: "Teacher's Pet",
    tag: "software engineering",
    period: "Sep – Dec 2024",
    description:
      "Java task manager for teaching assistants — student queries, deadlines and grading, with search, filtering, CI and automated tests.",
    stack: ["Java", "JavaFX", "CI/CD"],
  },
  {
    title: "Obstacle-Course Robot",
    tag: "hardware",
    period: "Feb – Mar 2025",
    description:
      "Arduino robot that navigates bumps and ramps and launches a ping-pong ball over obstacles. Firmware, CAD, wiring and soldering.",
    stack: ["Arduino", "Fusion 360"],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "TypeScript / JavaScript", "SQL", "Apex", "LaTeX"],
  },
  {
    group: "Backend & Infrastructure",
    items: ["Flask", "Node.js", "React", "Flutter", "REST APIs", "Docker", "Git", "CI/CD", "MySQL", "MongoDB"],
  },
  {
    group: "AI & Data",
    items: ["Hugging Face Transformers", "LangChain", "LangSmith", "scikit-learn", "XGBoost", "NumPy", "Pandas"],
  },
  {
    group: "Simulation & Robotics",
    items: ["NVIDIA Isaac Sim", "Omniverse Kit", "OmniGraph", "USD", "Arduino"],
  },
];

export const d20Facts = [
  "I run and play tabletop RPGs — long campaigns, homebrew settings, the whole thing.",
  "Natural 20! I once reverse-engineered four undocumented NVIDIA APIs by diffing USD files.",
  "I've played Indian classical keyboard for six years.",
  "All India Rank 21 in the NTSE — India's national talent search exam.",
  "Third place internationally at Odyssey of the Mind in St. Petersburg — I built the robot.",
  "I volunteer as a teacher with Teach SG.",
  "Cambridge C2 Proficiency, Grade A — the highest English certification level.",
  "I co-founded a startup and made the call to shut it down. Best judgement rep I've ever earned.",
  "Table tennis and inter-block games at Kent Ridge Hall, NUS.",
  "I speak English, Hindi, and a little German.",
  "Minoring in both Mathematics and Quantitative Finance alongside CS.",
  "My favourite bug hunt: proving a 31% traceability number was a data problem, not a code problem.",
  "I benchmarked seven code-generation approaches before writing the real one.",
  "I've worked in an air-gapped network — no Stack Overflow, just source code and patience.",
  "Focus areas: Artificial Intelligence and Computer Security.",
  "I wireframe UIs before coding them. It has never once been a waste of time.",
  "Salesforce certified — Administrator and Developer — from my first internship.",
  "State Rank 1 in Vigyan Vidyarthi Manthan, honoured by state education officials.",
  "Photography and badminton fill the hours code doesn't.",
  "This site has a command palette. Press ⌘K.",
];

export const beyond = [
  {
    title: "Tabletop RPGs",
    body: "The hobby I'll talk about longest if you let me. Running a table is systems design with feelings: encounter balance, pacing, improvising within rules, and keeping five people engaged for four hours. Roll the die below.",
  },
  {
    title: "Teaching",
    body: "Volunteer teacher with Teach SG, and previously with SETU under the Each One Teach One initiative. Explaining something badly is how you find out you didn't understand it.",
  },
  {
    title: "Music",
    body: "Six years of Indian classical training, now applied to keyboard. Practice regimes for music and for algorithms turn out to be the same discipline.",
  },
  {
    title: "Kent Ridge Hall",
    body: "Inter-Block Games Committee and the table tennis team at NUS. Hall life is the reason I can run on six hours of sleep.",
  },
];

export const paletteIndex = [
  { label: "Intro", href: "/#top", group: "Sections" },
  { label: "Selected Work", href: "/#work", group: "Sections" },
  { label: "Experience", href: "/#experience", group: "Sections" },
  { label: "Projects", href: "/#projects", group: "Sections" },
  { label: "Skills", href: "/#skills", group: "Sections" },
  { label: "Beyond the Terminal", href: "/#beyond", group: "Sections" },
  { label: "Contact", href: "/contact", group: "Pages" },
  { label: "Match a Job Description", href: "/fit", group: "Pages" },
  ...caseStudies.map((c) => ({
    label: c.title,
    href: `/work/${c.slug}`,
    group: "Case Studies",
  })),
];
