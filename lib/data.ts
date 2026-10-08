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
  photos?: Photo[];
  summary: string;
  sections: { heading: string; body: string[] }[];
  // short entries show on the home page only, with no article of their own
  brief?: boolean;
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

export const agentEnabled = process.env.NEXT_PUBLIC_AGENT_ENABLED === "true";

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
      "A tool that uses an AI agent to turn Kawasaki robot programs into Isaac Sim action graphs, so a job that took an engineer about a week per program becomes an afternoon of checking.",
    metrics: [
      { value: "1 wk to ~4 h", label: "per subprogram, including an engineer checking it (estimate)" },
      { value: "7", label: "approaches compared before picking one" },
      { value: "4", label: "undocumented Isaac Sim behaviours worked around" },
    ],
    stack: ["Python", "LLM agents", "NVIDIA Isaac Sim", "OmniGraph", "USD", "Kawasaki AS"],
    summary:
      "The robots in Hyundai's Singapore factory run on programs written in Kawasaki AS, a low-level language, in files that run to tens of thousands of lines. The simulation software, NVIDIA Isaac Sim, works more like a flow chart: you connect blocks for things like moving the arm or picking up a part with the suction cup. To simulate a robot, an engineer had to read through its source code and rebuild it by hand as one of these flow charts, called an action graph. That took about a week per subprogram, and a single cell of the factory has more than forty. In the last three months of my internship I built a tool to speed that up.",
    sections: [
      {
        heading: "Picking an approach",
        body: [
          "The brief was one sentence: automate making action graphs from robot programs. There was no spec and nothing like it in the team yet, so I started by writing down how engineers did it by hand, step by step, and where the time went. I agreed the scope with the team lead before building anything.",
          "Then I compared seven approaches and built small versions of a few: a hand-written parser, a local LLM, Copilot-style assistants, a custom pipeline calling an LLM API, and an AI agent working from documentation. A parser that converts the code with fixed rules was the most predictable, but Kawasaki AS has far too many edge cases to write all the rules in advance. An AI agent handled that variety much better.",
        ],
      },
      {
        heading: "How it works",
        body: [
          "Isaac Sim can run Python, so the agent writes a Python script for each subprogram, and the script builds the action graph. The script itself is ordinary code. It builds the same graph every time it runs, and an engineer can read it, diff it and review it like anything else. The AI is in the writing of the script, and that's the part that needs checking.",
          "So most of my time went into what the agent works from, to get that Python as good as possible: dozens of markdown files of translation rules (this kind of AS code becomes this graph structure), a catalogue of the primitive and compound nodes the team had built, style guides, a folder of example scripts I'd verified by hand, like a bumper pick, and prompts for starting a new agent session in the repository.",
          "All of it lives as plain files in the team's git repository, so the team can keep adding rules and examples after I left, and it isn't tied to one AI model. I used Claude Code inside VS Code, since the team already works in VS Code and it gave the best results. The company's internal assistant was available but weaker at this. A company model, or an open-weight model hosted on their GPU cluster, could work from the same files.",
        ],
      },
      {
        heading: "Getting Python to do what the interface does",
        body: [
          "The hardest part was doing everything in Python at all. Isaac Sim expects you to build action graphs by clicking around in its interface. There are Python APIs for the same things, but a lot of it isn't documented, and the machines had no internet, so I worked it out by reading the installed extension source.",
          "To know the generated graphs were right, I first built the pick sequence for the windshield wiper by hand and had the senior developer check it: the node structure, joint correction values, and how the branches split and join again. Then I compared the generated versions against it, diffing the USD files, until they matched.",
          "That diffing turned up four behaviours that don't match the documentation. og.Attribute.set() only changes the value at runtime and doesn't save it to the USD file. Relationship-type attributes need CreateRelationship().SetTargets() instead of the documented setter. Make Array inputs reset to zero unless the calls happen in a particular order. And og.Controller.connect() doesn't work for connections between compound graphs, so those have to be written by hand. I put the workarounds into a shared helper module, codegen_utils.py, so nobody has to find them again.",
          "The setup slowed things down too. The computer I wrote code on couldn't run Isaac Sim, so every script went over SFTP to an offline GPU machine for testing. And the scene wasn't fully set up yet, so moves could land slightly off from the real factory even with the right coordinates, which meant I couldn't properly compare the simulation against videos of the real robots. A separate project was fixing that.",
        ],
      },
      {
        heading: "Where it ended up",
        body: [
          "It works on the pick sequences I tested it on: you ask it for a subprogram and it writes a script that builds the graph, and those were tested properly. It hadn't been tried on other cells or on vision nodes yet, and there wasn't time to test how much it changes the engineers' day-to-day work. An engineer still checks and fixes every generated graph, which is where the estimate of about four hours per subprogram comes from, against about a week by hand.",
          "The team was impressed by how much work it could save. I filed the internal AI use-case submission for it, and presented the idea to the VP as slides rather than a live demo. She agreed we should be using AI to speed up engineering work like this. The documentation doubles as the handover, and I drafted an acceptance test for it: an engineer who has never seen the project builds a compound node using only the docs.",
        ],
      },
    ],
  },
  {
    slug: "digital-twin-platform",
    kind: "work",
    title: "Digital Twin Simulation Platform",
    org: "Hyundai Motor Group Innovation Center Singapore",
    role: "Digital Twin & Simulation Engineering Intern",
    period: "Jan – Mar 2026",
    oneLiner:
      "UI extensions, an automatic end-of-run report, and a parts traceability audit for the digital twin of Hyundai's EV factory.",
    metrics: [
      { value: "3", label: "UI extensions built in Isaac Sim" },
      { value: "31% → 44%", label: "of parts traceable after the audit" },
      { value: "36", label: "physical parts checked one by one" },
    ],
    stack: ["Python", "Omniverse Kit", "USD", "YAML", "Model-View-Delegate"],
    summary:
      "Hyundai's innovation centre in Singapore is building a digital twin of its EV factory in NVIDIA Isaac Sim, starting with one cell of the factory as a proof of concept. I spent my first three months on the simulation team building the parts of the platform around the simulation itself: the screens engineers use to run it, the report they get at the end, and an audit of how many parts in the scene could be traced back to the factory's other systems.",
    sections: [
      {
        heading: "Getting set up",
        body: [
          "The first job was getting Isaac Sim 5.1 running on a machine with no internet access. It kept trying to download 3D assets and failing, so I went through the logs to find exactly which files were missing and which functions were asking for them, and wrote up the manual install for whoever came next, since nobody had recorded it before. My own laptop couldn't run Isaac Sim either, so I set up a way to write code locally and sync it to the GPU server to test.",
        ],
      },
      {
        heading: "What I built",
        body: [
          "In January I built an extension that shows live records from an internal database as tables inside Isaac Sim, using a Model-View-Delegate structure. The dropdowns for car model and station come from a YAML file, so they can change without touching the code.",
          "In February I built the end-of-run report. When a simulation finishes, it generates an HTML report and opens it in the browser: joint angles for each robot, tool paths, work targets pulled from external tables, and a list of every part in the scene. If the external service is down, it falls back to CSV files. Hooking into the end of a run without disturbing the simulation meant learning the simulation lifecycle properly, and along the way I fixed bugs with stale state when the scene changed and with windows closed mid-run. I also built the DT Sim Manager, the landing page that launches the platform's simulations.",
          "In March I merged the baseline simulation's two extensions into one and redid how it loads the scene: create an empty stage, add the scene as a sublayer, flatten it, then apply the starting configuration. The old approach kept failing, and I only found out why by reading Isaac Sim's own source. I also built the window for New Product Introduction simulations, with three states: setup (choosing a scenario and reviewing clashes), the running simulation, and a review afterwards. I wireframed it in FigJam and went through it with the team lead before writing any code, which saved a lot of back and forth.",
        ],
      },
      {
        heading: "The parts audit",
        body: [
          "The idea was that the simulation could be a source of truth for every part in the factory. Each asset in the scene can carry a label that links it to the same part in other systems, like the logistics records or the CAD drawings. The target was more than 80% of parts linked. The report said about 31%, and people assumed it was a bug in the code.",
          "I exported the whole scene to get the real list, which came to 36 physical parts, and checked each one against the mapping spreadsheet and the external systems. The spreadsheet was protected against being read by code, so I wrote a workaround to open it. I also fixed the filter so helper objects that aren't real parts stopped counting. Then I tagged every part I could match, which got it to 16 of 36, or 44%.",
          "The rest wasn't something code could fix. Some identifiers were in the mapping file but had never been copied into the scene, some parts had no identifiers anywhere, and one asset in the simulation didn't exist in any other system. I wrote it up by cause, so the team could fix the data: tagging six more parts would get to 61%, and closing all twenty gaps would get above 95%.",
        ],
      },
      {
        heading: "Working there",
        body: [
          "The team was great and always willing to help. We had regular syncs with NVIDIA's engineers, which was cool to be part of. I also wrote the Confluence documentation for the reporting and UI systems, made video walkthroughs for onboarding, and summarised the NVIDIA GTC 2026 announcements for the team, picking out what would actually matter for our work.",
          "The hard part was the setup. The machines that ran Isaac Sim were offline, so I couldn't use AI tools on them, and every change meant copying files across before I could test anything. I once lost most of a day to a bug that turned out to be a senior developer's file I hadn't copied over, and after that I always checked the full diff before transferring.",
        ],
      },
    ],
  },
  {
    slug: "techfour-dms",
    kind: "work",
    title: "Reusable Backend Microservices",
    org: "TechFour Engineering Solutions",
    role: "Software Engineering Intern",
    period: "May – Jul 2025",
    oneLiner:
      "Three backend microservices, for login, messaging and documents, that the company could plug into new projects instead of building them again each time.",
    metrics: [],
    stack: ["Python", "Flask", "Flutter", "MySQL", "JWT", "SonarQube", "Swagger", "GitLab"],
    repo: "https://github.com/ishan-agarwal-05/dms_personal",
    repoNote: "my own rebuild, not company code",
    summary:
      "TechFour is a software company of over a hundred people that builds systems for larger companies, and almost every project needed the same basics: a login system, a way to send emails, SMS or WhatsApp messages, and file uploads. They were being rebuilt from scratch every time. My internship was to build them once, as separate microservices that any project could plug in.",
    sections: [
      {
        heading: "The three services",
        body: [
          "All three are Flask services on MySQL with connection pooling. The communications service sends emails, SMS and WhatsApp messages, including OTPs, and runs anything time-based on a cron scheduler. It had to be generic and easy to extend, because almost every piece of software needs to send messages.",
          "The document service handles uploading and deleting files, with metadata validation and files organised by date. The user management service covers registration, login with JWT and bcrypt, OTP verification, password reset and the landing page. It's built on the other two: OTPs go out through the communications service, and profile pictures are stored through the document service.",
          "The clients' admins aren't programmers, so each service also needed an admin dashboard, and I built those UIs in Flutter. Building a real client against each API was also the quickest way to find where it was awkward to use. Since the services had to work for any project, I spent more time on the shape of each API than I would have for a one-off feature.",
        ],
      },
      {
        heading: "How the company worked",
        body: [
          "This is where I learned how coding works at a company. Work was tracked in Jira, there were written rules for branch names, commit messages and branching, and code went through a self-hosted GitLab. Every endpoint was documented in OpenAPI and served through Swagger UI as it was built, and SonarQube checked every service for bugs, code smells and security issues. I kept fixing what it flagged until the services came back clean. They didn't expect much from interns and mostly wanted us to learn, which suited me.",
        ],
      },
      {
        heading: "Learning deployment from Sahil",
        body: [
          "The best part was where I sat, next to Sahil, who ran the company's GitLab, servers, CI/CD and deployments. He'd tell me what he was about to do, give me a quick explanation and something to read at home, and then show me when he actually did it on the production setup.",
          "That's how I learned Linux, firewalls, Nginx, reverse proxying and load balancing, and how to set up a new project's repository and CI/CD pipeline. It's hard to get that from a course, because so much of it is small operational details nobody writes down.",
        ],
      },
    ],
  },
  {
    slug: "pwc-rag",
    brief: true,
    kind: "work",
    title: "RAG Assistant",
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    oneLiner:
      "A retrieval-augmented chatbot over several hundred internal policy and research documents, built with LangChain, LangSmith and Streamlit.",
    metrics: [],
    stack: ["Python", "LangChain", "LangSmith", "Streamlit", "RAG"],
    summary: "",
    sections: [],
  },
  {
    slug: "quadrafort-salesforce",
    brief: true,
    kind: "work",
    title: "HR Recruitment App on Salesforce",
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May – Jul 2024",
    oneLiner:
      "My first internship: a month of training for the Salesforce Administrator and Developer certifications, then building an HR recruitment app on Salesforce with the other interns.",
    metrics: [],
    stack: ["Salesforce", "Apex", "SOQL", "Lightning"],
    summary: "",
    sections: [],
  },
  // ───────────────────────── PROJECTS ─────────────────────────
  {
    slug: "qa-reranker",
    kind: "project",
    title: "Margin-Triggered Reranking for Extractive QA",
    org: "NUS · CS4248 Natural Language Processing",
    period: "Aug – Dec 2025",
    oneLiner:
      "Our fine-tuned model usually had the right answer in its top five guesses but didn't rank it first, so we built a reranker that only steps in when the model is unsure.",
    metrics: [
      { value: "84.28 → 84.40", label: "exact match on the SQuAD v1.1 dev set" },
      { value: "95.1%", label: "of questions had the right answer in the top five" },
      { value: "55", label: "answers changed: 14 fixed, 1 broken" },
    ],
    stack: ["PyTorch", "Hugging Face Transformers", "RoBERTa", "Sentence-BERT"],
    repo: "https://github.com/arshinsikka/CS4248_G02_QA",
    repoNote: "group repo, 14 of 18 commits are mine",
    summary:
      "A group project on extractive question answering: given a passage and a question, find the span of words in the passage that answers it. We fine-tuned RoBERTa-base on SQuAD v1.1 and got 84.28 exact match and 90.93 F1. The five of us are close friends; the others had heavy course loads or an internship that semester, so one teammate and I did the coding and experiments, and the other three wrote the report.",
    sections: [
      {
        heading: "Where the mistakes were",
        body: [
          "The model scores every possible answer span, but normally you only ever use the top one. I had it return its top candidates instead and checked where the right answer landed. With the top five, the correct span was there for 95.1% of questions. If you could always pick it, exact match would go from 84.28 to 95.11, and F1 from 90.93 to 97.08. So most of the model's mistakes were about ranking: it found the answer but put another one first.",
          "The gap between its top two scores turned out to be the useful signal. When the right answer was ranked first, the median gap was about 0.60. When the right answer was second, the gap dropped to about 0.11. A small gap meant the model itself wasn't sure.",
        ],
      },
      {
        heading: "The reranker",
        body: [
          "So we only rerank when that gap is below 0.05. In those cases a small sentence-embedding model (all-MiniLM-L6-v2) scores both candidates against the question, and that score is blended evenly with the original one. Confident answers are left alone, so they cost nothing extra.",
          "It changed 55 of the 10,570 answers: 14 went from wrong to right and 1 from right to wrong, which took exact match from 84.28 to 84.40 and F1 from 90.93 to 91.04. That's a small gain from a single run, so I wouldn't call it significant. We also tried the obvious alternatives: reranking every question, reranking the top three or five instead of the top two, and a heavier cross-encoder. The first two made results worse, and the cross-encoder cost more without doing consistently better. The repo keeps all of those runs.",
        ],
      },
    ],
  },
  {
    slug: "lectureai",
    kind: "project",
    title: "LectureAI",
    org: "Co-founder · EdTech startup",
    period: "Feb – Dec 2025",
    oneLiner:
      "A startup I co-founded with two friends that turned lecture recordings into study notes. The notes were good, but getting into universities was going to take years.",
    metrics: [],
    stack: ["Python", "FastAPI", "Whisper", "FFmpeg", "React", "LLM APIs", "Celery", "Redis"],
    repo: "https://github.com/arshinsikka/lectureai-mvp",
    repoNote: "on a co-founder's account",
    summary:
      "LectureAI started with an email from the NUS School of Computing about a startup programme. Arshin, a good friend who's really into startups, asked if I wanted to do it with him, and with Vidushi we came up with the idea: take a lecture recording and turn it into proper study notes. That programme rejected us, but BLOCK71 accepted us into its incubator.",
    sections: [
      {
        heading: "What we built",
        body: [
          "We surveyed students across NUS first, and it was a real problem. Then we built the pipeline. FFmpeg processes the audio, it gets transcribed, technical terms in the transcript get corrected using the lecture slides, and then an LLM turns it into summaries and study notes. We fixed the transcript before summarising because when a transcript gets a technical term wrong, the summary repeats the wrong term with total confidence.",
          "The backend was FastAPI, with Whisper for transcription and Alembic for database migrations, and the frontend was React, which ran each step in turn and showed progress as it went. Later we added a background job queue with Celery and Redis for long lectures, but the app hadn't switched over to it by the time we stopped. I led the full-stack development, and the notes it produced were really good.",
        ],
      },
      {
        heading: "Why we stopped",
        body: [
          "The next step was getting into universities, through things like Canvas integrations or pilots with a course. That turned out to mean a lot of paperwork and a very slow process, probably two or three years before anything happened. We reached out to a lot of people and didn't hear back from many. Around the same time TurboScribe, a competitor with a lot of funding, took off with students directly, which closed off the other route.",
          "So in December 2025 we wrapped it up. I learned a lot from it, from surveying users and pitching to building the pipeline.",
        ],
      },
    ],
  },
  {
    slug: "eg1311-robot",
    kind: "project",
    title: "Autonomous Obstacle-Course Robot",
    org: "NUS · EG1311 Design & Make",
    period: "Feb – Mar 2025",
    oneLiner:
      "An Arduino robot that drives over a bump and up a slope, stops at a wall, launches a ping-pong ball over it and reverses back to the start, on its own.",
    metrics: [],
    stack: ["Arduino", "C++", "HC-SR04", "L293D", "Servo", "Fusion 360", "Laser cutting"],
    repo: "https://github.com/ishan-agarwal-05/eg1311-robot",
    photos: [
      { src: "/photos/eg1311-robot.jpg", w: 1280, h: 960, alt: "The finished robot held up on the course table, with the ball holder raised", caption: "The robot on test day." },
      { src: "/photos/eg1311-robot-top.jpg", w: 1280, h: 960, alt: "The robot from above: Arduino, breadboard, motors and servo, with a lot of wires", caption: "From above. The wiring was as messy as it looks." },
      { src: "/photos/eg1311-circuit.jpg", w: 1600, h: 897, alt: "Tinkercad circuit: Arduino Uno, HC-SR04 ultrasonic sensor, two L293D H-bridges driving three DC motors, and a servo on a 9V supply", caption: "The circuit as I designed it in Tinkercad." },
    ],
    summary:
      "EG1311 is the Design and Make module. The course was a 3 cm bump, a 10 cm slope and a 30 cm wall, and the robot had to get across, launch a ping-pong ball over the wall and come back to the start, with nobody touching it. The rest of my team weren't CS students, so I wrote all the code and designed the circuit, and we built the body together with laser-cut parts. It was a lot of fun.",
    sections: [
      {
        heading: "How it works",
        body: [
          "The simple way to do this is to drive forward for a fixed time and then fire, but that breaks as soon as the floor grips differently or the battery runs down. So the robot checks an HC-SR04 ultrasonic sensor on every loop, times the echo and turns it into a distance. When the distance falls into a narrow band near the wall, it stops, waits three seconds for the body to settle, swings a servo to launch the ball, and reverses.",
          "The three drive motors run off two L293D motor drivers. The sensor had to be mounted high, or the bump and the slope looked like the wall and the robot stopped halfway. We raised it on a propylene board braced with two ice-cream sticks, which wasn't pretty but worked.",
        ],
      },
      {
        heading: "Building it",
        body: [
          "The wheels took four versions. 8 cm cardboard wheels were too small to get over the bump, and 10 cm laser-cut acrylic wheels cleared it but slid on the slope. Rubber bands gave grip but wouldn't stay on, so the final wheels were acrylic with strips of anti-slip mat, which got up the slope easily.",
          "The ball holder went through a few shapes too. The final one is tilted back past 90 degrees, raised, and has a curved lip, so the ball stays in over the bump but flies out cleanly when the servo fires. I tested the motor speeds and found the front-right one was slightly weaker, so we angled the front wheels a little to keep the robot driving straight. And we ran everything from a single 9V battery, which gave the motors steadier power than a separate battery pack.",
          "On the day, it ran the whole course, and I got an A+ for the robot's run.",
        ],
      },
    ],
  },
  {
    slug: "educrypto",
    kind: "project",
    title: "EduCrypto",
    org: "NUS · CS4236 Cryptography in Practice",
    period: "Aug 2026 – now",
    oneLiner:
      "A Python cryptography library I'm building for CS4236, one piece a week, each followed by breaking into a server that uses it badly.",
    metrics: [],
    stack: ["Python", "pytest", "Flask", "cryptography"],
    repoNote: "private until the course ends, by course policy",
    summary:
      "I got into security because CTFs sounded fun. I still haven't done one, but I took CS2107, got an A, and liked it enough to make cybersecurity one of my specialisations, which is how I ended up in CS4236. The course was recently redesigned to be about using cryptography correctly in real systems rather than proving theorems, and the whole semester is built around one library, educrypto, that I add to every week.",
    sections: [
      {
        heading: "How each week works",
        body: [
          "Each week the course publishes a feature request with the API and how it should behave, a public pytest suite, and a small Flask service that uses the library with a vulnerability in it. I implement the feature in educrypto until the tests pass, then write the attack that breaks into the service. The bug is never in the maths itself. It's in how the cryptography is used: a reused key, a setting left at an unsafe default, a ciphertext nobody checks.",
        ],
      },
      {
        heading: "So far",
        body: [
          "We're still on symmetric-key cryptography, where both sides share the same key. The library has encoding and the one-time pad, a block cipher (a configurable substitution-permutation network), and block cipher modes. The attack there was on CBC run with a fixed key and IV, where the first block of ciphertext gave away which message had been encrypted.",
          "Then MACs. One I remember is a forgery where the server's MAC didn't mix the secret key in properly, so it was effectively a known hash, and I could change a message and make a valid tag for it myself. Most recently, hash functions built three ways (Davies-Meyer, Merkle-Damgård and a sponge), with collisions found for both targets.",
          "Public-key cryptography comes next: RSA, Diffie-Hellman, El Gamal and digital signatures, each with its own attack, and then how these fit together in real protocols.",
        ],
      },
    ],
  },
  {
    slug: "fake-news-fairness",
    brief: true,
    kind: "project",
    title: "Fake News Detection",
    org: "NUS · CS3264 Machine Learning",
    period: "Jan – May 2025",
    oneLiner:
      "A group project comparing 18 combinations of models and features for sorting political claims in the LIAR dataset into true and false. The best reached 64.5%.",
    metrics: [],
    stack: ["scikit-learn", "XGBoost", "DistilBERT", "Word2Vec", "TF-IDF"],
    repo: "https://github.com/ishan-agarwal-05/fake-news-liar",
    repoNote: "rebuilt from the report",
    summary: "",
    sections: [],
  },
  {
    slug: "bundl",
    brief: true,
    kind: "project",
    title: "Bundl",
    org: "NUS Orbital · with Ritul",
    period: "May – Aug 2024",
    oneLiner:
      "A web app for pooling food delivery orders to split the delivery fee, with live chat to coordinate. We'd never built a front end or back end before and wrote it without AI, which is how I learned both.",
    metrics: [],
    stack: ["React", "Node.js", "Express", "Socket.IO", "MongoDB"],
    repo: "https://github.com/ritulkrsingh/Bundl",
    repoNote: "on Ritul's account",
    summary: "",
    sections: [],
  },
  {
    slug: "teachers-pet",
    brief: true,
    kind: "project",
    title: "Teacher's Pet",
    org: "NUS · CS2103T Software Engineering",
    period: "Sep – Dec 2024",
    oneLiner:
      "The CS2103T team project: a Java desktop app for teaching assistants to manage students, attendance and grading, built on an existing codebase to the module's requirements.",
    metrics: [],
    stack: ["Java", "JavaFX", "Gradle", "JUnit", "GitHub Actions"],
    repo: "https://github.com/ishan-agarwal-05/tp",
    summary: "",
    sections: [],
  },
  {
    slug: "this-site",
    brief: true,
    kind: "project",
    title: "This Website",
    org: "ishan-agarwal.com",
    period: "Aug 2026",
    oneLiner:
      "Built to help me get a job. The Ask page is an AI agent that answers questions about me using only what's on this site, an idea I got from a friend's website.",
    metrics: [],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Claude API"],
    repo: "https://github.com/ishan-agarwal-05/portfolio",
    summary: "",
    sections: [],
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
      "Six months on the simulation team building a digital twin of the EV factory in NVIDIA Isaac Sim. For the first three months I built UI extensions, an automatic end-of-run report and a parts traceability audit. For the last three, I built a tool that uses an AI agent to turn robot programs into simulation logic, work that used to take an engineer about a week per program.",
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
      "Built three backend microservices the company could reuse across projects: login and user management, messaging (email, SMS and WhatsApp), and document uploads, each with an admin dashboard. I also sat next to the engineer who ran their deployments and learned a lot about Linux, Nginx and CI/CD from him.",
    articles: [{ label: "Reusable Backend Microservices", slug: "techfour-dms" }],
  },
  {
    org: "PwC India",
    role: "AI Engineering Intern",
    period: "Dec 2024 – Jan 2025",
    location: "India",
    stack: ["Python", "LangChain", "LangSmith", "Streamlit"],
    summary:
      "Worked on a retrieval-augmented chatbot over several hundred internal policy and research documents, so teams could look up policy and find earlier work instead of redoing it. Built with LangChain, with LangSmith for prompt management, tracing and offline evaluation, and a Streamlit interface.",
    articles: [],
  },
  {
    org: "Quadrafort Technologies",
    role: "Software Engineering Intern",
    period: "May 2024 – Jul 2024",
    location: "India",
    stack: ["Salesforce", "Apex"],
    summary:
      "My first internship, after first year. The first month was training, and I got the Salesforce Administrator and Developer certifications. Then, with the other interns, I built an HR recruitment app on Salesforce, with application tracking and different access for HR managers and other staff.",
    articles: [],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "TypeScript / JavaScript", "SQL", "Apex", "LaTeX"],
  },
  {
    group: "Backend & Infrastructure",
    items: ["Flask", "FastAPI", "Node.js", "React", "Flutter", "REST APIs", "Docker", "Git", "CI/CD", "MySQL", "MongoDB"],
  },
  {
    group: "AI & Data",
    items: ["Hugging Face Transformers", "LangChain", "LangSmith", "scikit-learn", "XGBoost", "NumPy", "Pandas", "RAG pipelines"],
  },
  {
    group: "Security",
    items: ["Applied cryptography", "SonarQube", "JWT authentication"],
  },
  {
    group: "Simulation & Robotics",
    items: ["NVIDIA Isaac Sim", "Omniverse Kit", "OmniGraph", "USD", "Arduino", "Fusion 360"],
  },
];

