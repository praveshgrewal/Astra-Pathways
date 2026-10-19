export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'student';
  bio?: string;
  phone?: string;
  created_at?: string;
}

export interface CurriculumModule {
  title: string;
  description: string;
  topics: string[];
}

export interface SampleProject {
  title: string;
  description: string;
  tags: string[];
}

export interface Program {
  id: string;
  title: string;
  category: string;
  level: string;
  short_description: string;
  full_overview: string;
  who_is_it_for: string[];
  prerequisites: string[];
  learning_objectives: string[];
  skills_covered: string[];
  tools_technologies: string[];
  curriculum_modules: CurriculumModule[];
  sample_projects: SampleProject[];
  learning_methodology: string;
  mentorship_support: string;
  assessment_approach: string;
  career_pathways: string[];
  placement_support_info: string;
  learning_format: string;
  featured: boolean;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  program_of_interest?: string;
  current_experience?: string;
  preferred_contact?: string;
  message?: string;
  source?: string;
  status: 'New' | 'Contacted' | 'Follow-up' | 'Qualified' | 'Closed';
  notes?: string;
  assigned_to?: string;
  follow_up_date?: string;
  created_at: string;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  category: string;
  tags: string[];
  read_time: string;
  summary: string;
  content: string;
  author_name: string;
  author_role: string;
  published_at: string;
  published: boolean;
}

export interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order_num: number;
}

export interface Announcement {
  id: string;
  title: string;
  badge: string;
  link_url?: string;
  is_active: number;
  created_at: string;
}

export interface StudentEnrollment {
  id: string;
  user_id: string;
  program_id: string;
  progress_percent: number;
  enrolled_at: string;
  completed_at?: string;
  title?: string;
  category?: string;
  level?: string;
  program_title?: string;
  program_category?: string;
  program_level?: string;
  curriculum_modules?: CurriculumModule[];
  sample_projects?: SampleProject[];
  tools_technologies?: string[];
}

export interface StudentAssignment {
  id: string;
  user_id: string;
  program_id: string;
  program_title?: string;
  title: string;
  description: string;
  submission_link?: string;
  notes?: string;
  status: 'Pending' | 'Submitted' | 'Reviewed';
  feedback?: string;
  score?: string;
  submitted_at?: string;
  student_name?: string;
  student_email?: string;
}
