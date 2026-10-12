import { PROJECTS_DATA } from './projects';
import { SKILLS_REGISTRY } from './skillsRegistry';

export const SKILL_CATEGORIES = [
  { id: 'spoken', title: 'Languages' },
  { id: 'programming', title: 'Programming Languages' },
  { id: 'technologies', title: 'Technologies & Frameworks' },
  { id: 'tools', title: 'Tools & Environment' },
];

export const BASE_SPOKEN_SKILLS = [
  {
    id: 'pt',
    category: 'spoken',
    name: 'Portuguese',
    level: 'Native',
    badge: 'Native',
  },
  {
    id: 'en',
    category: 'spoken',
    name: 'English',
    level: 'C1 Advanced',
    badge: 'Cambridge C1',
  },
];

/**
 * Dynamically resolves skills from PROJECTS_DATA using SKILLS_REGISTRY matching table.
 * Automatically links project appearances to the 'context' / 'Application' field
 * and tracks bundled/sub-technologies for consolidated stacks.
 */
function buildDynamicSkills(projects, registry) {
  const skillsMap = new Map();

  projects.forEach((project) => {
    const projectTitle = project.title || project.name;
    const items = project.items || [];

    items.forEach((rawItem) => {
      let reg = registry[rawItem];
      if (!reg) return;

      let canonicalKey = rawItem;
      let label = reg.label || rawItem;

      // Resolve alias to canonical item
      if (reg.aliasOf) {
        canonicalKey = reg.aliasOf;
        reg = registry[canonicalKey];
      }

      if (!reg || reg.category === 'ignore') return;

      const canonicalName = reg.name || canonicalKey;
      const canonicalKeyCategory = `${reg.category}:${canonicalName}`;

      if (!skillsMap.has(canonicalKeyCategory)) {
        skillsMap.set(canonicalKeyCategory, {
          id: canonicalName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: reg.category,
          name: canonicalName,
          badge: reg.badge || reg.level || 'Proficient',
          level: reg.level || 'Proficient',
          detail: reg.detail || null,
          priority: reg.priority || 999,
          projectsSet: new Set(),
          bundledSet: new Set(),
        });
      }

      const entry = skillsMap.get(canonicalKeyCategory);
      if (projectTitle) {
        entry.projectsSet.add(projectTitle);
      }

      // If an alias or sub-item label is defined, track in bundled components
      if (label && label !== canonicalName) {
        entry.bundledSet.add(label);
      }
    });
  });

  const categoryGroups = {
    programming: [],
    technologies: [],
    tools: [],
  };

  skillsMap.forEach((skill) => {
    const projectList = Array.from(skill.projectsSet);
    const resolvedContext = projectList.length > 0 ? projectList.join(', ') : null;
    const bundledList = Array.from(skill.bundledSet).sort();

    const finalSkill = {
      id: skill.id,
      category: skill.category,
      name: skill.name,
      level: skill.level,
      badge: skill.badge,
      priority: skill.priority,
      projectCount: projectList.length,
      context: resolvedContext,
      detail: skill.detail,
      bundledItems: bundledList.length > 1 ? bundledList : null,
    };

    if (categoryGroups[skill.category]) {
      categoryGroups[skill.category].push(finalSkill);
    }
  });

  // Sort within each category: priority ascending, then projectCount descending, then alphabetical
  const sortSkills = (a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    if (b.projectCount !== a.projectCount) {
      return b.projectCount - a.projectCount;
    }
    return a.name.localeCompare(b.name);
  };

  categoryGroups.programming.sort(sortSkills);
  categoryGroups.technologies.sort(sortSkills);
  categoryGroups.tools.sort(sortSkills);

  return [
    ...BASE_SPOKEN_SKILLS,
    ...categoryGroups.programming,
    ...categoryGroups.technologies,
    ...categoryGroups.tools,
  ];
}

export const SKILLS_DATA = buildDynamicSkills(PROJECTS_DATA, SKILLS_REGISTRY);

export { SKILLS_REGISTRY };
