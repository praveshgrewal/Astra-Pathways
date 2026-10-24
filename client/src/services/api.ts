const API_BASE = (import.meta as any).env?.VITE_API_URL || '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('astra_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('astra_token', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('astra_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials: { email: string; password: string }) => 
    request<any>('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData: { name: string; email: string; password: string; phone?: string }) =>
    request<any>('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => request<any>('/auth/me'),
  updateProfile: (profile: { name?: string; bio?: string; phone?: string }) =>
    request<any>('/auth/profile', { method: 'PUT', body: JSON.stringify(profile) }),

  // Programs
  getPrograms: (params?: { category?: string; level?: string; search?: string; featured?: boolean; all?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.level) searchParams.set('level', params.level);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured) searchParams.set('featured', 'true');
    if (params?.all) searchParams.set('all', 'true');
    const query = searchParams.toString();
    return request<any>(`/programs${query ? `?${query}` : ''}`);
  },
  getCategories: () => request<any>('/programs/meta/categories'),
  getProgram: (id: string) => request<any>(`/programs/${id}`),
  createProgram: (data: any) => request<any>('/programs', { method: 'POST', body: JSON.stringify(data) }),
  updateProgram: (id: string, data: any) => request<any>(`/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProgram: (id: string) => request<any>(`/programs/${id}`, { method: 'DELETE' }),

  // Leads
  submitLead: (leadData: any) => request<any>('/leads', { method: 'POST', body: JSON.stringify(leadData) }),
  getLeads: (params?: { status?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);
    const query = searchParams.toString();
    return request<any>(`/leads${query ? `?${query}` : ''}`);
  },
  updateLead: (id: string, updates: any) => request<any>(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(updates) }),
  deleteLead: (id: string) => request<any>(`/leads/${id}`, { method: 'DELETE' }),
  exportLeadsUrl: () => `${API_BASE}/leads/export/csv`,

  // Content
  getAnnouncements: (all?: boolean) => request<any>(`/content/announcements${all ? '?all=true' : ''}`),
  createAnnouncement: (data: any) => request<any>('/content/announcements', { method: 'POST', body: JSON.stringify(data) }),
  updateAnnouncement: (id: string, data: any) => request<any>(`/content/announcements/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),

  getBlogs: (params?: { category?: string; search?: string; all?: boolean }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.all) searchParams.set('all', 'true');
    const query = searchParams.toString();
    return request<any>(`/content/blogs${query ? `?${query}` : ''}`);
  },
  getBlog: (slug: string) => request<any>(`/content/blogs/${slug}`),
  createBlog: (data: any) => request<any>('/content/blogs', { method: 'POST', body: JSON.stringify(data) }),
  updateBlog: (id: string, data: any) => request<any>(`/content/blogs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteBlog: (id: string) => request<any>(`/content/blogs/${id}`, { method: 'DELETE' }),

  getFaqs: (params?: { category?: string; search?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    const query = searchParams.toString();
    return request<any>(`/content/faqs${query ? `?${query}` : ''}`);
  },
  createFaq: (data: any) => request<any>('/content/faqs', { method: 'POST', body: JSON.stringify(data) }),
  updateFaq: (id: string, data: any) => request<any>(`/content/faqs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteFaq: (id: string) => request<any>(`/content/faqs/${id}`, { method: 'DELETE' }),

  // Student
  getStudentDashboard: () => request<any>('/student/dashboard'),
  getStudentPrograms: () => request<any>('/student/programs'),
  enrollStudent: (programId: string) => request<any>('/student/enroll', { method: 'POST', body: JSON.stringify({ program_id: programId }) }),
  getStudentAssignments: () => request<any>('/student/assignments'),
  submitAssignment: (id: string, data: { submission_link: string; notes?: string }) =>
    request<any>(`/student/assignments/${id}/submit`, { method: 'POST', body: JSON.stringify(data) }),
  updateProgramProgress: (programId: string, progress_percent: number) =>
    request<any>(`/student/programs/${programId}/progress`, { method: 'POST', body: JSON.stringify({ progress_percent }) }),

  // Admin
  getAdminMetrics: () => request<any>('/admin/metrics'),
  getAdminStudents: () => request<any>('/admin/students'),
  getAdminAssignments: () => request<any>('/admin/assignments'),
  reviewAssignment: (id: string, data: { feedback?: string; score?: string; status?: string }) =>
    request<any>(`/admin/assignments/${id}/review`, { method: 'PATCH', body: JSON.stringify(data) })
};
