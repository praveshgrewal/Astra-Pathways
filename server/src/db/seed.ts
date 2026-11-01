import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { db, initDatabase } from './index.js';

export function seedDatabase(cleanExisting = false) {
  initDatabase();

  console.log('Seeding database with compliant, production-grade initial data...');

  // 1. Clean existing seed data if requested
  if (cleanExisting) {
    db.exec(`
      PRAGMA foreign_keys = OFF;
      DELETE FROM student_assignments;
      DELETE FROM student_enrollments;
      DELETE FROM leads;
      DELETE FROM testimonials;
      DELETE FROM announcements;
      DELETE FROM faqs;
      DELETE FROM blogs;
      DELETE FROM programs;
      DELETE FROM users;
      PRAGMA foreign_keys = ON;
    `);
  }

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
  'admin@madyanholdings.com',
  adminPasswordHash,
  'Madyan Administrator',
  'admin',
  'System Administrator & Operations Lead',
  '+1 (307) 317-7151'
);

insertUser.run(
  studentId,
  'student@madyanholdings.com',
  studentPasswordHash,
  'Alex Morgan',
  'student',
  'Learner focusing on Modern Web Development & Cloud Systems',
  '+1 (307) 317-7151'
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
    short_description: 'Learn how to build complete websites and online apps from scratch, with friendly step-by-step guidance.',
    full_overview: 'This program makes learning to code clear and practical. You will learn how modern websites work, from interactive pages using React and TypeScript to secure servers and databases using Node.js and SQL. Guided by experienced mentors, you will build real-world applications that you can proudly showcase in your portfolio.',
    who_is_it_for: JSON.stringify([
      'Beginners and students wanting to build real websites and apps',
      'Career switchers looking for a structured, hands-on path into tech',
      'Learners who want a strong portfolio of real working projects'
    ]),
    prerequisites: JSON.stringify([
      'Basic computer skills and curiosity to learn',
      'No prior professional coding experience required'
    ]),
    learning_objectives: JSON.stringify([
      'Build clean, responsive, mobile-friendly websites with React and TypeScript',
      'Create backend servers that save and manage data securely with Node.js',
      'Connect applications to databases using easy-to-read SQL queries',
      'Add user accounts, logins, and passwords with industry-standard security',
      'Publish and launch completed web projects live on the internet'
    ]),
    skills_covered: JSON.stringify([
      'HTML & CSS', 'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express', 'SQL & Databases', 'REST APIs', 'Git & GitHub', 'Web Security'
    ]),
    tools_technologies: JSON.stringify([
      'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Git & GitHub', 'Postman'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Web Foundations & TypeScript',
        description: 'Understand how websites are built, master modern JavaScript, and write cleaner code with TypeScript.',
        topics: ['Building Web Pages with HTML & Modern CSS', 'Styling with Tailwind CSS', 'JavaScript Essentials (ES6+)', 'Writing Safe Code with TypeScript']
      },
      {
        title: 'Module 2: Building Interactive Pages with React',
        description: 'Create modern, dynamic user interfaces that respond instantly to user clicks and input.',
        topics: ['React Components & Page Layouts', 'Managing State and User Clicks', 'Multi-Page Navigation & Protected Routes', 'Building and Validating User Forms']
      },
      {
        title: 'Module 3: Server Basics & Connecting Data',
        description: 'Learn how servers handle requests, process information, and talk to frontends.',
        topics: ['Building Servers with Node.js & Express', 'Creating REST APIs to Send and Receive Data', 'Checking and Cleaning User Input', 'User Logins with Secure Tokens']
      },
      {
        title: 'Module 4: Databases & Storing Information',
        description: 'Learn how to store, organize, and find customer and product data reliably.',
        topics: ['Relational Database Basics', 'Writing SQL to Find, Add, and Update Data', 'Connecting Databases to Your Server', 'Keeping Stored Data Safe and Fast']
      },
      {
        title: 'Module 5: Capstone Project & Launching Live',
        description: 'Put everything together into a complete web application and launch it live online.',
        topics: ['Testing Your Application', 'Packaging Your App with Docker', 'Deploying Live on Cloud Platforms', 'Showcasing Your Work on GitHub']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Team Task & Project Tracker',
        description: 'A complete project management website with task lists, team boards, status tags, and user logins.',
        tags: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
      },
      {
        title: 'Cloud Photo & File Manager',
        description: 'A photo upload and file storage app with file categorization, instant search, and secure user sharing.',
        tags: ['Express', 'REST API', 'Tailwind', 'Authentication']
      }
    ]),
    learning_methodology: 'Step-by-step video lessons, live mentor code-alongs, weekly guided exercises, and personalized feedback.',
    mentorship_support: 'Weekly open mentor office hours, student chat community for quick questions, and direct project code reviews.',
    assessment_approach: 'Practical weekly project milestones, friendly mentor feedback, and a final capstone showcase.',
    career_pathways: JSON.stringify([
      'Junior Web Developer', 'Frontend Developer', 'Full-Stack Developer', 'Technical Support Specialist'
    ]),
    placement_support_info: 'Our career support team provides resume review, LinkedIn profile polishing, mock technical interview sessions, and job-search strategy guidance. Placement assistance is offered as a structured support service; employment outcomes depend on individual learner skill, eligibility, and employer requirements.',
    learning_format: 'Interactive Online Learning with Live Mentor Support',
    featured: 1,
    published: 1
  },
  {
    id: 'ai-and-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    category: 'Artificial Intelligence and Machine Learning',
    level: 'Beginner to Intermediate',
    short_description: 'Discover how artificial intelligence and machine learning work, and build smart tools with Python.',
    full_overview: 'This program breaks down artificial intelligence into clear, easy-to-follow steps. You will learn how computers learn from data, build models that make predictions, and create practical applications using Python and popular data science tools.',
    who_is_it_for: JSON.stringify([
      'Beginners curious about artificial intelligence and modern automation',
      'Career switchers wanting practical Python and data skills',
      'Students looking for practical project experience in AI'
    ]),
    prerequisites: JSON.stringify([
      'Basic computer comfort and high school level math',
      'No prior programming background required; we start with Python basics'
    ]),
    learning_objectives: JSON.stringify([
      'Write clean, readable Python code to analyze and organize data',
      'Train computer models to recognize patterns and make predictions',
      'Evaluate model accuracy and improve prediction quality',
      'Build simple online interfaces for your AI models',
      'Understand ethical AI practices and real-world use cases'
    ]),
    skills_covered: JSON.stringify([
      'Python Programming', 'NumPy & Pandas', 'Data Exploration', 'Machine Learning Basics', 'Predictive Modeling', 'FastAPI', 'Data Visualization'
    ]),
    tools_technologies: JSON.stringify([
      'Python 3.12', 'Jupyter Notebooks', 'Scikit-Learn', 'Pandas', 'FastAPI', 'Seaborn'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Python for Data & AI',
        description: 'Get comfortable with Python, inspect numbers and tables, and clean messy information.',
        topics: ['Python Basics for Beginners', 'Working with Tables using Pandas', 'Creating Clear Charts and Visuals', 'Cleaning Incomplete Data']
      },
      {
        title: 'Module 2: Teaching Computers from Data',
        description: 'Learn how machine learning algorithms find patterns and predict outcomes.',
        topics: ['Supervised Learning Concepts', 'Predicting Numbers and Categories', 'Testing How Well Your Model Performs', 'Fixing Common Model Mistakes']
      },
      {
        title: 'Module 3: Grouping Data & Finding Patterns',
        description: 'Discover how computers find natural groupings in data without human labels.',
        topics: ['Clustering Customer Groups', 'Finding Unusual Outliers and Anomalies', 'Simplifying Large Datasets', 'Recommendation System Basics']
      },
      {
        title: 'Module 4: Introduction to Neural Networks',
        description: 'Understand how deep learning mimics the human brain to recognize images and text.',
        topics: ['How Neural Networks Learn', 'Image Recognition Basics', 'Working with Pre-trained AI Models', 'Understanding Generative AI Concepts']
      },
      {
        title: 'Module 5: Building AI Web Services & Capstone',
        description: 'Connect your trained model to a web service so real people can interact with it.',
        topics: ['Saving and Loading Trained Models', 'Creating APIs with FastAPI', 'Building an Interactive Demo', 'Presenting Your AI Portfolio']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Customer Trend & Retention Predictor',
        description: 'A smart model that identifies which customers are likely to cancel a subscription, helping teams intervene early.',
        tags: ['Python', 'Scikit-Learn', 'Pandas', 'FastAPI']
      },
      {
        title: 'Smart Product Categorization Tool',
        description: 'An automated assistant that reads product descriptions and assigns the correct catalog tags instantly.',
        tags: ['Python', 'Text Analysis', 'Classification']
      }
    ]),
    learning_methodology: 'Hands-on Jupyter notebooks, interactive real-world datasets, and step-by-step guidance.',
    mentorship_support: 'Weekly code walkthroughs, live troubleshooting sessions, and personalized feedback on your models.',
    assessment_approach: 'Hands-on notebook submissions, practical prediction challenges, and capstone presentation.',
    career_pathways: JSON.stringify([
      'Junior AI Associate', 'Data Analyst with AI Skills', 'Python Developer', 'Solutions Assistant'
    ]),
    placement_support_info: 'Learners receive structured portfolio review, resume optimization for AI/ML roles, and mock technical interviews. Placement assistance is a guiding support service; employment outcomes are not guaranteed.',
    learning_format: 'Interactive Online Learning with Lab Workshops',
    featured: 1,
    published: 1
  },
  {
    id: 'data-science-and-analytics',
    title: 'Data Science & Business Analytics',
    category: 'Data Science',
    level: 'Beginner to Intermediate',
    short_description: 'Turn spreadsheets and numbers into clear charts, helpful reports, and smart business decisions.',
    full_overview: 'Learn how to answer real questions using data. You will master SQL to retrieve information quickly, use Python to clean and inspect numbers, and create visual dashboards that anyone can easily understand.',
    who_is_it_for: JSON.stringify([
      'Anyone looking to switch into data analysis or business intelligence',
      'Professionals who want to move beyond basic spreadsheets',
      'Students wanting practical data analysis skills for today’s job market'
    ]),
    prerequisites: JSON.stringify([
      'Familiarity with basic computer use and simple arithmetic',
      'No prior programming background required'
    ]),
    learning_objectives: JSON.stringify([
      'Write clear SQL queries to extract data from company databases',
      'Clean, sort, and organize messy data files using Python',
      'Perform basic statistical checks and understand A/B test results',
      'Build eye-catching, interactive dashboards with visual charts',
      'Explain data insights clearly to non-technical team members'
    ]),
    skills_covered: JSON.stringify([
      'SQL Queries', 'Python for Analytics', 'Pandas', 'Data Cleaning', 'A/B Testing Basics', 'Dashboards & Charts', 'Business Storytelling'
    ]),
    tools_technologies: JSON.stringify([
      'PostgreSQL', 'Python', 'Pandas', 'Jupyter', 'Tableau / Looker Studio Concepts'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Practical SQL for Data Retrieval',
        description: 'Learn how to pull the exact data you need from company databases.',
        topics: ['Connecting to Databases', 'Filtering, Sorting, and Grouping Data', 'Combining Tables with JOINs', 'Summary Reports and Calculations']
      },
      {
        title: 'Module 2: Python Data Cleaning & Exploration',
        description: 'Automate data cleanup and discover interesting trends in customer and sales figures.',
        topics: ['Reading CSV and Excel Files in Python', 'Finding and Fixing Missing Information', 'Transforming Columns and Dates', 'Creating Clear Summary Charts']
      },
      {
        title: 'Module 3: Answering Business Questions with Numbers',
        description: 'Use practical statistics to verify whether a trend is real or just random luck.',
        topics: ['Averages, Medians, and Variations', 'Comparing Two Groups (A/B Testing)', 'Identifying Growth and Seasonal Trends', 'Avoiding Common Data Misinterpretations']
      },
      {
        title: 'Module 4: Dashboards & Storytelling',
        description: 'Design interactive visual dashboards that make key metrics easy to understand.',
        topics: ['Choosing the Right Chart for Your Data', 'Building Interactive Filters and Views', 'Structuring an Executive Summary', 'Presenting Insights with Confidence']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Store Sales & Customer Loyalty Dashboard',
        description: 'An interactive sales dashboard displaying monthly revenue, top products, and repeat customer trends.',
        tags: ['SQL', 'Python', 'Dashboards', 'Analytics']
      },
      {
        title: 'Website Experiment & Sign-up Review',
        description: 'A study comparing two website versions to see which one helped more users sign up successfully.',
        tags: ['A/B Testing', 'Pandas', 'Storytelling']
      }
    ]),
    learning_methodology: 'Hands-on dataset exercises, weekly real-world business cases, and visual chart workshops.',
    mentorship_support: 'One-on-one analytical project feedback, query troubleshooting, and industry mentor check-ins.',
    assessment_approach: 'Case study reports, SQL query challenges, and final dashboard presentation.',
    career_pathways: JSON.stringify([
      'Data Analyst', 'Business Intelligence Analyst', 'Operations Analyst', 'Reporting Specialist'
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
    level: 'Beginner to Intermediate',
    short_description: 'Learn how websites stay online 24/7, deploy cloud servers, and automate software releases.',
    full_overview: 'Understand the engine behind modern tech companies. You will learn how cloud platforms work, how to package software in Docker containers, and how to automate software updates so apps run reliably without downtime.',
    who_is_it_for: JSON.stringify([
      'Learners interested in cloud systems and server management',
      'Junior developers wanting to learn modern deployment tools',
      'Career switchers interested in cloud and DevOps roles'
    ]),
    prerequisites: JSON.stringify([
      'Basic familiarity with operating systems and the command terminal',
      'General curiosity about how internet servers work'
    ]),
    learning_objectives: JSON.stringify([
      'Package applications into portable Docker containers that run anywhere',
      'Set up and configure cloud virtual servers and secure networking',
      'Automate code testing and deployments using GitHub Actions',
      'Understand infrastructure configuration files with Terraform',
      'Monitor server health and set up alerts for system issues'
    ]),
    skills_covered: JSON.stringify([
      'Linux Commands', 'Docker', 'Cloud Concepts', 'GitHub Actions CI/CD', 'Server Monitoring', 'Basic Infrastructure as Code'
    ]),
    tools_technologies: JSON.stringify([
      'Docker', 'Linux', 'GitHub Actions', 'Terraform Basics', 'Cloud Virtual Machines', 'Nginx'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: Linux & Docker Containers',
        description: 'Master essential terminal commands and package your code so it runs everywhere.',
        topics: ['Essential Linux Navigation and Permissions', 'Understanding Containers vs. Virtual Machines', 'Writing Dockerfiles and Building Images', 'Running Multi-Container Apps with Compose']
      },
      {
        title: 'Module 2: Automated Testing & Releases (CI/CD)',
        description: 'Set up automatic checks so code is tested and released whenever you push updates.',
        topics: ['GitHub Actions Fundamentals', 'Automated Test Checks on Every Push', 'Building and Storing Container Images', 'Deploying Code Automatically to Servers']
      },
      {
        title: 'Module 3: Cloud Infrastructure Setup',
        description: 'Learn how to launch and secure cloud servers, storage, and networking.',
        topics: ['Virtual Private Clouds and IP Rules', 'Securing Servers with SSH and Firewalls', 'Writing Configuration Files with Terraform', 'Connecting Custom Domains and Free SSL']
      },
      {
        title: 'Module 4: Keeping Systems Healthy & Online',
        description: 'Monitor server performance and know when issues happen before users do.',
        topics: ['Reading Server Logs and Tracking Errors', 'Monitoring CPU and Memory Usage', 'Setting Up Alerts and Notifications', 'Restarting and Rolling Back Safely']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Automatic Web Application Deployment Pipeline',
        description: 'A GitHub Actions pipeline that automatically tests code and updates a live server on every commit.',
        tags: ['GitHub Actions', 'Docker', 'CI/CD', 'Linux']
      },
      {
        title: 'Secure Cloud Web Server Setup',
        description: 'A fully configured cloud server hosting a secure website with automated backups and monitoring.',
        tags: ['Cloud', 'Linux', 'Security', 'Terraform']
      }
    ]),
    learning_methodology: 'Hands-on terminal exercises, cloud sandbox environments, and guided deployment labs.',
    mentorship_support: 'Weekly infrastructure office hours, live pipeline debugging sessions, and mentor guidance.',
    assessment_approach: 'Automated deployment verification checks, server setup reviews, and capstone deployment.',
    career_pathways: JSON.stringify([
      'Junior DevOps Engineer', 'Cloud Support Specialist', 'Release Associate', 'Operations Technician'
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
    short_description: 'Learn how to protect computers, networks, and websites from modern online threats and attacks.',
    full_overview: 'Learn practical digital defense. You will explore how computers communicate over the internet, how security gaps occur, and how to defend systems using modern protection tools and best practices.',
    who_is_it_for: JSON.stringify([
      'Anyone wanting to start a career in defensive cybersecurity',
      'Developers who want to write safer, hack-resistant code',
      'Students and career switchers looking for practical security skills'
    ]),
    prerequisites: JSON.stringify([
      'General familiarity with computers, the internet, and basic networking',
      'No previous security or hacking knowledge required'
    ]),
    learning_objectives: JSON.stringify([
      'Understand how internet traffic moves and inspect network packets',
      'Identify common web vulnerabilities (like SQL injection and cross-site scripting)',
      'Apply security best practices to protect passwords and user accounts',
      'Understand encryption, digital certificates, and secure HTTPS connections',
      'Analyze security logs to spot suspicious activity and respond calmly'
    ]),
    skills_covered: JSON.stringify([
      'Network Basics', 'Web Security (OWASP Top 10)', 'Traffic Analysis', 'Password & Identity Security', 'Encryption Basics', 'Log Analysis'
    ]),
    tools_technologies: JSON.stringify([
      'Wireshark', 'Linux Terminal', 'Nmap', 'Burp Suite Basics', 'OpenSSL'
    ]),
    curriculum_modules: JSON.stringify([
      {
        title: 'Module 1: How Internet Traffic Moves & Inspection',
        description: 'Learn how data travels across networks and how to inspect packets for unusual activity.',
        topics: ['Internet Protocols (IP, TCP, DNS, HTTP)', 'Inspecting Traffic with Wireshark', 'Understanding Firewalls and Safe Zones', 'Recognizing Port Scanning and Probing']
      },
      {
        title: 'Module 2: Common Web Vulnerabilities & Fixes',
        description: 'Explore the most common ways websites get attacked and how to prevent them.',
        topics: ['SQL Injection: How It Works & How to Block It', 'Cross-Site Scripting (XSS) Prevention', 'Protecting User Logins and Sessions', 'Adding Security Headers to Web Pages']
      },
      {
        title: 'Module 3: Passwords, Encryption & Secure Access',
        description: 'Learn how digital locks work to keep sensitive data confidential.',
        topics: ['How Passwords Are Salted & Hashed Safely', 'Symmetric vs. Asymmetric Encryption', 'How SSL/TLS Certificates Protect Websites', 'Two-Factor Authentication (2FA) Best Practices']
      },
      {
        title: 'Module 4: Incident Response & Security Basics',
        description: 'Learn what to do when suspicious behavior is detected and how to keep clear records.',
        topics: ['Reading Security Logs to Spot Intruders', 'Steps to Contain and Investigate Incidents', 'Writing Simple Incident Reports', 'Best Habits for Everyday Digital Safety']
      }
    ]),
    sample_projects: JSON.stringify([
      {
        title: 'Network Traffic Investigation & Report',
        description: 'Analyze recorded network traffic to locate where unauthorized data was transferred and write a clear summary.',
        tags: ['Wireshark', 'Network Defense', 'Investigation']
      },
      {
        title: 'Website Security Audit & Fix Guide',
        description: 'Inspect a sample web application, identify three security gaps, and provide code fixes to patch them.',
        tags: ['Web Security', 'OWASP', 'Remediation']
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
    featured: 1,
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
  console.log('Admin account: admin@madyanholdings.com / AdminPass123!');
  console.log('Student account: student@madyanholdings.com / StudentPass123!');
}

// Auto-run if executed as script
const isMain = process.argv[1] && (
  process.argv[1].endsWith('seed.ts') || 
  process.argv[1].endsWith('seed.js') || 
  process.argv[1].includes('seed')
);

if (isMain) {
  seedDatabase(true);
}
