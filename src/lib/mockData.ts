import { SkillGapResult } from './types';
import { projects } from './projects';

export { projects };

export const userSkills: string[] = [
  'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'REST APIs', 'Git'
];

export const targetSkills: string[] = [
  'Python', 'AWS', 'Kubernetes', 'Terraform', 'Docker', 'CI/CD', 'Prometheus', 'PostgreSQL'
];

export const mockSkillGapResult: SkillGapResult = {
  userSkills,
  targetSkills,
  missingSkills: ['Kubernetes', 'AWS', 'Terraform', 'Prometheus', 'CI/CD'],
  matchPercentage: 68,
};
