import { Project as CatalogProject, Difficulty, ProjectCategory, Milestone } from './projects';

export type { Difficulty, ProjectCategory, Milestone };

export interface Project extends CatalogProject {
  whyThisProject?: string;
  techStack?: string[];
  milestones?: Milestone[];
}

export interface JobDescription {
  id: string;
  role: string;
  company: string;
  description: string;
}

export interface SkillGapResult {
  userSkills: string[];
  targetSkills: string[];
  missingSkills: string[];
  matchPercentage: number;
}

export interface SavedProject {
  project: Project;
  progress: number; // 0-100
  savedAt: Date | string;
}

export interface ApiResponse {
  current_skills: string[];
  target_skills: string[];
  skill_gaps: string[];
  recommendations: Array<{
    project: Project;
    score: number;
    matched_gap_skills: string[];
    explanation: string;
  }>;
}
