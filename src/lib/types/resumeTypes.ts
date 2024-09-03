import { PersonalInformation, Experience, Skill, Education, Interest, Project } from '@prisma/client';

export type ResumeData = {
  personalInformation: Omit<PersonalInformation, 'id' | 'createdAt' | 'updatedAt'> & {
    languages: Record<string, string>;
  };
  summary: string;
  skills: Record<string, Array<Omit<Skill, 'id' | 'createdAt' | 'updatedAt' | 'projects' | 'ProjectSkill'>>>;
  experiences: Omit<Experience, 'createdAt' | 'updatedAt'>[];
  education: Omit<Education, 'createdAt' | 'updatedAt'>[];
  interests: Omit<Interest, 'createdAt' | 'updatedAt'>[];
  projects: Array<
    Omit<Project, 'createdAt' | 'updatedAt' | 'skills' | 'ProjectSkill'> & {
    skills: string[];
  }
  >;
};