# Astra Pathways — Premium EdTech Platform

> **Build Skills Today. Shape Your Tomorrow.**  
> Practical, career-oriented educational technology platform engineering industry-relevant capabilities through hands-on project deliverables and guided mentorship.

---

## 1. Project Overview & Positioning

**Astra Pathways** is a modern, responsive, and production-ready EdTech platform engineered to deliver career-oriented technical learning.

- **Brand Positioning:** Career-oriented learning, industry-relevant skills, practical education, and professional development.
- **Core Message:** Helping learners develop practical skills, work on meaningful projects, and navigate career pathways with confidence.

### Mandatory Compliance & Educational Integrity Standards
- **Strictly No Placement Guarantees:** We never promise guaranteed jobs, guaranteed placements, or assured career outcomes.
- **Support-Only Placement Assistance:** Placement assistance is provided strictly as a preparatory service (technical mock interviews, resume refinement, portfolio coaching, and job-search strategy).
- **No Course Fees / Pricing Tables:** Pricing is not displayed on public pages; learners connect directly with academic advisors.
- **No Salary Packages:** No fabricated or speculative salary packages or outcome statistics.
- **Genuine & Verified Testimonials Only:** Unverified or synthetic testimonials are prevented by policy.

---

## 2. Architecture & Tech Stack

```
Astra Pathways (Root)
├── client/                     # Frontend Application (React 19 + TypeScript + Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components, Navbar, Footer, Canvas
│   │   ├── context/            # AuthContext (JWT session management)
│   │   ├── pages/              # Public, Student Portal, Admin Dashboard & Legal Pages
│   │   ├── services/           # REST API client
│   │   └── types/              # Comprehensive TypeScript interfaces
│   ├── index.html              # Google Fonts, Meta tags, SEO & OpenGraph
│   └── vite.config.ts          # Tailwind v4 plugin & API proxy
└── server/                     # Backend API (Node.js + Express + TypeScript + SQLite)
    ├── src/
    │   ├── db/                 # SQLite database initialization & compliant seed data
    │   ├── middleware/         # JWT verification & RBAC authorization
    │   ├── routes/             # Auth, Programs, Leads, Content, Student, Admin routes
    │   └── index.ts            # Server entrypoint with CORS, rate-limiting & logging
    ├── data/                   # Persistent SQLite database file
    └── .env                    # Environment configuration
```

### Technology Highlights
- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, Lucide React, Canvas Confetti.
- **Interactive Visuals:** Custom high-performance HTML5 Canvas (`PathwaysCanvas`) simulating floating constellation nodes and energy trajectory pulses with cursor interactivity.
- **Backend:** Node.js, Express, TypeScript, Better-SQLite3 with WAL mode, JSON Web Tokens (JWT), BCrypt password hashing, Zod input validation schemas.
- **Database:** SQLite with pre-configured schemas for users, programs, leads, blogs, FAQs, announcements, student enrollments, and milestone assignment reviews.

---

## 3. Quickstart & Local Development

### Prerequisites
- Node.js `v18+` or `v20+` (tested on Node v24)
- npm `v9+`

### 1. Install Dependencies
```bash
# In the workspace root
npm install

# In the server directory
cd server && npm install

# In the client directory
cd ../client && npm install
cd ..
```

### 2. Seed Database with Compliant Data
```bash
npm run seed
```
This populates the database with compliant programs, curriculum modules, educational articles, FAQs, initial leads, and demo accounts.

