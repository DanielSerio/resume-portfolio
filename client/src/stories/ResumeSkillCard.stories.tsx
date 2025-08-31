import type { Meta, StoryObj } from '@storybook/react';
import { ResumeSkillCard } from '../components/resume/ResumeSkillCard';

const meta: Meta<typeof ResumeSkillCard> = {
  title: 'Resume/ResumeSkillCard',
  component: ResumeSkillCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    skill: {
      control: false,
      description: 'Skill object with name, comfort level and employer experiences',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockSkill = {
  id: 'TypeScript',
  name: 'TypeScript',
  comfort_level: 85,
  category_id: 'Programming%20Languages',
  subcategory_id: 'Frontend',
  last_updated_at: '2024-01-01',
  category: { id: 'Programming%20Languages', name: 'Programming Languages' },
  subcategory: { id: 'Frontend', name: 'Frontend' },
  skill_employer_experience: [
    { id: 'TypeScript', employer_experience_id: 'Acme%20Corp' },
    { id: 'TypeScript', employer_experience_id: 'Tech%20Solutions%20Inc' },
  ],
  employer_experience: [
    { employer_experience_id: 'Acme%20Corp', name: 'Acme Corp' },
    { employer_experience_id: 'Tech%20Solutions%20Inc', name: 'Tech Solutions Inc' },
  ],
};

const mockSkillHighComfort = {
  ...mockSkill,
  id: 'React',
  name: 'React',
  comfort_level: 95,
  employer_experience: [
    { employer_experience_id: 'Frontend%20Agency', name: 'Frontend Agency' },
    { employer_experience_id: 'Startup%20Labs', name: 'Startup Labs' },
    { employer_experience_id: 'Enterprise%20Corp', name: 'Enterprise Corp' },
  ],
};

const mockSkillLowComfort = {
  ...mockSkill,
  id: 'Rust',
  name: 'Rust',
  comfort_level: 30,
  employer_experience: [
    { employer_experience_id: 'Systems%20Company', name: 'Systems Company' },
  ],
};

const mockSkillNoExperience = {
  ...mockSkill,
  id: 'Go',
  name: 'Go',
  comfort_level: 50,
  employer_experience: [],
};

export const Default: Story = {
  args: {
    skill: mockSkill,
  },
};

export const HighComfortLevel: Story = {
  args: {
    skill: mockSkillHighComfort,
  },
};

export const LowComfortLevel: Story = {
  args: {
    skill: mockSkillLowComfort,
  },
};

export const NoEmployerExperience: Story = {
  args: {
    skill: mockSkillNoExperience,
  },
};