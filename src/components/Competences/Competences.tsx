import {SkillsSummary} from '@/lib/types/SkillsTypes'
interface SkillListProps {
  skill: SkillsSummary[];
}

export default function Skill({ skill }: SkillListProps) {
  const skillsByType = skill.reduce<Record<string, SkillsSummary[]>>((acc, skill) => {
    if (!acc[skill.type]) {
      acc[skill.type] = [];
    }
    acc[skill.type].push(skill);
    return acc;
  }, {});
  return (
    <div className='w-1/2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {Object.entries(skillsByType).map(([type, skills]) => (
          <div key={type}>
            <h3 className='text-xl font-bold'>{type}</h3>
            <ul className={'flex flex-wrap'}>
              {skills.map((skill) => (
                  <li className={'px-1'} key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </div>
      ))}
    </div>
  )
}