### 3. Run Both Client and Backend Concurrently
```bash
npm run dev
```
- **Frontend Client:** [http://localhost:5173](http://localhost:5173)
- **Backend API Server:** [http://localhost:5000](http://localhost:5000)
- **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 4. Pre-Configured Testing Credentials

| Portal | Email | Password | Role | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Console** | `admin@astrapathways.com` | `AdminPass123!` | Administrator | Full access to leads, programs CRUD, content, and student grading |
| **Student Portal** | `student@astrapathways.com` | `StudentPass123!` | Student (Alex Morgan) | Enrolled in Full-Stack track, interactive quiz, milestone submissions |

*(Both login pages feature one-click "Quick Login" buttons for instant evaluation without typing.)*

---

## 5. Website Pages & Features

### A. Public Website
1. **Home Page (`/`):**
   - Dynamic dismissable Announcement bar managed via Admin.
   - Hero section featuring headline *"Build Skills Today. Shape Your Tomorrow."*, CTAs, and interactive `PathwaysCanvas` node visuals.
   - Trust and Value Pillars (Practical Learning, Industry Relevance, Mentorship, Career Guidance, Placement Support).
   - Featured Programs with skill badges, format, and module highlights.
   - Why Astra Pathways educational philosophy.
   - Interactive 6-step Learning Journey roadmap.
   - Practical sample deliverables clearly differentiated from student work.
   - Career support breakdown with transparent disclosure box.
   - Educational blogs & resource preview.
   - Searchable FAQ accordion.
   - Final CTA & comprehensive footer with regulatory notices.

2. **Programs Listing Page (`/programs`):**
   - Live search by keyword, skill, or title.
   - Category filter pills (Full-Stack, AI & ML, Data Science, Cloud & DevOps, Cybersecurity).
   - Level filters (Beginner, Intermediate, Advanced).
   - Comprehensive program cards with direct syllabus links and inquiry triggers.

3. **Program Detail Page (`/programs/:id`):**
   - In-depth module-by-module curriculum accordions with guided lab topics.
   - Who it's for & Prerequisites checklist.
   - Key learning objectives.
   - Sample practical portfolio deliverables.
   - Pedagogy, mentorship support, and assessment methodology.
   - Career pathways and placement assistance disclosures.
   - Download Syllabus Outline (`.txt`) generator button.

4. **About Us Page (`/about`):**
   - Brand heritage, Mission, Vision, and Educational Philosophy.
   - Core values (Practical Rigor First, Uncompromising Transparency, Learner Empowerment).
   - Faculty & Academic Leadership profiles (with placeholder representation notice).

5. **Learning Approach Page (`/learning-approach`):**
   - Interactive 8-stage learning lifecycle blueprint with tabbed deep-dives.

6. **Career Support Page (`/career-support`):**
   - Full breakdown of technical resume development, LinkedIn profile guidance, mock interviews, and strategic job-search planning.
   - Prominent transparent educational placement policy disclaimer.

7. **Resources & Guides (`/resources` & `/resources/:slug`):**
   - Educational articles, tutorials, and technology explainers.
   - Tag filters, read times, and author profiles.
   - Individual blog reader with social share link copy.

8. **Contact Page (`/contact`):**
   - Working contact and inquiry form with spam honeypot defense, field validation, and database persistence.
   - Direct advisory email and contact schedule.

9. **FAQ Page (`/faq`):**
   - Searchable question repository categorized by admissions, curriculum, projects, and career support.

10. **Legal Pages (`/privacy`, `/terms`, `/cookies`, `/refunds`):**
    - Comprehensive policies tailored to ethical EdTech practices.

---

### B. Student Portal (`/student/*`)
- **Student Dashboard (`/student/dashboard`):** Active tracks overview, progress percentages, pending milestones, and submitted projects.
- **My Programs & Checkpoints (`/student/programs`):** Module topic checklists that update progress in real time upon completion, plus an interactive knowledge checkpoint quiz engine that calculates instant scores with celebration confetti!
- **Milestone Project Submissions (`/student/assignments`):** Submit GitHub repository URLs and architecture notes for mentor critique, inspect instructor feedback and scores.

---

### C. Admin Operations Console (`/admin/*`)
- **Operations Dashboard (`/admin/dashboard`):** Real-time metrics (Total enquiries, New enquiries, Active programs, Published articles, Registered students) and live activity feed.
- **Lead & Enquiry Management (`/admin/leads`):** Complete leads table, live search, status switcher (`New`, `Contacted`, `Follow-up`, `Qualified`, `Closed`), internal notes editor modal, and direct CSV export download!
- **Curriculum & Programs Manager (`/admin/programs`):** Create new programs, edit existing tracks, toggle Homepage Featured flag, toggle public visibility, and delete programs.
- **Content & Announcements (`/admin/content`):** Top bar announcement editor, article publishing, and FAQ management.
- **Student Directory & Review Queue (`/admin/students`):** Directory of registered students and assignment grading queue to review repository links and submit feedback and grades.

---

## 6. Security & Production Deployment

- **Input Sanitization & Validation:** All inputs validated server-side using Zod schemas.
- **Spam Defense:** Hidden honeypot fields (`website_hp`) silently reject automated spam bots.
- **Deduplication:** Rate-limiting guard prevents duplicate rapid submissions.
- **Password Security:** BCrypt salt rounds (10) for one-way hash storage.
- **Session Tokens:** Signed JWT tokens with expiration.
- **RBAC:** Strict middleware guards separating student access from admin operations.

### Production Build
```bash
# Build both frontend and backend
npm run build

# Start production backend server
cd server && npm start
```

---

## 7. License & Compliance Statement

© 2026 Astra Pathways. All rights reserved.  
*Educational Notice: Astra Pathways provides career-oriented skill development, practical project-based learning, and career support services. Astra Pathways does not offer or promise placement guarantees, guaranteed employment, or specific salary outcomes.*
