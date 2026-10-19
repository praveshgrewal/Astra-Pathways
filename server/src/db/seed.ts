import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db, initDatabase } from './index.js';

initDatabase();

console.log('Seeding database with compliant, production-grade initial data...');

// 1. Clean existing seed data to allow idempotent seeding
db.exec(`
  DELETE FROM users;
  DELETE FROM programs;
  DELETE FROM blogs;
  DELETE FROM faqs;
  DELETE FROM announcements;
  DELETE FROM testimonials;
  DELETE FROM leads;
  DELETE FROM student_enrollments;
  DELETE FROM student_assignments;
`);

// 2. Insert Users (Admin & Student)
const salt = bcrypt.genSaltSync(10);
const adminPasswordHash = bcrypt.hashSync('AdminPass123!', salt);
const studentPasswordHash = bcrypt.hashSync('StudentPass123!', salt);

const adminId = 'usr_admin_' + uuidv4().slice(0, 8);
const studentId = 'usr_student_' + uuidv4().slice(0, 8);

const insertUser = db.prepare(`
  INSERT INTO users (id, email, password_hash, name, role, bio, phone)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

insertUser.run(
  adminId,
  'admin@astrapathways.com',
  adminPasswordHash,
  'Astra Administrator',
  'admin',
  'System Administrator & Academic Operations Lead',
  '+1 (555) 019-2831'
);

insertUser.run(
  studentId,
  'student@astrapathways.com',
  studentPasswordHash,
  'Alex Morgan',
  'student',
  'Learner focusing on Modern Full-Stack Web Development & Cloud Systems',
  '+1 (555) 014-9982'
);

// 3. Insert Programs (Strict adherence to restrictions: NO fees, NO salaries, NO placement guarantees)
const insertProgram = db.prepare(`
  INSERT INTO programs (
    id, title, category, level, short_description, full_overview,
    who_is_it_for, prerequisites, learning_objectives, skills_covered,
    tools_technologies, curriculum_modules, sample_projects,
    learning_methodology, mentorship_support, assessment_approach,
    career_pathways, placement_support_info, learning_format, featured, published
  ) VALUES (
    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
  )
`);

const programsData = [
  {
    id: 'full-stack-web-development',
    title: 'Full-Stack Web Development',
    category: 'Full-Stack Web Development',
    level: 'Beginner to Intermediate',
    short_description: 'Master modern frontend and backend architectures through hands-on project engineering and production-grade workflows.',
    full_overview: 'The Full-Stack Web Development program at Astra Pathways offers a structured, project-driven pathway into building scalable modern web applications. From core JavaScript, React, and TypeScript to Node.js backend services, RESTful APIs, and database engineering, learners develop working software artifacts and deploy real-world applications.',
    who_is_it_for: JSON.stringify([
      'Aspiring software developers looking to build practical web applications',
      'Frontend developers wanting to expand into backend and database systems',
      'Computer science graduates looking for structured hands-on project experience'
    ]),
    prerequisites: JSON.stringify([
      'Basic familiarity with computers and operating systems',
      'Fundamental understanding of logic or basic problem solving; no prior professional coding experience required'
    ]),
    learning_objectives: JSON.stringify([
      'Architect robust single-page applications using React and modern TypeScript',
      'Design RESTful microservices and backend endpoints using Node.js and Express',
      'Model relational and document databases with best design and indexing practices',
      'Implement secure user authentication, role-based authorization, and token handling',
      'Deploy full-stack applications with environment-based configuration and CI/CD pipelines'
    ]),
    skills_covered: JSON.stringify([
      'TypeScript', 'React.js', 'Node.js', 'Express', 'SQL & PostgreSQL', 'REST APIs', 'Git Workflows', 'Authentication & Security', 'Docker Basics', 'Testing Fundamentals'
    ]),
    tools_technologies: JSON.stringify([
      'React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Git & GitHub', 'Postman', 'Docker'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Modern Web Foundations & TypeScript',
        description: 'Deep dive into DOM mechanics, modern ESNext features, strict TypeScript typing, and responsive layout architecture.',
        topics: ['Semantic HTML & Accessibility Standards', 'Advanced CSS & Tailwind Design Systems', 'Modern JavaScript (ES6+)', 'TypeScript Types, Interfaces, & Generics']
      },
      {
        title: 'Module 2: Component Architecture with React',
        description: 'Building performant component trees, hooks, custom state management, and client routing.',
        topics: ['Functional Components & Virtual DOM', 'State Management & Custom Hooks', 'Client-side Routing & Protected Views', 'Form Validation & Error Boundaries']
      },
      {
        title: 'Module 3: Server-Side Engineering & REST APIs',
        description: 'Building scalable Node.js servers, request lifecycles, middleware, and data validation.',
        topics: ['Express.js Architecture & Middleware', 'RESTful API Design Standards', 'Input Validation & Sanitization', 'JWT Authentication & Password Hashing']
      },
      {
        title: 'Module 4: Database Design & ORM Modeling',
        description: 'Relational data modeling, ACID transactions, migrations, and query optimization.',
        topics: ['Relational Database Schema Design', 'SQL Queries, Joins, & Indexes', 'Data Integrity & Migration Scripts', 'Performance Profiling & Caching']
      },
      {
        title: 'Module 5: Capstone Engineering & Deployment',
        description: 'Building a collaborative production web application with automated testing and deployment.',
        topics: ['End-to-End Integration Testing', 'Containerization with Docker', 'Production Cloud Deployment & Monitoring', 'Portfolio Code Presentation']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Collaborative Task & Workflow Engine',
        description: 'A full-stack project management application with real-time updates, activity logging, and role-based permissions.',
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
      },
      {
        title: 'Digital Asset & Media Management Portal',
        description: 'Cloud storage integration platform featuring file chunking, metadata extraction, and search indexing.',
        tags: ['Express', 'REST API', 'Tailwind', 'Authentication']
      }
    ]),
    learning_methodology: 'Structured lectures, live guided coding labs, progressive milestone assignments, and weekly peer code reviews.',
    mentorship_support: 'Weekly dedicated office hours with industry practitioners, dedicated asynchronous Q&A forums, and direct milestone code feedback.',
    assessment_approach: 'Continuous project milestone evaluations, code quality rubrics, practical lab submissions, and capstone presentation.',
    career_pathways: JSON.stringify([
      'Frontend Web Developer', 'Backend API Engineer', 'Full-Stack Software Engineer', 'Web Applications Specialist'
    ]),
    placement_support_info: 'Our career support team provides resume review, LinkedIn profile refinement, mock technical interview sessions, and job-search strategy guidance. Placement assistance is offered as a structured support service; employment outcomes depend on individual learner skill, eligibility, and employer requirements.',
    learning_format: 'Interactive Online Learning with Live Mentorship Labs',
    featured: 1,
    published: 1
  },
  {
    id: 'ai-and-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence and Machine Learning',
    level: 'Intermediate',
    short_description: 'Develop practical AI models, machine learning pipelines, and predictive algorithms using modern Python ecosystems.',
    full_overview: 'Dive deep into supervised and unsupervised learning, deep learning fundamentals, and practical machine learning engineering. Learners build end-to-end predictive pipelines from raw data preprocessing to model evaluation and containerized model inference.',
    who_is_it_for: JSON.stringify([
      'Programmers and analysts wanting to transition into machine learning engineering',
      'STEM professionals seeking practical statistical modeling and deep learning skills',
      'Engineers wanting to deploy predictive intelligence into software workflows'
    ]),
    prerequisites: JSON.stringify([
      'Prior programming experience in Python or equivalent language',
      'Foundational understanding of basic algebra and statistics'
    ]),
    learning_objectives: JSON.stringify([
      'Implement data preprocessing, feature engineering, and exploratory analysis',
      'Train, tune, and evaluate classic supervised and unsupervised machine learning algorithms',
      'Build and train neural networks using modern deep learning frameworks',
      'Deploy trained models as RESTful inference APIs with validation schemas',
      'Evaluate model fairness, explainability, and drift monitoring'
    ]),
    skills_covered: JSON.stringify([
      'Python', 'NumPy & Pandas', 'Scikit-Learn', 'Feature Engineering', 'Neural Networks', 'Model Optimization', 'FastAPI', 'MLflow', 'Data Visualization'
    ]),
    tools_technologies: JSON.stringify([
      'Python 3.12', 'Jupyter Lab', 'Scikit-Learn', 'PyTorch Basics', 'FastAPI', 'Docker', 'Pandas', 'Seaborn'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Exploratory Data Analysis & Feature Engineering',
        description: 'Techniques for handling missing data, statistical outliers, encoding categoricals, and feature scaling.',
        topics: ['Vectorized Computing with NumPy', 'Data Manipulation with Pandas', 'Exploratory Visualization', 'Feature Selection & Dimensionality Reduction']
      },
      {
        title: 'Module 2: Supervised Learning & Model Validation',
        description: 'Regression, classification, decision trees, ensemble methods, and cross-validation strategies.',
        topics: ['Linear & Logistic Regression', 'Tree Models & Gradient Boosting (XGBoost)', 'Overfitting Mitigation & Regularization', 'Evaluation Metrics (ROC-AUC, F1, PR Curves)']
      },
      {
        title: 'Module 3: Unsupervised Learning & Clustering',
        description: 'Discovering hidden patterns in unlabeled datasets.',
        topics: ['K-Means & Hierarchical Clustering', 'Principal Component Analysis (PCA)', 'Anomaly Detection Systems', 'Recommendation Principles']
      },
      {
        title: 'Module 4: Deep Learning Foundations',
        description: 'Neural network architectures, activation functions, backpropagation, and loss optimization.',
        topics: ['Perceptrons & Multi-Layer Neural Nets', 'Gradient Descent Optimizers (Adam, RMSProp)', 'Computer Vision & Convolutional Basics', 'Sequence Models & Attention Introduction']
      },
      {
        title: 'Module 5: Machine Learning Ops & Model Serving',
        description: 'Packaging trained models into production-ready inference endpoints.',
        topics: ['Model Serialization & Versioning', 'Building Prediction APIs with FastAPI', 'Containerized Inference Pipelines', 'Monitoring Model Performance']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Customer Churn & Retention Predictor',
        description: 'End-to-end supervised classification pipeline predicting customer turnover with feature importance interpretability.',
        tags: ['Scikit-Learn', 'XGBoost', 'Feature Engineering', 'FastAPI']
      },
      {
        title: 'Medical Image Classification System',
        description: 'Convolutional neural network benchmark identifying cellular anomalies with sensitivity analysis.',
        tags: ['PyTorch', 'Computer Vision', 'Model Evaluation']
      }
    ]),
    learning_methodology: 'Hands-on notebook assignments, real-world case study evaluations, and end-to-end model pipeline builds.',
    mentorship_support: 'Weekly code walkthroughs, model diagnostic sessions, and personalized code reviews from practicing data scientists.',
    assessment_approach: 'Kaggle-style benchmark assignments, reproducible project notebooks, and technical design documentation.',
    career_pathways: JSON.stringify([
      'Machine Learning Engineer', 'AI Solutions Developer', 'Predictive Modeling Specialist', 'Data Science Associate'
    ]),
    placement_support_info: 'Learners receive structured portfolio review, resume optimization for AI/ML roles, and mock technical interviews. Placement assistance is a guiding support service; employment outcomes are not guaranteed.',
    learning_format: 'Interactive Online Learning with Lab Workshops',
    featured: 1,
    published: 1
  },
  {
    id: 'data-science-and-analytics',
    title: 'Data Science & Advanced Analytics',
    category: 'Data Science',
    level: 'Beginner to Intermediate',
    short_description: 'Transform complex datasets into actionable strategic intelligence using statistical modeling, SQL, and interactive dashboards.',
    full_overview: 'The Data Science & Analytics pathway equips learners with practical analytical capabilities. From relational database querying with advanced SQL to Python data manipulation, statistical hypothesis testing, and business storytelling, learners gain practical proficiency in driving data-backed decisions.',
    who_is_it_for: JSON.stringify([
      'Business analysts looking to integrate Python and advanced SQL into their toolset',
      'Recent graduates interested in entering business intelligence and data analytics',
      'Operations and marketing specialists wanting to build quantitative decision models'
    ]),
    prerequisites: JSON.stringify([
      'Comfort with basic quantitative concepts (percentages, ratios, basic statistics)',
      'No prior programming background required'
    ]),
    learning_objectives: JSON.stringify([
      'Write complex analytical SQL queries using window functions and Common Table Expressions',
      'Clean, reshape, and analyze structured datasets using Python and Pandas',
      'Formulate and execute hypothesis tests and A/B test experiments',
      'Design interactive business intelligence dashboards and data reports',
      'Synthesize analytical findings into actionable executive presentations'
    ]),
    skills_covered: JSON.stringify([
      'Advanced SQL', 'Python for Analytics', 'Pandas & NumPy', 'Statistical Inference', 'A/B Testing', 'PowerBI / Tableau Concepts', 'Data Storytelling'
    ]),
    tools_technologies: JSON.stringify([
      'PostgreSQL', 'Python', 'Pandas', 'Jupyter', 'Git', 'DBeaver', 'Tableau / Looker Studio'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Advanced Relational SQL for Analysts',
        description: 'Querying enterprise data warehouses, grouping, aggregation, subqueries, and window functions.',
        topics: ['Multi-table Joins & Set Operations', 'Window Functions (RANK, LEAD, LAG, PARTITION BY)', 'Common Table Expressions (CTEs)', 'Query Optimization & Explain Plans']
      },
      {
        title: 'Module 2: Python Data Wrangling with Pandas',
        description: 'Ingesting disparate data formats, cleaning messy records, and reshaping metrics.',
        topics: ['Data Ingestion (CSV, JSON, SQL)', 'Handling Missing Values & Imputation', 'Data Reshaping (Melt, Pivot, GroupBy)', 'Time-Series Analysis & Date Formatting']
      },
      {
        title: 'Module 3: Applied Statistics & Experimentation',
        description: 'Statistical significance, confidence intervals, and rigorous A/B testing methodologies.',
        topics: ['Probability Distributions & Central Limit Theorem', 'Hypothesis Testing (t-tests, Chi-square)', 'A/B Testing Design & Sample Sizing', 'Avoiding False Positives & Statistical Pitfalls']
      },
      {
        title: 'Module 4: Business Intelligence & Interactive Storytelling',
        description: 'Designing high-impact dashboards and executive summaries.',
        topics: ['KPI Selection & Dashboard Architecture', 'Interactive Visualizations', 'Data Storytelling for Stakeholders', 'Automated Reporting Workflows']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'E-Commerce Funnel & Cohort Retention Analysis',
        description: 'Cohort analysis measuring customer lifetime behavior, churn indicators, and drop-off points across an e-commerce checkout flow.',
        tags: ['PostgreSQL', 'Python', 'Cohort Analysis', 'Tableau']
      },
      {
        title: 'Marketing Campaign A/B Experiment Evaluator',
        description: 'Statistical validation of digital advertising variants analyzing conversion lifts and confidence levels.',
        tags: ['Hypothesis Testing', 'Pandas', 'Data Storytelling']
      }
    ]),
    learning_methodology: 'Hands-on dataset labs, weekly case study analysis, and data storytelling workshops.',
    mentorship_support: 'One-on-one analytical project feedback, live query optimization sessions, and industry mentor check-ins.',
    assessment_approach: 'Case study deliverables, SQL challenge benchmarks, and final executive dashboard presentation.',
    career_pathways: JSON.stringify([
      'Data Analyst', 'Business Intelligence Analyst', 'Marketing Analytics Specialist', 'Operations Data Strategist'
    ]),
    placement_support_info: 'Our team guides students on portfolio presentation, technical analytical tests, and behavioral interviews. Placement assistance is a dedicated support service; guaranteed employment is neither offered nor implied.',
    learning_format: 'Interactive Online Learning with Practical Labs',
    featured: 1,
    published: 1
  },
  {
    id: 'cloud-computing-and-devops',
    title: 'Cloud Computing & DevOps Engineering',
    category: 'Cloud Computing and DevOps',
    level: 'Intermediate to Advanced',
    short_description: 'Architect scalable cloud infrastructure, automate deployment pipelines, and master modern container orchestration.',
    full_overview: 'Learn the foundational principles of modern infrastructure engineering. This program covers containerization with Docker, Infrastructure as Code (IaC) with Terraform, CI/CD automated build pipelines, and production cloud systems management.',
    who_is_it_for: JSON.stringify([
      'Software developers looking to master infrastructure and deployment automation',
      'System administrators transitioning into modern DevOps practices',
      'Technical professionals wanting to build resilient cloud architectures'
    ]),
    prerequisites: JSON.stringify([
      'Fundamental command line / Linux terminal familiarity',
      'Basic understanding of networking (IP, DNS, HTTP) and simple scripting'
    ]),
    learning_objectives: JSON.stringify([
      'Containerize multi-tier applications using Docker and compose multi-container stacks',
      'Automate cloud infrastructure provisioning using Terraform and declarative configuration',
      'Design and maintain CI/CD pipelines with automated testing and build checks',
      'Configure cloud networking, security groups, and identity access policies',
      'Implement observability, logging, and performance telemetry for microservices'
    ]),
    skills_covered: JSON.stringify([
      'Linux Administration', 'Docker', 'Kubernetes Fundamentals', 'Terraform (IaC)', 'GitHub Actions', 'Cloud Networking', 'Monitoring & Logging (Prometheus/Grafana)'
    ]),
    tools_technologies: JSON.stringify([
      'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'AWS/GCP Concepts', 'Nginx', 'Prometheus', 'Grafana'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Linux Foundations & Containerization',
        description: 'Core Linux system management, permissions, networking, and Docker container architecture.',
        topics: ['Linux Shell Scripting & Process Management', 'Docker Architecture, Images, & Multi-Stage Builds', 'Networking Containers & Volumes', 'Docker Compose Multi-Tier Orchestration']
      },
      {
        title: 'Module 2: Continuous Integration & Delivery (CI/CD)',
        description: 'Automating the software delivery lifecycle with automated triggers and testing gates.',
        topics: ['GitHub Actions Workflow Syntax', 'Automated Linting, Unit, & Integration Testing Gates', 'Artifact Versioning & Registry Publishing', 'Automated Deployment Strategies (Rolling, Canary)']
      },
      {
        title: 'Module 3: Infrastructure as Code (IaC)',
        description: 'Provisioning declarative, version-controlled cloud infrastructure.',
        topics: ['Terraform State Management & Providers', 'Modular Infrastructure Design', 'Security Groups, VPCs, & Subnets', 'Secrets Management & Compliance']
      },
      {
        title: 'Module 4: Orchestration & Observability',
        description: 'Kubernetes workload deployment and production telemetry systems.',
        topics: ['Kubernetes Pods, Deployments, & Services', 'Ingress Controllers & SSL Termination', 'Metrics Collection with Prometheus', 'Dashboard Telemetry with Grafana']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Automated Microservices Deployment Pipeline',
        description: 'Production-ready GitHub Actions CI/CD pipeline validating, building, and deploying containerized services with rollback capabilities.',
        tags: ['GitHub Actions', 'Docker', 'CI/CD', 'Linux']
      },
      {
        title: 'Multi-Region Terraform Infrastructure Stack',
        description: 'Declarative IaC template configuring virtual networks, managed database clusters, and load balancers.',
        tags: ['Terraform', 'IaC', 'Cloud Architecture']
      }
    ]),
    learning_methodology: 'Lab-first training with cloud sandboxes, terminal exercises, and infrastructure milestone reviews.',
    mentorship_support: 'Weekly infrastructure office hours, live pipeline debugging sessions, and architecture design reviews.',
    assessment_approach: 'Automated pipeline verification checks, infrastructure code reviews, and capstone deployment.',
    career_pathways: JSON.stringify([
      'DevOps Engineer', 'Cloud Infrastructure Engineer', 'Site Reliability Associate', 'Build & Release Specialist'
    ]),
    placement_support_info: 'Our career specialists provide technical interview simulations, architecture whiteboard preparation, and resume guidance. Placement assistance is a support service; no employment outcomes are guaranteed.',
    learning_format: 'Interactive Online Learning with Infrastructure Labs',
    featured: 1,
    published: 1
  },
  {
    id: 'cybersecurity-fundamentals',
    title: 'Cybersecurity & Defensive Engineering',
    category: 'Cybersecurity',
    level: 'Beginner to Intermediate',
    short_description: 'Protect networks, evaluate web application vulnerabilities, and implement robust defense-in-depth security controls.',
    full_overview: 'The Cybersecurity & Defensive Engineering pathway trains learners in practical threat identification, network defense, secure application design, and incident response fundamentals. Through hands-on simulated exercises, learners understand how vulnerabilities arise and how to defend against modern digital threats.',
    who_is_it_for: JSON.stringify([
      'IT professionals seeking to specialize in defensive cybersecurity',
      'Software engineers looking to implement secure coding and application defense',
      'Individuals looking for practical foundational knowledge in security analysis'
    ]),
    prerequisites: JSON.stringify([
      'Basic understanding of computer networks (TCP/IP, DNS, OSI model)',
      'Familiarity with general operating system concepts'
    ]),
    learning_objectives: JSON.stringify([
      'Analyze network traffic and identify anomalous communication patterns',
      'Assess web applications for OWASP Top 10 vulnerabilities and apply remediation',
      'Implement defensive identity, access management, and cryptographic standards',
      'Understand threat modeling methodologies and risk management frameworks',
      'Conduct structured incident triage and log forensics'
    ]),
    skills_covered: JSON.stringify([
      'Network Security', 'OWASP Top 10', 'Threat Modeling', 'Wireshark Analysis', 'Identity & Access Management (IAM)', 'Cryptography Basics', 'SIEM Fundamentals'
    ]),
    tools_technologies: JSON.stringify([
      'Wireshark', 'Burp Suite Community', 'Linux CLI', 'Nmap', 'OpenSSL', 'Snort / Suricata Concepts'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Network Defense & Packet Analysis',
        description: 'Analyzing protocols, inspecting packet captures, and identifying network scanning activity.',
        topics: ['TCP/IP Stack Mechanics & Packet Structure', 'Wireshark Deep Packet Inspection', 'Firewalls, IDS/IPS, & DMZ Architecture', 'Port Scanning Analysis & Detection']
      },
      {
        title: 'Module 2: Web Application Security (OWASP Top 10)',
        description: 'Understanding injection, broken access control, cross-site scripting, and secure coding practices.',
        topics: ['SQL Injection Mechanics & Prepared Statements', 'Cross-Site Scripting (XSS) & Content Security Policy', 'Authentication Flaws & Session Security', 'Secure Headers & Input Sanitization']
      },
      {
        title: 'Module 3: Cryptography & Identity Management',
        description: 'Applied encryption, digital certificates, public key infrastructure, and secure access protocols.',
        topics: ['Symmetric vs. Asymmetric Encryption', 'Hashing Algorithms & Salting Best Practices', 'PKI, TLS Handshakes, & Certificate Management', 'Multi-Factor Authentication & Zero Trust Concepts']
      },
      {
        title: 'Module 4: Incident Response & Security Operations',
        description: 'Log aggregation, threat hunting basics, and incident containment workflows.',
        topics: ['SIEM Log Analysis & Correlation Rules', 'Threat Intelligence Frameworks (MITRE ATT&CK)', 'Incident Triage & Containment Strategies', 'Documentation & Compliance Guidelines']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Network Traffic Anomaly & Intrusion Investigation',
        description: 'Forensic PCAP analysis identifying unauthorized exfiltration, malicious beaconing, and protocol misuse.',
        tags: ['Wireshark', 'Network Defense', 'Incident Triage']
      },
      {
        title: 'Web Application Vulnerability Audit & Hardening Report',
        description: 'Structured vulnerability assessment of a test application with detailed remediation code patches.',
        tags: ['OWASP Top 10', 'AppSec', 'Security Hardening']
      }
    ]),
    learning_methodology: 'Hands-on simulated laboratory exercises, security case study reviews, and defensive configuration labs.',
    mentorship_support: 'Dedicated mentor office hours with security practitioners and guided lab walkthrough sessions.',
    assessment_approach: 'Practical lab challenges, security audit report submissions, and scenario-based assessments.',
    career_pathways: JSON.stringify([
      'Junior Security Analyst', 'SOC Analyst (Tier 1)', 'Information Security Specialist', 'AppSec Associate'
    ]),
    placement_support_info: 'Our team assists learners with technical cybersecurity interview preparation, scenario-based questioning, and resume framing. Placement assistance is a guidance service; employment is not guaranteed.',
    learning_format: 'Interactive Online Learning with Guided Virtual Labs',
    featured: 0,
    published: 1
  }
];

for (const p of programsData) {
  insertProgram.run(
    p.id, p.title, p.category, p.level, p.short_description, p.full_overview,
    p.who_is_it_for, p.prerequisites, p.learning_objectives, p.skills_covered,
    p.tools_technologies, p.curriculum_modules, p.sample_projects,
    p.learning_methodology, p.mentorship_support, p.assessment_approach,
    p.career_pathways, p.placement_support_info, p.learning_format, p.featured, p.published
  );
}

// 4. Insert Educational Blogs & Resources
const insertBlog = db.prepare(`
  INSERT INTO blogs (id, slug, title, category, tags, read_time, summary, content, author_name, author_role, published)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const blogsData = [
  {
    id: 'blog_1',
    slug: 'navigating-your-tech-learning-pathway',
    title: 'Navigating Your Modern Tech Pathway: Focus, Practice, and Momentum',
    category: 'Career Guidance',
    tags: JSON.stringify(['Learning Strategy', 'Skill Development', 'Career Growth']),
    read_time: '6 min read',
    summary: 'How structured milestones, deliberate practice, and project building outperform passive tutorial consumption.',
    content: `When beginning a transition into technology or advancing existing capabilities, learners frequently confront an overwhelming landscape of frameworks, buzzwords, and conflicting advice. 

### 1. Moving Beyond Tutorial Inertia
The single most prevalent obstacle for modern learners is passive content consumption. Watching video tutorials produces a cognitive illusion of competence. However, true mastery only solidifies when you encounter syntax errors, structural roadblocks, and debugging puzzles.

### 2. The Power of Project Artifacts
Rather than memorizing abstract syntax, anchor your study in concrete deliverables:
- Build a working REST API that validates input data.
- Construct a responsive UI component library with accessible keyboard navigation.
- Implement a predictive classification model using a real dataset.

### 3. Deliberate Feedback Loops
Progress accelerates when you expose your work to structured review. Code reviews and mentor feedback identify architectural blindspots that self-directed learning often overlooks.

*At Astra Pathways, our curriculum is engineered around practical projects and continuous mentorship to ensure your study translates into demonstrable capability.*`,
    author_name: 'Academic Strategy Team',
    author_role: 'Curriculum & Pedagogy Group',
    published: 1
  },
  {
    id: 'blog_2',
    slug: 'essential-skills-for-full-stack-engineers',
    title: 'Core Architectural Concepts Every Modern Full-Stack Developer Needs',
    category: 'Technology Explainers',
    tags: JSON.stringify(['Web Development', 'Full-Stack', 'Architecture', 'TypeScript']),
    read_time: '8 min read',
    summary: 'A breakdown of state management, API contract safety, and database transactional integrity in modern software systems.',
    content: `Building software today requires balancing rapid frontend interactivity with secure, predictable backend execution. Here are the core architectural pillars every developer should master:

### 1. Type Safety Across Network Boundaries
Historically, web applications suffered from implicit schema drift between the frontend interface and backend endpoints. Modern workflows utilize TypeScript and schema validation libraries (such as Zod) to ensure payload integrity before data reaches application logic.

### 2. Idempotency and Database Transactions
A robust backend developer understands that network calls fail, duplicates occur, and connections drop. Designing idempotent endpoints and leveraging database ACID transactions ensures data never enters an inconsistent state.

### 3. Component Hierarchy and Single Responsibility
Well-structured React applications isolate stateful orchestration from pure presentation components. This makes interfaces easier to test, refactor, and scale over time.`,
    author_name: 'Engineering Faculty',
    author_role: 'Systems Architecture Lead',
    published: 1
  },
  {
    id: 'blog_3',
    slug: 'demystifying-machine-learning-pipelines',
    title: 'From Raw Data to Inference: Understanding the Machine Learning Pipeline',
    category: 'Tutorials',
    tags: JSON.stringify(['AI & ML', 'Python', 'Data Science', 'Pipelines']),
    read_time: '7 min read',
    summary: 'Understand the systematic stages of machine learning engineering, from feature preparation to serving real-time predictions.',
    content: `Machine learning is frequently portrayed as mysterious, yet in practice it is an orderly, disciplined engineering workflow.

### The Five Essential Stages
1. **Problem Formulation**: Translating business questions into measurable statistical objectives (e.g., classification vs. regression).
2. **Exploratory Data Analysis**: Identifying distributions, missing values, outliers, and class imbalances.
3. **Feature Engineering**: Creating informative mathematical representations from raw signals.
4. **Model Training & Cross-Validation**: Testing hypotheses and guarding against overfitting using stratified validation splits.
5. **Inference Serving**: Wrapping models into lightweight, containerized microservices capable of processing real-time payloads.

Structured project work reinforces each of these phases, giving learners confidence in both the theory and the operational implementation.`,
    author_name: 'AI Research Group',
    author_role: 'Data Science Instructor',
    published: 1
  }
];

for (const b of blogsData) {
  insertBlog.run(b.id, b.slug, b.title, b.category, b.tags, b.read_time, b.summary, b.content, b.author_name, b.author_role, b.published);
}

// 5. Insert FAQs (Compliant: NO pricing, NO placement guarantees, informative)
const insertFaq = db.prepare(`
  INSERT INTO faqs (id, category, question, answer, order_num)
  VALUES (?, ?, ?, ?, ?)
`);

const faqsData = [
  {
    id: 'faq_1',
    category: 'Programs',
    question: 'Who are the Astra Pathways learning programs designed for?',
    answer: 'Our programs are designed for motivated learners, career changers, and working professionals who want to build practical, industry-relevant technical skills through structured project work and guided mentorship.',
    order_num: 1
  },
  {
    id: 'faq_2',
    category: 'Admissions',
    question: 'What are the general prerequisites to enroll in a program?',
    answer: 'Prerequisites vary depending on the level of the program. Foundational tracks require no prior coding experience, only comfort with basic computer operations and analytical thinking. Intermediate and advanced tracks recommend prior familiarity with fundamental programming or mathematics.',
    order_num: 2
  },
  {
    id: 'faq_3',
    category: 'Curriculum',
    question: 'How are the program curricula structured?',
    answer: 'Every curriculum is organized into sequential modules combining conceptual lectures, live guided coding labs, hands-on milestone assignments, and capstone project builds that reinforce real-world engineering standards.',
    order_num: 3
  },
  {
    id: 'faq_4',
    category: 'Projects',
    question: 'Are practical projects included in every program?',
    answer: 'Yes. Practical, portfolio-ready projects are central to our learning philosophy. Learners build functional applications, analytical pipelines, or infrastructure configurations rather than solely answering theoretical quizzes.',
    order_num: 4
  },
  {
    id: 'faq_5',
    category: 'Learning Support',
    question: 'What kind of learning mentorship and support is provided?',
    answer: 'Learners have access to regular mentor office hours, asynchronous Q&A forums, structured code reviews on milestone submissions, and collaborative peer learning environments.',
    order_num: 5
  },
  {
    id: 'faq_6',
    category: 'Career Guidance',
    question: 'What does placement assistance include?',
    answer: 'Placement assistance is provided as a supportive career service. It includes professional resume reviews, LinkedIn profile refinement, mock technical and behavioral interviews, portfolio presentation coaching, and job-search strategy sessions. Please note that employment outcomes depend on individual skills, preparation, eligibility, and employer criteria; we do not promise or guarantee jobs.',
    order_num: 6
  },
  {
    id: 'faq_7',
    category: 'General Queries',
    question: 'How can I speak with an educational advisor?',
    answer: 'You can submit an inquiry through our Contact page or schedule a consultation by clicking "Talk to an Advisor" on any page. An educational advisor will reach out to discuss your background, goals, and suitable learning paths.',
    order_num: 7
  },
  {
    id: 'faq_8',
    category: 'Curriculum',
    question: 'How can I request detailed syllabus documentation?',
    answer: 'You can request the detailed curriculum syllabus by submitting an enquiry form on the specific program detail page or by contacting our academic advisory team.',
    order_num: 8
  }
];

for (const f of faqsData) {
  insertFaq.run(f.id, f.category, f.question, f.answer, f.order_num);
}

// 6. Insert Announcements
const insertAnnouncement = db.prepare(`
  INSERT INTO announcements (id, title, badge, link_url, is_active)
  VALUES (?, ?, ?, ?, ?)
`);

insertAnnouncement.run(
  'ann_1',
  'Advising Sessions Open: Explore our newly expanded practical tech curricula for 2026',
  'New Updates',
  '/programs',
  1
);

// 7. Insert Initial Leads / Enquiries (for Admin demonstration)
const insertLead = db.prepare(`
  INSERT INTO leads (id, name, email, phone, program_of_interest, current_experience, preferred_contact, message, status, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const initialLeads = [
  {
    id: 'lead_1',
    name: 'Samantha Vance',
    email: 'samantha.vance@example.com',
    phone: '+1 (555) 234-5678',
    program_of_interest: 'Full-Stack Web Development',
    current_experience: 'Beginner (Self-taught HTML/CSS)',
    preferred_contact: 'Email',
    message: 'I am interested in learning full-stack development and would like to review the curriculum structure.',
    status: 'New',
    notes: 'Inquiry received via homepage CTA.'
  },
  {
    id: 'lead_2',
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1 (555) 876-5432',
    program_of_interest: 'Artificial Intelligence & Machine Learning',
    current_experience: 'Intermediate (2 years Python experience)',
    preferred_contact: 'Phone',
    message: 'Looking to understand model deployment workflows and practical deep learning labs.',
    status: 'Contacted',
    notes: 'Scheduled initial advisory discussion for Thursday.'
  },
  {
    id: 'lead_3',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phone: '+1 (555) 432-1098',
    program_of_interest: 'Cloud Computing & DevOps Engineering',
    current_experience: 'System Administrator',
    preferred_contact: 'Email',
    message: 'Seeking hands-on experience with Terraform and container orchestration.',
    status: 'Follow-up',
    notes: 'Shared syllabus document. Following up on lab scheduling.'
  }
];

for (const l of initialLeads) {
  insertLead.run(l.id, l.name, l.email, l.phone, l.program_of_interest, l.current_experience, l.preferred_contact, l.message, l.status, l.notes);
}

// 8. Enroll student Alex Morgan into 'full-stack-web-development'
const enrollmentId = 'enr_' + uuidv4().slice(0, 8);
db.prepare(`
  INSERT INTO student_enrollments (id, user_id, program_id, progress_percent)
  VALUES (?, ?, ?, ?)
`).run(enrollmentId, studentId, 'full-stack-web-development', 42);

// 9. Insert Sample Assignment for Student
db.prepare(`
  INSERT INTO student_assignments (id, user_id, program_id, title, description, submission_link, notes, status, feedback, score)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  'asg_' + uuidv4().slice(0, 8),
  studentId,
  'full-stack-web-development',
  'Milestone 2: Responsive React Dashboard with Custom Hooks',
  'Implement an accessible, responsive dashboard interface demonstrating custom hooks for data fetching and form state.',
  'https://github.com/example/react-dashboard-submission',
  'Completed all stretch challenges including keyboard focus trap.',
  'Reviewed',
  'Excellent component modularity and clean TypeScript interface definitions. Keyboard navigation works smoothly.',
  '96 / 100'
);

db.prepare(`
  INSERT INTO student_assignments (id, user_id, program_id, title, description, submission_link, notes, status)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`).run(
  'asg_' + uuidv4().slice(0, 8),
  studentId,
  'full-stack-web-development',
  'Milestone 3: RESTful Express API with Validation & Auth',
  'Design secure REST endpoints with JWT authentication, bcrypt password hashing, and Zod input validation schemas.',
  '',
  '',
  'Pending'
);

console.log('Database seeded successfully with compliant, rich production data!');
console.log('Admin account: admin@astrapathways.com / AdminPass123!');
console.log('Student account: student@astrapathways.com / StudentPass123!');
