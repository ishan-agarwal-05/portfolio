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
        heading: "How it works",
        body: [
          "I compared seven ways of doing it and built small versions of a few. A normal parser that converts the code using fixed rules was the obvious option, but the robot code varies too much to write all the rules in advance. An AI agent handled that variety much better.",
          "Isaac Sim can run Python, so the agent writes a Python script that builds the action graph, and the same script builds the same graph every time. The question then became how to get the agent to write good Python. The answer was to give it as much context as I could: rules for translating AS code into graph structures, a list of the blocks the team had already built, style guides, and examples I had checked by hand.",
          "All of that lives as plain files in the team's repository, so they can keep adding rules and examples after I left, and it isn't tied to one AI model. I used Claude Code in VS Code because it gave the best results, but the company's own model, or one hosted on their GPU cluster, could work from the same files.",
        ],
      },
      {
        heading: "What was hard",
        body: [
          "Mostly figuring out how to do things in Python at all. Isaac Sim expects you to build action graphs by clicking around in its interface. There are Python ways to do the same things, but a lot of them aren't documented, so I worked them out from the installed source code. Four of them didn't behave the way the documentation says, and I put the workarounds into a shared helper file so nobody has to find them again.",
          "The setup made it harder too. The scene wasn't fully set up yet, so moves could land slightly off from the real factory even with the right coordinates, and I couldn't properly compare the simulation against videos of the real robots. Fixing that was a separate project. The computer I wrote code on also couldn't run Isaac Sim, so every script had to be copied over to an offline GPU machine before I could test it.",
        ],
      },
      {
        heading: "Where it ended up",
        body: [
          "By the time I left, the tool worked: you could ask it for a subprogram and it would write the script. It hadn't been tested properly across the whole cell, and an engineer still has to check and fix every graph it makes, which is where the estimate of about four hours per subprogram comes from.",
          "The team was impressed by how much work it could save. I also presented the idea to the VP, as slides rather than a demo, and she agreed we should be using AI to speed up engineering work like this.",
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
      "Hyundai's innovation centre in Singapore is building a digital twin of its EV factory in NVIDIA Isaac Sim. I spent my first three months on the simulation team building the parts of the platform around the simulation itself: the screens engineers use to run it, the report they get at the end, and an audit of how many parts in the scene could be traced back to the factory's other systems.",
    sections: [
      {
        heading: "What I built",
        body: [
          "In January I built an extension that shows records from an internal database as tables inside Isaac Sim. The dropdown options live in a YAML file, so they can change without touching the code.",
          "In February I built a report that is generated, and opens in the browser, at the end of every simulation run: joint angles, tool paths, work targets and a parts list, with a CSV fallback for when the external service is down. I also built the DT Sim Manager, the landing page that launches the platform's simulations.",
          "In March I built the window for New Product Introduction simulations. I wireframed it in FigJam and went through it with the team lead before writing any code, which saved a lot of back and forth.",
        ],
      },
      {
        heading: "The parts audit",
        body: [
          "The idea was that the simulation could be a source of truth for every part in the factory. Each asset in the scene can carry a label linking it to the same part in other systems, like the logistics records or the CAD drawings. My job was to go through those systems, find the matching information and put it onto the assets in the simulation.",
          "When I started, about 31% of parts could be traced. I tagged everything I could match and got it to 16 of 36 parts, or 44%. The rest wasn't something code could fix: the information was either missing from the other systems or had never been copied into the scene. I wrote up what would need to change to get past the 80% target.",
        ],
      },
      {
        heading: "Working there",
        body: [
          "The team was great and always willing to help. We had regular syncs with NVIDIA's engineers, which was cool to be part of. The hard part was the setup. The machines that ran Isaac Sim were offline, so I couldn't use AI tools on them, and every change meant copying files across before I could test anything.",
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
      "TechFour builds software for larger companies, and almost every project needed the same basics: a login system, a way to send emails, SMS or WhatsApp messages, and file uploads. They were being rebuilt every time. My internship was to build them once, as separate microservices that any project could plug in.",
    sections: [
      {
        heading: "What I built",
        body: [
          "Three services, in Flask with MySQL. The communications service sends emails, SMS and WhatsApp messages, including OTPs, and runs scheduled jobs. It's generic enough for the other services to use. The document service handles uploading and deleting files.",
          "The user management service covers registration, login and the landing page, and it uses the other two: OTPs come from the communications service, and profile pictures go through the document service. Each service also has an admin dashboard, since the clients' admins aren't programmers, and I built those as well.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "This is where I learned how coding works at a company: Jira, branch and commit conventions, code review, documenting every endpoint in Swagger, and SonarQube checks before anything gets merged. They didn't expect much from interns and mostly wanted us to learn, which suited me.",
          "The best part was where I sat, next to Sahil, who ran the company's servers, CI/CD and deployments. He'd tell me what he was about to do, give me a quick explanation and something to read at home, and then show me when he actually did it. That's how I learned Linux, firewalls, Nginx and load balancing, and how to set up a new project's repository and CI/CD pipeline.",
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
      "Six weeks with a team building a retrieval-augmented chatbot over internal documents, over the December holidays.",
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
      "A group project on extractive question answering: given a passage and a question, find the span of words in the passage that answers it. We fine-tuned RoBERTa on SQuAD and got 84.28 exact match. The five of us are close friends; the others had heavy course loads or an internship that semester, so one teammate and I did the coding and experiments, and the other three wrote the report.",
    sections: [
      {
        heading: "What we found",
        body: [
          "Instead of only taking the model's top answer, I had it rank its top candidates and looked at where the right answer landed. For 95.1% of questions, the correct answer was somewhere in its top five. So most of its mistakes were about ranking: it found the answer but put another one first. When that happened, its top two scores were usually very close together.",
        ],
      },
      {
        heading: "The reranker",
        body: [
          "So we only rerank when the gap between the top two scores is small, below 0.05. In those cases a second, smaller model scores both candidates against the question, and that score is blended with the original. Confident answers are left alone, so they cost nothing extra.",
          "It changed 55 of the 10,570 answers: 14 went from wrong to right and 1 from right to wrong, which took exact match from 84.28 to 84.40. That's a small gain from a single run, so I wouldn't call it significant. Reranking every question, or reranking the top three or five instead of the top two, made results worse.",
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
    stack: ["Python", "Celery", "Redis", "FFmpeg", "React", "LLM APIs", "Alembic"],
    repo: "https://github.com/arshinsikka/lectureai-mvp",
    repoNote: "on a co-founder's account",
    summary:
      "LectureAI started with an email from the NUS School of Computing about a startup programme. Arshin, a good friend who's really into startups, asked if I wanted to do it with him, and with Vidushi we came up with the idea: take a lecture recording and turn it into proper study notes. That programme rejected us, but BLOCK71 accepted us into its incubator.",
    sections: [
      {
        heading: "What we built",
        body: [
          "We surveyed students first, and it was a real problem. Then we built the pipeline: process the audio with FFmpeg, transcribe it, fix technical terms in the transcript using the lecture slides, and have an LLM turn the result into structured notes. It all ran in the background with Celery and Redis, since an hour-long lecture takes a while. I led the full-stack development, and the notes it produced were really good.",
        ],
      },
      {
        heading: "Why we stopped",
        body: [
          "The next step was getting into universities, through things like Canvas integrations or pilots. That turned out to mean a lot of paperwork and a very slow process, probably two or three years before anything happened. We reached out to a lot of people and didn't hear back from many. Around the same time TurboScribe, a well-funded competitor, took off with students directly.",
          "So in December 2025 we wrapped it up. I learned a lot from it, from pitching and presenting to building the pipeline.",
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
      "EG1311 is the Design and Make module. The course was a 3 cm bump, a 10 cm slope and a 30 cm wall, and the robot had to get across, launch a ping-pong ball over the wall and come back, with nobody touching it. The rest of my team weren't CS students, so I wrote all the code and designed the circuit. It was a lot of fun.",
    sections: [
      {
        heading: "How it works",
        body: [
          "Instead of driving for a set number of seconds, the robot checks an ultrasonic sensor on every loop to measure how far it is from the wall. When it's close enough, it stops, waits three seconds to settle, swings a servo to launch the ball, and reverses. The three drive motors run off two L293D motor drivers, all from one 9V battery.",
        ],
      },
      {
        heading: "What went wrong",
        body: [
          "A lot. The wires were finicky and kept coming loose, so it failed plenty of times in testing. We went through four sets of wheels before one could get over the bump and up the slope, and ended up sticking anti-slip mat on them for grip. The sensor had to be raised so it wouldn't mistake the bump for the wall, and the robot kept veering right because one motor was weaker, which we fixed by angling the front wheels slightly.",
          "On the day, it worked, and I got an A+ for the robot's run.",
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
      "I got into security because CTFs sounded fun. I still haven't done one, but I took CS2107, got an A, and liked it enough to make cybersecurity one of my specialisations, which is how I ended up in CS4236. Each week the course teaches something, we add it to our own cryptography library, and then they set up a server that uses it with a vulnerability, and I have to get in.",
    sections: [
      {
        heading: "So far",
        body: [
          "We're still on symmetric-key cryptography, where both sides share the same key. One I remember is a MAC forgery: the server's MAC didn't mix the secret key in properly, so it was effectively a known hash, and I could change a message and make a valid tag for it myself.",
          "So far the library has the one-time pad, a block cipher, block cipher modes, MACs and hash functions, each with an attack to go with it. Public-key cryptography, like RSA and digital signatures, comes later in the semester.",
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
      "Six months on the simulation team building a digital twin of the EV factory in NVIDIA Isaac Sim. For the first three months I built UI extensions and a report generated after every simulation run. For the last three, I built a tool that uses an AI agent to turn robot programs into simulation logic, work that used to take an engineer about a week per program.",
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
      "Six weeks with a team building a retrieval-augmented chatbot over internal documents. With the December holidays in the middle, most of it was onboarding and training, getting to know the team's work and code.",
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
    items: ["Flask", "Node.js", "React", "Flutter", "REST APIs", "Docker", "Git", "CI/CD", "MySQL", "MongoDB", "Celery / Redis"],
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
  {
    title: "Salesforce Administrator & Developer",
    detail: "Both certifications, earned during my first internship.",
  },
  {
    title: "Academic scholarships",
    detail:
      "Full tuition scholarship at Mayoor School for ranking first in my batch three years running, then 98% in Class 12 at Amity International.",
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
    body: "I'll play almost any system, not just D&D. Lately it's been Call of Cthulhu. I've never been the GM. At the table I'm pretty cooperative, and I nearly always play a big, physical character rather than a mage. It's an escape, a reason to hang out with friends, and we end up making a good story together. It fits with how much fantasy I read. I also draw for our campaigns and characters.",
    photos: [
      { src: "/photos/art-forest.jpg", w: 712, h: 1400, alt: "Coloured pencil drawing of a small figure on a path through a glowing blue forest under a swirling moon", caption: "Coloured pencil, for a campaign." },
      { src: "/photos/art-shadow-and-her-light.jpg", w: 1143, h: 1400, alt: "Blue pen sketch of a hooded character holding a small light, titled The Shadow and Her Light", caption: "The Shadow and Her Light. Pen on lined paper." },
      { src: "/photos/art-canary-crest.jpg", w: 990, h: 1400, alt: "Pencil sketch of a heraldic crest with a canary on a shield and a banner reading Canary", caption: "A crest for a character's family." },
    ],
  },
  {
    title: "Reading",
    body: "Reading is basically an addiction for me. Not physical books: web novels, mostly fantasy, cultivation and regression stories, a lot of them Korean and Chinese, on Royal Road and reading apps.",
  },
  {
    title: "Travel",
    body: "I love travelling, and so does my family. We go somewhere about twice a year. In the last three years that's been Bali, Vietnam, the UK, Scandinavia, South Africa, Japan, Malaysia and a lot of places in India.",
    photos: [
      { src: "/photos/travel-skye.jpg", w: 1600, h: 900, alt: "Green hills, cliffs and a winding road at the Quiraing on the Isle of Skye", caption: "Isle of Skye, Scotland." },
      { src: "/photos/travel-kyoto-river.jpg", w: 1600, h: 900, alt: "Ishan smiling in front of a river in Kyoto at dusk", caption: "Kyoto." },
      { src: "/photos/travel-fuji.jpg", w: 788, h: 1400, alt: "Ishan standing in a street with Mount Fuji behind him", caption: "Mount Fuji." },
      { src: "/photos/travel-nara.jpg", w: 788, h: 1400, alt: "Ishan crouching next to a resting deer in Nara park", caption: "Nara, with a deer." },
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
  "My family travels about twice a year. Japan, the UK and South Africa were some recent ones.",
  "My specialisations are AI and cybersecurity.",
  "I draw art for our campaigns and characters.",
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
  { label: "Honours", href: "/#honours", group: "Sections" },
  { label: "Toolbox", href: "/#skills", group: "Sections" },
  { label: "Beyond work", href: "/#beyond", group: "Sections" },
  ...(agentEnabled ? [{ label: "Ask the agent", href: "/ask", group: "Pages" }] : []),
  { label: "Contact", href: "/contact", group: "Pages" },
  ...articles.map((c) => ({
    label: c.title,
    href: articlePath(c),
    group: c.kind === "work" ? "Work Articles" : "Project Articles",
  })),
];
