import { Project, Difficulty, ProjectCategory } from './projects';
import { isSkillCovered, skillsMatch } from './skillTaxonomy';

export interface FilterOptions {
  difficulty?: Difficulty | 'All';
  timeFilter?: 'All' | '< 10 hours' | '10–20 hours' | '20+ hours';
  category?: ProjectCategory | 'All';
}

export interface RecommendationResult {
  project: Project;
  score: number;
  matchedGapSkills: string[];
  totalMissingAddressed: number;
  relevanceScore: number;
  explanation: string;
}

/**
 * Calculates missing skills given user skills and target skills.
 * Uses synonym-aware matching (see skillTaxonomy.ts) so equivalent skills
 * phrased differently (e.g. "K8s" vs "Kubernetes") aren't treated as gaps.
 * This is the offline stand-in for the backend's embedding-based matching,
 * used when /analyze is unreachable.
 */
export function calculateMissingSkills(userSkills: string[], targetSkills: string[]): string[] {
  return targetSkills.filter(target => !isSkillCovered(target, userSkills));
}

/**
 * Calculates estimated skill overlap percentage.
 */
export function calculateMatchPercentage(userSkills: string[], targetSkills: string[]): number {
  if (targetSkills.length === 0) return 100;
  const matchedCount = targetSkills.filter(target => isSkillCovered(target, userSkills)).length;
  return Math.round((matchedCount / targetSkills.length) * 100);
}

/**
 * Recommendation algorithm scoring projects based on:
 * 1. Number of missing skills addressed
 * 2. Percentage of project skills that address gaps
 * 3. Difficulty preference
 * 4. Time preference
 * 5. Category preference
 */
export function recommendProjects(
  userSkills: string[],
  targetSkills: string[],
  projectsList: Project[],
  options?: FilterOptions
): RecommendationResult[] {
  const missingSkills = calculateMissingSkills(userSkills, targetSkills);

  const results: RecommendationResult[] = projectsList.map(project => {
    // 1. Identify skills in the project that address missing skills
    const matchedGapSkills = project.skills.filter(skill =>
      missingSkills.some(gap => skillsMatch(gap, skill))
    );

    const totalMissingAddressed = matchedGapSkills.length;
    const projectGapRatio = project.skills.length > 0 ? totalMissingAddressed / project.skills.length : 0;
    const gapCoverageRatio = missingSkills.length > 0 ? totalMissingAddressed / missingSkills.length : 0;

    // Base relevance score (0 to 1)
    const relevanceScore = missingSkills.length > 0 ? totalMissingAddressed / missingSkills.length : (totalMissingAddressed > 0 ? 0.5 : 0.1);

    // 2. Calculate composite score
    let score = (totalMissingAddressed * 15) + (projectGapRatio * 20) + (gapCoverageRatio * 25);

    // 3. Apply preference bonuses if options provided
    if (options) {
      // Difficulty bonus
      if (options.difficulty && options.difficulty !== 'All') {
        if (project.difficulty === options.difficulty) {
          score += 10;
        }
      }

      // Time preference bonus
      if (options.timeFilter && options.timeFilter !== 'All') {
        if (options.timeFilter === '< 10 hours' && project.hours < 10) score += 10;
        else if (options.timeFilter === '10–20 hours' && project.hours >= 10 && project.hours <= 20) score += 10;
        else if (options.timeFilter === '20+ hours' && project.hours > 20) score += 10;
      }

      // Category preference bonus
      if (options.category && options.category !== 'All') {
        if (project.category === options.category) {
          score += 15;
        }
      }
    }

    // 4. Generate deterministic, human-readable explanation
    let explanation = '';
    if (totalMissingAddressed > 0) {
      const skillsFormatted = matchedGapSkills.length === 1
        ? matchedGapSkills[0]
        : matchedGapSkills.length === 2
        ? `${matchedGapSkills[0]} and ${matchedGapSkills[1]}`
        : `${matchedGapSkills.slice(0, -1).join(', ')}, and ${matchedGapSkills[matchedGapSkills.length - 1]}`;

      explanation = `This project addresses ${totalMissingAddressed} of your identified skill gap${totalMissingAddressed > 1 ? 's' : ''}: ${skillsFormatted}.`;
    } else {
      explanation = `This project reinforces key engineering practices in ${project.category}.`;
    }

    return {
      project,
      score: Math.round(score * 10) / 10,
      matchedGapSkills,
      totalMissingAddressed,
      relevanceScore,
      explanation
    };
  });

  // Sort descending by score, prioritizing projects that address at least 1 missing skill
  return results
    .filter(r => {
      // Apply strict category, difficulty, time filters if present in options
      if (!options) return true;
      if (options.difficulty && options.difficulty !== 'All' && r.project.difficulty !== options.difficulty) return false;
      if (options.category && options.category !== 'All' && r.project.category !== options.category) return false;
      if (options.timeFilter === '< 10 hours' && r.project.hours >= 10) return false;
      if (options.timeFilter === '10–20 hours' && (r.project.hours < 10 || r.project.hours > 20)) return false;
      if (options.timeFilter === '20+ hours' && r.project.hours < 20) return false;
      return true;
    })
    .sort((a, b) => {
      if (b.totalMissingAddressed !== a.totalMissingAddressed) {
        return b.totalMissingAddressed - a.totalMissingAddressed;
      }
      return b.score - a.score;
    });
}
