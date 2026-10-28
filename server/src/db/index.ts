import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const dbPath = process.env.DATABASE_FILE || path.join(process.cwd(), 'data', 'astra.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

export const db = new Database(dbPath);
db.pragma('journal_mode = WAL');

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      avatar_url TEXT,
      bio TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS programs (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      level TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_overview TEXT NOT NULL,
      who_is_it_for TEXT NOT NULL,
      prerequisites TEXT NOT NULL,
      learning_objectives TEXT NOT NULL,
      skills_covered TEXT NOT NULL,
      tools_technologies TEXT NOT NULL,
      curriculum_modules TEXT NOT NULL,
      sample_projects TEXT NOT NULL,
      learning_methodology TEXT NOT NULL,
      mentorship_support TEXT NOT NULL,
      assessment_approach TEXT NOT NULL,
      career_pathways TEXT NOT NULL,
      placement_support_info TEXT NOT NULL,
      learning_format TEXT DEFAULT 'Interactive Online Learning',
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      program_of_interest TEXT,
      current_experience TEXT,
      preferred_contact TEXT,
      message TEXT,
      source TEXT DEFAULT 'Website',
      status TEXT DEFAULT 'New',
      notes TEXT DEFAULT '',
      assigned_to TEXT DEFAULT '',
      follow_up_date TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      tags TEXT NOT NULL,
      read_time TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT NOT NULL,
      author_role TEXT NOT NULL,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      published INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS faqs (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      order_num INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS announcements (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      badge TEXT NOT NULL,
      link_url TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id TEXT PRIMARY KEY,
      quote TEXT NOT NULL,
      author TEXT NOT NULL,
      role TEXT NOT NULL,
      program_name TEXT NOT NULL,
      is_verified INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS student_enrollments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      program_id TEXT NOT NULL,
      progress_percent INTEGER DEFAULT 0,
      enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(program_id) REFERENCES programs(id)
    );

    CREATE TABLE IF NOT EXISTS student_assignments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      program_id TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      submission_link TEXT,
      notes TEXT,
      status TEXT DEFAULT 'Pending',
      feedback TEXT,
      score TEXT,
      submitted_at DATETIME,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(program_id) REFERENCES programs(id)
    );

    CREATE TABLE IF NOT EXISTS forms_submissions (
      id TEXT PRIMARY KEY,
      reference_number TEXT UNIQUE NOT NULL,
      form_type TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      program_name TEXT,
      cohort TEXT,
      status TEXT DEFAULT 'New',
      priority TEXT DEFAULT 'Standard',
      payload TEXT NOT NULL,
      notes TEXT DEFAULT '',
      resolution TEXT DEFAULT '',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Database tables verified and initialized.');
}
