import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSkillCardList } from '../components/resume/ResumeSkillCardList';

const meta: Meta<typeof ResumeSkillCardList> = {
  title: 'Resume/ResumeSkillCardList',
  component: ResumeSkillCardList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    skillsListQuery: {
      control: false,
      description: 'Query result from useGroupedSkillsList hook',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock grouped skills data
const mockGroupedSkillsData = {
  'Programming%20Languages': {
    'Frontend': [
      {
        id: 'TypeScript',
        name: 'TypeScript',
        comfort_level: 90,
        category_id: 'Programming%20Languages',
        subcategory_id: 'Frontend',
        last_updated_at: '2024-01-01',
        category: { id: 'Programming%20Languages', name: 'Programming Languages' },
        subcategory: { id: 'Frontend', name: 'Frontend' },
        skill_employer_experience: [],
        employer_experience: [
          { employer_experience_id: 'Acme%20Corp', name: 'Acme Corp' },
          { employer_experience_id: 'Tech%20Solutions', name: 'Tech Solutions' },
        ],
      },
      {
        id: 'React',
        name: 'React',
        comfort_level: 95,
        category_id: 'Programming%20Languages',
        subcategory_id: 'Frontend',
        last_updated_at: '2024-01-01',
        category: { id: 'Programming%20Languages', name: 'Programming Languages' },
        subcategory: { id: 'Frontend', name: 'Frontend' },
        skill_employer_experience: [],
        employer_experience: [
          { employer_experience_id: 'Frontend%20Agency', name: 'Frontend Agency' },
          { employer_experience_id: 'Startup%20Labs', name: 'Startup Labs' },
        ],
      },
    ],
    'Backend': [
      {
        id: 'Node.js',
        name: 'Node.js',
        comfort_level: 80,
        category_id: 'Programming%20Languages',
        subcategory_id: 'Backend',
        last_updated_at: '2024-01-01',
        category: { id: 'Programming%20Languages', name: 'Programming Languages' },
        subcategory: { id: 'Backend', name: 'Backend' },
        skill_employer_experience: [],
        employer_experience: [
          { employer_experience_id: 'Backend%20Systems', name: 'Backend Systems' },
        ],
      },
    ],
  },
  'Frameworks': {
    'null': [
      {
        id: 'Express',
        name: 'Express',
        comfort_level: 75,
        category_id: 'Frameworks',
        subcategory_id: null,
        last_updated_at: '2024-01-01',
        category: { id: 'Frameworks', name: 'Frameworks' },
        subcategory: null,
        skill_employer_experience: [],
        employer_experience: [
          { employer_experience_id: 'API%20Company', name: 'API Company' },
        ],
      },
    ],
  },
};

const mockSkillsListQuery = {
  data: mockGroupedSkillsData,
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: true,
  refetch: () => Promise.resolve(),
};

const mockLoadingQuery = {
  ...mockSkillsListQuery,
  data: undefined,
  isLoading: true,
  isSuccess: false,
};

const mockEmptyQuery = {
  ...mockSkillsListQuery,
  data: {},
};

export const Default: Story = {
  args: {
    skillsListQuery: mockSkillsListQuery,
  },
};

export const Loading: Story = {
  args: {
    skillsListQuery: mockLoadingQuery,
  },
};

export const EmptyData: Story = {
  args: {
    skillsListQuery: mockEmptyQuery,
  },
};

export const SingleCategory: Story = {
  args: {
    skillsListQuery: {
      ...mockSkillsListQuery,
      data: {
        'Programming%20Languages': {
          'Frontend': [
            {
              id: 'React',
              name: 'React',
              comfort_level: 95,
              category_id: 'Programming%20Languages',
              subcategory_id: 'Frontend',
              last_updated_at: '2024-01-01',
              category: { id: 'Programming%20Languages', name: 'Programming Languages' },
              subcategory: { id: 'Frontend', name: 'Frontend' },
              skill_employer_experience: [],
              employer_experience: [
                { employer_experience_id: 'Company%20A', name: 'Company A' },
                { employer_experience_id: 'Company%20B', name: 'Company B' },
              ],
            },
          ],
        },
      },
    },
  },
};

export const ManySkills: Story = {
  args: {
    skillsListQuery: {
      ...mockSkillsListQuery,
      data: {
        'Programming%20Languages': {
          'Frontend': [
            {
              id: 'React',
              name: 'React',
              comfort_level: 95,
              category_id: 'Programming%20Languages',
              subcategory_id: 'Frontend',
              last_updated_at: '2024-01-01',
              category: { id: 'Programming%20Languages', name: 'Programming Languages' },
              subcategory: { id: 'Frontend', name: 'Frontend' },
              skill_employer_experience: [],
              employer_experience: [
                { employer_experience_id: 'Company%20A', name: 'Company A' },
              ],
            },
            {
              id: 'Vue.js',
              name: 'Vue.js',
              comfort_level: 80,
              category_id: 'Programming%20Languages',
              subcategory_id: 'Frontend',
              last_updated_at: '2024-01-01',
              category: { id: 'Programming%20Languages', name: 'Programming Languages' },
              subcategory: { id: 'Frontend', name: 'Frontend' },
              skill_employer_experience: [],
              employer_experience: [
                { employer_experience_id: 'Company%20B', name: 'Company B' },
              ],
            },
            {
              id: 'Angular',
              name: 'Angular',
              comfort_level: 70,
              category_id: 'Programming%20Languages',
              subcategory_id: 'Frontend',
              last_updated_at: '2024-01-01',
              category: { id: 'Programming%20Languages', name: 'Programming Languages' },
              subcategory: { id: 'Frontend', name: 'Frontend' },
              skill_employer_experience: [],
              employer_experience: [
                { employer_experience_id: 'Company%20C', name: 'Company C' },
              ],
            },
            {
              id: 'Svelte',
              name: 'Svelte',
              comfort_level: 60,
              category_id: 'Programming%20Languages',
              subcategory_id: 'Frontend',
              last_updated_at: '2024-01-01',
              category: { id: 'Programming%20Languages', name: 'Programming Languages' },
              subcategory: { id: 'Frontend', name: 'Frontend' },
              skill_employer_experience: [],
              employer_experience: [],
            },
          ],
        },
      },
    },
  },
};