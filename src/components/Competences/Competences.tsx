import {SkillsSummary} from '@/lib/types/SkillsTypes'
interface SkillListProps {
  skill: SkillsSummary[];
}

export default function Skill({ skills }: SkillListProps) {
  const skillsByType = skills.reduce((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {} as Record<string, SkillsSummary[]>);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Object.entries(skillsByType).map(([type, skills]) => (
          <div key={type}>
            <h3 className='text-xl font-bold'>{type}</h3>
            <ul>
              {skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
      ))}
    </div>
  )
}
