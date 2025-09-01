export interface TestCategory {
  id: string;
  name: string;
}

export interface TestSubcategory {
  id: string;
  name: string;
  category_id: string;
}

export interface TestEmployerExperience {
  id: string;
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
}

export interface TestSkill {
  id: string;
  name: string;
  comfort_level: number;
  category_id: string;
  subcategory_id?: string;
  last_updated_at: string;
}

export interface TestSkillEmployerExperience {
  skill_id: string;
  employer_experience_id: string;
}

// Test Categories
export const testCategories: TestCategory[] = [
  { id: 'programming-languages', name: 'Programming Languages' },
  { id: 'frameworks', name: 'Frameworks' },
  { id: 'tools', name: 'Tools' },
  { id: 'databases', name: 'Databases' },
];

// Test Subcategories
export const testSubcategories: TestSubcategory[] = [
  { id: 'frontend', name: 'Frontend', category_id: 'frameworks' },
  { id: 'backend', name: 'Backend', category_id: 'frameworks' },
  { id: 'mobile', name: 'Mobile', category_id: 'frameworks' },
  { id: 'devops', name: 'DevOps', category_id: 'tools' },
  { id: 'testing', name: 'Testing', category_id: 'tools' },
];

// Test Employer Experiences
export const testEmployerExperiences: TestEmployerExperience[] = [
  {
    id: 'company-a',
    name: 'Company A',
    description: 'Tech company focused on web applications',
    start_date: '2020-01-01',
    end_date: '2022-12-31',
  },
  {
    id: 'company-b',
    name: 'Company B',
    description: 'Mobile app development company',
    start_date: '2023-01-01',
    end_date: null,
  },
  {
    id: 'freelance',
    name: 'Freelance',
    description: 'Independent contractor work',
    start_date: '2019-01-01',
    end_date: null,
  },
];

// Test Skills
export const testSkills: TestSkill[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    comfort_level: 9,
    category_id: 'programming-languages',
    subcategory_id: null,
    last_updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'react',
    name: 'React',
    comfort_level: 8,
    category_id: 'frameworks',
    subcategory_id: 'frontend',
    last_updated_at: '2024-02-01T14:30:00Z',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    comfort_level: 7,
    category_id: 'frameworks',
    subcategory_id: 'backend',
    last_updated_at: '2024-01-20T09:15:00Z',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    comfort_level: 6,
    category_id: 'databases',
    subcategory_id: null,
    last_updated_at: '2024-01-10T16:45:00Z',
  },
];

// Test Skill-Employer Experience relationships
export const testSkillEmployerExperiences: TestSkillEmployerExperience[] = [
  { skill_id: 'javascript', employer_experience_id: 'company-a' },
  { skill_id: 'javascript', employer_experience_id: 'company-b' },
  { skill_id: 'react', employer_experience_id: 'company-a' },
  { skill_id: 'react', employer_experience_id: 'freelance' },
  { skill_id: 'nodejs', employer_experience_id: 'company-b' },
  { skill_id: 'postgresql', employer_experience_id: 'company-a' },
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
      employer_experience_id: se.employer_experience_id,
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