export const education = {
  university: {
    name: "National University of Singapore",
    period: "Aug 2023 – May 2027",
    degree: "Bachelor of Computing (Honours), Computer Science",
    body: "Minors in Mathematics and Quantitative Finance, with specialisations in AI and cybersecurity. Coursework includes data structures and algorithms, operating systems, networks, information security, machine learning, natural language processing and cryptography.",
  },
  school: {
    name: "School in India",
    period: "Until 2023",
    degree: "Mayoor School · Amity International School",
    body: "I ranked first in my batch at Mayoor School three years running, which came with a full tuition scholarship, and finished with 98% in Class 12 at Amity International. Most of my honours are from those years.",
  },
};

export const honours = [
  {
    title: "NTSE Scholar · All India Rank 21",
    detail:
      "National Talent Search Examination, the Government of India's national scholarship exam. Stage II merit holder.",
  },
  {
    title: "VVM · State Rank 1 (Uttar Pradesh)",
    detail:
      "Vigyan Vidyarthi Manthan, a national science talent search run by the Government of India.",
  },
  {
    title: "Odyssey of the Mind · 3rd internationally",
    detail:
      "Eurofest in St. Petersburg, in Grade 9. I built and programmed our robot. It was the first robot I ever built, and it's what made me want to be an engineer.",
  },
  {
    title: "FTRE · All India Rank 49",
    detail: "FIITJEE Talent Reward Examination, with a full scholarship worth about ₹6,00,000.",
  },
  {
    title: "ANTHE · All India Rank 98",
    detail: "Aakash National Talent Hunt Examination, with a full fee waiver and scholarship.",
  },
  {
    title: "Cambridge C2 Proficiency · Grade A",
    detail: "The highest level of Cambridge English certification. IELTS 8.0.",
  },
];

