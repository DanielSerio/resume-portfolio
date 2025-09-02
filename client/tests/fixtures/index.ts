export interface TestCategory {
  id: string;
  name: string;
}

export interface TestSubcategory {
  id: string;
  name: string;
}

export interface TestEmployerExperience {
  id: string;
  name: string;
}

export interface TestSkill {
  id: string;
  name: string;
  comfort_level: number;
  category_id: string;
  subcategory_id?: string | null;
  last_updated_at: string;
}

export interface TestSkillEmployerExperience {
  skill_id: string;
  employer_experience_id: string;
}

// Test Categories
export const testCategories: TestCategory[] = [
  { id: encodeURIComponent('Programming Languages'), name: 'Programming Languages' },
  { id: encodeURIComponent('Frameworks'), name: 'Frameworks' },
  { id: encodeURIComponent('Tools'), name: 'Tools' },
  { id: encodeURIComponent('Databases'), name: 'Databases' },
];

// Test Subcategories
export const testSubcategories: TestSubcategory[] = [
  { id: encodeURIComponent('Frontend'), name: 'Frontend', },
  { id: encodeURIComponent('Backend'), name: 'Backend', },
  { id: encodeURIComponent('Mobile'), name: 'Mobile', },
  { id: encodeURIComponent('DevOps'), name: 'DevOps', },
  { id: encodeURIComponent('Testing'), name: 'Testing', },
];

// Test Employer Experiences
export const testEmployerExperiences: TestEmployerExperience[] = [
  {
    id: encodeURIComponent('Company A'),
    name: 'Company A',
  },
  {
    id: encodeURIComponent('Company B'),
    name: 'Company B',
  },
  {
    id: encodeURIComponent('Freelance'),
    name: 'Freelance',
  },
];

// Test Skills
export const testSkills: TestSkill[] = [
  {
    id: encodeURIComponent('JavaScript'),
    name: 'JavaScript',
    comfort_level: 9,
    category_id: encodeURIComponent('Programming Languages'),
    subcategory_id: null,
    last_updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: encodeURIComponent('React'),
    name: 'React',
    comfort_level: 8,
    category_id: encodeURIComponent('Frameworks'),
    subcategory_id: encodeURIComponent('Frontend'),
    last_updated_at: '2024-02-01T14:30:00Z',
  },
  {
    id: encodeURIComponent('Node.js'),
    name: 'Node.js',
    comfort_level: 7,
    category_id: encodeURIComponent('Frameworks'),
    subcategory_id: encodeURIComponent('Backend'),
    last_updated_at: '2024-01-20T09:15:00Z',
  },
  {
    id: encodeURIComponent('PostgreSQL'),
    name: 'PostgreSQL',
    comfort_level: 6,
    category_id: encodeURIComponent('Databases'),
    subcategory_id: null,
    last_updated_at: '2024-01-10T16:45:00Z',
  },
];

// Test Skill-Employer Experience relationships
export const testSkillEmployerExperiences: TestSkillEmployerExperience[] = [
  { skill_id: encodeURIComponent('JavaScript'), employer_experience_id: encodeURIComponent('Company A') },
  { skill_id: encodeURIComponent('JavaScript'), employer_experience_id: encodeURIComponent('Company B') },
  { skill_id: encodeURIComponent('React'), employer_experience_id: encodeURIComponent('Company A') },
  { skill_id: encodeURIComponent('React'), employer_experience_id: encodeURIComponent('Freelance') },
  { skill_id: encodeURIComponent('Node.js'), employer_experience_id: encodeURIComponent('Company B') },
  { skill_id: encodeURIComponent('PostgreSQL'), employer_experience_id: encodeURIComponent('Company A') },
];

// Helper to get full skill data with relationships
export function getSkillWithRelationships(skillId: string) {
  const skill = testSkills.find(s => s.id === skillId);
  if (!skill) return null;

  const category = testCategories.find(c => c.id === skill.category_id);
  const subcategory = skill.subcategory_id
    ? testSubcategories.find(sc => sc.id === skill.subcategory_id)
    : null;

  const skillEmployerExperiences = testSkillEmployerExperiences
    .filter(se => se.skill_id === skillId)
    .map(se => ({
      id: se.skill_id,
      employer_experience_id: se.employer_experience_id,
    }));

  const employerExperiences = skillEmployerExperiences.map(se => {
    const emp = testEmployerExperiences.find(e => e.id === se.employer_experience_id);
    return {
      id: se.employer_experience_id, // Use 'id' to match database schema
      name: emp?.name || 'Unknown',
    };
  });

  return {
    ...skill,
    category: category ? { id: category.id, name: category.name } : null,
    subcategory: subcategory ? { id: subcategory.id, name: subcategory.name } : null,
    skill_employer_experience: skillEmployerExperiences,
    employer_experience: employerExperiences,
  };
}

// Helper to get all skills with relationships for grouped query
export function getAllSkillsWithRelationships() {
  return testSkills.map(skill => getSkillWithRelationships(skill.id)).filter(Boolean);
}