export const ttrpgSystems = [
  { name: "D&D 5e" },
  { name: "Call of Cthulhu" },
  { name: "Monster of the Week" },
  { name: "FIST" },
  { name: "Traveller" },
];

export const reading = [
  { name: "Lord of the Mysteries" },
  { name: "Shadow Slave" },
  { name: "One Piece" },
];

export type Photo = { src: string; w: number; h: number; alt: string; caption?: string };

export const beyond: { title: string; body: string; photos?: Photo[] }[] = [
  {
    title: "Tabletop RPGs",
    body: "I'll play almost any system, not just D&D. Lately it's been Call of Cthulhu. I've never been the GM. At the table I'm pretty cooperative, and I nearly always play a big, physical character rather than a mage. My current one is Rangarangarang, a crocodilian with a two-handed axe. It's an escape, a reason to hang out with friends, and we end up making a good story together. It fits with how much fantasy I read. I also doodle while we play.",
    photos: [
      { src: "/photos/ttrpg-rangarangarang.jpg", w: 514, h: 835, alt: "Character sheet portrait of Rangarangarang, a crocodilian warrior with a satchel", caption: "My character, Rangarangarang." },
      { src: "/photos/art-shadow-and-her-light.jpg", w: 1143, h: 1400, alt: "Blue pen sketch of a hooded character holding a small light, titled The Shadow and Her Light", caption: "An NPC from our campaign, doodled at the table." },
      { src: "/photos/art-canary-crest.jpg", w: 990, h: 1400, alt: "Pencil sketch of a heraldic crest with a canary on a shield and a banner reading Canary", caption: "A crest, doodled during a session." },
    ],
  },
  {
    title: "Reading",
    body: "Reading is basically an addiction for me. Not physical books: web novels, mostly fantasy, cultivation and regression stories, a lot of them Korean and Chinese, on Royal Road and reading apps.",
  },
  {
    title: "Travel",
    body: "I love travelling, usually with my family. A few favourite photos from recent trips.",
    photos: [
      { src: "/photos/travel-da-nang.jpg", w: 1600, h: 900, alt: "Sunset over the sea at a beach, with swimmers in silhouette", caption: "Sunset in Da Nang." },
      { src: "/photos/travel-vietnam.jpg", w: 1600, h: 900, alt: "Ishan on a viewing platform above green karst mountains and a winding road", caption: "Northern Vietnam." },
      { src: "/photos/travel-batu-caves.jpg", w: 788, h: 1400, alt: "Stairs leading up inside a huge limestone cave, open to the sky at the top", caption: "Batu Caves, Malaysia." },
      { src: "/photos/travel-skye.jpg", w: 1600, h: 900, alt: "Green hills, cliffs and a winding road at the Quiraing on the Isle of Skye", caption: "Isle of Skye, Scotland." },
      { src: "/photos/travel-edinburgh.jpg", w: 1600, h: 900, alt: "Old houses along a small river in Dean Village, Edinburgh", caption: "Dean Village, Edinburgh." },
      { src: "/photos/travel-fuji.jpg", w: 788, h: 1400, alt: "Ishan standing in a street with Mount Fuji behind him", caption: "Mount Fuji." },
      { src: "/photos/travel-nara.jpg", w: 788, h: 1400, alt: "Ishan crouching next to a resting deer in Nara park", caption: "Nara, with a deer." },
      { src: "/photos/travel-kyoto-river.jpg", w: 1600, h: 900, alt: "Ishan smiling in front of a river in Kyoto at dusk", caption: "Kyoto." },
    ],
  },
  {
    title: "Teach SG",
    body: "I volunteer with Teach SG, working with Sec 1 and 2 students at Choa Chu Kang Secondary, and this term at Dazhong Primary too. There's some teaching, but it's mostly mentoring. It's been a really good experience and I'd recommend it to anyone. Before university I volunteered with SETU under the Each One Teach One initiative.",
  },
];

export const d20Facts = [
  "I've played D&D 5e, Call of Cthulhu, Monster of the Week, FIST and Traveller. Never as the GM.",
  "At Hyundai I found four Isaac Sim Python behaviours that don't work the way the docs say.",
  "Six years of Indian classical music training, now played on the keyboard.",
  "All India Rank 21 in the NTSE, India's national talent search exam.",
  "Third place internationally at Odyssey of the Mind. Building that robot is what made me want to be an engineer.",
  "I volunteer with Teach SG, mentoring secondary school students.",
  "Cambridge C2 Proficiency, Grade A.",
  "I co-founded a startup, LectureAI, and we wound it down after ten months.",
  "All India Rank 49 in FTRE, which came with a ₹6,00,000 scholarship.",
  "I speak English and Hindi, and a little German.",
  "I'm minoring in both Mathematics and Quantitative Finance.",
  "I always play the big, physical character. Never the mage.",
  "I read web novels every day, mostly fantasy, cultivation and regression stories.",
  "My current character is Rangarangarang, a crocodilian with a two-handed axe.",
  "My specialisations are AI and cybersecurity.",
  "I doodle during our sessions. The NPCs usually end up in the margins.",
  "State Rank 1 in Uttar Pradesh in VVM, a national science talent search.",
  "I've never done a CTF, even though CTFs are why I got into security.",
  "My EG1311 robot worked on the day. It had failed plenty of times before that.",
  "This site has a search. Press ⌘K.",
];

// Full write-ups: internships first, then projects, read as one sequence.
export const articles = [
  ...caseStudies.filter((c) => c.kind === "work" && !c.brief),
  ...caseStudies.filter((c) => c.kind === "project" && !c.brief),
];

export const articlePath = (c: { kind: "work" | "project"; slug: string }) =>
  `/${c.kind === "work" ? "work" : "projects"}/${c.slug}`;

export const paletteIndex = [
  { label: "Intro", href: "/#top", group: "Sections" },
  { label: "Work", href: "/#work", group: "Sections" },
  { label: "Projects", href: "/#projects", group: "Sections" },
  { label: "Write-ups", href: "/write-ups", group: "Pages" },
  { label: "Skills", href: "/#skills", group: "Sections" },
  { label: "Education", href: "/#education", group: "Sections" },
  { label: "Beyond work", href: "/#beyond", group: "Sections" },
  ...(agentEnabled ? [{ label: "Ask the agent", href: "/ask", group: "Pages" }] : []),
  { label: "Contact", href: "/contact", group: "Pages" },
  ...articles.map((c) => ({
    label: c.title,
    href: articlePath(c),
    group: c.kind === "work" ? "Work Articles" : "Project Articles",
  })),
];
